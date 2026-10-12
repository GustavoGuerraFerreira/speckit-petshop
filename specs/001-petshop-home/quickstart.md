# Quickstart & Validação: Home Page Comercial do Petshop

**Feature**: `001-petshop-home` | **Plano**: [plan.md](./plan.md)

Guia para rodar o projeto e executar as validações que provam que a feature funciona. Não há
testes automatizados (constituição, Princípio X); a validação combina verificações estáticas por
script e os portões manuais da constituição.

## Pré-requisitos

- Node.js **24 LTS** (a máquina atual tem 20.20.2 — atualizar; `vite-imagetools` exige ≥ 22).
- pnpm 12 (`corepack enable && corepack prepare pnpm@latest --activate`).
- Google Chrome (Lighthouse e DevTools), leitor de tela (NVDA/Orca no desktop, TalkBack/VoiceOver
  no celular), um celular Android ou iOS real com WhatsApp instalado.

## Setup

> Nesta máquina, o Node 24 foi instalado em `~/.local/share/node/node-v24.21.0-linux-x64/` (o do
> sistema continua 20.20.2). Antes dos comandos abaixo:
> `export PATH=~/.local/share/node/node-v24.21.0-linux-x64/bin:$PATH` — ou instale o Node 24 com
> o gerenciador de versões de sua preferência (o projeto tem `.nvmrc`).

```bash
pnpm install --frozen-lockfile
pnpm dev                          # http://localhost:5173 — conteúdo PENDENTE visível para revisão
ALLOW_PENDING=1 pnpm build        # build de revisão local com conteúdo pendente
pnpm preview                      # serve dist/client em http://localhost:4173
```

## Scripts

| Script | O que faz | Critério de aprovação |
|---|---|---|
| `pnpm typecheck` | `tsc --noEmit` em modo estrito | 0 erros |
| `pnpm lint` | ESLint (typescript-eslint com tipos, jsx-a11y, react-hooks) | 0 erros, 0 avisos |
| `pnpm format:check` | Prettier + ordenação de classes Tailwind | sem diferenças |
| `pnpm check:content` | Procura `PENDENTE:` em `src/content/` e nomes `pendente-*` em imagens | 0 ocorrências (bloqueia publicação — CR-009) |
| `pnpm build` | `check:content` → build cliente → build SSR → `scripts/prerender.ts` (HTML de `/` e `/privacidade/`, head, JSON-LD, sitemap) | conclui sem erros |
| `pnpm validate:html` | html-validate sobre `dist/**/*.html` | 0 erros |
| `pnpm preview` | Serve `dist/` localmente | — |
| `pnpm validate` | Executa todos acima em sequência | tudo verde |
| `pnpm audit --prod` | Vulnerabilidades em dependências de produção | 0 altas/críticas |

Orçamentos verificados no relatório do `pnpm build` (tamanho gzip):
JS inicial da home ≤ 120 KB; CSS ≤ 25 KB; imagem LCP (hero mobile) ≤ 120 KB; fonte ≤ 50 KB.

## Verificações rápidas pós-build

```bash
# Conteúdo e SEO presentes no HTML sem JavaScript
grep -c '<h1' dist/index.html                       # → 1
grep -o '<title>[^<]*' dist/index.html              # → serviço + bairro/cidade + marca
grep -c 'application/ld+json' dist/index.html       # → 2 (PetStore + FAQPage)
grep -c 'data-track="whatsapp_click"' dist/index.html  # → ≥ 1 por seção com CTA
test -f dist/privacidade/index.html && test -f dist/sitemap.xml && echo ok

# Nenhum NAP fora da fonte única (substituir pelo telefone real)
grep -rn "98765-4321" src --include=*.ts --include=*.tsx | grep -v src/content/business.ts   # → vazio
```

Abrir `pnpm preview` com JavaScript desativado (DevTools → Disable JavaScript): todo o conteúdo,
FAQ com respostas no HTML e todos os links de contato devem estar presentes e funcionais.

## Cenários de validação manual

Executar em `pnpm preview` (produção local) e, antes da entrega, na URL publicada. Registrar
resultado e data em `specs/001-petshop-home/checklists/`.

### V1 — Primeira tela e agendamento (US1, FR-009, FR-015, XR-002)

1. DevTools em 360×800 (e celular real). Recarregar.
2. **Esperado** sem rolar: logo/nome, h1 com serviço + localidade + espécie, ≥ 2 provas de valor,
   botão "Agendar pelo WhatsApp" como elemento de maior destaque.
3. Tocar no botão (celular real) → WhatsApp abre com o número oficial e mensagem pronta.
4. Rolar até a metade → botão flutuante de WhatsApp visível, sem cobrir texto/botões; some ao
   chegar em `#contato`.

### V2 — Serviço contextual (US2, FR-012)

1. Menu → "Serviços". Título da seção visível, não escondido pelo header (XR-008).
2. **Esperado** em cada card: nome, espécie/porte, inclusos, duração, "a partir de R$ …" e fatores.
3. CTA de um serviço → mensagem do WhatsApp cita o nome do serviço.

### V3 — Confiança (US3, FR-016…FR-018)

Avaliador externo percorre Sobre, Diferenciais e Avaliações e cita 3 fatos verificáveis.
Depoimentos mostram nome, nota em texto, origem e link "Ver todas as avaliações" para o Google.

### V4 — Localização e horário (US4, FR-006, FR-007, FR-021)

1. A partir do topo, chegar ao horário de sábado em ≤ 2 interações.
2. "Como chegar" abre o app de mapas com o destino correto; telefone inicia ligação.
3. "Ver mapa interativo" carrega o mapa; com rede bloqueada para `google.com`, endereço e
   "Como chegar" continuam visíveis.

### V5 — Produtos (US5, FR-013, FR-014)

Cards com foto, nome, uso, forma de compra; marcas listadas; CTA → mensagem cita o produto e pede
disponibilidade.

### V6 — FAQ (US6, FR-019, FR-020)

Abrir/fechar perguntas por toque e por teclado (Tab + Enter/Espaço); estado indicado por ícone e
anunciado pelo leitor de tela; CTA "Ainda tem dúvidas? Fale conosco" ao final.

### V7 — Responsividade (XR-001, Princípio IV)

Larguras 320, 360, 390, 768, 1280, 1440, 1920 + zoom 200% em 1280: sem rolagem horizontal,
texto cortado ou sobreposição; fotos sem distorção; menu correto em cada breakpoint.

### V8 — Acessibilidade (XR-005, Princípio VIII)

1. Somente teclado: skip link é o primeiro foco; ordem lógica; foco sempre visível; menu mobile
   prende o foco e `Esc` fecha retornando o foco ao botão.
2. Leitor de tela: landmarks (`banner`, `navigation`, `main`, `contentinfo`), um h1, h2 por seção,
   imagens com alt descritivo, decorativas ignoradas, links de nova aba anunciados.
3. Contraste: DevTools/axe DevTools (extensão, uso manual) sem falhas; `prefers-reduced-motion`
   emulado desativa animações e rolagem suave.

### V9 — Performance e qualidade (SC-006, Princípio IX)

Lighthouse mobile (modo navegação, throttling padrão) na URL publicada, 3 execuções, mediana:
Performance, Acessibilidade, Boas Práticas e SEO ≥ 90; LCP ≤ 2,5 s; CLS ≤ 0,1; TBT baixo (INP
validado no campo/DevTools Performance ≤ 200 ms ao abrir menu e FAQ).

### V10 — SEO local e segurança (SC-009, constituição)

1. Validador W3C (Nu HTML Checker) na URL publicada: 0 erros.
2. Teste de Resultados Avançados do Google: `LocalBusiness/PetStore` válido; dados idênticos aos
   visíveis.
3. Prévia do link colado no WhatsApp mostra título, descrição e imagem.
4. `curl -sI https://<domínio>/` mostra os cabeçalhos de
   [contracts/security-headers.md](./contracts/security-headers.md); console sem violações de CSP.
5. Busca manual por placeholders, superlativos sem prova e NAP divergente (SC-007).
