# Contrato: `<head>`, Dados Estruturados e Arquivos de Descoberta

**Arquivos de implementação**: `src/seo/build-head.ts`, `src/seo/json-ld.ts`,
`src/seo/serialize-json-ld.ts`, `scripts/prerender.ts` |
**Requisitos**: FR-022, FR-025…FR-029, Princípio VII

## Documento base (`index.html`)

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!--app-head-->
  </head>
  <body>
    <div id="root" data-page="<!--app-page-->"><!--app-html--></div>
    <script type="module" src="/src/app/entry-client.tsx"></script>
  </body>
</html>
```

Sem `maximum-scale`/`user-scalable=no` (zoom 200% — XR-005).

## Tags geradas por página (`buildHead(page, content)`)

| Tag | Home (`/`) | Privacidade (`/privacidade/`) |
|---|---|---|
| `<title>` | `<Serviço principal> em <Bairro>, <Cidade> \| <tradeName>` (≤ 60 caracteres) | `Aviso de privacidade \| <tradeName>` |
| `meta description` | Serviço + espécie + localidade + CTA, 140–160 caracteres | Resumo do aviso |
| `link rel=canonical` | `${site.url}/` | `${site.url}/privacidade/` |
| `meta robots` | `index, follow` | `index, follow` |
| `meta theme-color` | `site.themeColor` | idem |
| `og:type` / `og:locale` / `og:site_name` | `website` / `pt_BR` / `tradeName` | idem |
| `og:title` / `og:description` / `og:url` | iguais a title/description/canonical | idem |
| `og:image` (+ `:width` 1200, `:height` 630, `:alt`) | URL absoluta de `site.defaultOgImage` | idem |
| `twitter:card` | `summary_large_image` | idem |
| `link rel=icon` / `apple-touch-icon` / `manifest` | `favicon.svg`, `apple-touch-icon.png` (180×180), `site.webmanifest` | idem |
| `link rel=preload` (fonte) | woff2 latin da família principal, `crossorigin` | idem |
| JSON-LD | `PetStore` + `FAQPage` | — |

## JSON-LD `PetStore` (home)

```json
{
  "@context": "https://schema.org",
  "@type": "PetStore",
  "@id": "<site.url>/#negocio",
  "name": "<business.tradeName>",
  "legalName": "<business.legalName>",
  "url": "<site.url>/",
  "logo": "<url absoluta do logo>",
  "image": ["<url absoluta da foto do hero>", "<fotos do espaço>"],
  "telephone": "<business.phone.e164>",
  "email": "<business.email>",
  "priceRange": "<business.priceRange>",
  "foundingDate": "<business.foundingYear>",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "<street>, <number> <complement>",
    "addressLocality": "<city>",
    "addressRegion": "<state>",
    "postalCode": "<postalCode>",
    "addressCountry": "BR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 0, "longitude": 0 },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "https://schema.org/Monday", "opens": "08:00", "closes": "18:00" }
  ],
  "areaServed": ["<bairro 1>", "<bairro 2>"],
  "hasMap": "<business.googleBusinessProfileUrl>",
  "sameAs": ["<googleBusinessProfileUrl>", "<redes sociais>"],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "<reviewSummary.ratingValue>",
    "reviewCount": "<reviewSummary.reviewCount>",
    "bestRating": "5"
  }
}
```

Regras:
- Gerado da **mesma** instância de `business` usada na UI (FR-022). Dias fechados são omitidos de
  `openingHoursSpecification`; `specialHours` vigentes viram entradas com `validFrom`/`validThrough`.
- `aggregateRating` só é emitido se `reviewCount > 0` (FR-027 "quando houver"). Avaliações de
  terceiros (Google) **não** são emitidas como `review` próprios, para não violar as diretrizes de
  avaliações auto-servidas; ficam só visíveis na UI.
- Serialização: `JSON.stringify` + substituição de `<` → `<`, `>` → `>`,
  `&` → `&`, `U+2028`/`U+2029` escapados. Inserido como
  `<script type="application/ld+json">` pelo script de build, nunca via
  `dangerouslySetInnerHTML`.

## JSON-LD `FAQPage` (home)

`mainEntity`: um `Question` por `FaqItem` com `acceptedAnswer.text` idêntico à resposta visível
(FR-028).

## Arquivos de descoberta

- `dist/client/robots.txt`: gerado por `scripts/prerender.ts` a partir de `site.url` (`User-agent: *` / `Allow: /` / `Sitemap: <site.url>/sitemap.xml`).
- `dist/sitemap.xml`: gerado por `scripts/prerender.ts` a partir de `src/app/routes.ts` com
  `<lastmod>` = data do build.
- `dist/client/site.webmanifest`: gerado por `scripts/prerender.ts` a partir de `business.tradeName` e `site` (`name`, `short_name`, `icons`, `theme_color`, `background_color`), para não duplicar o nome fora da fonte única.

## Hierarquia de títulos (FR-026)

```text
h1  Hero (único na página)
h2  Sobre · Diferenciais · Serviços · Produtos · Avaliações · Dúvidas · Contato
h3  Nome do serviço / produto / membro da equipe / diferencial / pergunta do FAQ
```

Cabeçalho e rodapé não usam `h1`/`h2` para logo ou rótulos de coluna (rodapé usa `h2`
visualmente pequeno apenas se agrupar navegação, mantendo a ordem sem saltos).
