# Contrato: Cabeçalhos HTTP e Política de Segurança

**Arquivo de implementação**: `public/_headers` (formato Cloudflare Pages / Netlify) |
**Requisitos**: seção "Segurança" da constituição, FR-032 (LGPD) | **Decisão**: research R-12

## Cabeçalhos para todas as rotas

```text
/*
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Cross-Origin-Opener-Policy: same-origin
  X-Frame-Options: DENY
```

## Cache

```text
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/*.html
  Cache-Control: public, max-age=0, must-revalidate
```

Arquivos em `/assets/` têm hash no nome (Vite), por isso podem ser imutáveis.

## Ajustes permitidos (com justificativa registrada no plano)

| Situação | Ajuste mínimo |
|---|---|
| HTML pré-renderizado contém atributos `style` emitidos pelos primitivos Radix **e** o `Sheet` (react-remove-scroll) injeta um `<style>` dinâmico ao abrir o menu | `style-src 'self' 'unsafe-inline'` — aplicado (conteúdo dinâmico impede hash/nonce em site estático; `script-src` continua `'self'`) |
| Provedor de analytics escolhido | Domínio do provedor em `script-src` e `connect-src` |
| `preload` de fonte | Já coberto por `font-src 'self'` (auto-hospedada) |

Proibido em qualquer caso: `'unsafe-eval'`, `'unsafe-inline'` em `script-src`, curingas (`*`,
`https:`).

`<script type="application/ld+json">` não é executável e não exige exceção na CSP.

## Regras de código relacionadas

1. `dangerouslySetInnerHTML`, `eval`, `new Function` e `innerHTML` proibidos (lint +
   revisão).
2. Links `target="_blank"` somente via `ExternalLink` (aplica `rel="noopener noreferrer"`).
3. Nenhum segredo no repositório; `.env*` ignorado. Variáveis `VITE_*` são públicas.
4. Source maps não publicados em produção (`build.sourcemap: false`).
5. Dependências: `pnpm install --frozen-lockfile`, `pnpm audit --prod` sem achados altos/críticos,
   scripts de instalação permitidos somente para a lista `onlyBuiltDependencies`.

## Verificação

- Após o deploy: `curl -sI https://<domínio>/` mostra todos os cabeçalhos acima.
- Console do navegador sem violações de CSP navegando pela página, abrindo menu, FAQ e mapa.
- Nota A ou superior em um verificador de cabeçalhos (ex.: securityheaders.com).
