// Contrato de conteúdo: specs/001-petshop-home/data-model.md e contracts/content-schema.md.
// Independe da origem dos dados (arquivos estáticos hoje, CMS no futuro).

export type SectionId =
  | 'inicio'
  | 'sobre'
  | 'diferenciais'
  | 'servicos'
  | 'produtos'
  | 'avaliacoes'
  | 'duvidas'
  | 'contato';

export type ImageMimeType = 'image/avif' | 'image/webp' | 'image/jpeg' | 'image/png';

export type ImageAsset = Readonly<{
  sources: readonly Readonly<{ type: ImageMimeType; srcSet: string }>[];
  fallback: Readonly<{ src: string }>;
  width: number;
  height: number;
  /** Descritivo; string vazia somente para imagem decorativa. */
  alt: string;
}>;

export type SiteConfig = Readonly<{
  /** URL absoluta HTTPS sem barra final. */
  url: string;
  locale: 'pt-BR';
  defaultOgImage: string;
  defaultOgImageAlt: string;
  themeColor: string;
  backgroundColor: string;
}>;

export type PostalAddress = Readonly<{
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  /** UF com 2 letras. */
  state: string;
  /** Formato 00000-000. */
  postalCode: string;
  country: 'BR';
}>;

export type PhoneNumber = Readonly<{
  /** E.164, ex.: +5511987654321. */
  e164: string;
  /** Ex.: (11) 98765-4321. */
  display: string;
}>;

export type DayOfWeek =
  'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type OpeningHoursEntry = Readonly<
  | { day: DayOfWeek; closed: true }
  | { day: DayOfWeek; closed?: false; opens: string; closes: string }
>;

export type SpecialHoursNotice = Readonly<{
  /** ISO YYYY-MM-DD. */
  date: string;
  label: string;
  opens?: string;
  closes?: string;
  closed?: boolean;
  /** ISO YYYY-MM-DD; o aviso deixa de ser exibido após esta data. */
  validUntil: string;
}>;

export type ReviewSource = 'Google' | 'Facebook' | 'Instagram';

export type ReviewSummary = Readonly<{
  /** 1,0 a 5,0. */
  ratingValue: number;
  reviewCount: number;
  source: ReviewSource;
  /** ISO YYYY-MM-DD — data de referência do número (CR-007). */
  referenceDate: string;
  url: string;
}>;

export type SocialNetwork = 'instagram' | 'facebook' | 'tiktok' | 'youtube';

export type SocialLink = Readonly<{
  network: SocialNetwork;
  url: string;
  handle: string;
}>;

export type Business = Readonly<{
  tradeName: string;
  legalName: string;
  /** Formato 00.000.000/0000-00. */
  cnpj: string;
  foundingYear: number;
  address: PostalAddress;
  geo: Readonly<{ latitude: number; longitude: number }>;
  phone: PhoneNumber;
  whatsapp: PhoneNumber;
  email: string;
  whatsappResponseNote: string;
  openingHours: readonly OpeningHoursEntry[];
  specialHours: readonly SpecialHoursNotice[];
  priceRange: string;
  googleBusinessProfileUrl: string;
  mapsDirectionsQuery: string;
  mapEmbedUrl: string;
  mapPreview: ImageAsset;
  socialLinks: readonly SocialLink[];
  reviewSummary: ReviewSummary;
  areasServed: readonly string[];
  logo: Readonly<{ src: string; width: number; height: number }>;
}>;

export type NavItem = Readonly<{
  label: string;
  sectionId: SectionId;
}>;

export type TrackingContext = string;

export type CtaContent = Readonly<{
  label: string;
  intent: 'whatsapp' | 'phone' | 'directions' | 'anchor' | 'external';
  whatsappMessage?: string;
  /** SectionId (âncora) ou URL. */
  target?: string;
  trackingContext: TrackingContext;
}>;

export type TrustSignal = Readonly<{
  kind: 'rating' | 'yearsActive' | 'petsServed' | 'custom';
  value: string;
  label: string;
  /** ISO YYYY-MM-DD. */
  referenceDate: string;
}>;

export type HeroContent = Readonly<{
  title: string;
  subtitle: string;
  image: ImageAsset;
  trustSignals: readonly TrustSignal[];
  primaryCta: CtaContent;
  secondaryCta: CtaContent;
}>;

export type TeamMember = Readonly<{
  id: string;
  name: string;
  role: string;
  qualifications: readonly string[];
  photo: ImageAsset;
  professionalRegistry?: string;
}>;

export type AboutContent = Readonly<{
  heading: string;
  story: readonly string[];
  mission: string;
  gallery: readonly ImageAsset[];
  team: readonly TeamMember[];
}>;

export type IconName =
  | 'shield-check'
  | 'award'
  | 'wind'
  | 'heart-handshake'
  | 'sparkles'
  | 'stethoscope'
  | 'video'
  | 'car'
  | 'clock'
  | 'paw-print';

export type Differential = Readonly<{
  id: string;
  title: string;
  description: string;
  evidence: string;
  icon: IconName;
}>;

export type Species = 'dog' | 'cat';
export type PetSize = 'small' | 'medium' | 'large' | 'giant';

export type Service = Readonly<{
  id: string;
  slug: string;
  name: string;
  description: string;
  species: readonly Species[];
  sizes: readonly PetSize[];
  includes: readonly string[];
  durationMinutes: Readonly<{ min: number; max: number }>;
  /** Em reais, > 0. */
  priceFrom: number;
  priceFactors: readonly string[];
  image: ImageAsset;
  whatsappMessage: string;
}>;

export type PurchaseOption = 'pickup' | 'delivery';

export type FeaturedProduct = Readonly<{
  id: string;
  kind: 'product' | 'category';
  name: string;
  category: string;
  usage: string;
  brand?: string;
  image: ImageAsset;
  purchaseOptions: readonly PurchaseOption[];
  whatsappMessage: string;
}>;

export type Brand = Readonly<{
  name: string;
  logo?: ImageAsset;
}>;

export type ProductsContent = Readonly<{
  heading: string;
  intro: string;
  items: readonly FeaturedProduct[];
  brands: readonly Brand[];
  purchaseNote: string;
}>;

export type Testimonial = Readonly<{
  id: string;
  authorName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  source: ReviewSource;
  /** ISO YYYY-MM-DD. */
  date: string;
  sourceUrl?: string;
}>;

export type FaqItem = Readonly<{
  id: string;
  question: string;
  answer: readonly string[];
}>;

export type PrivacyContent = Readonly<{
  title: string;
  /** ISO YYYY-MM-DD. */
  lastUpdated: string;
  sections: readonly Readonly<{ heading: string; paragraphs: readonly string[] }>[];
}>;

export type WhatsAppMessages = Readonly<{
  general: string;
  faq: string;
}>;

export type SiteContent = Readonly<{
  site: SiteConfig;
  business: Business;
  messages: WhatsAppMessages;
  navigation: readonly NavItem[];
  hero: HeroContent;
  about: AboutContent;
  differentials: readonly Differential[];
  services: readonly Service[];
  products: ProductsContent;
  testimonials: readonly Testimonial[];
  faq: readonly FaqItem[];
  privacy: PrivacyContent;
  /** Ano do build — base de "anos de atuação" e copyright. */
  buildYear: number;
}>;
