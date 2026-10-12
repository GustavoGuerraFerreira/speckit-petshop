# Research: Home Page Comercial do Petshop

**Feature**: `001-petshop-home` | **Data**: 2026-10-12 | **Plano**: [plan.md](./plan.md)

Este documento resolve as incógnitas do Technical Context. Versões foram consultadas no registro
npm em 2026-10-12 (`npm view <pacote> version`). Formato de cada item: **Decisão**, **Justificativa**,
**Alternativas consideradas**.

---

## R-01. Versões ("sempre a última versão disponível")

**Decisão**: usar a última versão estável de cada pacote **no momento da instalação**, com duas
exceções justificadas por incompatibilidade de pares (peer dependencies). Snapshot de referência:

| Pacote | Versão (2026-10-12) | Observação |
|---|---|---|
| Node.js | 24.x LTS ("Krypton", 24.21.0) | Runtime de build. A máquina local está em 20.20.2 e precisa ser atualizada (`vite-imagetools` exige Node ≥ 22). |
| pnpm | 12.11.2 | Gerenciador de pacotes (ver R-12). |
| vite | 8.3.4 | Bundler (Rolldown). |
| @vitejs/plugin-react | 6.1.2 | Peer `vite ^8`. |
| react / react-dom | 19.3.0 | Inclui `react-dom/static` (pré-renderização) e `hydrateRoot`. |
| @types/react / @types/react-dom | 19.3.0 | — |
| tailwindcss / @tailwindcss/vite | 4.3.3 | Configuração CSS-first (`@theme`), sem `tailwind.config.js`. |
| shadcn (CLI) | 4.21.4 | Copia o código dos componentes para o repositório. |
| radix-ui | 1.8.0 | Primitivos usados pelos componentes shadcn (pacote unificado). |
| lucide-react | 1.55.0 | Ícones (padrão do shadcn), importação individual com tree-shaking. |
| class-variance-authority / clsx / tailwind-merge | 0.7.1 / 2.1.1 / 3.7.0 | Utilitários exigidos pelo shadcn (`cn`, variantes). |
| tw-animate-css | 1.4.0 | Animações dos componentes shadcn (substitui `tailwindcss-animate`). |
| vite-imagetools | 12.0.1 | Pipeline de imagens no build (ver R-05). |
| @fontsource-variable/plus-jakarta-sans | 5.3.0 | Fonte auto-hospedada (ver R-06). |
| **typescript** | **6.0.3** (não 7.0.2) | **Exceção 1**: `typescript-eslint@8.71.2` declara peer `typescript >=4.8.4 <6.1.0`. O TypeScript 7 (compilador nativo) ainda não é suportado pelo lint com tipos. Reavaliar quando o `typescript-eslint` aceitar 7.x. |
| **eslint** | **9.39.5** (não 10.12.0) | **Exceção 2**: `eslint-plugin-jsx-a11y@6.10.2` (lint de acessibilidade, obrigatório pelo Princípio VIII) declara peer `eslint ^3…^9`. Reavaliar quando o plugin aceitar ESLint 10. |
| typescript-eslint | 8.71.2 | Lint com informação de tipos. |
| eslint-plugin-react-hooks | 7.1.1 | Regras de hooks. |
| eslint-plugin-jsx-a11y | 6.10.2 | Lint de acessibilidade em JSX. |
| prettier / prettier-plugin-tailwindcss | 3.9.10 / 0.8.1 | Formatação e ordenação de classes. |
| html-validate | 11.16.2 | Validação do HTML pré-renderizado (portão 6 da constituição). |

**Justificativa**: o usuário exige a última versão; a constituição (Princípio VIII) exige
acessibilidade como critério de aceite e (Princípio X) lint padronizado. Quando "a mais nova" de um
pacote quebra a cadeia de ferramentas obrigatórias, vence a versão mais nova **compatível**. As
duas exceções são pontuais, documentadas e reversíveis.

**Alternativas consideradas**:
- TypeScript 7 + lint sem informação de tipos: perde regras importantes (`no-floating-promises`,
  `no-unsafe-*`) e ainda viola o peer range. Rejeitada.
- ESLint 10 + `eslint-plugin-jsx-a11y-x@0.2.0` (fork): versão 0.x, baixa maturidade; risco de
  cadeia de suprimentos maior que o ganho. Rejeitada.
- Fixar versões antigas "seguras": contraria o requisito do usuário. Rejeitada.

**Regra operacional**: na instalação, rodar `pnpm view <pacote> version` e usar o resultado,
respeitando a janela de maturidade mínima (R-12). Versões exatas ficam no `pnpm-lock.yaml`.

---

## R-02. SPA × SEO: estratégia de renderização

**Decisão**: **SSG (pré-renderização no build)** com React + Vite, sem framework adicional.
O build gera o HTML completo de cada rota (`/` e `/privacidade/`) usando `react-dom/static`
(`prerenderToNodeStream`) a partir de um bundle SSR do Vite (`vite build --ssr`). No navegador,
`hydrateRoot` hidrata o HTML existente. Um script `scripts/prerender.ts` (executado pelo Node 24 com
type-stripping nativo, sem `tsx`) orquestra: renderiza cada rota, injeta `<head>` (title, meta,
canonical, OG, JSON-LD), escreve `dist/**/index.html` e gera `sitemap.xml`.

**Justificativa**:
- SEO local (FR-025…FR-029, Princípio VII) exige que título, conteúdo, h1/h2 e JSON-LD estejam no
  HTML inicial, sem depender de execução de JavaScript pelo robô.
- Performance (Princípio IX): o LCP passa a ser a imagem/título do hero presentes no HTML, não um
  conteúdo montado após o download do JS. O conteúdo e os CTAs funcionam mesmo antes da hidratação
  (são links `<a href>` nativos).
- Conteúdo é estático nesta entrega; SSR em tempo de requisição seria custo sem benefício.

**Alternativas consideradas**:
- SPA pura (CSR): HTML vazio, LCP pior e SEO dependente do render do Google. Rejeitada.
- `vite-react-ssg@0.9.2`: pré-1.0 e acoplado a roteador; adiciona dependência para algo que são ~60
  linhas de script. Rejeitada.
- Next.js / React Router (framework mode) / Astro: resolveriam SSG, mas trocam a stack pedida
  (React + Vite) por um framework inteiro. Ficam como **caminho de evolução** se surgirem muitas
  páginas, rotas dinâmicas ou SSR com CMS (ver R-10).

---

## R-03. Metadados e dados estruturados

**Decisão**: o `<head>` é gerado por funções puras em `src/seo/` (`buildHead`, `buildPetStoreJsonLd`,
`buildFaqPageJsonLd`) a partir da mesma fonte de conteúdo usada pelos componentes, e injetado pelo
script de pré-renderização no marcador `<!--app-head-->` do `index.html`. JSON-LD serializado com
`JSON.stringify` + escape de `<`, `>` e `&` (`<` etc.) para impedir quebra do `<script>`.
Tipos: `PetStore` (subtipo de `LocalBusiness`) e `FAQPage`. Contrato em
[contracts/seo-head.md](./contracts/seo-head.md).

**Justificativa**: FR-022 exige NAP idêntico na página e no JSON-LD; gerar ambos da mesma fonte
torna a divergência impossível por construção. Head determinístico no build evita depender do
comportamento de hoisting de `<title>`/`<meta>` do React 19 em renderização parcial.

**Alternativas consideradas**: metadados nativos do React 19 dentro dos componentes (hoisting) —
válido, mas o JSON-LD continuaria exigindo `dangerouslySetInnerHTML`; `react-helmet-async` —
dependência extra desnecessária. Rejeitadas.

> **Nota sobre FAQ rich results**: o Google restringe a exibição de FAQ rich results a sites
> governamentais e de saúde desde 2023. O JSON-LD `FAQPage` continua válido e é mantido por
> exigência do FR-028, mas o SC-009 deve ser verificado pelo `PetStore`, não pelo FAQ.

---

## R-04. shadcn/ui: base de primitivos e componentes usados

**Decisão**: shadcn/ui com primitivos **Radix** (`radix-ui`), estilo padrão, CSS variables em
OKLCH, sem modo escuro. Componentes adicionados via CLI apenas quando usados:

| Componente shadcn | Uso |
|---|---|
| `button` | Todos os CTAs (renderizado como `<a>` via `asChild` quando é link). |
| `sheet` | Menu mobile (FR-003): foco preso, `Esc` fecha, retorno de foco ao gatilho. |
| `accordion` | FAQ (FR-019): `type="multiple"`, botões nativos com `aria-expanded`. |
| `card` | Serviços, produtos, depoimentos, equipe. |
| `badge` | Porte/espécie, forma de compra, origem da avaliação. |
| `separator` | Divisões no rodapé/contato (decorativo). |

**Justificativa**: Radix é a base mais madura e a padrão dos exemplos do shadcn; resolve foco,
teclado e ARIA corretamente (Princípio VIII). Código copiado para `src/components/ui/` permite ajustar
tokens sem fork.

**Cuidado de SEO no FAQ**: por padrão o Radix desmonta o conteúdo fechado. Usar `forceMount` no
`AccordionContent` (com o conteúdo oculto via atributo `hidden`/estado `closed`) para que as
respostas estejam no HTML pré-renderizado. Verificar no `dist/index.html` durante a implementação.

**Alternativas consideradas**: Base UI (`@base-ui/react@1.9.0`, também suportado pelo shadcn) —
boa opção, mas o ecossistema de exemplos/blocks é mais amplo em Radix. `<details>/<summary>`
nativo no FAQ — zero JS, mas o usuário pediu shadcn e o Accordion já fica no bundle de qualquer
forma por causa do Sheet (mesma família de primitivos). Rejeitadas por ora.

---

## R-05. Imagens

**Decisão**: imagens-fonte (JPG/PNG em alta resolução, nomes descritivos em português, ex.:
`banho-cao-porte-medio.jpg`) ficam em `src/assets/images/<seção>/`. São importadas com
`vite-imagetools` gerando AVIF + WebP + JPG de fallback em larguras fixas por papel da imagem, com
saída `picture` (fontes + `img` com `width`/`height`). O componente `ResponsiveImage` renderiza
`<picture>` com `sizes` correto, `loading="lazy"` + `decoding="async"` por padrão, e
`loading="eager"` + `fetchPriority="high"` apenas no hero (LCP).

Perfis de largura (presets):

| Papel | Larguras | Proporção |
|---|---|---|
| `hero` | 480, 768, 1280, 1920 | 4:5 mobile / 16:9 desktop (art direction via `<source media>`) |
| `card` (serviço/produto) | 360, 540, 720 | 4:3 |
| `portrait` (equipe) | 240, 480 | 1:1 |
| `gallery` (espaço) | 480, 960 | 3:2 |

`og-image.jpg` (1200×630) e ícones ficam em `public/` (precisam de URL estável).

**Justificativa**: Princípio IX (formato moderno, dimensionado, `width`/`height`, lazy fora da
primeira tela) e edge case "layout não pula" (CLS ≤ 0,1). Processamento no build evita serviço de
imagens externo e mantém o site 100% estático.

**Alternativas consideradas**: script `sharp` próprio (mais código a manter); CDN de imagens
(custo e dependência externa; reconsiderar com CMS). Rejeitadas.

---

## R-06. Fontes

**Decisão**: **uma** família variável, **Plus Jakarta Sans Variable**, auto-hospedada via
`@fontsource-variable`, apenas subconjunto `latin` (inclui acentos do PT-BR), `font-display: swap`,
`<link rel="preload">` do woff2 latin gerado pelo script de pré-renderização a partir do manifest
do Vite. Fallback com métricas ajustadas (`size-adjust`/`ascent-override`) para reduzir CLS na
troca. Uma segunda família (display, só títulos) é permitida se a identidade da marca exigir —
limite da constituição: 2.

**Justificativa**: Princípio IX (≤ 2 famílias, sem bloquear renderização); auto-hospedar evita
requisição a terceiros (privacidade/LGPD e CSP mais estrita). Sans geométrica e arredondada é
acolhedora sem ser infantil (Princípio V).

**Alternativas consideradas**: Google Fonts CDN (terceiro, CSP mais aberta, sem ganho de cache
entre sites hoje); Inter (neutra demais para a marca). Rejeitadas.

---

## R-07. Estilos e design tokens

**Decisão**: Tailwind v4 CSS-first. Um único ponto de verdade em `src/styles/`:
- `tokens.css`: variáveis CSS semânticas no padrão shadcn (`--background`, `--foreground`,
  `--primary`, `--muted`, `--accent`, `--border`, `--ring`, `--radius`…) + tokens do projeto
  (`--header-height`, cores de marca, sombras) em OKLCH; mapeadas para utilitários via
  `@theme inline`.
- Escala tipográfica fluida (`--text-display`, `--text-h2`… com `clamp()`) declarada em `@theme`.
- `globals.css`: `@import "tailwindcss"`, `tw-animate-css`, tokens, `@layer base` (tipografia base
  16px, `scroll-margin-top: var(--header-height)` em `[id]`, `scroll-behavior: smooth` apenas sob
  `prefers-reduced-motion: no-preference`, estilo de `:focus-visible`).

Regras: estilização só com utilitários que referenciam tokens; **valores arbitrários do Tailwind
(`[…]`), estilos inline (`style={}`) e `!important` são proibidos** (Princípio V/X); variantes de
componente via `cva` dentro do componente, nunca classes duplicadas espalhadas; `cn()` para
composição. Paleta mínima: 1 cor primária (marca), 1 de destaque para CTA, neutros quentes;
todas as combinações texto/fundo verificadas ≥ 4.5:1 (≥ 3:1 para texto grande e bordas de
componentes).

**Justificativa**: Princípio V exige tokens documentados e proíbe valores avulsos; o padrão de
variáveis do shadcn permite re-tematizar todos os componentes trocando só `tokens.css`.

**Alternativas consideradas**: CSS Modules / styled-components (fora do ecossistema shadcn);
`tailwind.config.js` legado (v4 recomenda CSS-first). Rejeitadas.

---

## R-08. Formulários

**Decisão**: **nenhum formulário é implementado nesta entrega.** A especificação define WhatsApp,
telefone e mapa como canais de contato (FR-005…FR-007); não existe requisito de formulário, e o
Princípio I proíbe funcionalidade sem objetivo de negócio. A **estratégia fica definida** para
quando um formulário for especificado (ex.: newsletter, orçamento, agendamento próprio):

- UI: componentes `Field`/`Label`/`Input`/`Textarea` do shadcn; `label` sempre associado;
  erro textual por campo ligado via `aria-describedby` e `aria-invalid`; resumo de erros com foco
  no primeiro inválido; confirmação de envio em região `aria-live="polite"`.
- Estado e validação: React Hook Form + Zod; **o mesmo schema Zod valida no cliente e no
  servidor** e gera o tipo TypeScript (`z.infer`).
- Envio: endpoint serverless do host (o site continua estático) com revalidação no servidor,
  honeypot + limitação de taxa (ou Cloudflare Turnstile), sem armazenar dados além do necessário.
- LGPD: só campos indispensáveis (Princípio III), finalidade declarada ao lado do botão, link para
  o aviso de privacidade, nenhum dado pessoal enviado à ferramenta de análise.
- Progressive enhancement: `<form action method="post">` funcional; JS melhora a experiência.

Dependências (`react-hook-form`, `zod`, `@hookform/resolvers`) **não** são instaladas agora.

**Alternativas consideradas**: implementar formulário de contato "por garantia" — viola Princípio I
e aumenta superfície de ataque e obrigação LGPD sem requisito. Rejeitada.

---

## R-09. Medição de conversão (SC-008) e privacidade

**Decisão**: contrato de eventos agnóstico de provedor ([contracts/analytics-events.md](./contracts/analytics-events.md)).
Cada CTA de contato recebe `data-track="<evento>"` e `data-track-context="<contexto>"`; um único
listener delegado em `src/lib/analytics.ts` traduz o clique em evento. Enquanto o provedor não for
definido, o adaptador é *no-op*. Recomendação: ferramenta **sem cookies** (Plausible ou Umami
auto-hospedado), carregada com `defer`, o que dispensa banner de consentimento intrusivo (FR-032,
FR-011) — o uso continua descrito no aviso de privacidade.

**Justificativa**: SC-008 exige medir cliques; FR-032 exige consentimento não intrusivo se houver
análise; Princípio IX exige scripts de terceiros adiados e justificados.

**Alternativas consideradas**: Google Analytics 4 (cookies → banner de consentimento, mais JS);
sem medição (inviabiliza SC-008). Rejeitadas. **Pendência de negócio**: escolha do provedor.

---

## R-10. Evolução para CMS / painel / dados dinâmicos

**Decisão**: arquitetura em camadas com fronteira explícita de dados:

1. **Tipos** (`src/types/content.ts`): contrato do conteúdo, independente da origem.
2. **Fonte** (`src/content/*.ts`): dados estáticos tipados (`as const satisfies Tipo`).
3. **Carregador** (`src/content/index.ts` → `loadSiteContent(): Promise<SiteContent>`): única porta
   de entrada; já é assíncrono para que trocar por `fetch` de um CMS headless não mude assinaturas.
4. **Páginas** recebem `SiteContent` do carregador (no build) e passam fatias por props.
5. **Seções e componentes são apresentacionais**: nunca importam `src/content/` diretamente.

Imagens são tipadas como `ImageAsset` (fontes + dimensões + alt), não como import do bundler, para
que um CMS possa fornecer URLs equivalentes.

**Caminho de evolução** (sem refatoração caótica):
- CMS headless (Sanity, Strapi, Payload…) → implementar novo `loadSiteContent` que busca e valida
  (Zod) no build; rebuild por webhook. Componentes intactos.
- Muitas páginas/rotas dinâmicas ou área logada → migrar `src/app/routes.ts` para React Router
  (framework mode) ou TanStack Router mantendo `pages/`, `sections/`, `components/`.
- Loja com carrinho → nova feature/especificação; `Product` já tem identidade (`id`/`slug`).

**Alternativas consideradas**: adotar CMS já (sem requisito, custo e complexidade — Princípio I/X);
componentes importando conteúdo direto (acoplamento que tornaria a migração uma refatoração em
todas as seções). Rejeitadas.

---

## R-11. Roteamento das duas páginas

**Decisão**: sem biblioteca de roteamento. `src/app/routes.ts` registra
`[{ path: '/', page: 'home' }, { path: '/privacidade/', page: 'privacy' }]`. O script de
pré-renderização gera um HTML por rota e grava `data-page` no elemento raiz; `entry-client.tsx` lê
`data-page` e hidrata o componente correspondente (página de privacidade carregada por `import()`
dinâmico para não pesar na home).

**Justificativa**: duas páginas estáticas não justificam um roteador (Princípio X). URLs legíveis
(`/privacidade/`) e servíveis por qualquer host estático.

**Alternativas consideradas**: React Router — ver R-10 (evolução futura).

---

## R-12. Segurança

**Decisão** (detalhada em [contracts/security-headers.md](./contracts/security-headers.md)):

- **Cadeia de suprimentos**: pnpm com `pnpm-lock.yaml` versionado, instalação em CI com
  `--frozen-lockfile`; scripts de pós-instalação bloqueados por padrão e liberados só para
  pacotes conhecidos (`onlyBuiltDependencies`, ex.: `sharp` usado pelo imagetools,
  `@tailwindcss/oxide`); `minimumReleaseAge` (≈ 1 dia) para evitar instalar uma versão publicada
  há minutos — protege contra pacotes comprometidos sem abrir mão de usar a última versão
  estável; `pnpm audit --prod` sem vulnerabilidades altas/críticas antes de publicar.
- **Superfície mínima**: site estático, sem backend, sem formulários, sem segredos. `.env*` no
  `.gitignore`; nenhum valor secreto no bundle (todo `VITE_*` é público por definição).
- **XSS**: conteúdo renderizado só como texto pelo React; `dangerouslySetInnerHTML` proibido.
  JSON-LD é montado no script de build com serialização escapada (R-03). URLs de WhatsApp, telefone
  e mapa montadas por funções puras com `encodeURIComponent` e validação de formato.
- **Links externos**: componente `ExternalLink` aplica `target="_blank"` +
  `rel="noopener noreferrer"` sempre (regra da constituição).
- **Cabeçalhos HTTP** via `public/_headers` (formato aceito por Cloudflare Pages e Netlify): CSP
  estrita (`script-src 'self'`, sem `unsafe-eval`, `object-src 'none'`, `frame-ancestors 'none'`),
  HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP.
- **Mapa**: fachada (imagem estática + botão "Ver mapa interativo"); o `iframe` do Google Maps só
  é criado após ação do usuário, com `title`, `loading="lazy"`, `referrerpolicy` e `sandbox`
  mínimo. Melhora performance, privacidade (nenhum cookie de terceiro sem ação) e CSP
  (`frame-src` limitado ao domínio do mapa).
- **Build**: source maps não publicados em produção; HTTPS obrigatório no host.

**Alternativas consideradas**: npm (sem bloqueio de scripts de instalação por padrão nem janela de
maturidade nativa equivalente); iframe do mapa carregado direto (cookies de terceiros e JS pesado
sem ação do usuário). Rejeitadas.

---

## R-13. Hospedagem

**Decisão**: qualquer host estático com HTTPS, CDN e suporte a cabeçalhos customizados.
Recomendação padrão: **Cloudflare Pages** (ou Netlify) — ambos leem `public/_headers` e
oferecem funções serverless para um futuro formulário. O artefato de build é a pasta `dist/`.

**Justificativa**: saída 100% estática; nada no código depende do host além de `_headers`.

**Pendência de negócio**: domínio definitivo (necessário para `canonical`, `og:url`, `sitemap.xml`
e JSON-LD `url`) — configurado em `src/content/site.ts`.

---

## R-14. Qualidade sem testes automatizados

**Decisão**: a constituição (Princípio X) **proíbe testes automatizados**. A qualidade é garantida
por (a) verificações estáticas executadas por script e (b) portões manuais documentados:

- Estáticas (não são testes; são análise/validação de artefatos): `typecheck` (tsc `--noEmit`
  strict), `lint` (ESLint + typescript-eslint com tipos + jsx-a11y + react-hooks), `format:check`
  (Prettier), `check:content` (falha se houver marcador `PENDENTE:` no conteúdo — CR-009),
  `validate:html` (html-validate sobre `dist/`), orçamento de bundle verificado no relatório do build.
- Manuais: os 6 portões da constituição, roteirizados em [quickstart.md](./quickstart.md)
  (viewports de referência, Lighthouse mobile, teclado/leitor de tela/contraste, clique real nos
  CTAs, busca de placeholders/NAP, W3C + Teste de Resultados Avançados).

**Alternativas consideradas**: Vitest/Playwright/axe automatizados — proibidos pela constituição.
Lighthouse CI com asserções — é um teste automatizado de fato; preferido o Lighthouse manual
registrado no checklist.
