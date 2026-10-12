---

description: "Lista de tarefas da home page comercial do petshop"
---

# Tasks: Home Page Comercial do Petshop

**Input**: Design documents from `/specs/001-petshop-home/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md),
[data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: **Nenhuma tarefa de teste automatizado** — proibido pela constituição (Princípio X e
"Listas de tarefas MUST NOT incluir criação de testes automatizados"). A verificação é feita por
scripts estáticos (`typecheck`, `lint`, `check:content`, `validate:html`) e pelos cenários manuais
V1–V10 do [quickstart.md](./quickstart.md).

**Formulário de contato**: **fora do escopo** por decisão do usuário (2026-10-12) — a spec não tem
requisito de formulário; o canal é WhatsApp/telefone/mapa. A estratégia futura está em
[research.md R-08](./research.md#r-08-formulários). Nenhuma tarefa abaixo cria formulário.

**Organization**: tarefas agrupadas por user story (spec.md) para implementação e validação
incrementais.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: pode rodar em paralelo (arquivos diferentes, sem dependência de tarefa incompleta)
- **[Story]**: user story atendida (US1…US6)
- Todos os caminhos são relativos à **raiz do repositório** (o projeto é criado na raiz, ao lado de
  `.specify/` e `specs/`; não existe pasta `frontend/`).

## Regras válidas para TODAS as tarefas

- Estilização apenas com utilitários Tailwind que referenciam tokens de `src/styles/tokens.css`;
  **proibidos** valores arbitrários (`[…]`), `style={}`, `!important` e cores fora dos tokens.
- Seções e componentes **não importam** de `src/content/`; recebem dados por props
  ([component-api.md](./contracts/component-api.md)).
- Links de WhatsApp/telefone/mapa/externos **somente** via `WhatsAppButton`, `PhoneLink`,
  `DirectionsLink`, `ExternalLink`.
- Conteúdo ainda não fornecido pelo cliente usa o marcador literal `PENDENTE: <o que falta>`;
  nunca inventar dados, depoimentos, números ou fotos (CR-001, CR-006, CR-007).
- `dangerouslySetInnerHTML`, `eval`, `innerHTML` proibidos.
- Ao concluir cada tarefa: `pnpm typecheck && pnpm lint` sem erros.

---

## Phase 1: Setup (Infraestrutura do projeto na raiz)

**Purpose**: criar o projeto React + Vite + TypeScript + Tailwind + shadcn na raiz do repositório,
com ferramentas de qualidade e segurança da cadeia de suprimentos.

- [X] T001 Garantir Node.js 24 LTS ativo (`node -v` deve retornar v24.x; a máquina está em 20.20.2) e criar `.nvmrc` na raiz com o conteúdo `24`; habilitar pnpm via `corepack enable` e registrar a versão retornada por `pnpm -v`
- [X] T002 Criar `package.json` na raiz manualmente (não usar `pnpm create vite`, pois a raiz já contém `.specify/`, `.claude/` e `specs/`) com `"name": "petshop-site"`, `"private": true`, `"type": "module"`, `"engines": { "node": ">=24" }` e `"packageManager": "pnpm@<versão do T001>"`
- [X] T003 Criar `pnpm-workspace.yaml` na raiz com `minimumReleaseAge: 1440` e `onlyBuiltDependencies` listando apenas os pacotes que precisam de script de instalação (`sharp`, `@tailwindcss/oxide`, `esbuild`); confirmar os nomes exigidos pela saída de `pnpm install` (research R-12)
- [X] T004 Instalar dependências de runtime na última versão estável (`pnpm add`): `react`, `react-dom`, `radix-ui`, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `@fontsource-variable/plus-jakarta-sans` — conferir `pnpm view <pacote> version` antes e registrar as versões resolvidas em `package.json`
- [X] T005 Instalar dependências de desenvolvimento (`pnpm add -D`) na última versão estável: `vite`, `@vitejs/plugin-react`, `tailwindcss`, `@tailwindcss/vite`, `tw-animate-css`, `vite-imagetools`, `@types/react`, `@types/react-dom`, `@types/node`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`, `globals`, `prettier`, `prettier-plugin-tailwindcss`, `html-validate`; e com as **duas exceções** de research R-01: `typescript@~6.0` (não 7.x) e `eslint@^9` (não 10.x), atualizando `package.json`
- [X] T006 Criar `tsconfig.json` (references), `tsconfig.app.json` (inclui `src/`; `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`, `noImplicitOverride`, `jsx: react-jsx`, `moduleResolution: bundler`, `paths: { "@/*": ["./src/*"] }`, `types: ["vite/client", "vite-imagetools/client"]` conforme a doc do imagetools) e `tsconfig.node.json` (inclui `vite.config.ts` e `scripts/`) na raiz
- [X] T007 Criar `vite.config.ts` na raiz com plugins `react()`, `tailwindcss()` e `imagetools()` com presets nomeados `hero` (larguras 480, 768, 1280, 1920), `card` (360, 540, 720), `portrait` (240, 480), `gallery` (480, 960), todos gerando `avif;webp;jpg` com saída `picture`; alias `@` → `src`; `build.sourcemap: false`
- [X] T008 Criar `index.html` na raiz exatamente conforme "Documento base" de [contracts/seo-head.md](./contracts/seo-head.md): `<html lang="pt-BR">`, `meta charset`, `meta viewport` (`width=device-width, initial-scale=1`, sem `maximum-scale`), marcador `<!--app-head-->`, `<div id="root" data-page="<!--app-page-->"><!--app-html--></div>` e `<script type="module" src="/src/app/entry-client.tsx">`
- [X] T009 [P] Criar `eslint.config.js` (flat config) na raiz: `typescript-eslint` `strictTypeChecked` + `stylisticTypeChecked` com `parserOptions.projectService`, `eslint-plugin-jsx-a11y` `flatConfigs.strict`, `eslint-plugin-react-hooks` recomendado; regras extras: `@typescript-eslint/no-explicit-any: error`, `@typescript-eslint/consistent-type-definitions: ["error", "type"]`, `react/no-danger` equivalente via `no-restricted-syntax` para `dangerouslySetInnerHTML`, `no-restricted-imports` impedindo `@/content/*` em `src/sections/**`, `src/layout/**` e `src/components/**`; ignorar `dist/`
- [X] T010 [P] Criar `.prettierrc` (com `prettier-plugin-tailwindcss` e `tailwindStylesheet: "./src/styles/globals.css"`) e `.prettierignore` (`dist`, `pnpm-lock.yaml`, `specs`, `.specify`) na raiz
- [X] T011 [P] Criar `.htmlvalidate.json` na raiz estendendo `html-validate:recommended` e `html-validate:a11y`
- [X] T012 [P] Criar `.gitignore` na raiz com `node_modules/`, `dist/`, `.env`, `.env.*`, `*.local`, `.DS_Store`
- [X] T013 Adicionar scripts em `package.json`: `dev` (`vite`), `build` (`pnpm check:content && vite build --outDir dist/client && vite build --ssr src/app/entry-server.tsx --outDir dist/server && node scripts/prerender.ts`), `preview` (`vite preview --outDir dist/client`), `typecheck` (`tsc -b --noEmit`), `lint` (`eslint . --max-warnings 0`), `format` / `format:check` (prettier), `check:content` (`node scripts/check-content.ts`), `validate:html` (`html-validate "dist/client/**/*.html"`), `validate` (typecheck → lint → format:check → build → validate:html) — se o diretório final for alterado, manter `preview`, `validate:html` e `scripts/prerender.ts` coerentes
- [X] T014 Criar a árvore de pastas vazia do plano (com `.gitkeep` onde ficar vazia): `src/app`, `src/pages/home`, `src/pages/privacy`, `src/layout`, `src/sections/{hero,about,differentials,services,products,testimonials,faq,contact}`, `src/components/ui`, `src/components/shared`, `src/content`, `src/types`, `src/lib`, `src/hooks`, `src/seo`, `src/styles`, `src/assets/images/{brand,hero,about,team,services,products,contact}`, `scripts`, `public`
- [X] T015 Criar `components.json` na raiz via `pnpm dlx shadcn@latest init` (estilo padrão, base Radix, CSS variables, sem dark mode, `tailwind.css: src/styles/globals.css`, aliases `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`), garantindo que gere `src/lib/utils.ts` com `cn()`; desfazer qualquer arquivo que a CLI crie fora da estrutura do plano
- [X] T016 Adicionar componentes shadcn com `pnpm dlx shadcn@latest add button sheet accordion card badge separator` gerando `src/components/ui/{button,sheet,accordion,card,badge,separator}.tsx`

**Checkpoint**: `pnpm install --frozen-lockfile` e `pnpm typecheck` funcionam.

---

## Phase 2: Foundational (Pré-requisitos bloqueantes)

**Purpose**: design tokens, contrato de conteúdo, fonte única de dados, funções puras, pipeline de
pré-renderização, componentes compartilhados de base e layout base. Nenhuma seção pode começar
antes desta fase.

**⚠️ CRITICAL**: nenhuma user story começa antes desta fase terminar.

### Estilos e design tokens

- [X] T017 Criar `src/styles/tokens.css` com variáveis semânticas shadcn em OKLCH (`--background`, `--foreground`, `--card`, `--card-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--border`, `--input`, `--ring`, `--radius`) com paleta acolhedora (1 primária de marca, 1 destaque para CTA, neutros quentes), mais tokens do projeto: `--header-height`, `--floating-cta-space`, sombras `--shadow-card`; comentar ao lado de cada par texto/fundo a razão de contraste medida (≥ 4.5:1 texto normal, ≥ 3:1 texto grande, bordas e `--ring`); sem tema escuro
- [X] T018 Criar `src/styles/globals.css`: `@import "tailwindcss"`, `@import "tw-animate-css"`, `@import "./tokens.css"`, `@import "@fontsource-variable/plus-jakarta-sans/wght.css"` (apenas subconjunto latin se o pacote oferecer import por subconjunto), `@theme inline` mapeando os tokens para utilitários (cores, `--font-sans: "Plus Jakarta Sans Variable", <fallback ajustado>`, raios, sombras) e escala tipográfica fluida `--text-display`, `--text-h2`, `--text-h3`, `--text-lead` com `clamp()`; `@font-face` de fallback com `size-adjust`/`ascent-override` sobre uma fonte do sistema; `@layer base` com `body` 16px, `[id] { scroll-margin-top: var(--header-height) }`, `html { scroll-behavior: smooth }` somente dentro de `@media (prefers-reduced-motion: no-preference)`, `:focus-visible` com `outline` usando `--ring`
- [X] T019 Ajustar `src/components/ui/button.tsx`: variantes `cva` `variant: default | secondary | outline | ghost | whatsapp` e `size: default | lg | icon`, todas com altura e largura mínimas de 44px (XR-003); registrar no topo do arquivo, em comentário curto, as edições feitas sobre o código gerado pelo shadcn

### Contrato de conteúdo e funções puras

- [X] T020 Criar `src/types/content.ts` com todos os tipos de [data-model.md](./data-model.md) e [contracts/content-schema.md](./contracts/content-schema.md), usando `type` e `Readonly`: `SiteContent`, `SectionId` (`'inicio' | 'sobre' | 'diferenciais' | 'servicos' | 'produtos' | 'avaliacoes' | 'duvidas' | 'contato'`), `SiteConfig`, `Business`, `PostalAddress`, `PhoneNumber`, `OpeningHoursEntry`, `DayOfWeek` (`'monday' … 'sunday'`), `SpecialHoursNotice`, `ReviewSummary`, `SocialLink` (`network: 'instagram' | 'facebook' | 'tiktok' | 'youtube'`), `NavItem`, `HeroContent`, `TrustSignal` (`kind: 'rating' | 'yearsActive' | 'petsServed' | 'custom'`), `CtaContent` (`intent: 'whatsapp' | 'phone' | 'directions' | 'anchor' | 'external'`), `AboutContent`, `TeamMember`, `Differential`, `IconName`, `Service` (`species: ('dog' | 'cat')[]`, `sizes: ('small' | 'medium' | 'large' | 'giant')[]`, `durationMinutes: { min: number; max: number }`), `ProductsContent`, `FeaturedProduct` (`kind: 'product' | 'category'`, `purchaseOptions: ('pickup' | 'delivery')[]`), `Brand`, `Testimonial` (`rating: 1 | 2 | 3 | 4 | 5`, `source: 'Google' | 'Facebook' | 'Instagram'`), `FaqItem`, `PrivacyContent`, `ImageAsset` (`sources: { type: 'image/avif' | 'image/webp'; srcSet: string }[]`, `fallback`, `width`, `height`, `alt`)
- [X] T021 [P] Criar `src/lib/format.ts` com funções puras: `formatAddress(address)` (string única de endereço), `formatCurrencyBRL(value)` via `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`, `formatDurationRange({ min, max })` (ex.: "1h30 a 2h"), `getYearsActive(foundingYear, buildYear)`, rótulos PT-BR `speciesLabel`, `sizeLabel`, `dayLabel`, `purchaseOptionLabel`, `formatRating(value)` (ex.: "4,9")
- [X] T022 [P] Criar `src/lib/contact-links.ts` conforme [contracts/contact-links.md](./contracts/contact-links.md): `buildWhatsAppUrl(phone, message)` → `https://wa.me/<digits>?text=<encodeURIComponent(message)>`, lançando erro se `phone.e164` não casar com `/^\+55\d{10,11}$/` ou se `message` estiver vazia ou tiver mais de 500 caracteres; `buildTelUrl(phone)` → `tel:<e164>`; `buildDirectionsUrl(query)` → `https://www.google.com/maps/dir/?api=1&destination=<encodeURIComponent(query)>`; `buildMailtoUrl(email)`
- [X] T023 [P] Criar `src/lib/opening-hours.ts` com `validateOpeningHours(entries)` (exatamente 7 entradas, ordem seg→dom, `opens < closes` no formato `HH:MM` 24h ou `closed: true`) e `getActiveSpecialHours(notices, buildDate)` (descarta avisos com `validUntil` passado)
- [X] T024 [P] Criar `src/lib/analytics.ts` conforme [contracts/analytics-events.md](./contracts/analytics-events.md): tipo `TrackEvent` (`'whatsapp_click' | 'phone_click' | 'directions_click' | 'map_open' | 'reviews_click' | 'email_click'`), `track(event, { context })` no-op por padrão, e `registerClickTracking()` com um único listener delegado `passive` em `document` que lê `closest('[data-track]')` e nunca bloqueia a navegação nem envia dados pessoais

### Fonte única de conteúdo (stubs tipados)

- [X] T025 Criar `src/content/site.ts` (`SiteConfig`: `url` HTTPS sem barra final — usar `PENDENTE: domínio definitivo` enquanto não houver —, `locale: 'pt-BR'`, `defaultOgImage: '/og-image.jpg'`, `themeColor` igual ao valor de `--primary`) e `src/content/business.ts` (`Business` completo com `as const satisfies Business`; regras: `cnpj` no formato `00.000.000/0000-00`, `phone.e164`/`whatsapp.e164` casando `/^\+55\d{10,11}$/` com `display` correspondente, `openingHours` com exatamente 7 entradas seg→dom, `postalCode` `00000-000`, `state` UF de 2 letras, `country: 'BR'`, `geo` com ≥ 5 casas decimais, `reviewSummary.ratingValue` entre 1,0 e 5,0 com `referenceDate` ISO, `areasServed`, `whatsappResponseNote`, `mapsDirectionsQuery`, `mapEmbedUrl` com origem `https://www.google.com`); todo dado não fornecido pelo cliente como `PENDENTE: …`
- [X] T026 [P] Criar `src/content/messages.ts` com `generalMessage` ("Olá! Vim pelo site e gostaria de agendar um horário.") e `faqMessage` ("Olá! Vim pelo site e tenho uma dúvida:") e `src/content/navigation.ts` com `NavItem[]` na ordem Sobre (`sobre`), Serviços (`servicos`), Produtos (`produtos`), Avaliações (`avaliacoes`), Dúvidas (`duvidas`), Contato (`contato`) (FR-002)
- [X] T027 [P] Criar stubs tipados com `as const satisfies <Tipo>` e uma entrada mínima marcada `PENDENTE:` em cada: `src/content/hero.ts`, `src/content/about.ts`, `src/content/differentials.ts`, `src/content/services.ts`, `src/content/products.ts`, `src/content/testimonials.ts`, `src/content/faq.ts`, `src/content/privacy.ts` (serão preenchidos nas user stories)
- [X] T028 Criar `src/content/index.ts` exportando `loadSiteContent(): Promise<SiteContent>` que monta o objeto a partir dos arquivos de `src/content/` e chama `validateOpeningHours` (falha o build se inválido)
- [X] T029 Adicionar ao menos uma imagem-fonte provisória por pasta em `src/assets/images/*/` nomeada `pendente-<descricao>.jpg` (ex.: `src/assets/images/hero/pendente-foto-fachada.jpg`) e o logo provisório `src/assets/images/brand/pendente-logo.svg`, para que o pipeline de imagens funcione antes das fotos reais

### Pipeline de pré-renderização e SEO base

- [X] T030 [P] Criar `src/seo/serialize-json-ld.ts` com `serializeJsonLd(data)` = `JSON.stringify` + substituição de `<` → `<`, `>` → `>`, `&` → `&`, `U+2028` e `U+2029` escapados (research R-03)
- [X] T031 Criar `src/seo/build-head.ts` com `buildHead(route, content, assets)` retornando a string de tags da tabela "Tags geradas por página" de [contracts/seo-head.md](./contracts/seo-head.md) (title ≤ 60 caracteres, description 140–160 caracteres, canonical, robots, theme-color, Open Graph completo com `og:image` absoluto 1200×630 e `og:image:alt`, `twitter:card`, ícones, manifest, `<link rel="preload" as="font" type="font/woff2" crossorigin>` da fonte) e aceitando uma lista de blocos JSON-LD já serializados; escapar atributos HTML
- [X] T032 Criar `src/app/routes.ts` com `[{ path: '/', page: 'home' }, { path: '/privacidade/', page: 'privacy' }]` e o tipo `PageKey = 'home' | 'privacy'`
- [X] T033 Criar `src/app/entry-server.tsx` exportando `render(page: PageKey, content: SiteContent): Promise<string>` com `prerender` (Web Streams) de `react-dom/static`, renderizando `HomePage` ou `PrivacyPage` e importando `src/styles/globals.css`
- [X] T034 Criar `src/app/entry-client.tsx`: lê `document.getElementById('root')?.dataset.page`, chama `loadSiteContent()`, hidrata com `hydrateRoot` `HomePage` (import estático) ou `PrivacyPage` (`import()` dinâmico), importa `src/styles/globals.css` e chama `registerClickTracking()` após a hidratação
- [X] T035 Criar `scripts/prerender.ts` (executado com `node`, type-stripping nativo do Node 24): importa o bundle de `dist/server`, `loadSiteContent` e `routes`; para cada rota injeta `<!--app-html-->`, `<!--app-page-->` e `<!--app-head-->` (via `buildHead`) no `dist/client/index.html` de template e grava `dist/client/index.html` e `dist/client/privacidade/index.html`; descobre a URL com hash do woff2 latin no `dist/client/.vite/manifest.json` (habilitar `build.manifest` no `vite.config.ts`) para o preload; gera `dist/client/sitemap.xml` com `<lastmod>` da data do build; remove o `dist/server` ao final
- [X] T036 [P] Criar `scripts/check-content.ts`: percorre `src/content/**` e `src/assets/images/**`, falha (exit 1) listando arquivo e linha de cada ocorrência de `PENDENTE:` e de arquivos `pendente-*`; aceita a variável `ALLOW_PENDING=1` apenas para builds de revisão local (nunca em produção)

### Componentes compartilhados de base

- [X] T037 [P] Criar `src/components/shared/VisuallyHidden.tsx` (span `sr-only`) e `src/components/shared/Container.tsx` (prop `as?`, largura máxima e gutters por tokens, mobile-first)
- [X] T038 [P] Criar `src/components/shared/Section.tsx` (`<section id={SectionId} aria-labelledby>`, prop `tone: 'default' | 'muted'`, espaçamento vertical padronizado) e `src/components/shared/SectionHeading.tsx` (sempre `h2` com `id` para `aria-labelledby`, `eyebrow?`, `description?`, `align?`)
- [X] T039 [P] Criar `src/components/shared/ExternalLink.tsx`: força `target="_blank"` e `rel="noopener noreferrer"`, acrescenta `<VisuallyHidden>(abre em nova aba)</VisuallyHidden>`, aceita `ariaLabel?` e repassa `data-track`/`data-track-context`
- [X] T040 [P] Criar `src/components/shared/ResponsiveImage.tsx`: recebe `image: ImageAsset`, `sizes`, `priority?`, `className?`; renderiza `<picture>` com `<source type srcSet sizes>` AVIF e WebP e `<img>` fallback com `width`, `height`, `alt`; `priority` ⇒ `loading="eager"` + `fetchPriority="high"`, senão `loading="lazy"` + `decoding="async"`; criar também `src/lib/image-asset.ts` com `toImageAsset(pictureImport, alt)` que converte a saída `picture` do `vite-imagetools` em `ImageAsset`
- [X] T041 [P] Criar `src/components/shared/WhatsAppButton.tsx` (props `message`, `context`, `label?` padrão "Agendar pelo WhatsApp", `variant?`, `size?`, `phone`) usando `Button asChild` + `<a href={buildWhatsAppUrl(...)} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click" data-track-context={context}>` com ícone decorativo `aria-hidden` e aviso de nova aba para leitor de tela
- [X] T042 [P] Criar `src/components/shared/PhoneLink.tsx` (props `phone`, `context`, `variant: 'button' | 'inline'`; `href={buildTelUrl}`, texto `phone.display`, `data-track="phone_click"`, rótulo acessível "Ligar para <display>")
- [X] T043 [P] Criar `src/components/shared/icon-map.ts` com o mapa fechado `IconName → componente lucide-react` (importação individual por ícone) usado pelos diferenciais e listas

### Layout base

- [X] T044 [P] Criar `src/layout/SkipLink.tsx` ("Pular para o conteúdo" → `#conteudo`, oculto até receber foco, primeiro elemento focável)
- [X] T045 Criar `src/layout/MobileNav.tsx` com shadcn `Sheet`: gatilho `<button aria-label="Abrir menu">` de 44×44, `SheetTitle` acessível, lista de âncoras de `navigation`, fecha ao selecionar item (estado controlado), `Esc` e clique fora fecham e o foco retorna ao gatilho (FR-003)
- [X] T046 Criar `src/layout/SiteHeader.tsx`: `<header>` sticky com altura `var(--header-height)`, logo como link para `#inicio` (com `alt` do nome do negócio), `<nav aria-label="Principal">` com as âncoras visível a partir de `md`, `MobileNav` abaixo de `md`; recebe `navigation` e `business` por props
- [X] T047 Criar `src/layout/SiteFooter.tsx` mínimo: `<footer>` com nome do negócio e © ano do build (completado em US4) e `src/layout/PageShell.tsx` compondo `SkipLink` + `SiteHeader` + `<main id="conteudo">{children}</main>` + `SiteFooter`, recebendo `SiteContent` por props
- [X] T048 Criar `src/pages/home/HomePage.tsx` (recebe `content: SiteContent`, renderiza `PageShell` com espaço para as 8 seções na ordem do FR-001: hero → sobre → diferenciais → serviços → produtos → avaliações → dúvidas → contato) e `src/pages/privacy/PrivacyPage.tsx` mínimo (`PageShell` + `h1` "Aviso de privacidade"), com export default para o `import()` dinâmico

### Arquivos públicos

- [X] T049 [P] Criar `public/robots.txt` (`User-agent: *`, `Allow: /`, `Sitemap: <site.url>/sitemap.xml`), `public/site.webmanifest` (`name`, `short_name`, `icons`, `theme_color`, `background_color`), `public/favicon.svg` e `public/apple-touch-icon.png` (180×180) provisórios a partir do logo, e `public/og-image.jpg` provisório 1200×630 nomeado como pendência em `src/content/site.ts`
- [X] T050 [P] Criar `public/_headers` exatamente conforme [contracts/security-headers.md](./contracts/security-headers.md) (CSP estrita, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP, `X-Frame-Options`, cache imutável em `/assets/*` e `must-revalidate` em `/*.html`)

**Checkpoint**: `ALLOW_PENDING=1 pnpm build` gera `dist/client/index.html` com header, `<main>`,
footer e `<head>` completo; `pnpm preview` abre a página; `pnpm check:content` falha listando as
pendências (comportamento esperado).

---

## Phase 3: User Story 1 — Entender a proposta e agendar pelo WhatsApp (Priority: P1) 🎯 MVP

**Goal**: primeira tela que explica o negócio em 5 s e leva ao WhatsApp com mensagem pronta; acesso
ao WhatsApp a um toque durante toda a rolagem no mobile.

**Independent Test**: em 360px, sem rolar, ver nome, h1 com serviço + localidade + espécie, ≥ 2
provas de valor e "Agendar pelo WhatsApp" como ação de maior destaque; tocar no botão abre o
WhatsApp com número oficial e mensagem pronta; no meio da página, o botão flutuante está visível
(quickstart V1).

- [X] T051 [P] [US1] Preencher `src/content/hero.ts` (`HeroContent`): `title` com serviço + localidade + espécie conforme CR-003 (ex.: "Banho, tosa e cuidado para cães e gatos em [Bairro], [Cidade]"), `subtitle` com benefício em 1–2 frases, `image` via `toImageAsset` de `src/assets/images/hero/*?preset=hero` com `alt` descritivo, `trustSignals` com 2 a 3 itens (FR-015) onde `rating` e `yearsActive` **não são digitados** — derivados de `business.reviewSummary` e `getYearsActive(business.foundingYear)` —, `primaryCta` "Agendar pelo WhatsApp" (`intent: 'whatsapp'`, `trackingContext: 'hero'`) e `secondaryCta` "Ver serviços" (`intent: 'anchor'`, `target: 'servicos'`); manter `PENDENTE:` no que o cliente não forneceu
- [X] T052 [P] [US1] Criar `src/components/shared/RatingStars.tsx`: estrelas decorativas `aria-hidden` + texto visível "Nota 4,9 de 5" via `formatRating` (informação não só visual — XR-005)
- [X] T053 [P] [US1] Criar `src/components/shared/TrustSignalList.tsx`: `<ul>` de `TrustSignal` com valor em destaque e rótulo; usa `RatingStars` para `kind: 'rating'`
- [X] T054 [US1] Criar `src/sections/hero/HeroSection.tsx` (props `hero`, `business`): `<section id="inicio" aria-labelledby>`, **único `h1`** da página, subtítulo, `TrustSignalList`, `WhatsAppButton` primário `size="lg"` com `generalMessage` e `context="hero"` (maior destaque visual da tela — FR-009), botão secundário "Ver serviços" como `<a href="#servicos">`, `ResponsiveImage` com `priority` e `sizes` corretos para mobile/desktop; layout mobile-first que cabe em 360×640 sem rolagem com h1, prova de valor e CTA visíveis
- [X] T055 [US1] Adicionar ao `src/layout/SiteHeader.tsx` um `WhatsAppButton` compacto com `context="header"` e rótulo "Agendar pelo WhatsApp" (visível no mobile como botão de ícone com `aria-label` equivalente se não couber, mantendo 44×44)
- [X] T056 [P] [US1] Criar `src/hooks/use-in-view.ts`: hook com `IntersectionObserver` que recebe uma lista de seletores/refs e retorna se algum está visível; seguro no SSR (retorna `false` até montar)
- [X] T057 [US1] Criar `src/layout/FloatingWhatsApp.tsx`: visível apenas abaixo de `md`, `position: fixed` no canto inferior, `WhatsAppButton` com `context="floating"`, oculto (com `hidden`/`aria-hidden` coerentes, sem armadilha de foco) quando o CTA do hero ou `#contato` estão na viewport via `use-in-view` (FR-008); transição só com `motion-safe:`
- [X] T058 [US1] Integrar `FloatingWhatsApp` em `src/layout/PageShell.tsx` e reservar espaço inferior no mobile com o token `--floating-cta-space` (padding no final do `<main>`/footer) para o botão nunca cobrir texto, campos ou outros botões
- [X] T059 [US1] Exibir `business.whatsappResponseNote` (FR-024) junto ao CTA do hero em `src/sections/hero/HeroSection.tsx` como texto auxiliar curto
- [X] T060 [US1] Inserir `HeroSection` em `src/pages/home/HomePage.tsx` como primeira seção e verificar no `ALLOW_PENDING=1 pnpm build` que `dist/client/index.html` contém 1 `<h1`, o link `wa.me` com `data-track-context="hero"` e a imagem do hero com `fetchpriority="high"`

**Checkpoint**: quickstart V1 aprovado (MVP: já gera agendamentos).

---

## Phase 4: User Story 2 — Avaliar serviços e escolher o adequado (Priority: P1)

**Goal**: seção de serviços com nome, espécie/porte, inclusos, duração, preço "a partir de" e CTA
contextual que cita o serviço na mensagem do WhatsApp.

**Independent Test**: a partir da primeira tela, chegar a `#servicos`, identificar descrição,
porte, inclusos e preço de um serviço e abrir o WhatsApp com mensagem citando esse serviço
(quickstart V2).

- [X] T061 [P] [US2] Preencher `src/content/services.ts` (`Service[]`) com os serviços confirmados pelo cliente (base da spec: banho, tosa na máquina, tosa na tesoura, tosa higiênica, hidratação, táxi dog); regras do data-model: `species` com ≥ 1 item, `sizes` com ≥ 1 item, `includes` com ≥ 1 item, `durationMinutes` com `min ≤ max`, `priceFrom` em reais `> 0`, `priceFactors` com ≥ 1 item, `whatsappMessage` **que cite o `name`** (ex.: "Olá! Vim pelo site e gostaria de agendar *Tosa na tesoura*."), `slug` único, `description` mencionando cidade/bairro quando natural (FR-030), `image` via preset `card` com `alt`; dados não fornecidos como `PENDENTE:`
- [X] T062 [US2] Criar `src/sections/services/ServiceCard.tsx` (props `service`, `whatsapp: PhoneNumber`): shadcn `Card` como `<article>`, imagem `ResponsiveImage` proporção 4:3 lazy, `h3` com o nome, espécies e portes em `Badge` com texto (`speciesLabel`/`sizeLabel`), inclusos em `<ul>`, duração via `formatDurationRange`, "A partir de R$ …" via `formatCurrencyBRL` + "O preço varia conforme: …" com `priceFactors` (FR-012), `WhatsAppButton` com `label="Agendar <nome> pelo WhatsApp"`, `message={service.whatsappMessage}`, `context={"service:" + service.id}`
- [X] T063 [US2] Criar `src/sections/services/ServicesSection.tsx` (props `services`, `business`): `Section id="servicos"` + `SectionHeading` (h2), grade mobile-first 1 → 2 (`md`) → 3 (`lg`) colunas de `ServiceCard`, sem carrossel
- [X] T064 [US2] Inserir `ServicesSection` em `src/pages/home/HomePage.tsx` na posição de serviços (após diferenciais, antes de produtos — FR-001) e conferir que o botão "Ver serviços" do hero e o item "Serviços" do menu rolam até o título sem ficar sob o header (XR-008)

**Checkpoint**: quickstart V2 aprovado.

---

## Phase 5: User Story 3 — Construir confiança antes do primeiro contato (Priority: P1)

**Goal**: seções Sobre (história, espaço, equipe), Diferenciais concretos e Depoimentos reais com
link para a fonte.

**Independent Test**: um avaliador externo percorre Sobre, Diferenciais e Avaliações e cita ≥ 3
fatos concretos e verificáveis (quickstart V3).

### Institucional (Sobre)

- [X] T065 [P] [US3] Preencher `src/content/about.ts` (`AboutContent`): `heading`, `story` como parágrafos curtos (≤ 3–4 linhas no mobile — CR-004) com ano de fundação e cidade/bairros (FR-030), `mission` em linguagem concreta, `gallery` com fotos reais do espaço (preset `gallery`, `alt` descritivo), `team` com ≥ 1 `TeamMember` (`name`, `role`, `qualifications`, `photo` preset `portrait`, `professionalRegistry` obrigatório se veterinário); pendências como `PENDENTE:`
- [X] T066 [P] [US3] Criar `src/sections/about/TeamMemberCard.tsx`: `<article>` com foto 1:1 lazy, `h3` com o nome, função e lista de qualificações/registro profissional
- [X] T067 [P] [US3] Criar `src/sections/about/SpaceGallery.tsx`: grade estática responsiva de fotos 3:2 (`<ul>` de `<li><figure>`), sem carrossel automático (FR-011)
- [X] T068 [US3] Criar `src/sections/about/AboutSection.tsx` (prop `about`): `Section id="sobre"` + h2, história e missão, `SpaceGallery`, lista de `TeamMemberCard` e link âncora "Conhecer os serviços" → `#servicos`

### Diferenciais

- [X] T069 [P] [US3] Preencher `src/content/differentials.ts` com **4 a 6** `Differential`; cada `title` é afirmação concreta e verificável (FR-018, ex.: "Secagem sem gaiola de calor"), `evidence` com a prova, sem superlativos sem prova (CR-005), `icon` restrito a `IconName` de `icon-map.ts`
- [X] T070 [P] [US3] Criar `src/sections/differentials/DifferentialItem.tsx`: ícone decorativo `aria-hidden`, `h3` com título, descrição e evidência em texto
- [X] T071 [US3] Criar `src/sections/differentials/DifferentialsSection.tsx` (props `differentials`, `business`): `Section id="diferenciais"` + h2, grade 1 → 2 → 3 colunas, `WhatsAppButton` com `context="differentials"` ao final

### Depoimentos

- [X] T072 [P] [US3] Preencher `src/content/testimonials.ts` com **3 a 6** `Testimonial` reais copiados de fonte pública (CR-006): `authorName` nome ou nome + inicial do sobrenome, `rating` inteiro 1–5, `text` sem edição de sentido, `source`, `date` ISO, `sourceUrl?`; nunca inventar — se faltar, `PENDENTE:`
- [X] T073 [P] [US3] Criar `src/sections/testimonials/TestimonialCard.tsx`: shadcn `Card` como `<article>` com `<blockquote>` do texto, `<cite>` com o nome, `RatingStars`, `Badge` com a origem e data formatada
- [X] T074 [US3] Criar `src/sections/testimonials/TestimonialsSection.tsx` (props `testimonials`, `business`): `Section id="avaliacoes"` + h2, resumo com nota média e total de `business.reviewSummary` (mesma fonte do hero), grade de `TestimonialCard`, `ExternalLink` "Ver todas as avaliações no Google" para `business.googleBusinessProfileUrl` com `data-track="reviews_click"` `data-track-context="testimonials"` e `WhatsAppButton` com `context="testimonials"` (FR-016)
- [X] T075 [US3] Inserir `AboutSection` e `DifferentialsSection` (após o hero, nessa ordem) e `TestimonialsSection` (após produtos, antes de dúvidas) em `src/pages/home/HomePage.tsx` conforme FR-001

**Checkpoint**: quickstart V3 aprovado; US1 e US2 continuam funcionando.

---

## Phase 6: User Story 4 — Encontrar localização e horário (Priority: P2)

**Goal**: seção de contato com NAP, horário por dia, mapa por fachada, "Como chegar"; rodapé
completo; dados estruturados de negócio local; aviso de privacidade.

**Independent Test**: de qualquer ponto da página, achar o horário de sábado e abrir a rota em ≤ 2
interações; telefone inicia ligação; mapa bloqueado mantém endereço e "Como chegar" (quickstart V4).

- [X] T076 [P] [US4] Criar `src/components/shared/DirectionsLink.tsx` (props `query`, `context`): `ExternalLink` para `buildDirectionsUrl(query)` com texto "Como chegar pelo Google Maps" e `data-track="directions_click"`
- [X] T077 [P] [US4] Criar `src/components/shared/BusinessAddress.tsx` (prop `business`, `context`): `<address>` com `formatAddress`, `PhoneLink`, `WhatsAppButton` inline, link `mailto:` com `data-track="email_click"` — único componente que exibe NAP (FR-022)
- [X] T078 [P] [US4] Criar `src/components/shared/OpeningHoursTable.tsx` (props `hours`, `specialHours?`): `<table>` com `<caption>`, `<th scope="row">` por dia (`dayLabel`), "Fechado" por texto; avisos de `getActiveSpecialHours` acima da tabela sem quebrar o layout; destaque do dia atual aplicado **somente após a hidratação** (sem divergência SSR) e não só por cor
- [X] T079 [US4] Criar `src/sections/contact/MapFacade.tsx` (prop `business`): estado inicial com `ResponsiveImage` de `business.mapPreview` (lazy) + botão "Ver mapa interativo" (`data-track="map_open"`); após clique cria `<iframe src={business.mapEmbedUrl} title="Mapa com a localização do <tradeName>" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" sandbox="allow-scripts allow-same-origin allow-popups">` com proporção fixa (sem CLS); endereço e `DirectionsLink` ficam fora do componente e sempre visíveis
- [X] T080 [US4] Criar `src/sections/contact/ContactSection.tsx` (prop `business`): `Section id="contato"` + h2, `BusinessAddress`, `OpeningHoursTable`, `whatsappResponseNote` (FR-024), CTAs `WhatsAppButton` (`context="contact"`), `PhoneLink` variante botão (`context="contact"`), `DirectionsLink` (`context="contact"`), `MapFacade`, links de redes sociais via `ExternalLink` com `aria-label` "<Rede> do <tradeName> (abre em nova aba)" (FR-021)
- [X] T081 [US4] Completar `src/layout/SiteFooter.tsx` (FR-023): `BusinessAddress` (`context="footer"`), horário resumido, redes sociais, links das seções a partir de `navigation`, razão social e CNPJ, link "Aviso de privacidade" → `/privacidade/`, © ano do build; títulos de grupo sem saltar a hierarquia (contracts/seo-head.md)
- [X] T082 [P] [US4] Criar `src/seo/json-ld.ts` com `buildPetStoreJsonLd(content)` exatamente no formato de [contracts/seo-head.md](./contracts/seo-head.md): `@type: "PetStore"`, `@id` `<site.url>/#negocio`, NAP de `business`, `geo`, `openingHoursSpecification` omitindo dias fechados e incluindo `specialHours` vigentes com `validFrom`/`validThrough`, `areaServed`, `hasMap`, `sameAs`, `priceRange`, `foundingDate`, `aggregateRating` **somente se `reviewCount > 0`** e sem emitir `review` de terceiros
- [X] T083 [US4] Passar `serializeJsonLd(buildPetStoreJsonLd(content))` para `buildHead` na rota `/` em `scripts/prerender.ts`
- [X] T084 [P] [US4] Preencher `src/content/privacy.ts` (`PrivacyContent`): `title`, `lastUpdated` ISO, seções LGPD (controlador derivado de `business.legalName`/`cnpj`, dados tratados — nenhum formulário; links externos para WhatsApp/Google Maps; mapa só carregado após clique; analytics sem cookies quando contratado —, direitos do titular, contato `business.email`); texto final sujeito a revisão do cliente como `PENDENTE:`
- [X] T085 [US4] Completar `src/pages/privacy/PrivacyPage.tsx`: `PageShell` + `<article>` com `h1`, data de atualização e `h2` por seção a partir de `privacy`
- [X] T086 [US4] Inserir `ContactSection` em `src/pages/home/HomePage.tsx` como última seção e conferir que `FloatingWhatsApp` some ao exibir `#contato`

**Checkpoint**: quickstart V4 aprovado; `dist/client/index.html` contém o JSON-LD `PetStore`;
`dist/client/privacidade/index.html` existe.

---

## Phase 7: User Story 5 — Descobrir produtos à venda (Priority: P2)

**Goal**: vitrine de produtos/categorias com marcas, forma de compra e CTA de consulta de
disponibilidade.

**Independent Test**: identificar ≥ 1 categoria, ≥ 1 marca e a forma de compra e abrir o WhatsApp
com mensagem citando o produto (quickstart V5).

- [X] T087 [P] [US5] Preencher `src/content/products.ts` (`ProductsContent`): `heading`, `intro`, `items` com **4 a 8** `FeaturedProduct` (`kind`, `name`, `category`, `usage` com indicação de uso/público, `brand?`, `image` preset `card` com `alt`, `purchaseOptions` com ≥ 1 de `'pickup' | 'delivery'`, `whatsappMessage` citando o produto e pedindo **consulta de disponibilidade** — nunca prometendo estoque), `brands` com ≥ 1 `Brand` (FR-014), `purchaseNote` com retirada/entrega, área e condições
- [X] T088 [P] [US5] Criar `src/sections/products/ProductCard.tsx`: `Card` como `<article>`, foto 4:3 lazy, `h3` com nome, categoria, uso, `Badge` com texto para cada forma de compra (`purchaseOptionLabel`), `WhatsAppButton` `label="Consultar disponibilidade pelo WhatsApp"`, `message={product.whatsappMessage}`, `context={"product:" + product.id}` (FR-013)
- [X] T089 [P] [US5] Criar `src/sections/products/BrandList.tsx`: lista `<ul>` de marcas (logo com `alt` = nome da marca, ou nome em texto quando sem logo)
- [X] T090 [US5] Criar `src/sections/products/ProductsSection.tsx` (props `products`, `business`): `Section id="produtos"` + h2, intro, grade 1 → 2 → 4 colunas de `ProductCard`, `BrandList` e `purchaseNote`
- [X] T091 [US5] Inserir `ProductsSection` em `src/pages/home/HomePage.tsx` após serviços e antes de avaliações (FR-001)

**Checkpoint**: quickstart V5 aprovado.

---

## Phase 8: User Story 6 — Tirar dúvidas antes de contratar (Priority: P3)

**Goal**: FAQ expansível por toque e teclado, com respostas no HTML pré-renderizado, JSON-LD
`FAQPage` e CTA final.

**Independent Test**: encontrar a resposta para "Preciso levar a carteira de vacinação?" em menos
de 30 s; abrir/fechar por teclado; CTA ao final (quickstart V6).

- [X] T092 [P] [US6] Preencher `src/content/faq.ts` com **6 a 10** `FaqItem` reais recebidos pelo atendimento (CR-008) cobrindo vacinas, tempo de serviço, busca e entrega, pagamento, animais agressivos/ansiosos e cancelamento; cada `question` termina com "?", `id` estável; perguntas não confirmadas pelo cliente como `PENDENTE:`
- [X] T093 [US6] Criar `src/sections/faq/FaqSection.tsx` (props `faq`, `business`): `Section id="duvidas"` + h2, shadcn `Accordion type="multiple"` com cada pergunta em `h3` dentro do `AccordionTrigger` (botão nativo com `aria-expanded`, ícone de estado) e `AccordionContent` com `forceMount` para que a resposta exista no HTML pré-renderizado e fique oculta quando fechada (FR-019; confirmar o atributo `hidden` no estado fechado); bloco final "Ainda tem dúvidas? Fale conosco" com `WhatsAppButton` `message={faqMessage}` `context="faq"` (FR-020)
- [X] T094 [US6] Adicionar `buildFaqPageJsonLd(faq)` em `src/seo/json-ld.ts` (`@type: "FAQPage"`, um `Question` por item com `acceptedAnswer.text` idêntico ao texto visível — FR-028) e passá-lo a `buildHead` na rota `/` em `scripts/prerender.ts`
- [X] T095 [US6] Inserir `FaqSection` em `src/pages/home/HomePage.tsx` após avaliações e antes de contato (FR-001) e conferir no `dist/client/index.html` que todas as respostas aparecem no HTML e que há 2 blocos `application/ld+json`

**Checkpoint**: as 6 user stories funcionam; a home tem as 10 partes da spec na ordem correta.

---

## Phase 9: Polish & Cross-Cutting (responsividade, acessibilidade, SEO, performance, segurança, validação)

**Purpose**: ajustes transversais, conteúdo real e os portões de qualidade da constituição.

### Responsividade

- [X] T096 Revisar todas as seções em 320, 360, 390, 768, 1280, 1440 e 1920px e zoom de 200% em 1280px, corrigindo em cada arquivo de `src/sections/**` e `src/layout/**` qualquer rolagem horizontal, texto cortado, sobreposição, alvo de toque < 44px ou texto corrido < 16px (XR-001, XR-003; quickstart V7)
- [X] T097 Revisar a primeira tela em 360×640 e 390×844 ajustando `src/sections/hero/HeroSection.tsx` e `src/styles/globals.css` (escala fluida) para que h1, ≥ 2 provas de valor e o CTA principal fiquem visíveis sem rolagem (US1/AC1)

### Acessibilidade

- [ ] T098 Executar navegação completa só por teclado (skip link primeiro, ordem lógica, foco sempre visível, menu mobile prende o foco e `Esc` devolve ao gatilho, FAQ por Enter/Espaço, fachada do mapa) e corrigir os componentes afetados em `src/layout/**`, `src/sections/**` e `src/components/**` (quickstart V8.1)
  > Parcial (2026-10-12): verificado via DevTools Protocol que o menu mobile abre, fecha com `Esc` e devolve o foco ao gatilho, e que o FAQ expande com `aria-expanded`. Falta a navegação completa por teclado feita por uma pessoa.
- [ ] T099 Verificar com leitor de tela landmarks (`banner`, `navigation`, `main`, `contentinfo`), um único h1, h2 por seção sem saltos, `alt` descritivo em imagens de conteúdo, decorativas ignoradas e links de nova aba anunciados; corrigir nos componentes (quickstart V8.2, FR-026, FR-031)
  > Pendente: requer leitor de tela real (NVDA/Orca/TalkBack/VoiceOver). Lighthouse a11y local = 100.
- [X] T100 Medir contraste de todos os pares de tokens em uso (texto, botões, badges, foco, bordas de componentes) e ajustar somente `src/styles/tokens.css` até ≥ 4.5:1 / ≥ 3:1; emular `prefers-reduced-motion: reduce` e confirmar que animações e rolagem suave são desativadas (XR-005, XR-007; quickstart V8.3)

### Imagens e performance

- [ ] T101 Substituir todas as imagens `pendente-*` em `src/assets/images/**` por fotos reais fornecidas pelo cliente, com nomes descritivos em português (ex.: `banho-cao-porte-medio.jpg`), recorte na proporção do preset (4:5/16:9 hero, 4:3 card, 1:1 portrait, 3:2 gallery) e tratamento de cor uniforme; atualizar os imports em `src/content/**` e os `alt` (CR-002, Princípio V)
  > Bloqueada: aguardando fotos reais do cliente. Lista de fotos necessárias = arquivos `src/assets/images/**/pendente-*.jpg`.
- [ ] T102 Rodar `pnpm build` e conferir os orçamentos (gzip) no relatório: JS inicial da home ≤ 120 KB, CSS ≤ 25 KB, imagem LCP mobile ≤ 120 KB, fonte ≤ 50 KB; se exceder, ajustar qualidade/larguras dos presets em `vite.config.ts`, imports de ícones em `src/components/shared/icon-map.ts` ou o subconjunto da fonte em `src/styles/globals.css`
  > Parcial: JS 118 KB, CSS 11,5 KB e fonte 27 KB (gzip/woff2) dentro do orçamento. A imagem LCP só pode ser medida com a foto real (depende de T101).
- [X] T103 Confirmar em `dist/client/index.html` que só a imagem do hero tem `loading="eager"`/`fetchpriority="high"`, que todas as `<img>` têm `width`/`height`, que existe o `preload` do woff2 e que nenhum script de terceiro é carregado; registrar CLS ≤ 0,1 no painel Performance do DevTools

### SEO e conteúdo

- [ ] T104 Substituir todos os marcadores `PENDENTE:` em `src/content/**` e `public/og-image.jpg`/`favicon.svg`/`apple-touch-icon.png` pelo conteúdo real do cliente (domínio, NAP, CNPJ, preços, equipe, avaliações, FAQ, logo); revisar textos contra CR-001…CR-008 (sem placeholder, sem superlativo sem prova, pt-BR, parágrafos curtos) até `pnpm check:content` passar sem `ALLOW_PENDING`
  > Bloqueada: 144 pendências listadas por `pnpm check:content`.
- [ ] T105 Revisar em `dist/client/index.html` o `<title>` (≤ 60 caracteres, serviço + bairro/cidade + marca), `meta description` (140–160 caracteres), canonical, Open Graph e `dist/client/sitemap.xml`/`robots.txt` com o domínio definitivo; ajustar `src/seo/build-head.ts` ou `src/content/site.ts` se necessário (FR-025, FR-029)
  > Bloqueada: depende do domínio definitivo e dos dados reais (T104). Hoje o `<title>` tem 78 caracteres por causa dos marcadores `PENDENTE:`.
- [X] T106 Executar a busca de consistência NAP do quickstart (telefone, endereço e nome literais só em `src/content/business.ts`) e corrigir qualquer duplicação encontrada em `src/**` (FR-022, SC-007)

### Segurança

- [X] T107 Executar `pnpm audit --prod` e resolver achados altos/críticos atualizando dependências em `package.json`/`pnpm-lock.yaml`; confirmar `pnpm-lock.yaml` versionado e ausência de segredos/`.env` no repositório
- [X] T108 Navegar por `pnpm preview` com a CSP de `public/_headers` aplicada (via host de preview ou meta temporária local, removida depois) abrindo menu, FAQ e mapa; se o HTML pré-renderizado tiver atributos `style` dos primitivos Radix, adicionar apenas `style-src-attr 'unsafe-inline'` em `public/_headers` e registrar a justificativa em `specs/001-petshop-home/plan.md` (Complexity Tracking); grep em `src/` não encontra `dangerouslySetInnerHTML`, `innerHTML`, `eval` nem `target="_blank"` fora de `ExternalLink`/`WhatsAppButton`

### Validação final (portões da constituição)

- [ ] T109 Rodar o script `validate` de `package.json` (`pnpm validate`: typecheck, lint sem avisos, format:check, check:content, build, validate:html) até passar sem erros
  > Bloqueada por T104: com `ALLOW_PENDING=1`, todas as etapas passam, exceto `long-title` (título com marcadores `PENDENTE:`).
- [ ] T110 Executar os cenários manuais V1–V6 do [quickstart.md](./quickstart.md) em `pnpm preview` e em celular real com WhatsApp (clique real em todos os CTAs de WhatsApp, telefone, "Como chegar", mapa e avaliações) e registrar resultado e data em `specs/001-petshop-home/checklists/validation.md`
  > Pendente: requer celular real com WhatsApp e conteúdo real.
- [ ] T111 Após publicar no host (HTTPS), executar V9 (Lighthouse mobile, 3 execuções, mediana ≥ 90 nas 4 categorias, LCP ≤ 2,5 s, CLS ≤ 0,1) e V10 (Nu HTML Checker sem erros, Teste de Resultados Avançados com `PetStore` válido, prévia do link no WhatsApp, `curl -sI` mostrando os cabeçalhos de segurança, console sem violações de CSP) e registrar em `specs/001-petshop-home/checklists/validation.md`
  > Pendente: requer publicação no host. Lighthouse mobile local (preview): Performance 98, Acessibilidade 100, Boas Práticas 100, SEO 100; LCP 2,3 s; CLS 0.
- [ ] T112 Revisão final de conformidade com a constituição (Princípios I–X e seção de Segurança) e de código limpo (sem código morto/comentado, sem valores arbitrários do Tailwind, sem `style={}`, sem `!important`, componentes ≤ 1 responsabilidade), registrando o resultado em `specs/001-petshop-home/checklists/validation.md`
  > Pendente: executar após T101–T111.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: sem dependências — começa imediatamente.
- **Foundational (Phase 2)**: depende do Setup — **bloqueia todas as user stories**.
- **User Stories (Phases 3–8)**: dependem só da Phase 2. Podem seguir em ordem de prioridade
  (US1 → US2 → US3 → US4 → US5 → US6) ou em paralelo.
- **Polish (Phase 9)**: depende das user stories desejadas; T104 e T101 dependem do conteúdo real
  do cliente; T111 depende de domínio e host.

### User Story Dependencies

| Story | Depende de | Observação |
|---|---|---|
| US1 (P1) | Phase 2 | MVP. Cria `RatingStars`, `TrustSignalList`, `FloatingWhatsApp`. |
| US2 (P1) | Phase 2 | Independente. |
| US3 (P1) | Phase 2 | Reusa `RatingStars` de US1 (T052); se US3 vier antes, criar T052 primeiro. |
| US4 (P2) | Phase 2 | T086 interage com `FloatingWhatsApp` (US1) apenas para conferência. |
| US5 (P2) | Phase 2 | Independente. |
| US6 (P3) | Phase 2 | T094 edita `src/seo/json-ld.ts` criado em T082 (US4); se US6 vier antes, criar o arquivo nela. |

Tarefas que editam `src/pages/home/HomePage.tsx` (T060, T064, T075, T086, T091, T095) e
`scripts/prerender.ts` (T083, T094) são sequenciais entre si.

### Within Each User Story

Conteúdo (`src/content/*`) e subcomponentes `[P]` → componente da seção → integração em
`HomePage.tsx` → conferência no build.

## Parallel Opportunities

- Setup: T009, T010, T011, T012 em paralelo após T008.
- Foundational: T021–T024 (lib) em paralelo após T020; T026–T027 em paralelo; T030 e T036 em
  paralelo; T037–T043 (shared) em paralelo; T044, T049, T050 em paralelo.
- Após a Phase 2, US1, US2, US3, US5 podem ser feitas por pessoas diferentes (atenção a
  `HomePage.tsx`).

### Parallel Example: User Story 1

```bash
Task: "T051 Preencher src/content/hero.ts"
Task: "T052 Criar src/components/shared/RatingStars.tsx"
Task: "T053 Criar src/components/shared/TrustSignalList.tsx"   # depois de T052
Task: "T056 Criar src/hooks/use-in-view.ts"
```

### Parallel Example: User Story 3

```bash
Task: "T065 Preencher src/content/about.ts"
Task: "T066 Criar src/sections/about/TeamMemberCard.tsx"
Task: "T067 Criar src/sections/about/SpaceGallery.tsx"
Task: "T069 Preencher src/content/differentials.ts"
Task: "T070 Criar src/sections/differentials/DifferentialItem.tsx"
Task: "T072 Preencher src/content/testimonials.ts"
Task: "T073 Criar src/sections/testimonials/TestimonialCard.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Phase 1 (Setup) → Phase 2 (Foundational).
2. Phase 3 (US1): header + hero + WhatsApp flutuante.
3. **Parar e validar** com quickstart V1 (`ALLOW_PENDING=1 pnpm build && pnpm preview`).

### Incremental Delivery

1. Setup + Foundational → base pronta (layout, tokens, SSG, SEO base).
2. US1 → valida V1 (MVP gera agendamentos).
3. US2 → valida V2. US3 → valida V3 (as três P1 completam a proposta comercial).
4. US4 → valida V4 (contato, rodapé, JSON-LD, privacidade). US5 → V5. US6 → V6.
5. Phase 9 com conteúdo real → portões da constituição → publicação.

**Publicação bloqueada** enquanto `pnpm check:content` falhar (CR-009) ou qualquer portão de T109–T112
não estiver registrado.

---

## Notes

- `[P]` = arquivos diferentes, sem dependência de tarefa incompleta.
- `[USn]` mapeia a tarefa à user story da spec para rastreabilidade.
- Sem testes automatizados (constituição). Validação: scripts estáticos + quickstart V1–V10.
- Commitar ao fim de cada tarefa ou grupo lógico; parar em cada checkpoint para validar a story.
