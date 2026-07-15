/**
 * LA NEGRA — Static content & configuration
 * Author cantina in Roma-Condesa, CDMX.
 */

export const SITE = {
  name: "LA NEGRA",
  tagline: "The origin of the Mexican night.",
  subtitle:
    "Author cantina in the heart of Roma-Condesa. Mezcal, mixology, and high-end gastronomy.",
  phone: "5215555555555", // WhatsApp number (CDMX)
  phoneDisplay: "+52 55 5555 5555",
  email: "reservas@lanegra.mx",
  address: "Av. Álvaro Obregón 123, Col. Roma Norte, CDMX",
  addressShort: "Roma Norte, CDMX",
  hours: "Thursday to Saturday · 20:00 — 03:00",
  hoursLabel: "Jueves a Sábado",
  instagram: "https://instagram.com",
  tiktok: "https://tiktok.com",
  spotify: "https://spotify.com",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Av.+%C3%81lvaro+Obreg%C3%B3n+123,+Roma+Norte,+CDMX",
  wazeUrl: "https://waze.com/ul?q=Av.%20%C3%81lvaro%20Obreg%C3%B3n%20123%2C%20Roma%20Norte%2C%20CDMX",
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=-99.1730%2C19.4160%2C-99.1630%2C19.4260&layer=mapnik&marker=19.4210%2C-99.1680",
} as const;

export const NAV_LINKS = [
  { id: "experience", label: "Experience" },
  { id: "menu", label: "Menu" },
  { id: "gallery", label: "Gallery" },
  { id: "events", label: "Events" },
  { id: "voices", label: "Voices" },
  { id: "location", label: "Location" },
] as const;

export type MenuCategory = "mezcal" | "cocktails" | "gastronomy";

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  badge?: string;
}

export interface MenuSection {
  category: MenuCategory;
  label: string;
  eyebrow: string;
  image: string;
  items: MenuItem[];
}

export const MENU: MenuSection[] = [
  {
    category: "mezcal",
    label: "Mezcal",
    eyebrow: "Single-village spirits",
    image: "/images/menu-mezcal.png",
    items: [
      {
        name: "Tobalá Silvestre",
        description: "Earthy notes, deep smoke. Wild silvestre from the Sierra de Oaxaca.",
        price: "$220",
        badge: "House",
      },
      {
        name: "Espadín Ancestral",
        description: "Stone-milled in a tahona, double distilled in clay. Mineral and citrus.",
        price: "$190",
      },
      {
        name: "Cuishe de Guerrero",
        description: "Herbaceous, green, with a long peppery finish. Highland karwinskii.",
        price: "$240",
      },
      {
        name: "Pechuga de Mole",
        description: "Triple-distilled with fruits, spices and mole. A ceremonial pour.",
        price: "$320",
        badge: "Rare",
      },
      {
        name: "Madrecuixe 7yr",
        description: "Aged in glass, rested in the mountain. Smoke, leather, dried agave.",
        price: "$280",
      },
    ],
  },
  {
    category: "cocktails",
    label: "Cocktails",
    eyebrow: "Signature mixology",
    image: "/images/menu-cocktail.png",
    items: [
      {
        name: "La Negra Tónica",
        description: "Espadín mezcal, artisanal tonic, dehydrated citrus, smoked salt.",
        price: "$180",
        badge: "Signature",
      },
      {
        name: "Rojo Brujo",
        description: "Tobalá, hibiscus, charred pineapple, lime, ancho chile tincture.",
        price: "$210",
      },
      {
        name: "Humo Old Fashioned",
        description: "Aged mezcal, panela, bitters, applewood smoke under cloche.",
        price: "$230",
      },
      {
        name: "Cempasúchil Spritz",
        description: "Mezcal, marigold cordial, prosecco, soda. Floral and bright.",
        price: "$195",
      },
      {
        name: "Mole Negroni",
        description: "Mezcal, Campari, sweet vermouth, mole bitters. Bitter and deep.",
        price: "$220",
      },
    ],
  },
  {
    category: "gastronomy",
    label: "Gastronomy",
    eyebrow: "High-end curation",
    image: "/images/menu-gastronomy.png",
    items: [
      {
        name: "Bao Fish Taco",
        description: "Catch of the day, green mole, steamed bao bun, pickled red onion.",
        price: "$120",
        badge: "Signature",
      },
      {
        name: "Tostada de Atún",
        description: "Bluefin tuna, aguachile verde, avocado, crispy blue corn tostada.",
        price: "$165",
      },
      {
        name: "Taco de Lengua Glaseada",
        description: "Braised beef tongue, mezcal-mango glaze, cilantro, heirloom corn.",
        price: "$95",
      },
      {
        name: "Queso Oaxaca Fundido",
        description: "Melted string cheese, chorizo verde, truffle, hand-pressed tortilla.",
        price: "$140",
      },
      {
        name: "Elote Negro",
        description: "Charred corn, ash mayo, cotija, mezcal-lime, chile de árbol.",
        price: "$85",
      },
    ],
  },
];

export interface EventItem {
  id: string;
  title: string;
  date: string; // ISO
  day: string;
  month: string;
  artist: string;
  category: string;
  image: string;
  cta: "Reserve Table" | "Buy Ticket";
  price: string;
}

export const EVENTS: EventItem[] = [
  {
    id: "noche-de-muertos",
    title: "Night of the Dead",
    date: "2024-11-02",
    day: "02",
    month: "NOV",
    artist: "International DJ Set",
    category: "Dance",
    image: "/images/event-dead.png",
    cta: "Buy Ticket",
    price: "$450",
  },
  {
    id: "mezcal-jazz",
    title: "Mezcal & Jazz",
    date: "2024-11-10",
    day: "10",
    month: "NOV",
    artist: "Live Jazz Trio",
    category: "Live",
    image: "/images/event-jazz.png",
    cta: "Reserve Table",
    price: "$0",
  },
  {
    id: "humo-sessions",
    title: "Humo Sessions",
    date: "2024-11-16",
    day: "16",
    month: "NOV",
    artist: "DJ Citlali + guests",
    category: "Dance",
    image: "/images/event-dj.png",
    cta: "Buy Ticket",
    price: "$350",
  },
  {
    id: "mezcal-tasting",
    title: "Maestros del Mezcal",
    date: "2024-11-23",
    day: "23",
    month: "NOV",
    artist: "Tasting with Maestro Mezcalero",
    category: "Experience",
    image: "/images/experience-1.png",
    cta: "Reserve Table",
    price: "$600",
  },
];

export const TIME_SLOTS = [
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
  "00:00",
  "00:30",
  "01:00",
] as const;

export const VIP_ARRIVAL_SLOTS = [
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
  "00:00",
  "00:30",
] as const;

export type GalleryCategory = "room" | "craft" | "people" | "garnish";

export interface GalleryImage {
  src: string;
  alt: string;
  /** key into galleryCaptions in i18n */
  captionKey: string;
  category: GalleryCategory;
  /** tailwind span classes for masonry feel */
  span: string;
}

export const GALLERY: GalleryImage[] = [
  {
    src: "/images/gallery/g1.png",
    alt: "Mezcal copita being filled with amber liquid",
    captionKey: "pour",
    category: "craft",
    span: "sm:col-span-1 sm:row-span-2",
  },
  {
    src: "/images/gallery/g2.png",
    alt: "Dark luxury cantina bar counter at night",
    captionKey: "room",
    category: "room",
    span: "sm:col-span-2",
  },
  {
    src: "/images/gallery/g3.png",
    alt: "Elegant woman holding a crystal cocktail glass",
    captionKey: "night",
    category: "people",
    span: "sm:col-span-1 sm:row-span-2",
  },
  {
    src: "/images/gallery/g4.png",
    alt: "Dehydrated citrus wheels and marigold flowers",
    captionKey: "garnish",
    category: "garnish",
    span: "sm:col-span-1",
  },
  {
    src: "/images/gallery/g5.png",
    alt: "Brass shaker and crystal glasses on dark bar",
    captionKey: "craft",
    category: "craft",
    span: "sm:col-span-1 sm:row-span-2",
  },
  {
    src: "/images/gallery/g6.png",
    alt: "Hands cutting fresh agave hearts on dark wood",
    captionKey: "origin",
    category: "craft",
    span: "sm:col-span-2",
  },
  {
    src: "/images/gallery/g7.png",
    alt: "Clay pot of mezcal with wooden spoon",
    captionKey: "earth",
    category: "garnish",
    span: "sm:col-span-1",
  },
  {
    src: "/images/gallery/g8.png",
    alt: "Bartender silhouette polishing a crystal glass",
    captionKey: "keeper",
    category: "people",
    span: "sm:col-span-1 sm:row-span-2",
  },
];

export const GALLERY_CAPTIONS: Record<string, { es: string; en: string }> = {
  pour: { es: "El Vertido", en: "The Pour" },
  room: { es: "El Lugar", en: "The Room" },
  night: { es: "La Noche", en: "The Night" },
  garnish: { es: "El Adorno", en: "The Garnish" },
  craft: { es: "El Oficio", en: "The Craft" },
  origin: { es: "El Origen", en: "The Origin" },
  earth: { es: "La Tierra", en: "The Earth" },
  keeper: { es: "El Guardián", en: "The Keeper" },
};

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "La Negra no es un bar, es un ritual. El mejor mezcal que he probado fuera de Oaxaca, en una habitación que huele a humo y oro.",
    name: "Mariana Olvera",
    role: "Crítica gastronómica",
    avatar: "/images/avatar-1.png",
  },
  {
    quote:
      "Vine por una copa y me quedé hasta el cierre. La mixología es de otro nivel; cada trago cuenta una historia.",
    name: "Diego Fuentes",
    role: "DJ & productor",
    avatar: "/images/avatar-2.png",
  },
  {
    quote:
      "El lugar donde la noche de la Roma empieza de verdad. Servicio impecable, ambiente íntimo, oscuridad elegante.",
    name: "Lucía Mendoza",
    role: "Directora de arte",
    avatar: "/images/avatar-3.png",
  },
  {
    quote:
      "Reservé por WhatsApp en minutos. La lista VIP funcionó perfecto. Entramos sin esperar, la música estaba divina.",
    name: "Sebastián Ríos",
    role: "Arquitecto",
    avatar: "/images/avatar-2.png",
  },
  {
    quote:
      "Una cantina que respeta el mezcal y eleva la noche. El bao fish taco es perfecto. Volveré pronto.",
    name: "Valentina Cruz",
    role: "Sumiller",
    avatar: "/images/avatar-1.png",
  },
];

export interface PrivateEventOption {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  capacity: string;
}

export const PRIVATE_EVENTS: PrivateEventOption[] = [
  {
    id: "private-room",
    title: "Salón Privado",
    tagline: "8 — 20 personas",
    description:
      "Espacio íntimo con mesa de catador y mezcalero dedicado. Ideal para celebraciones y cenas de cierre.",
    features: ["Mezcalero dedicado", "Menú degustación", "Mesa de catador"],
    capacity: "8 — 20",
  },
  {
    id: "full-venue",
    title: "Toma Completa",
    tagline: "80 — 120 personas",
    description:
      "La cantina entera para ti. Branding personalizado, playlist curada y barra libre de autor.",
    features: ["Branding personalizado", "Barra libre de autor", "DJ residente"],
    capacity: "80 — 120",
  },
  {
    id: "corporate",
    title: "Experiencia Corporativa",
    tagline: "15 — 50 personas",
    description:
      "Catas guiadas y cócteles de equipo. Una manera diferente de cerrar negocios en la Roma.",
    features: ["Cata guiada", "Cócteles de equipo", "Coffee to mezcal"],
    capacity: "15 — 50",
  },
];
