# Contrato: Esquema de Conteúdo

**Arquivo de implementação**: `src/types/content.ts` | **Consumidores**: `src/content/index.ts`,
`src/pages/**`, `src/seo/**` | **Semântica dos campos**: [data-model.md](../data-model.md)

Este é o contrato entre a **origem do conteúdo** (hoje arquivos estáticos; amanhã um CMS) e a
**apresentação**. Mudanças aqui são mudanças de contrato: exigem atualização do data-model e
revisão de todas as seções consumidoras.

## Porta de entrada

```ts
// src/content/index.ts
export function loadSiteContent(): Promise<SiteContent>;
```

- Chamado **apenas** no build (`entry-server.tsx` / `scripts/prerender.ts`) e passado como props.
- Assíncrono desde já: a troca por CMS altera só a implementação.
- Seções e componentes **MUST NOT** importar de `src/content/`.

## Forma raiz

```ts
export type SiteContent = Readonly<{
  site: SiteConfig;
  business: Business;
  navigation: readonly NavItem[];
  hero: HeroContent;
  about: AboutContent;
  differentials: readonly Differential[];
  services: readonly Service[];
  products: ProductsContent;
  testimonials: readonly Testimonial[];
  faq: readonly FaqItem[];
  privacy: PrivacyContent;
}>;

export type SectionId =
  | 'inicio' | 'sobre' | 'diferenciais' | 'servicos'
  | 'produtos' | 'avaliacoes' | 'duvidas' | 'contato';
```

Os demais tipos (`Business`, `Service`, `ImageAsset`…) seguem campo a campo as tabelas do
[data-model.md](../data-model.md). Uniões literais (espécie, porte, dia, origem, intenção de CTA)
são tipos exportados reutilizados pelos componentes, nunca `string` solto.

## Regras de tipagem do projeto

- `strict: true`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
  `verbatimModuleSyntax`, `noImplicitOverride`; `any` proibido (lint).
- `type` para dados e props; `interface` não é usada (uma convenção só).
- Props de componente: `type <Componente>Props = { … }`, exportado junto do componente; estender
  props nativas com `React.ComponentProps<'a'>` quando o componente envolve um elemento HTML.
- Arquivos de conteúdo usam `as const satisfies <Tipo>` — checa o contrato sem perder literais.
- Valores derivados (anos de atuação, endereço formatado, rótulos PT-BR de dia/porte/espécie,
  preço formatado) são funções em `src/lib/`, nunca campos duplicados.
- Ícones de diferenciais: `IconName` é uma união fechada mapeada para componentes do
  `lucide-react` em um único arquivo (`src/components/shared/icon-map.ts`), evitando importar a
  biblioteca inteira.

## Evolução para CMS (compatibilidade)

| Hoje | Com CMS |
|---|---|
| `src/content/*.ts` tipados por `satisfies` | Resposta da API validada por schema Zod que produz o **mesmo** `SiteContent` |
| `ImageAsset` gerado pelo `vite-imagetools` | `ImageAsset` montado a partir da URL/dimensões do CMS ou CDN de imagens |
| Marcador `PENDENTE:` | Campo obrigatório vazio no CMS falha a validação do build |
