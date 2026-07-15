/**
 * LA NEGRA — i18n dictionary (ES / EN).
 * All user-facing copy lives here so the language toggle can swap everything
 * without touching component logic. Keys are namespaced by section.
 */
export type Lang = "es" | "en";

export interface Dict {
  nav: {
    experience: string;
    menu: string;
    gallery: string;
    events: string;
    voices: string;
    location: string;
    reserve: string;
    vip: string;
  };
  loader: {
    tagline: string;
  };
  kinetic: {
    /** Phrase that zooms across the screen during the loader. */
    loaderPhrase: string;
    /** Giant single word that owns the hero. */
    heroWord: string;
    /** Small word stacked above the giant hero word. */
    heroPre: string;
    /** Repeated phrase tiled across the hero background wall. */
    heroTile: string;
    /** Marquee divider phrases, keyed by section. */
    marquee: {
      experience: string;
      menu: string;
      gallery: string;
      events: string;
      privateEvents: string;
      journal: string;
    };
    /** Wow rings section. */
    wow: {
      word: string;
      ring: string;
      caption: string;
    };
    /** Pattern CTA section. */
    patternCta: {
      h2Line1: string;
      h2Line2: string;
      button: string;
    };
  };
  hero: {
    eyebrow: string;
    h1Line1: string;
    h1Line2: string;
    subtitle: string;
    ctaReserve: string;
    ctaVip: string;
    scroll: string;
    hoursLabel: string;
  };
  experience: {
    eyebrow: string;
    h2Line1: string;
    h2Line2: string;
    body: string;
    quote: string;
    pillars: { k: string; t: string; d: string }[];
  };
  menu: {
    eyebrow: string;
    h2: string;
    download: string;
  };
  gallery: {
    eyebrow: string;
    h2: string;
    sub: string;
    filters: { all: string; room: string; craft: string; people: string; garnish: string };
  };
  events: {
    eyebrow: string;
    h2: string;
    swipeHint: string;
    freeEntry: string;
    from: string;
  };
  voices: {
    eyebrow: string;
    h2: string;
    rating: string;
  };
  privateEvents: {
    eyebrow: string;
    h2Line1: string;
    h2Line2: string;
    body: string;
    inquire: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  };
  location: {
    eyebrow: string;
    h2: string;
    address: string;
    addressLabel: string;
    hours: string;
    hoursLabel: string;
    dressCode: string;
    dressCodeNote: string;
    dressCodeView: string;
    directions: string;
    waze: string;
  };
  newsletter: {
    h2: string;
    body: string;
    placeholder: string;
    button: string;
    success: string;
    error: string;
    micro: string;
  };
  blog: {
    eyebrow: string;
    h2: string;
    sub: string;
    readMore: string;
    minRead: string;
    titles: Record<string, string>;
    excerpts: Record<string, string>;
    bodies: Record<string, string[]>;
    viewAll: string;
    back: string;
    share: string;
    publishedOn: string;
  };
  footer: {
    tagline: string;
    nav: string;
    casa: string;
    privacy: string;
    terms: string;
    dressCode: string;
    copyright: string;
    age: string;
  };
  modals: {
    reserve: {
      eyebrow: string;
      title: string;
      desc: string;
      date: string;
      time: string;
      guests: string;
      name: string;
      phone: string;
      submit: string;
      submitting: string;
      note: string;
      errs: { date: string; time: string; guests: string; name: string; phone: string };
    };
    vip: {
      eyebrow: string;
      title: string;
      desc: string;
      name: string;
      guests: string;
      arrival: string;
      dressAgree: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successBody: string;
      passId: string;
      nameL: string;
      people: string;
      arrivalL: string;
      save: string;
      done: string;
      errs: { name: string; guests: string; arrival: string; agreed: string };
    };
    dresscode: {
      eyebrow: string;
      title: string;
      desc: string;
      guidelines: { label: string; note: string }[];
      inspiration: string;
      chips: string[];
      close: string;
    };
    privateEvents: {
      eyebrow: string;
      title: string;
      desc: string;
      name: string;
      email: string;
      phone: string;
      format: string;
      formatPlaceholder: string;
      other: string;
      guests: string;
      date: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      note: string;
      errs: { name: string; email: string; phone: string; eventType: string; date: string; guests: string };
    };
    availability: {
      eyebrow: string;
      title: string;
      desc: string;
      legendOpen: string;
      legendLimited: string;
      legendFull: string;
      select: string;
      selected: string;
      close: string;
    };
  };
  whatsapp: {
    tooltipTitle: string;
    tooltipBody: string;
    defaultMsg: string;
  };
  cookie: {
    title: string;
    body: string;
    accept: string;
    decline: string;
    link: string;
    manage: string;
    save: string;
    modalTitle: string;
    modalBody: string;
    essential: string;
    essentialDesc: string;
    analytics: string;
    analyticsDesc: string;
    marketing: string;
    marketingDesc: string;
    essentialLocked: string;
  };
}

const es: Dict = {
  nav: {
    experience: "Experiencia",
    menu: "Carta",
    gallery: "Galería",
    events: "Eventos",
    voices: "Voces",
    location: "Ubicación",
    reserve: "Reservar",
    vip: "Lista VIP",
  },
  loader: { tagline: "Cantina · CDMX" },
  kinetic: {
    loaderPhrase: "LA NOCHE ES NEGRA",
    heroWord: "NEGRA",
    heroPre: "La",
    heroTile: "LA NOCHE ES NEGRA",
    marquee: {
      experience: "LA EXPERIENCIA",
      menu: "LA CARTA",
      gallery: "LA GALERÍA",
      events: "LA LISTA DE LA NOCHE",
      privateEvents: "EVENTOS PRIVADOS",
      journal: "EL DIARIO",
    },
    wow: {
      word: "EUFORIA",
      ring: "LA NOCHE ES NEGRA · MEZCAL · MIXOLOGÍA · ",
      caption: "Esto no se cuenta. Se vive.",
    },
    patternCta: {
      h2Line1: "LA MESA DE HOY ES",
      h2Line2: "LA LEYENDA DE MAÑANA",
      button: "Reservar ahora",
    },
  },
  hero: {
    eyebrow: "Roma-Condesa · CDMX",
    h1Line1: "El origen de la",
    h1Line2: "noche mexicana.",
    subtitle:
      "Cantina de autor en el corazón de la Roma-Condesa. Mezcal, mixología y gastronomía de alto nivel.",
    ctaReserve: "Reservar Mesa",
    ctaVip: "Unirse a la Lista VIP",
    scroll: "Desliza",
    hoursLabel: "Jueves a Sábado",
  },
  experience: {
    eyebrow: "Nuestro Concepto",
    h2Line1: "Un homenaje a la oscuridad",
    h2Line2: "y al buen beber.",
    body: "En La Negra rescatamos la tradición de la cantina mexicana y la elevamos a su máxima expresión. Mezcal de pueblo, mixología de autor y una curaduría gastronómica que desafía la noche.",
    quote: "La noche no se bebe. Se habita.",
    pillars: [
      { k: "01", t: "Mezcal de Pueblo", d: "Espíritus trazables, destilados por maestros mezcaleros." },
      { k: "02", t: "Mixología de Autor", d: "Cócteles que reinterpretan la cantina mexicana." },
      { k: "03", t: "Curaduría Gastronómica", d: "Alta cocina informal que acompaña la noche." },
    ],
  },
  menu: { eyebrow: "La Carta", h2: "La Carta", download: "Descargar Carta (PDF)" },
  gallery: {
    eyebrow: "Dentro de La Negra",
    h2: "La Galería",
    sub: "Fragmentos de una noche que no termina. Toca cualquier imagen para ampliar.",
    filters: { all: "Todo", room: "El Lugar", craft: "El Oficio", people: "La Noche", garnish: "El Adorno" },
  },
  events: {
    eyebrow: "Próximamente",
    h2: "La Lista de la Noche.",
    swipeHint: "Desliza para ver más →",
    freeEntry: "Entrada libre",
    from: "Desde",
  },
  voices: { eyebrow: "Voces de la noche", h2: "Lo Que Dicen", rating: "4.9 · 320+ reseñas" },
  privateEvents: {
    eyebrow: "Eventos Privados",
    h2Line1: "Toma La Noche",
    h2Line2: "Entera",
    body: "Cierres de negocio, cumpleaños, lanzamientos. Tres formatos para hacer de La Negra el escenario de tu próxima historia.",
    inquire: "Cotizar",
    ctaTitle: "¿Una idea diferente? Cuéntanos.",
    ctaBody: "Diseñamos experiencias a la medida de tu noche.",
    ctaButton: "Solicitar Cotización",
  },
  location: {
    eyebrow: "Encuéntranos",
    h2: "Ubicación y Horario",
    address: "Av. Álvaro Obregón 123, Col. Roma Norte, CDMX",
    addressLabel: "Dirección",
    hours: "Jueves a Sábado",
    hoursLabel: "Horario",
    dressCode: "Dress Code",
    dressCodeNote: "Reservamos el derecho de admisión.",
    dressCodeView: "Ver →",
    directions: "Cómo Llegar",
    waze: "Waze",
  },
  newsletter: {
    h2: "Únete al Círculo",
    body: "Eventos privados, lanzamientos de mezcal y noches secretas. Solo para quienes saben dónde empieza la noche.",
    placeholder: "tu@email.com",
    button: "Suscribir",
    success: "Bienvenido al círculo. Revisa tu correo.",
    error: "Email inválido",
    micro: "Sin spam · Cancela cuando quieras",
  },
  blog: {
    eyebrow: "El Diario",
    h2: "Desde La Negra",
    sub: "Crónicas de mezcal, noche y cantina. Historias de la Roma-Condesa.",
    readMore: "Leer",
    minRead: "min",
    viewAll: "Ver todo el diario",
    back: "Volver al diario",
    share: "Compartir",
    publishedOn: "Publicado el",
    titles: {
      mezcalOrigin: "El origen del mezcal de pueblo",
      romaNight: "Una noche en la Roma-Condesa",
      mixology: "Mixología de autor: el oficio del cóctel",
    },
    excerpts: {
      mezcalOrigin: "Del corazón de agave a la copa. Un viaje a la sierra de Oaxaca con el maestro mezcalero que destila nuestro espíritu de pueblo.",
      romaNight: "Por qué la Roma-Condesa es el corazón nocturno de la CDMX, y cómo La Negra se convirtió en su cantina de autor.",
      mixology: "Detrás de cada cóctel hay una historia. Te contamos cómo nació La Negra Tónica y por qué el humo lo cambia todo.",
    },
    bodies: {
      mezcalOrigin: [
        "Hay un momento, en la sierra de Oaxaca, en que el silencio se rompe por el golpe rítmico de la tahona. Es el sonido del agave espadín siendo molido por una piedra de caballo girada por un animal paciente. Ese sonido es el primer paso de un viaje que termina en una copa de bar, frente a ti, en La Negra.",
        "Nuestro maestro mezcalero, don Atilano, lleva cuarenta años destilando en olla de cobre. No usa termómetros. Sabe, dice, por el olor del vapor y el color del destilado cuando el mezcal está listo. Es una sabiduría que no se enseña en escuelas; se hereda, de padre a hijo, de noche a noche, junto al horno de tierra.",
        "El mezcal de pueblo no es una categoría comercial. Es una declaración: cada botella viene de un solo pueblo, de un solo palenque, de manos específicas. Cuando vertimos un Tobalá Silvestre en La Negra, sabemos qué cerro lo vio crecer, qué lluvia lo maduró, qué manos lo cortaron después de siete años de sol.",
        "Por eso servimos en copita de bar, no de vidrio. El bar respira, y el mezcal se abre. Por eso no hacemos shots. El mezcal de pueblo se habita, se contempla, se acompaña de unas gotas de sal de gusano y un trozo de naranja. Es un ritual, no un trago.",
        "La próxima vez que vengas a La Negra, pide un Tobalá. Pregúntanos de dónde viene. Te contaremos la historia del cerro, del maestro, del silencio. Esa es la diferencia entre beber y comprender.",
      ],
      romaNight: [
        "La Roma-Condesa no duerme; cambia de manos. Al caer la tarde, los cafés ceden el paso a las cantinas, los paseadores a los noctámbulos, la luz dorada a la oscuridad intencional. Es en ese tránsito donde La Negra encuentra su lugar.",
        "Cuando diseñamos La Negra, no queríamos ser otro bar. Queríamos ser una cantina de autor: un lugar que respetara la tradición del mezcal pero que la elevara, que entendiera que la noche de la Roma es tan cinematográfica como cualquier ciudad europea, y que merecía un escenario a su altura.",
        "Por eso la oscuridad. Por qué el oro. Por qué el humo. Cada elemento está pensado para que, cuando entres, dejes la calle atrás y entres en otro tiempo. Una cantina mexicana del siglo XXI, pero con el alma de las de antes.",
        "La Roma-Condesa es el corazón nocturno de la CDMX porque mezcla todo: lo histórico y lo nuevo, lo extranjero y lo local, lo alto y lo bajo. La Negra se sentó en esa frontera y decidió ser autora: curar el mezcal, firmar los cócteles, contar la noche como una historia.",
        "Ven un jueves. Siéntate en la barra. Pide un La Negra Tónica y observa cómo la sala se llena. Esa es la Roma que queríamos contar.",
      ],
      mixology: [
        "Todo cóctel de autor comienza con una pregunta. La Negra Tónica nació de una: ¿qué pasa si mezclamos el carácter ahumado del mezcal espadín con la limpieza de una tónica artesanal y la acidez de cítricos deshidratados?",
        "La respuesta tardó seis meses. Probamos tónicas de todo el mundo hasta encontrar una pequeña producción belga que respeta al mezcal sin taparlo. Deshidratamos naranja, toronja y limón en horno bajo durante doce horas, hasta que el azúcar se concentra y la cascara se vuelve cristalina.",
        "El humo no es decoración. Cuando pasamos la copa por humo de madera de manzano, estamos haciendo algo preciso: el humo encapsula los aromas del mezcal y los libera lentamente conforme bebes. No es un truco; es arquitectura.",
        "Detrás de cada cóctel de nuestra carta hay una historia similar. El Rojo Brujo nació de un sueño con hibisco; el Humo Old Fashioned, de una obsesión con el panela; el Cempasúchil Spritz, de la flor de muertos.",
        "La mixología de autor no es arrogancia. Es respeto: por el ingrediente, por el oficio, por quien bebe. Cuando pides un cóctel en La Negra, no estás pidiendo un trago. Estás pidiendo el resultado de meses de trabajo, de errores, de noches. Por eso cuesta lo que cuesta. Por eso vale lo que vale.",
      ],
    },
  },
  footer: {
    tagline: "El origen de la noche mexicana.",
    nav: "Navegación",
    casa: "La Casa",
    privacy: "Privacidad",
    terms: "Términos",
    dressCode: "Dress Code",
    copyright: "Hecho con mezcal en CDMX.",
    age: "Beber con moderación · 18+",
  },
  modals: {
    reserve: {
      eyebrow: "Reservación",
      title: "Reservar Mesa",
      desc: "Confirma tu mesa. Te redirigimos a WhatsApp para validar la disponibilidad con nuestro anfitrión.",
      date: "Fecha",
      time: "Hora",
      guests: "Personas",
      name: "Nombre",
      phone: "Teléfono",
      submit: "Confirmar por WhatsApp",
      submitting: "Confirmando…",
      note: "Al confirmar abriremos WhatsApp con tu solicitud pre-formateada al +52 55 5555 5555.",
      errs: {
        date: "Selecciona una fecha",
        time: "Elige una hora",
        guests: "Indica el número de personas",
        name: "Tu nombre es requerido",
        phone: "Teléfono inválido (mín. 10 dígitos)",
      },
    },
    vip: {
      eyebrow: "Lista VIP",
      title: "Lista de Acceso VIP",
      desc: "Acceso prioritario. Rápido y sin fricción. Máximo 4 personas.",
      name: "Nombre",
      guests: "Acompañantes",
      arrival: "Llegada aprox.",
      dressAgree: "Acepto el dress code Smart Casual de La Negra.",
      submit: "Solicitar Acceso VIP",
      submitting: "Generando pase…",
      successTitle: "Bienvenido a la lista",
      successBody: "Muestra este pase en la entrada. Tu nombre ya está en lista.",
      passId: "Pass ID",
      nameL: "Nombre",
      people: "Personas",
      arrivalL: "Llegada",
      save: "Guardar",
      done: "Listo",
      errs: {
        name: "Tu nombre es requerido",
        guests: "Indica acompañantes",
        arrival: "Selecciona hora de llegada",
        agreed: "Debes aceptar el dress code",
      },
    },
    dresscode: {
      eyebrow: "Dress Code",
      title: "Smart Casual",
      desc: "La noche se viste. Estos son nuestros lineamientos.",
      guidelines: [
        { label: "Smart Casual", note: "Elegancia relajada, con intención." },
        { label: "No deportivo", note: "Sin tenis deportivos, shorts o playeras sin cuello." },
        { label: "Accesorios bienvenidos", note: "Joyas, sombreros y detalles que celebren la noche." },
        { label: "Reservamos admisión", note: "El anfitrión puede negar el acceso." },
      ],
      inspiration: "Inspiración",
      chips: ["Traje sastre sin corbata", "Vestido de cóctel", "Botines + camisa de lino", "Blazer negro + jewelry"],
      close: "Entendido",
    },
    privateEvents: {
      eyebrow: "Evento Privado",
      title: "Solicitar Cotización",
      desc: "Comparte los detalles. Te contactamos por WhatsApp con una propuesta a la medida.",
      name: "Nombre",
      email: "Email",
      phone: "Teléfono",
      format: "Formato",
      formatPlaceholder: "Selecciona",
      other: "Otro / Personalizado",
      guests: "Personas",
      date: "Fecha tentativa",
      message: "Mensaje (opcional)",
      messagePlaceholder: "Cuéntanos sobre tu evento...",
      submit: "Enviar solicitud por WhatsApp",
      submitting: "Enviando…",
      note: "Se abrirá WhatsApp con tu solicitud para +52 55 5555 5555.",
      errs: {
        name: "Requerido",
        email: "Email inválido",
        phone: "Teléfono inválido",
        eventType: "Selecciona un formato",
        date: "Selecciona una fecha",
        guests: "Indica el número",
      },
    },
    availability: {
      eyebrow: "Disponibilidad",
      title: "Calendario de Reservaciones",
      desc: "Consulta la disponibilidad de la noche. Selecciona una fecha para reservar.",
      legendOpen: "Abierto",
      legendLimited: "Limitado",
      legendFull: "Lleno",
      select: "Seleccionar",
      selected: "Seleccionado",
      close: "Cerrar",
    },
  },
  whatsapp: {
    tooltipTitle: "¿Reservaciones o lista VIP?",
    tooltipBody: "Escríbenos, respondemos rápido.",
    defaultMsg: "Hola La Negra, me gustaría información sobre reservaciones y la lista VIP.",
  },
  cookie: {
    title: "Privacidad de La Negra",
    body: "Usamos cookies esenciales para el funcionamiento del sitio y de analítica anónima para mejorar tu experiencia. Puedes aceptar o rechazar la analítica.",
    accept: "Aceptar todo",
    decline: "Solo esenciales",
    link: "Política de privacidad",
    manage: "Gestionar preferencias",
    save: "Guardar preferencias",
    modalTitle: "Preferencias de cookies",
    modalBody: "Gestiona cómo usamos las cookies. Las esenciales siempre están activas.",
    essential: "Esenciales",
    essentialDesc: "Necesarias para el funcionamiento del sitio (sesión, idioma, reservaciones).",
    analytics: "Analítica",
    analyticsDesc: "Métricas anónimas de uso para mejorar la experiencia.",
    marketing: "Marketing",
    marketingDesc: "Píxeles de redes sociales para mostrar contenido relevante.",
    essentialLocked: "Siempre activo",
  },
};

const en: Dict = {
  nav: {
    experience: "Experience",
    menu: "Menu",
    gallery: "Gallery",
    events: "Events",
    voices: "Voices",
    location: "Location",
    reserve: "Reserve",
    vip: "VIP List",
  },
  loader: { tagline: "Cantina · CDMX" },
  kinetic: {
    loaderPhrase: "THE NIGHT IS BLACK",
    heroWord: "NEGRA",
    heroPre: "La",
    heroTile: "THE NIGHT IS BLACK",
    marquee: {
      experience: "THE EXPERIENCE",
      menu: "THE MENU",
      gallery: "THE GALLERY",
      events: "THE NIGHT'S LIST",
      privateEvents: "PRIVATE EVENTS",
      journal: "THE JOURNAL",
    },
    wow: {
      word: "EUPHORIA",
      ring: "THE NIGHT IS BLACK · MEZCAL · MIXOLOGY · ",
      caption: "You don't tell this story. You live it.",
    },
    patternCta: {
      h2Line1: "TONIGHT'S TABLE IS",
      h2Line2: "TOMORROW'S LEGEND",
      button: "Reserve now",
    },
  },
  hero: {
    eyebrow: "Roma-Condesa · CDMX",
    h1Line1: "The origin of the",
    h1Line2: "Mexican night.",
    subtitle:
      "Author cantina in the heart of Roma-Condesa. Mezcal, mixology, and high-end gastronomy.",
    ctaReserve: "Reserve a Table",
    ctaVip: "Join VIP List",
    scroll: "Scroll",
    hoursLabel: "Thursday to Saturday",
  },
  experience: {
    eyebrow: "Our Concept",
    h2Line1: "A homage to darkness",
    h2Line2: "and fine drinking.",
    body: "At La Negra, we rescue the tradition of the Mexican cantina and elevate it to its maximum expression. Single-village mezcal, signature mixology, and a gastronomic curation that defies the night.",
    quote: "The night is not drunk. It is inhabited.",
    pillars: [
      { k: "01", t: "Single-Village Mezcal", d: "Traceable spirits, distilled by master mezcaleros." },
      { k: "02", t: "Signature Mixology", d: "Cocktails that reinterpret the Mexican cantina." },
      { k: "03", t: "Gastronomic Curation", d: "Informal fine dining that accompanies the night." },
    ],
  },
  menu: { eyebrow: "The Menu", h2: "The Menu", download: "Download Full Menu (PDF)" },
  gallery: {
    eyebrow: "Inside La Negra",
    h2: "The Gallery",
    sub: "Fragments of a night that never ends. Tap any image to enlarge.",
    filters: { all: "All", room: "The Room", craft: "The Craft", people: "The Night", garnish: "The Garnish" },
  },
  events: {
    eyebrow: "Upcoming",
    h2: "The Night's List.",
    swipeHint: "Swipe to see more →",
    freeEntry: "Free entry",
    from: "From",
  },
  voices: { eyebrow: "Voices of the night", h2: "What They Say", rating: "4.9 · 320+ reviews" },
  privateEvents: {
    eyebrow: "Private Events",
    h2Line1: "Take Over",
    h2Line2: "The Night",
    body: "Business closings, birthdays, launches. Three formats to make La Negra the stage for your next story.",
    inquire: "Inquire",
    ctaTitle: "A different idea? Tell us.",
    ctaBody: "We design experiences tailored to your night.",
    ctaButton: "Request a Quote",
  },
  location: {
    eyebrow: "Find Us",
    h2: "Location & Hours",
    address: "Av. Álvaro Obregón 123, Roma Norte, CDMX",
    addressLabel: "Address",
    hours: "Thursday to Saturday",
    hoursLabel: "Hours",
    dressCode: "Dress Code",
    dressCodeNote: "We reserve the right of admission.",
    dressCodeView: "View →",
    directions: "Get Directions",
    waze: "Waze",
  },
  newsletter: {
    h2: "Join the Inner Circle",
    body: "Private events, mezcal launches and secret nights. Only for those who know where the night begins.",
    placeholder: "your@email.com",
    button: "Subscribe",
    success: "Welcome to the circle. Check your inbox.",
    error: "Invalid email",
    micro: "No spam · Cancel anytime",
  },
  blog: {
    eyebrow: "The Journal",
    h2: "From La Negra",
    sub: "Chronicles of mezcal, night and cantina. Stories from Roma-Condesa.",
    readMore: "Read",
    minRead: "min",
    viewAll: "View the full journal",
    back: "Back to the journal",
    share: "Share",
    publishedOn: "Published on",
    titles: {
      mezcalOrigin: "The origin of single-village mezcal",
      romaNight: "A night in Roma-Condesa",
      mixology: "Signature mixology: the craft of the cocktail",
    },
    excerpts: {
      mezcalOrigin: "From the heart of agave to the glass. A journey to the Oaxaca mountains with the master mezcalero who distills our village spirit.",
      romaNight: "Why Roma-Condesa is the nocturnal heart of CDMX, and how La Negra became its author cantina.",
      mixology: "Behind every cocktail is a story. We tell you how La Negra Tónica was born and why smoke changes everything.",
    },
    bodies: {
      mezcalOrigin: [
        "There is a moment, in the Oaxaca mountains, when the silence is broken by the rhythmic strike of the tahona. It is the sound of espadín agave being ground by a horse stone turned by a patient animal. That sound is the first step of a journey that ends in a clay cup, before you, at La Negra.",
        "Our master mezcalero, don Atilano, has been distilling in copper stills for forty years. He uses no thermometers. He knows, he says, by the smell of the vapor and the color of the distillate when the mezcal is ready. It is a wisdom not taught in schools; it is inherited, from father to son, from night to night, beside the earthen oven.",
        "Single-village mezcal is not a commercial category. It is a declaration: every bottle comes from a single village, a single palenque, specific hands. When we pour a wild Tobalá at La Negra, we know which hill saw it grow, which rain ripened it, which hands cut it after seven years of sun.",
        "That is why we serve in a clay copita, not glass. The clay breathes, and the mezcal opens. That is why we do not do shots. Single-village mezcal is inhabited, contemplated, accompanied by a few drops of agave worm salt and a slice of orange. It is a ritual, not a drink.",
        "Next time you come to La Negra, order a Tobalá. Ask us where it comes from. We will tell you the story of the hill, the master, the silence. That is the difference between drinking and understanding.",
      ],
      romaNight: [
        "Roma-Condesa does not sleep; it changes hands. As evening falls, cafés yield to cantinas, strollers to night owls, golden light to intentional darkness. It is in that transition that La Negra finds its place.",
        "When we designed La Negra, we did not want to be another bar. We wanted to be an author cantina: a place that respected the tradition of mezcal but elevated it, that understood the night of Roma is as cinematic as any European city, and that it deserved a stage to match.",
        "That is why the darkness. That is why the gold. That is why the smoke. Every element is designed so that, when you enter, you leave the street behind and step into another time. A 21st-century Mexican cantina, but with the soul of the old ones.",
        "Roma-Condesa is the nocturnal heart of CDMX because it mixes everything: the historic and the new, the foreign and the local, the high and the low. La Negra sat at that frontier and decided to be an author: to curate the mezcal, to sign the cocktails, to tell the night as a story.",
        "Come on a Thursday. Sit at the bar. Order a La Negra Tónica and watch the room fill. That is the Roma we wanted to tell.",
      ],
      mixology: [
        "Every signature cocktail begins with a question. La Negra Tónica was born of one: what happens if we mix the smoky character of espadín mezcal with the cleanness of an artisanal tonic and the acidity of dehydrated citrus?",
        "The answer took six months. We tried tonics from all over the world until we found a small Belgian production that respected the mezcal without covering it. We dehydrated orange, grapefruit and lemon in a low oven for twelve hours, until the sugar concentrated and the peel turned crystalline.",
        "The smoke is not decoration. When we pass the glass through applewood smoke, we are doing something precise: the smoke encapsulates the aromas of the mezcal and releases them slowly as you drink. It is not a trick; it is architecture.",
        "Behind every cocktail on our menu there is a similar story. Rojo Brujo was born from a dream with hibiscus; Humo Old Fashioned, from an obsession with panela; Cempasúchil Spritz, from the flower of the dead.",
        "Signature mixology is not arrogance. It is respect: for the ingredient, for the craft, for the drinker. When you order a cocktail at La Negra, you are not ordering a drink. You are ordering the result of months of work, of mistakes, of nights. That is why it costs what it costs. That is why it is worth what it is worth.",
      ],
    },
  },
  footer: {
    tagline: "The origin of the Mexican night.",
    nav: "Navigation",
    casa: "The House",
    privacy: "Privacy Policy",
    terms: "Terms",
    dressCode: "Dress Code",
    copyright: "Made with mezcal in CDMX.",
    age: "Drink responsibly · 18+",
  },
  modals: {
    reserve: {
      eyebrow: "Reservation",
      title: "Reserve a Table",
      desc: "Confirm your table. We redirect you to WhatsApp to validate availability with our host.",
      date: "Date",
      time: "Time",
      guests: "Guests",
      name: "Name",
      phone: "Phone",
      submit: "Confirm via WhatsApp",
      submitting: "Confirming…",
      note: "On confirm we'll open WhatsApp with your pre-formatted request to +52 55 5555 5555.",
      errs: {
        date: "Select a date",
        time: "Choose a time",
        guests: "Indicate number of guests",
        name: "Your name is required",
        phone: "Invalid phone (min. 10 digits)",
      },
    },
    vip: {
      eyebrow: "VIP List",
      title: "VIP Access List",
      desc: "Priority access. Fast and frictionless. Max 4 guests.",
      name: "Name",
      guests: "Guests",
      arrival: "Approx. arrival",
      dressAgree: "I agree to La Negra's Smart Casual dress code.",
      submit: "Request VIP Access",
      submitting: "Generating pass…",
      successTitle: "Welcome to the list",
      successBody: "Show this pass at the entrance. Your name is already on the list.",
      passId: "Pass ID",
      nameL: "Name",
      people: "Guests",
      arrivalL: "Arrival",
      save: "Save",
      done: "Done",
      errs: {
        name: "Your name is required",
        guests: "Indicate guests",
        arrival: "Select arrival time",
        agreed: "You must accept the dress code",
      },
    },
    dresscode: {
      eyebrow: "Dress Code",
      title: "Smart Casual",
      desc: "The night dresses up. These are our guidelines.",
      guidelines: [
        { label: "Smart Casual", note: "Relaxed elegance, with intention." },
        { label: "No sportswear", note: "No sneakers, shorts or collarless tees." },
        { label: "Accessories welcome", note: "Jewelry, hats and details that celebrate the night." },
        { label: "We reserve admission", note: "The host may deny entry." },
      ],
      inspiration: "Inspiration",
      chips: ["Suit, no tie", "Cocktail dress", "Booties + linen shirt", "Black blazer + jewelry"],
      close: "Got it",
    },
    privateEvents: {
      eyebrow: "Private Event",
      title: "Request a Quote",
      desc: "Share the details. We'll contact you on WhatsApp with a tailored proposal.",
      name: "Name",
      email: "Email",
      phone: "Phone",
      format: "Format",
      formatPlaceholder: "Select",
      other: "Other / Custom",
      guests: "Guests",
      date: "Tentative date",
      message: "Message (optional)",
      messagePlaceholder: "Tell us about your event...",
      submit: "Send request via WhatsApp",
      submitting: "Sending…",
      note: "WhatsApp will open with your request to +52 55 5555 5555.",
      errs: {
        name: "Required",
        email: "Invalid email",
        phone: "Invalid phone",
        eventType: "Select a format",
        date: "Select a date",
        guests: "Indicate the number",
      },
    },
    availability: {
      eyebrow: "Availability",
      title: "Reservations Calendar",
      desc: "Check the night's availability. Select a date to reserve.",
      legendOpen: "Open",
      legendLimited: "Limited",
      legendFull: "Full",
      select: "Select",
      selected: "Selected",
      close: "Close",
    },
  },
  whatsapp: {
    tooltipTitle: "Reservations or VIP list?",
    tooltipBody: "Message us, we reply fast.",
    defaultMsg: "Hi La Negra, I'd like info about reservations and the VIP list.",
  },
  cookie: {
    title: "La Negra Privacy",
    body: "We use essential cookies for the site to function and anonymous analytics to improve your experience. You may accept or decline analytics.",
    accept: "Accept all",
    decline: "Essential only",
    link: "Privacy policy",
    manage: "Manage preferences",
    save: "Save preferences",
    modalTitle: "Cookie preferences",
    modalBody: "Manage how we use cookies. Essential cookies are always active.",
    essential: "Essential",
    essentialDesc: "Required for the site to function (session, language, reservations).",
    analytics: "Analytics",
    analyticsDesc: "Anonymous usage metrics to improve the experience.",
    marketing: "Marketing",
    marketingDesc: "Social pixels to show relevant content.",
    essentialLocked: "Always active",
  },
};

export const DICTS: Record<Lang, Dict> = { es, en };
