# Contrato: API dos Componentes Compartilhados e das Seções

**Pastas**: `src/components/ui/` (shadcn), `src/components/shared/`, `src/layout/`,
`src/sections/` | **Requisitos**: Princípios V, VIII, X; XR-003…XR-008

## Camadas e regra de dependência

```text
pages/  ──►  layout/ + sections/  ──►  components/shared/  ──►  components/ui/ (shadcn)
   │                                         │                         │
   └──► content/ (só via loadSiteContent)    └──► lib/ (funções puras) ◄┘
```

- Uma camada só importa das camadas à sua direita. `components/ui` não conhece o domínio petshop.
- Subcomponente usado por **uma** seção fica na pasta da seção; ao ser usado por **duas ou mais**,
  é promovido a `components/shared/`.
- Arquivos de `components/ui/` são gerados pela CLI do shadcn; edições locais limitam-se a
  tokens/variantes e são registradas em comentário de cabeçalho do arquivo (para não perder no
  próximo `shadcn add --overwrite`).
- Componentes em PascalCase (`ServiceCard.tsx`), um componente exportado por arquivo, exports
  nomeados (sem `default`, exceto páginas carregadas por `import()`).

## Primitivos compartilhados (`src/components/shared/`)

| Componente | Props principais | Garantias |
|---|---|---|
| `Container` | `as?`, `children` | Largura máxima e gutter laterais pelos tokens; mobile-first. |
| `Section` | `id: SectionId`, `labelledBy`/`heading`, `tone?: 'default' \| 'muted'`, `children` | Renderiza `<section id aria-labelledby>`; espaçamento vertical padronizado; `scroll-margin-top` via token (XR-008). |
| `SectionHeading` | `id`, `eyebrow?`, `title`, `description?`, `align?` | Sempre `h2` (FR-026); nunca usado no hero. |
| `ResponsiveImage` | `image: ImageAsset`, `sizes`, `priority?: boolean`, `className?` | `<picture>` com AVIF/WebP/fallback, `width`/`height`; `priority` ⇒ `loading="eager" fetchPriority="high"`, senão `lazy`. `alt` vem do `ImageAsset`. |
| `WhatsAppButton` | `message: string`, `context: string`, `label?`, `variant?`, `size?` | `Button asChild` + `<a>` com `buildWhatsAppUrl`, `data-track`, aviso de nova aba para leitor de tela; rótulo padrão "Agendar pelo WhatsApp". |
| `PhoneLink` | `phone: PhoneNumber`, `context`, `variant?: 'button' \| 'inline'` | `tel:`; exibe `phone.display`. |
| `DirectionsLink` | `query: string`, `context` | Link "Como chegar" (contrato [contact-links.md](./contact-links.md)). |
| `ExternalLink` | `href`, `children`, `ariaLabel?` | Força `target="_blank" rel="noopener noreferrer"` e aviso de nova aba. Único jeito permitido de abrir nova aba. |
| `RatingStars` | `value: number`, `max?: 5` | Estrelas decorativas `aria-hidden` + texto "Nota 4,9 de 5" (informação não só visual). |
| `TrustSignalList` | `signals: TrustSignal[]` | Lista `<ul>` de provas de valor. |
| `OpeningHoursTable` | `hours`, `specialHours?` | `<table>` semântica (dia × horário), destaque do dia atual só após hidratação (sem divergência SSR). |
| `BusinessAddress` | `business` | `<address>` com endereço formatado, telefone, WhatsApp, e-mail. Usado no contato e no rodapé (FR-022). |
| `VisuallyHidden` | `children` | Texto apenas para leitor de tela (classe `sr-only`). |
| `icon-map.ts` | — | Mapa `IconName → componente Lucide`; ícones decorativos sempre `aria-hidden`. |

## Layout (`src/layout/`)

| Componente | Responsabilidade |
|---|---|
| `PageShell` | `SkipLink` + `SiteHeader` + `<main id="conteudo">` + `SiteFooter` + `FloatingWhatsApp`. |
| `SkipLink` | "Pular para o conteúdo", primeiro elemento focável, visível ao receber foco. |
| `SiteHeader` | `<header>` sticky (altura = `--header-height`), logo (link para `#inicio`), `<nav aria-label="Principal">` com âncoras no desktop, `WhatsAppButton` compacto, `MobileNav` abaixo de `md`. |
| `MobileNav` | shadcn `Sheet`; gatilho `<button aria-label="Abrir menu">` 44×44; fecha ao selecionar item (FR-003). |
| `SiteFooter` | `<footer>`: NAP (`BusinessAddress`), horário, redes, links das seções, CNPJ/razão social, link `/privacidade/`, © ano do build (FR-023). |
| `FloatingWhatsApp` | Somente `< md`; `position: fixed` canto inferior; oculto quando hero CTA ou `#contato` visíveis (FR-008); o `PageShell` reserva espaço inferior equivalente no mobile para não cobrir conteúdo. |

## Seções (`src/sections/<secao>/`)

Cada seção é **apresentacional**: recebe sua fatia de `SiteContent` (e `business` quando precisa de
NAP/mensagens) por props, não busca dados, não guarda estado global.

| Seção (`id`) | Componente | Props | Subcomponentes locais |
|---|---|---|---|
| Hero (`inicio`) | `HeroSection` | `hero`, `business` | — (único `h1`; imagem `priority`) |
| Sobre (`sobre`) | `AboutSection` | `about` | `TeamMemberCard`, `SpaceGallery` (grade estática, sem carrossel automático) |
| Diferenciais (`diferenciais`) | `DifferentialsSection` | `differentials`, `business` | `DifferentialItem` |
| Serviços (`servicos`) | `ServicesSection` | `services`, `business` | `ServiceCard` (nome h3, espécie/porte em `Badge`, inclusos em `<ul>`, duração, "a partir de" + fatores, CTA contextual) |
| Produtos (`produtos`) | `ProductsSection` | `products`, `business` | `ProductCard`, `BrandList` |
| Avaliações (`avaliacoes`) | `TestimonialsSection` | `testimonials`, `business` | `TestimonialCard` (`<article>` + `<blockquote>` + `<cite>`) |
| Dúvidas (`duvidas`) | `FaqSection` | `faq`, `business` | `Accordion` shadcn (`type="multiple"`, `forceMount`), CTA final |
| Contato (`contato`) | `ContactSection` | `business` | `MapFacade`, `OpeningHoursTable`, `BusinessAddress` |

## Interatividade e JavaScript

Somente estes componentes usam estado/efeitos no cliente: `MobileNav`, `FaqSection` (Accordion),
`MapFacade`, `FloatingWhatsApp`, destaque do dia em `OpeningHoursTable` e o listener de
`analytics`. Todo o resto é HTML estático hidratado sem efeitos.

## Acessibilidade obrigatória por componente

- Foco visível com o token `--ring` (≥ 3:1) em todo elemento interativo; nunca `outline: none` sem
  substituto.
- Alvos de toque ≥ 44×44px (`size` mínimo dos botões definido no `cva` do `Button`).
- Ícones sem texto têm `aria-label` no controle; ícones decorativos `aria-hidden`.
- Nenhuma informação só por cor (badges com texto; estado do accordion com ícone + `aria-expanded`).
- Animações com `motion-safe:`/`motion-reduce:` (XR-007).
