"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type NetworkInformationLike = {
  addEventListener?: EventTarget["addEventListener"];
  removeEventListener?: EventTarget["removeEventListener"];
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformationLike;
};

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;

  varying vec2 vUv;

  float hash21(vec2 point) {
    point = fract(point * vec2(123.34, 456.21));
    point += dot(point, point + 45.32);
    return fract(point.x * point.y);
  }

  float valueNoise(vec2 point) {
    vec2 cell = floor(point);
    vec2 local = fract(point);
    local = local * local * (3.0 - 2.0 * local);

    float a = hash21(cell);
    float b = hash21(cell + vec2(1.0, 0.0));
    float c = hash21(cell + vec2(0.0, 1.0));
    float d = hash21(cell + vec2(1.0, 1.0));

    return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
  }

  float smokeField(vec2 point) {
    float value = 0.0;
    float amplitude = 0.56;
    mat2 turn = mat2(1.56, -1.12, 1.12, 1.56);

    for (int octave = 0; octave < 3; octave++) {
      value += amplitude * valueNoise(point);
      point = turn * point + vec2(2.7, -1.9);
      amplitude *= 0.47;
    }

    return value;
  }

  float lightCone(vec2 uv, float sourceX, float targetX, float spread) {
    float depth = 1.0 - uv.y;
    float center = mix(sourceX, targetX, depth);
    float width = mix(0.008, spread, depth);
    float cone = 1.0 - smoothstep(width * 0.28, width, abs(uv.x - center));
    float sourceFade = smoothstep(0.01, 0.16, depth);
    float floorFade = 1.0 - smoothstep(0.76, 1.08, depth);

    return cone * sourceFade * floorFade;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 hazeUv = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);

    float slowTime = uTime * 0.055;
    float broadHaze = smokeField(hazeUv * 3.25 + vec2(slowTime * 0.34, -slowTime * 0.26));
    float fineHaze = valueNoise(hazeUv * 7.8 + vec2(-slowTime * 0.22, slowTime * 0.31));
    float haze = smoothstep(0.37, 0.91, broadHaze * 0.72 + fineHaze * 0.28);

    float goldTarget = 0.44 + sin(uTime * 0.17) * 0.12;
    float uvTarget = 0.57 + sin(uTime * 0.13 + 2.4) * 0.14;
    float goldCone = lightCone(uv, 0.17, goldTarget, 0.25);
    float uvCone = lightCone(uv, 0.83, uvTarget, 0.29);

    float suspendedSmoke = mix(0.20, 1.0, haze);
    float goldLight = goldCone * suspendedSmoke;
    float uvLight = uvCone * mix(0.16, 0.86, haze);
    float roomHaze = haze * (1.0 - smoothstep(0.18, 0.78, abs(uv.y - 0.52)));

    vec3 warmGold = vec3(0.78, 0.53, 0.20);
    vec3 ultraviolet = vec3(0.32, 0.17, 0.66);
    vec3 wine = vec3(0.23, 0.035, 0.065);
    vec3 color = warmGold * goldLight * 0.48;
    color += ultraviolet * uvLight * 0.38;
    color += wine * roomHaze * 0.16;

    float alpha = clamp(
      goldLight * 0.19 + uvLight * 0.15 + roomHaze * 0.075,
      0.0,
      0.26
    );

    gl_FragColor = vec4(color, alpha);
  }
`;

/**
 * A single-draw-call atmospheric lighting pass for the hero.
 * The CSS lighting rig remains underneath as the no-WebGL fallback.
 */
export function ClubLightsWebGL() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as NavigatorWithConnection).connection;

    if (motionQuery.matches || connection?.saveData) return;

    let renderer: InstanceType<typeof THREE.WebGLRenderer>;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        failIfMajorPerformanceCaveat: true,
        powerPreference: "low-power",
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
      });
    } catch {
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const canvas = renderer.domElement;
    canvas.setAttribute("aria-hidden", "true");
    Object.assign(canvas.style, {
      display: "block",
      height: "100%",
      inset: "0",
      mixBlendMode: "screen",
      opacity: "0.48",
      pointerEvents: "none",
      position: "absolute",
      width: "100%",
    });
    host.appendChild(canvas);

    const uniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
    };
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      depthTest: false,
      depthWrite: false,
      fragmentShader: FRAGMENT_SHADER,
      toneMapped: false,
      transparent: true,
      uniforms,
      vertexShader: VERTEX_SHADER,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;

    const scene = new THREE.Scene();
    scene.add(mesh);
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    let disposed = false;
    let elapsed = 0;
    let frameId: number | null = null;
    let lastFrameTime: number | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const stop = () => {
      if (frameId === null) return;
      window.cancelAnimationFrame(frameId);
      frameId = null;
      lastFrameTime = null;
    };

    const resize = () => {
      if (disposed) return;

      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
      const pixelBudgetRatio = Math.sqrt(1_600_000 / (width * height));
      const pixelRatio = Math.min(devicePixelRatio, pixelBudgetRatio);

      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width * pixelRatio, height * pixelRatio);
    };

    const renderFrame = (now: number) => {
      frameId = null;

      if (disposed || document.hidden) return;

      if (lastFrameTime !== null) {
        elapsed += Math.min((now - lastFrameTime) / 1000, 0.05);
      }
      lastFrameTime = now;
      uniforms.uTime.value = elapsed;

      try {
        renderer.render(scene, camera);
      } catch {
        cleanup();
        return;
      }

      frameId = window.requestAnimationFrame(renderFrame);
    };

    const start = () => {
      if (disposed || document.hidden || frameId !== null) return;
      frameId = window.requestAnimationFrame(renderFrame);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        resize();
        start();
      }
    };

    const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) cleanup();
    };

    const addMotionPreferenceListener = () => {
      if (typeof motionQuery.addEventListener === "function") {
        motionQuery.addEventListener("change", onMotionPreferenceChange);
      } else {
        motionQuery.addListener(onMotionPreferenceChange);
      }
    };

    const removeMotionPreferenceListener = () => {
      if (typeof motionQuery.removeEventListener === "function") {
        motionQuery.removeEventListener("change", onMotionPreferenceChange);
      } else {
        motionQuery.removeListener(onMotionPreferenceChange);
      }
    };

    const onConnectionChange = () => {
      if (connection?.saveData) cleanup();
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      stop();
    };

    const onContextRestored = () => {
      resize();
      start();
    };

    function cleanup() {
      if (disposed) return;
      disposed = true;

      stop();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      removeMotionPreferenceListener();
      connection?.removeEventListener?.("change", onConnectionChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);

      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    }

    try {
      resize();
      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);
      }
      window.addEventListener("resize", resize, { passive: true });
      document.addEventListener("visibilitychange", onVisibilityChange);
      addMotionPreferenceListener();
      connection?.addEventListener?.("change", onConnectionChange);
      canvas.addEventListener("webglcontextlost", onContextLost);
      canvas.addEventListener("webglcontextrestored", onContextRestored);
      start();
    } catch {
      cleanup();
      return;
    }

    return cleanup;
  }, []);

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
