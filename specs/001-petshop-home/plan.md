# Implementation Plan: Home Page Comercial do Petshop

**Branch**: `001-petshop-home` | **Date**: 2026-10-12 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-petshop-home/spec.md`

## Summary

Home page comercial de página única (10 blocos: cabeçalho, hero, sobre, diferenciais, serviços,
produtos, depoimentos, FAQ, contato, rodapé) + página estática de aviso de privacidade, com o
objetivo de converter visitantes locais em agendamentos pelo WhatsApp.

Abordagem técnica: **React 19 + Vite 8 + TypeScript + Tailwind CSS 4 + shadcn/ui (Radix)**, com
**pré-renderização estática no build (SSG)** via `react-dom/static` e hidratação no cliente. Todo
o conteúdo, os títulos, os links de contato (`wa.me`, `tel:`, mapa) e o JSON-LD `PetStore`/`FAQPage`
estão no HTML inicial — o que atende SEO local e LCP ≤ 2,5 s sem trocar a stack por um framework.
O conteúdo vive em arquivos TypeScript tipados atrás de um carregador assíncrono
(`loadSiteContent`), e as seções são apresentacionais (recebem dados por props), de modo que a
troca futura por um CMS altera apenas a camada de dados. Detalhes e alternativas em
[research.md](./research.md).

## Technical Context

**Language/Version**: TypeScript 6.0.3 (o 7.0.2 é incompatível com `typescript-eslint` — R-01);
Node.js 24 LTS para build.

**Primary Dependencies**: React/React DOM 19.3, Vite 8.3 + `@vitejs/plugin-react` 6.1,
Tailwind CSS 4.3 (`@tailwindcss/vite`), shadcn CLI 4.21 + `radix-ui` 1.8, `lucide-react`,
`class-variance-authority`, `clsx`, `tailwind-merge`, `tw-animate-css`, `vite-imagetools` 12,
`@fontsource-variable/plus-jakarta-sans`. Dev: ESLint 9.39 (o 10 é incompatível com `jsx-a11y` —
R-01), `typescript-eslint`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react-hooks`, Prettier +
`prettier-plugin-tailwindcss`, `html-validate`. Versões exatas confirmadas no momento da
instalação (última estável respeitando a janela de maturidade de R-12).

**Storage**: N/A — conteúdo estático tipado em `src/content/` (fonte única de verdade, NAP incluso).

**Testing**: **Nenhum teste automatizado** (proibido pela constituição, Princípio X). Qualidade via
verificações estáticas (`typecheck`, `lint`, `format:check`, `check:content`, `validate:html`) e
portões manuais roteirizados em [quickstart.md](./quickstart.md).

**Target Platform**: navegadores modernos (2 últimas versões de Chrome, Safari/iOS, Firefox, Edge,
Chrome Android); saída 100% estática (`dist/`) em host com HTTPS e cabeçalhos customizados
(recomendado Cloudflare Pages ou Netlify — R-13).

**Project Type**: site web estático (frontend único, sem backend).

**Performance Goals**: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 em mobile 4G; Lighthouse mobile ≥ 90
nas 4 categorias. Orçamentos (gzip): JS inicial ≤ 120 KB, CSS ≤ 25 KB, imagem LCP ≤ 120 KB,
fonte ≤ 50 KB.

**Constraints**: mobile-first (360px), 320–1920px sem rolagem horizontal, zoom 200%, WCAG 2.2 AA,
≤ 2 famílias tipográficas, sem valores visuais fora dos tokens, sem pop-ups/carrosséis automáticos,
CSP estrita (`script-src 'self'`), nenhum segredo, LGPD (sem cookies de terceiros sem ação do
usuário), conteúdo `PENDENTE:` bloqueia o build de produção.

**Scale/Scope**: 2 páginas (`/`, `/privacidade/`), 8 seções de conteúdo + header/footer, ~25
componentes próprios + 6 componentes shadcn, ~20–40 imagens de origem.

**Pendências de negócio (não bloqueiam o plano; bloqueiam a publicação)**: domínio definitivo,
provedor de analytics sem cookies, todo o conteúdo real listado em "Dependência" na spec.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Princípio | Como o plano atende | Status |
|---|---|---|---|
| I | Objetivo de negócio | Cada seção mapeia o objetivo da tabela da spec; CTAs medidos por eventos ([analytics-events.md](./contracts/analytics-events.md)). Formulário **não** implementado por falta de objetivo (R-08); dark mode, carrosséis, animações decorativas descartados. | ✅ |
| II | Confiança com prova visível | Hero com provas derivadas de `business.reviewSummary`/`foundingYear`; depoimentos com origem e link; equipe com nome/função/certificação; fotos reais obrigatórias pelo tipo `ImageAsset` + revisão. | ✅ |
| III | Conversão e CTAs | `WhatsAppButton`/`PhoneLink`/`DirectionsLink` nativos com mensagens contextuais ([contact-links.md](./contracts/contact-links.md)); header sticky + botão flutuante mobile (1 toque); rótulos ação + canal. | ✅ |
| IV | Mobile-first e clareza | Estilos base para 360px e `sm/md/lg` progressivos; alvos ≥ 44px no `cva` do `Button`; texto base 16px; `motion-safe`; validação V1/V7. | ✅ |
| V | Design consistente | Tokens únicos em `src/styles/tokens.css` via `@theme`; valores arbitrários, `style={}` e `!important` proibidos; componentes shadcn + `shared/` únicos por função. | ✅ |
| VI | Conteúdo real, sem placeholder | Marcador `PENDENTE:` + `check:content` no `build`; NAP só em `business.ts`; valores derivados calculados. | ✅ |
| VII | SEO local e semântica | SSG com head completo, canonical, OG, `PetStore` + `FAQPage`, `sitemap.xml`, `robots.txt`, um h1 e h2 por seção, landmarks semânticos ([seo-head.md](./contracts/seo-head.md)). | ✅ |
| VIII | Acessibilidade | Radix (foco/teclado/ARIA), `eslint-plugin-jsx-a11y`, skip link, `RatingStars` com texto, foco visível por token, validação V8. | ✅ |
| IX | Performance | HTML pré-renderizado; imagens AVIF/WebP com `width`/`height` e lazy; hero `fetchPriority="high"`; 1 família de fonte auto-hospedada com preload; mapa por fachada; analytics adiado; orçamentos de bundle. | ✅ |
| X | Código limpo e sustentável | Camadas com regra de dependência ([component-api.md](./contracts/component-api.md)); sem roteador/framework/CMS sem necessidade; **sem testes automatizados**; ESLint + Prettier padronizados. | ✅ |
| — | Segurança (Padrões) | HTTPS, CSP e cabeçalhos ([security-headers.md](./contracts/security-headers.md)), `ExternalLink` com `noopener noreferrer`, sem segredos, lockfile + `minimumReleaseAge` + bloqueio de scripts de instalação. | ✅ |
| — | Fluxo / portões | Os 6 portões manuais da constituição estão roteirizados em [quickstart.md](./quickstart.md) (V1–V10). Tasks não incluirão testes. | ✅ |

**Resultado pré-pesquisa**: aprovado, sem violações. Complexidades adicionais (script de
pré-renderização, duas exceções de versão) justificadas em Complexity Tracking.

**Re-check pós-design (Phase 1)**: aprovado. O design não introduziu dependências além das
listadas; formulários e analytics ficaram como contratos sem implementação até haver requisito
concreto; nenhuma seção importa conteúdo diretamente (fronteira de dados preservada).

## Arquitetura

### Fluxo de build e execução

```text
src/content/*.ts ──► loadSiteContent() ──┐
                                         ▼
                 vite build --ssr ─► entry-server.tsx: render(route, content) ──► HTML do corpo
                                         │
scripts/prerender.ts ── para cada rota ──┤── buildHead(route, content) ──► title/meta/OG/JSON-LD
                                         ▼
                      dist/index.html · dist/privacidade/index.html · dist/sitemap.xml
                                         │
navegador ── HTML completo (conteúdo + links funcionais) ──► entry-client.tsx: hydrateRoot
                                         └─► interatividade: menu, FAQ, mapa, botão flutuante, analytics
```

### Organização por responsabilidade

| Camada | Pasta | Responsabilidade | Pode importar de |
|---|---|---|---|
| App | `src/app/` | Entradas cliente/servidor, registro de rotas | `pages`, `content`, `styles` |
| Páginas | `src/pages/` | Compor layout + seções para uma rota; recebe `SiteContent` | `layout`, `sections`, `types` |
| Layout | `src/layout/` | Estrutura persistente: header, nav mobile, footer, skip link, WhatsApp flutuante | `components`, `lib`, `types` |
| Seções | `src/sections/<secao>/` | Uma seção da home + subcomponentes exclusivos dela | `components`, `lib`, `types` |
| Compartilhados | `src/components/shared/` | Blocos de domínio reutilizáveis (Section, ResponsiveImage, WhatsAppButton…) | `components/ui`, `lib`, `types` |
| UI base | `src/components/ui/` | Componentes shadcn (código gerado pela CLI) | `lib/utils` |
| Conteúdo | `src/content/` | Dados estáticos tipados + carregador | `types`, `assets` |
| Tipos | `src/types/` | Contrato de conteúdo e tipos de domínio | — |
| Lib | `src/lib/`, `src/hooks/` | Funções puras (links, formatação, analytics) e hooks | `types` |
| SEO | `src/seo/` | Head e JSON-LD (funções puras usadas no build) | `lib`, `types` |
| Estilos | `src/styles/` | Tokens e estilos globais | — |

### Estratégia de componentes reutilizáveis

1. **Três níveis**: `ui` (genérico, shadcn) → `shared` (domínio petshop, sem saber de qual seção) →
   subcomponente local da seção. Promoção para `shared` somente no segundo uso real.
2. **Composição sobre configuração**: `Button asChild` para links; `Section` + `SectionHeading`
   padronizam toda seção (id, `aria-labelledby`, espaçamento, `scroll-margin`).
3. **Variantes com `cva`** dentro do componente (ex.: `Button` `variant: primary | secondary |
   ghost | whatsapp`, `size: md | lg | icon`, todos ≥ 44px). Nenhuma variante "na mão" via classes
   soltas nas seções.
4. **Componentes de conversão encapsulam regras de negócio**: só `WhatsAppButton`/`PhoneLink`/
   `DirectionsLink`/`ExternalLink` criam esses links — garantindo formato, `rel`, rastreamento e
   rótulos acessíveis em um só lugar.
5. Contrato completo em [contracts/component-api.md](./contracts/component-api.md).

### Organização dos estilos

- Tailwind v4 CSS-first: `src/styles/globals.css` importa Tailwind, `tw-animate-css` e
  `tokens.css`; tokens semânticos do shadcn (`--primary`, `--muted`…) + tokens do projeto
  (`--header-height`, escala tipográfica fluida, sombras) mapeados com `@theme inline`.
- Mobile-first: classes sem prefixo = 360px; `sm:`/`md:`/`lg:`/`xl:` só adicionam.
- Proibidos: valores arbitrários `[…]`, `style={}`, `!important`, cores fora dos tokens. Prettier
  ordena classes; revisão de PR verifica a regra.
- Paleta e contraste definidos e verificados uma vez nos tokens (≥ 4.5:1 / 3:1). Detalhes em
  [research.md R-07](./research.md#r-07-estilos-e-design-tokens).

### Padronização de tipagem

TypeScript estrito (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
`verbatimModuleSyntax`), `type` em vez de `interface`, uniões literais para domínios fechados
(`SectionId`, espécie, porte, dia, intenção de CTA, `TrackEvent`), conteúdo com
`as const satisfies`, props `XxxProps` exportadas, `any` proibido por lint, valores derivados como
funções. Contrato em [contracts/content-schema.md](./contracts/content-schema.md) e
[data-model.md](./data-model.md).

### Assets e imagens

- Fontes de imagem em `src/assets/images/<secao>/` com nomes descritivos pt-BR; processadas por
  `vite-imagetools` em AVIF/WebP/JPG com larguras por perfil (`hero`, `card`, `portrait`,
  `gallery`) e entregues como `ImageAsset` (com `width`/`height` e `alt`).
- `ResponsiveImage` padroniza `<picture>`, `sizes`, lazy loading e prioridade do LCP; proporções
  fixas por perfil evitam CLS e garantem tratamento uniforme (Princípio V).
- `public/`: `og-image.jpg` (1200×630), `favicon.svg`, `apple-touch-icon.png`, `site.webmanifest`,
  `robots.txt`, `_headers`.
- Logo em SVG inline-safe (sem scripts), importado como arquivo.
- Imagem pendente: arquivo `pendente-<descricao>.jpg` → bloqueado por `check:content`.

### Formulários

Nenhum nesta entrega (canal = WhatsApp/telefone; Princípio I). Estratégia pronta para uso futuro:
shadcn `Field` + React Hook Form + Zod compartilhado cliente/servidor, envio a função serverless
com revalidação, honeypot/rate limit, `aria-live` para confirmação, campos mínimos e aviso LGPD
([research.md R-08](./research.md#r-08-formulários)).

### Segurança

Site estático sem backend nem segredos; CSP estrita e cabeçalhos HTTP; JSON-LD serializado com
escape; `dangerouslySetInnerHTML` proibido; links externos via `ExternalLink`; mapa de terceiro só
após ação do usuário com `sandbox`; cadeia de suprimentos com lockfile, `minimumReleaseAge`,
`onlyBuiltDependencies` e `pnpm audit --prod`; sem source maps públicos
([research.md R-12](./research.md#r-12-segurança), [security-headers.md](./contracts/security-headers.md)).

### Evolução futura

CMS headless → nova implementação de `loadSiteContent` + validação Zod no build (componentes
intactos). Muitas rotas/área logada → migrar `src/app/routes.ts` para um roteador com SSG/SSR.
Loja online → nova feature; `Service.slug` e `FeaturedProduct.id` já reservam identidade
([research.md R-10](./research.md#r-10-evolução-para-cms--painel--dados-dinâmicos)).

### Critérios técnicos de qualidade (Definition of Done)

1. `pnpm validate` verde (typecheck, lint sem avisos, format, `check:content`, build, html-validate).
2. `pnpm audit --prod` sem achados altos/críticos.
3. Orçamentos de bundle e imagem respeitados.
4. Lighthouse mobile ≥ 90 nas 4 categorias; LCP ≤ 2,5 s; CLS ≤ 0,1.
5. Validações manuais V1–V10 do [quickstart.md](./quickstart.md) registradas em `checklists/`.
6. W3C e Teste de Resultados Avançados sem erros; cabeçalhos de segurança presentes em produção.
7. Nenhum placeholder, superlativo sem prova ou NAP divergente.

## Project Structure

### Documentation (this feature)

```text
specs/001-petshop-home/
├── plan.md              # Este arquivo
├── research.md          # Phase 0: decisões e alternativas
├── data-model.md        # Phase 1: contrato de conteúdo (entidades, regras)
├── quickstart.md        # Phase 1: setup e roteiro de validação
├── contracts/           # Phase 1
│   ├── content-schema.md
│   ├── component-api.md
│   ├── contact-links.md
│   ├── seo-head.md
│   ├── analytics-events.md
│   └── security-headers.md
├── checklists/
│   └── requirements.md
└── tasks.md             # Phase 2 (/speckit-tasks — não criado por este comando)
```

### Source Code (repository root)

```text
index.html                      # template com marcadores <!--app-head--> / <!--app-html-->
package.json                    # scripts: dev, build, preview, typecheck, lint, format(:check),
                                #          check:content, validate:html, validate
pnpm-lock.yaml
pnpm-workspace.yaml             # onlyBuiltDependencies, minimumReleaseAge
components.json                 # configuração do shadcn (aliases @/components, @/lib, @/hooks)
vite.config.ts                  # react, tailwindcss, imagetools (presets), alias @, sourcemap off
tsconfig.json / tsconfig.app.json / tsconfig.node.json
eslint.config.js                # flat config: typescript-eslint (type-checked), jsx-a11y, react-hooks
.prettierrc                     # + prettier-plugin-tailwindcss
.htmlvalidate.json
.gitignore                      # node_modules, dist, .env*
.nvmrc                          # 24

public/
├── _headers                    # CSP e cabeçalhos de segurança/cache
├── favicon.svg
├── apple-touch-icon.png
└── og-image.jpg

scripts/
├── prerender.ts                # renderiza rotas, injeta head/JSON-LD; gera sitemap.xml, robots.txt e site.webmanifest
└── check-content.ts            # falha se houver PENDENTE: / pendente-* (CR-009)

src/
├── app/
│   ├── entry-client.tsx        # hydrateRoot conforme data-page; registra analytics
│   ├── entry-server.tsx        # render(route, content) com react-dom/static
│   └── routes.ts               # [{ path: '/', page: 'home' }, { path: '/privacidade/', page: 'privacy' }]
├── pages/
│   ├── home/HomePage.tsx       # PageShell + 8 seções na ordem da spec
│   └── privacy/PrivacyPage.tsx
├── layout/
│   ├── PageShell.tsx
│   ├── SkipLink.tsx
│   ├── SiteHeader.tsx
│   ├── MobileNav.tsx
│   ├── SiteFooter.tsx
│   └── FloatingWhatsApp.tsx
├── sections/
│   ├── hero/HeroSection.tsx
│   ├── about/{AboutSection,TeamMemberCard,SpaceGallery}.tsx
│   ├── differentials/{DifferentialsSection,DifferentialItem}.tsx
│   ├── services/{ServicesSection,ServiceCard}.tsx
│   ├── products/{ProductsSection,ProductCard,BrandList}.tsx
│   ├── testimonials/{TestimonialsSection,TestimonialCard}.tsx
│   ├── faq/FaqSection.tsx
│   └── contact/{ContactSection,MapFacade}.tsx
├── components/
│   ├── ui/                     # shadcn: button, sheet, accordion, card, badge, separator
│   └── shared/
│       ├── Container.tsx
│       ├── Section.tsx
│       ├── SectionHeading.tsx
│       ├── ResponsiveImage.tsx
│       ├── WhatsAppButton.tsx
│       ├── PhoneLink.tsx
│       ├── DirectionsLink.tsx
│       ├── ExternalLink.tsx
│       ├── RatingStars.tsx
│       ├── TrustSignalList.tsx
│       ├── OpeningHoursTable.tsx
│       ├── BusinessAddress.tsx
│       ├── VisuallyHidden.tsx
│       └── icon-map.ts
├── content/
│   ├── index.ts                # loadSiteContent(): Promise<SiteContent>
│   ├── site.ts                 # domínio, locale, OG padrão
│   ├── business.ts             # FONTE ÚNICA de NAP, horários, avaliações agregadas
│   ├── messages.ts             # mensagens padrão de WhatsApp
│   ├── navigation.ts
│   ├── hero.ts
│   ├── about.ts
│   ├── differentials.ts
│   ├── services.ts
│   ├── products.ts
│   ├── testimonials.ts
│   ├── faq.ts
│   └── privacy.ts
├── types/
│   └── content.ts
├── lib/
│   ├── utils.ts                # cn() (shadcn)
│   ├── contact-links.ts        # buildWhatsAppUrl, buildTelUrl, buildDirectionsUrl
│   ├── format.ts               # endereço, moeda, duração, rótulos PT-BR, anos de atuação
│   ├── opening-hours.ts
│   └── analytics.ts            # listener delegado + adaptador no-op
├── hooks/
│   └── use-in-view.ts          # IntersectionObserver (botão flutuante)
├── seo/
│   ├── build-head.ts
│   ├── json-ld.ts
│   └── serialize-json-ld.ts
├── assets/
│   ├── images/{brand,hero,about,team,services,products,contact}/
│   └── (fontes via @fontsource-variable — sem arquivos locais)
└── styles/
    ├── globals.css
    └── tokens.css
```

**Structure Decision**: projeto web único e estático na raiz do repositório (sem `frontend/`
separado, pois não há backend). A árvore separa conteúdo (`content`, `types`), apresentação
(`layout`, `sections`, `components`), regras puras (`lib`, `seo`) e build (`app`, `scripts`),
conforme Princípio X. Não há pasta `tests/` por determinação da constituição.

## Complexity Tracking

> Não há violações da constituição. Itens abaixo registram complexidade adicional justificada
> (exigência do fluxo de qualidade da constituição).

| Complexidade adicional | Por que é necessária | Alternativa mais simples rejeitada porque |
|---|---|---|
| Script de pré-renderização (`scripts/prerender.ts` + build SSR) | SEO local e LCP exigem conteúdo e JSON-LD no HTML inicial (Princípios VII e IX) | SPA pura entrega HTML vazio; framework SSG troca a stack pedida |
| TypeScript 6.0.3 em vez de 7.0.2 | `typescript-eslint` (lint com tipos) não suporta TS 7 | Lint sem tipos perde regras de segurança/qualidade |
| ESLint 9.39.5 em vez de 10.12.0 | `eslint-plugin-jsx-a11y` não suporta ESLint 10; lint de acessibilidade é exigido | Fork 0.x do plugin tem maturidade insuficiente |
| `vite-imagetools` | Formatos modernos e tamanhos responsivos com `width`/`height` (Princípio IX) | Exportar manualmente dezenas de variantes é propenso a erro |
| Fachada de mapa (em vez de iframe direto) | Performance, privacidade (LGPD) e CSP mais estrita | Iframe direto carrega JS e cookies de terceiros sem ação do usuário |
| `style-src 'self' 'unsafe-inline'` na CSP | O `AccordionContent` do Radix emite atributos `style` no HTML pré-renderizado e o `Sheet` (react-remove-scroll) injeta um `<style>` com valores dinâmicos ao abrir o menu; hash/nonce não funcionam para conteúdo dinâmico em site estático | Remover Sheet/Accordion contraria o uso de shadcn; o risco de injeção de CSS é baixo sem conteúdo de usuário e `script-src 'self'` continua estrito |
| Regras estilísticas do html-validate desativadas (`void-style`, `doctype-style`, `attr-case`) | O React emite `<img/>` e atributos em camelCase (`srcSet`, `dateTime`), que são HTML5 válido | Pós-processar o HTML só para estética de sintaxe não traz benefício de qualidade |
