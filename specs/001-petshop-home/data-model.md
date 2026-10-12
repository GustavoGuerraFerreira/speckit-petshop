# Data Model: Home Page Comercial do Petshop

**Feature**: `001-petshop-home` | **Data**: 2026-10-12 | **Plano**: [plan.md](./plan.md)

Não há banco de dados nesta entrega. O "modelo de dados" é o **contrato de conteúdo** tipado em
`src/types/content.ts`, preenchido por arquivos estáticos em `src/content/` e entregue às páginas
por `loadSiteContent()`. O mesmo contrato será a interface de um CMS futuro
(ver [research.md R-10](./research.md#r-10-evolução-para-cms--painel--dados-dinâmicos)).
As assinaturas TypeScript detalhadas estão em [contracts/content-schema.md](./contracts/content-schema.md).

## Convenções gerais

- Todos os tipos são `readonly` (conteúdo é imutável em tempo de execução).
- Textos em pt-BR, sem placeholder. Conteúdo ainda não fornecido usa o marcador literal
  `PENDENTE: <o que falta>`; `pnpm check:content` falha o build de produção se encontrar algum
  (CR-009).
- Toda imagem é um `ImageAsset` com `alt` obrigatório; imagem decorativa declara `alt: ''`
  explicitamente (FR-031).
- Toda entidade listada tem `id` estável (kebab-case, único na coleção) usado como `key` no React,
  âncora quando aplicável e identidade futura no CMS.
- Datas no formato ISO `YYYY-MM-DD`.

## Diagrama de relacionamento

```text
SiteContent
├── site: SiteConfig ──────────────── url canônica, idioma, metadados padrão
├── business: Business (1) ─────────── FONTE ÚNICA de NAP, horário, avaliações agregadas
│     ├── address: PostalAddress
│     ├── openingHours: OpeningHoursEntry[7]
│     ├── specialHours?: SpecialHoursNotice[]
│     ├── socialLinks: SocialLink[]
│     └── reviewSummary: ReviewSummary ──► usado por Hero (prova), Testimonials, JSON-LD
├── navigation: NavItem[] ──────────── referencia SectionId
├── hero: HeroContent ──────────────── trustSignals: TrustSignal[2..3]
├── about: AboutContent ────────────── team: TeamMember[], gallery: ImageAsset[]
├── differentials: Differential[4..6]
├── services: Service[] ────────────── whatsappMessage → ContactLinks
├── products: ProductsContent ──────── items: FeaturedProduct[4..8], brands: Brand[]
├── testimonials: Testimonial[3..6] ── depende de business.reviewSummary
├── faq: FaqItem[6..10] ────────────── também alimenta JSON-LD FAQPage
└── privacy: PrivacyContent ────────── página /privacidade/
```

Todas as exibições de nome, endereço, telefone e WhatsApp derivam de `business` (FR-022). Nenhuma
seção armazena cópia desses dados.

---

## Entidades

### SiteConfig

| Campo | Tipo | Regras |
|---|---|---|
| `url` | `string` | URL absoluta HTTPS sem barra final (ex.: `https://www.exemplo.com.br`). Base de canonical, OG, sitemap, JSON-LD. |
| `locale` | `'pt-BR'` | Fixo; vai para `<html lang>` e `og:locale` (`pt_BR`). |
| `defaultOgImage` | `string` | Caminho em `public/` (1200×630, JPG). |
| `defaultOgImageAlt` | `string` | Texto alternativo de `og:image:alt`. |
| `backgroundColor` | `string` | Igual ao token `--background` (manifest). |
| `themeColor` | `string` | Igual ao token de cor primária. |

### Business (Negócio) — fonte única

| Campo | Tipo | Regras |
|---|---|---|
| `tradeName` | `string` | Nome fantasia; idêntico em todo o site e no JSON-LD. |
| `legalName` | `string` | Razão social (rodapé). |
| `cnpj` | `string` | Formato `00.000.000/0000-00`; 14 dígitos válidos. |
| `foundingYear` | `number` | ≤ ano atual; "anos de atuação" é **calculado**, nunca digitado. |
| `address` | `PostalAddress` | Ver abaixo. |
| `geo` | `{ latitude: number; longitude: number }` | Decimal, ≥ 5 casas. |
| `phone` | `PhoneNumber` | E.164 (`+55DDNNNNNNNNN`) + forma de exibição. |
| `whatsapp` | `PhoneNumber` | E.164; usado em `wa.me`. |
| `email` | `string` | E-mail válido do domínio do negócio, se houver. |
| `whatsappResponseNote` | `string` | Ex.: "Respondemos de seg. a sáb., a partir das 8h" (FR-024). |
| `openingHours` | `OpeningHoursEntry[]` | Exatamente 7 entradas, uma por dia, ordem seg→dom. |
| `specialHours` | `SpecialHoursNotice[]?` | Avisos de feriado/horário especial (edge case). |
| `priceRange` | `string` | Ex.: `"$$"` (JSON-LD). |
| `googleBusinessProfileUrl` | `string` | URL HTTPS do perfil (JSON-LD `sameAs`/`hasMap`, link "Ver todas as avaliações"). |
| `mapsDirectionsQuery` | `string` | Destino usado no link "Como chegar" (endereço ou place id). |
| `mapEmbedUrl` | `string` | URL de incorporação do mapa (carregado só após clique). |
| `mapPreview` | `ImageAsset` | Imagem estática da fachada do mapa. |
| `socialLinks` | `SocialLink[]` | Instagram, Facebook etc. |
| `reviewSummary` | `ReviewSummary` | Nota média e total. |
| `areasServed` | `string[]` | Bairros atendidos (FR-030; JSON-LD `areaServed`). |
| `logo` | `ImageAsset` | SVG preferencialmente. |

**PostalAddress**: `street`, `number`, `complement?`, `neighborhood`, `city`, `state` (UF, 2 letras),
`postalCode` (`00000-000`), `country` (`'BR'`). Função derivada `formatAddress()` gera a única
string de endereço exibida.

**PhoneNumber**: `e164` (`/^\+55\d{10,11}$/`), `display` (ex.: `(11) 98765-4321`). `display` deve
corresponder aos dígitos de `e164`.

**OpeningHoursEntry**: `day` (`'monday' … 'sunday'`), `opens` e `closes` (`HH:MM`, 24h) ou
`closed: true`. `opens < closes`. Rótulo PT-BR derivado do `day`.

**SpecialHoursNotice**: `date` (ISO), `label` (ex.: "Feriado de 15/11"), `opens?`/`closes?`/`closed?`,
`validUntil` (ISO; aviso some após a data, no próximo build).

**ReviewSummary**: `ratingValue` (1,0–5,0, uma casa), `reviewCount` (inteiro ≥ 0), `source`
(`'Google'`), `referenceDate` (ISO — CR-007), `url`.

**SocialLink**: `network` (`'instagram' | 'facebook' | 'tiktok' | 'youtube'`), `url` (HTTPS),
`handle`.

### NavItem

| Campo | Tipo | Regras |
|---|---|---|
| `label` | `string` | Curto (Sobre, Serviços, Produtos, Avaliações, Dúvidas, Contato — FR-002). |
| `sectionId` | `SectionId` | União literal: `'inicio' \| 'sobre' \| 'diferenciais' \| 'servicos' \| 'produtos' \| 'avaliacoes' \| 'duvidas' \| 'contato'`. Gera `href="#<id>"` (FR-004). |

### HeroContent

| Campo | Tipo | Regras |
|---|---|---|
| `title` | `string` | O h1 único; contém serviço + localidade + espécie (CR-003). |
| `subtitle` | `string` | Benefício em 1–2 frases. |
| `image` | `ImageAsset` | Foto real; LCP. Variantes mobile/desktop permitidas. |
| `trustSignals` | `TrustSignal[]` | 2 a 3 itens (FR-015). |
| `primaryCta` | `CtaContent` | "Agendar pelo WhatsApp". |
| `secondaryCta` | `CtaContent` | "Ver serviços" → `#servicos`. |

**TrustSignal**: `kind` (`'rating' | 'yearsActive' | 'petsServed' | 'custom'`), `value`, `label`,
`referenceDate`. Para `rating` e `yearsActive`, o valor é **derivado** de `business` (não digitado).

**CtaContent**: `label` (descreve ação + canal — FR-010), `intent`
(`'whatsapp' | 'phone' | 'directions' | 'anchor' | 'external'`), `whatsappMessage?`,
`target?` (SectionId ou URL), `trackingContext` (ver contrato de eventos).

### AboutContent

| Campo | Tipo | Regras |
|---|---|---|
| `heading` | `string` | h2. |
| `story` | `string[]` | Parágrafos curtos (≤ 3–4 linhas no mobile — CR-004); menciona cidade/bairros (FR-030). |
| `mission` | `string` | Linguagem concreta. |
| `gallery` | `ImageAsset[]` | Fotos reais do espaço (FR-017). |
| `team` | `TeamMember[]` | ≥ 1. |

**TeamMember (Membro da equipe)**: `id`, `name`, `role`, `qualifications: string[]`
(certificações), `photo: ImageAsset`, `professionalRegistry?` (ex.: CRMV, obrigatório se
veterinário).

### Differential (Diferencial)

| Campo | Tipo | Regras |
|---|---|---|
| `id` | `string` | — |
| `title` | `string` | Afirmação concreta (FR-018); sem superlativos sem prova (CR-005). |
| `description` | `string` | Explica como funciona. |
| `evidence` | `string` | A prova verificável (ex.: "Certificação X, 2024"). |
| `icon` | `IconName` | Nome de ícone Lucide permitido (lista fechada) **ou** `image: ImageAsset`. |

Cardinalidade da seção: 4 a 6.

### Service (Serviço)

| Campo | Tipo | Regras |
|---|---|---|
| `id` / `slug` | `string` | Slug reservado para futura página do serviço. |
| `name` | `string` | — |
| `description` | `string` | Menciona localidade quando natural (FR-030). |
| `species` | `('dog' \| 'cat')[]` | ≥ 1. |
| `sizes` | `('small' \| 'medium' \| 'large' \| 'giant')[]` | ≥ 1; rótulos PT-BR derivados. |
| `includes` | `string[]` | ≥ 1. |
| `durationMinutes` | `{ min: number; max: number }` | `min ≤ max`; exibido como faixa. |
| `priceFrom` | `number` | Em reais, > 0; formatado com `Intl.NumberFormat('pt-BR', {style:'currency',currency:'BRL'})`. |
| `priceFactors` | `string[]` | ≥ 1 (ex.: porte, pelagem, estado dos nós) — edge case "preço variável". |
| `image` | `ImageAsset` | Foto real. |
| `whatsappMessage` | `string` | Deve citar `name` (US2/AC2). |

### ProductsContent / FeaturedProduct (Produto/Categoria em destaque)

`ProductsContent`: `heading`, `intro`, `items: FeaturedProduct[]` (4 a 8), `brands: Brand[]` (≥ 1,
FR-014), `purchaseNote` (retirada/entrega, área e condições).

| Campo (FeaturedProduct) | Tipo | Regras |
|---|---|---|
| `id` | `string` | — |
| `kind` | `'product' \| 'category'` | — |
| `name` | `string` | — |
| `category` | `string` | Ex.: "Rações", "Petiscos". |
| `usage` | `string` | Indicação de uso/público (FR-013). |
| `brand?` | `string` | — |
| `image` | `ImageAsset` | Foto real. |
| `purchaseOptions` | `('pickup' \| 'delivery')[]` | ≥ 1. |
| `whatsappMessage` | `string` | Cita o produto/categoria; pede **consulta de disponibilidade** (edge case "sem estoque"). |

**Brand**: `name`, `logo?: ImageAsset`.

### Testimonial (Depoimento)

| Campo | Tipo | Regras |
|---|---|---|
| `id` | `string` | — |
| `authorName` | `string` | Nome ou nome + inicial do sobrenome (FR-016). |
| `rating` | `1 \| 2 \| 3 \| 4 \| 5` | Exibido com texto ("Nota 5 de 5"), não só estrelas (XR-005). |
| `text` | `string` | Texto real, sem edição de sentido (CR-006). |
| `source` | `'Google' \| 'Facebook' \| 'Instagram'` | — |
| `date` | `string` (ISO) | — |
| `sourceUrl?` | `string` | Link para a avaliação, se público. |

Cardinalidade: 3 a 6. Seção usa `business.reviewSummary` para nota média/total e link da fonte.

### FaqItem (Pergunta frequente)

`id`, `question` (termina com "?"), `answer: string[]` (um item por parágrafo). Cardinalidade: 6 a 10. Usado na UI e no JSON-LD `FAQPage` (texto idêntico).

### PrivacyContent

`title`, `lastUpdated` (ISO), `controller` (derivado de `business.legalName`/`cnpj`),
`sections: { heading: string; paragraphs: string[] }[]`, `contactEmail` (derivado de `business`).

### ImageAsset

| Campo | Tipo | Regras |
|---|---|---|
| `sources` | `{ type: 'image/avif' \| 'image/webp' \| 'image/jpeg' \| 'image/png'; srcSet: string }[]` | Gerados pelo `vite-imagetools` (ordem AVIF → WebP → JPEG). |
| `fallback` | `{ src: string; srcSet?: string }` | JPG/PNG. |
| `width` / `height` | `number` | Intrínsecos; obrigatórios (CLS). |
| `alt` | `string` | Descritivo; `''` somente se decorativa. |

---

## Estados

Conteúdo não tem transições de estado em tempo de execução. Os únicos estados de UI são locais
aos componentes interativos:

| Componente | Estados | Transições |
|---|---|---|
| Menu mobile (`Sheet`) | fechado → aberto → fechado | Abre por toque/Enter/Espaço no botão; fecha por `Esc`, botão fechar, clique fora ou seleção de item (FR-003). Foco retorna ao gatilho. |
| Item do FAQ (`Accordion`) | recolhido ↔ expandido | Por toque/Enter/Espaço; vários podem ficar abertos (FR-019). |
| Fachada do mapa | prévia → mapa interativo | Clique em "Ver mapa interativo"; irreversível na sessão. Falha do iframe mantém endereço e "Como chegar" visíveis. |
| Botão flutuante de WhatsApp (mobile) | visível ↔ oculto | Oculto quando o CTA do hero ou a seção de contato estão na viewport (FR-008); `IntersectionObserver`. |

## Regras de consistência (verificadas na revisão e em `check:content`)

1. NAP só existe em `business`; busca por telefone/endereço literais fora de `src/content/business.ts`
   deve retornar zero ocorrências.
2. Nota média e total exibidos no hero, nos depoimentos e no JSON-LD vêm de `reviewSummary`.
3. "Anos de atuação" = ano do build − `foundingYear`.
4. Texto do FAQ na UI e no JSON-LD é o mesmo objeto.
5. Nenhum valor contém `PENDENTE:` no build de produção.
