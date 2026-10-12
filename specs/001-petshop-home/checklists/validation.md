# Registro de Validação: Home Page Comercial do Petshop

**Feature**: `001-petshop-home` | **Roteiro**: [quickstart.md](../quickstart.md)

Registro dos portões de qualidade da constituição. Cada linha informa data, ambiente e resultado.
"Pendente" significa que o portão ainda não foi executado; a entrega **não** está pronta enquanto
houver pendências (constituição, "Fluxo de Desenvolvimento e Portões de Qualidade").

## Pré-validação técnica — 2026-10-12

Ambiente: build de revisão (`ALLOW_PENDING=1 pnpm build`) servido por `pnpm preview`, Chrome
headless, conteúdo ainda com marcadores `PENDENTE:`.

| Verificação | Resultado |
|---|---|
| `pnpm typecheck` | ✅ 0 erros |
| `pnpm lint` (typescript-eslint com tipos, jsx-a11y strict, react-hooks) | ✅ 0 erros, 0 avisos |
| `pnpm format:check` | ✅ sem diferenças |
| `pnpm check:content` (estrito) | ⛔ 144 pendências — bloqueia a publicação, como esperado (CR-009) |
| `pnpm validate:html` | ⚠️ 1 erro: `long-title`, por causa dos marcadores `PENDENTE:` no título |
| `pnpm audit --prod` | ✅ nenhuma vulnerabilidade conhecida |
| HTML sem JavaScript | ✅ 1 `h1`, 9 `h2`, 2 blocos JSON-LD (`PetStore`, `FAQPage`), 20 links `wa.me`, respostas do FAQ presentes no HTML |
| Rolagem horizontal (320, 360, 390, 768, 1280, 1440, 1920 e zoom de 200%) | ✅ nenhuma |
| CTA do hero visível sem rolar em 360×800 | ✅ |
| Botão flutuante de WhatsApp | ✅ oculto no topo e em `#contato`, visível no meio da página |
| Menu mobile | ✅ abre, fecha com `Esc`, devolve o foco ao gatilho, fecha ao escolher um item e rola até a seção com o título visível abaixo do header |
| FAQ | ✅ resposta oculta quando fechada, `aria-expanded="true"` ao abrir |
| Fachada do mapa | ✅ o `iframe` só aparece após o clique |
| Mensagem contextual | ✅ "Olá! Vim pelo site e gostaria de agendar *Tosa na tesoura*." |
| Links `target="_blank"` sem `rel="noopener noreferrer"` | ✅ 0 |
| Console do navegador (home e privacidade) | ✅ sem erros nem avisos de hidratação |
| CSP de `public/_headers` aplicada (menu, FAQ, mapa) | ✅ sem violações |
| Lighthouse mobile local (preview) | ✅ Performance 98 · Acessibilidade 100 · Boas Práticas 100 · SEO 100 · LCP 2,3 s · CLS 0 · TBT 40 ms |
| Orçamentos (gzip) | ✅ JS 118 KB (≤ 120) · CSS 11,5 KB (≤ 25) · fonte latin 27 KB (≤ 50) · imagem LCP: medir com a foto real |

## Portões da constituição

| # | Portão | Status |
|---|---|---|
| 1 | Revisão visual nas viewports de referência (360, 390, 768, 1280, 1440) | Pré-validado com conteúdo provisório; refazer com conteúdo real |
| 2 | Lighthouse mobile ≥ 90 nas 4 categorias | Pendente na URL publicada (local: aprovado) |
| 3 | Navegação completa por teclado e checagem de contraste | Contraste aprovado nos tokens (ver `src/styles/tokens.css`); teclado completo pendente (pessoa) |
| 4 | Clique real em todos os CTAs (WhatsApp, telefone, mapa) | Pendente — celular real e número oficial |
| 5 | Busca por placeholders, textos genéricos e NAP divergente | NAP: ✅ só em `src/content/business.ts`. Placeholders: ⛔ 144 pendências |
| 6 | W3C (Nu HTML Checker) e Teste de Resultados Avançados | Pendente na URL publicada |
