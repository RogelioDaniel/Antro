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
    viewAll: string;
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
};

export const DICTS: Record<Lang, Dict> = { es, en };
