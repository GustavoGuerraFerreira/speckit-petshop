# Constituição do Website do Petshop

## Core Principles

### I. Objetivo de Negócio em Cada Funcionalidade

Este é um site comercial real. Ele existe para gerar contato, agendamento e venda — não para
demonstrar técnica.

- Toda funcionalidade, seção ou página MUST declarar, na sua especificação, qual objetivo de
  negócio atende (ex.: gerar contato via WhatsApp, agendar banho e tosa, reforçar confiança,
  ranquear em busca local).
- Funcionalidades sem objetivo de negócio explícito MUST NOT ser implementadas.
- Cada objetivo MUST ter um sinal observável de sucesso (ex.: clique no CTA, envio de
  formulário, ligação iniciada).
- Na dúvida entre adicionar e não adicionar, a resposta padrão é não adicionar.

**Rationale**: escopo sem propósito aumenta custo, peso e confusão sem aumentar resultado.

### II. Confiança Construída com Prova Visível

Confiança não pode ser presumida; ela MUST ser demonstrada com evidências concretas.

- O site MUST transmitir profissionalismo já na primeira tela (above the fold): identidade
  visual clara, proposta de valor objetiva, serviço principal e um CTA de contato visíveis sem
  rolagem, em mobile e desktop.
- O site MUST exibir prova visível e verificável: endereço físico, telefone/WhatsApp, horário
  de funcionamento, fotos reais do espaço e da equipe, avaliações reais de clientes (com nome e
  origem, preferencialmente Google), e diferenciais concretos (ex.: profissionais
  certificados, veterinário responsável, protocolos de higiene).
- Afirmações como "o melhor petshop", "qualidade garantida" ou "atendimento excelente" MUST NOT
  aparecer sem prova que as sustente.
- Depoimentos, números, selos ou fotos fabricados ou de banco de imagens genérico apresentados
  como reais são proibidos.

**Rationale**: o tutor confia o animal de estimação ao negócio; sem prova, não há contato.

### III. Conversão e CTAs Estratégicos

- Toda página MUST ter um CTA principal claro, alinhado à intenção daquela página.
- Os canais de contato prioritários (WhatsApp, telefone, agendamento) MUST estar acessíveis em
  no máximo um toque a partir de qualquer ponto do site no mobile (ex.: botão fixo ou cabeçalho
  persistente).
- CTAs MUST usar texto de ação específico ("Agendar banho e tosa pelo WhatsApp"), nunca
  genérico ("Clique aqui", "Saiba mais" isolado).
- Links de contato MUST funcionar nativamente: `tel:`, `https://wa.me/` com mensagem
  pré-preenchida contextual, e endereço com link para o mapa.
- Formulários MUST pedir apenas os campos indispensáveis, validar com mensagens claras e
  confirmar o envio de forma inequívoca.
- Elementos que competem com o CTA principal (pop-ups intrusivos, carrosséis automáticos,
  excesso de links) MUST NOT ser usados.

**Rationale**: o resultado do site é medido em contatos gerados; cada atrito custa clientes.

### IV. Mobile-First e Clareza Acima de Estética

Um site bonito, mas lento, confuso ou ruim no mobile, é um fracasso.

- Layouts MUST ser projetados primeiro para telas de 360px de largura e depois expandidos.
- Nenhuma página MUST apresentar rolagem horizontal, texto cortado ou elementos sobrepostos em
  larguras de 320px a 1920px.
- Alvos de toque MUST ter no mínimo 44×44px; texto corrido MUST ter no mínimo 16px.
- A navegação MUST permitir que o usuário entenda o que o petshop oferece, onde fica e como
  contatar em até 5 segundos de leitura da primeira tela.
- Hierarquia, legibilidade e objetividade MUST prevalecer sobre efeitos visuais. Animações
  são permitidas apenas quando reforçam a compreensão e MUST respeitar
  `prefers-reduced-motion`.

**Rationale**: a maior parte do público de um petshop local acessa pelo celular, com pressa.

### V. Design Profissional e Consistente

- O projeto MUST possuir um sistema de design único e documentado: paleta de cores, escala
  tipográfica, espaçamentos, raios, sombras e componentes reutilizáveis definidos como tokens.
- Valores visuais avulsos (cores, tamanhos ou espaçamentos fora dos tokens) MUST NOT ser
  usados.
- Componentes equivalentes (botões, cards, títulos de seção) MUST ter aparência e
  comportamento idênticos em todo o site.
- Imagens MUST ser de qualidade profissional, com recorte, proporção e tratamento consistentes.
- O visual MUST ser acolhedor e confiável, adequado a um negócio de cuidado animal; estilos
  infantilizados, poluídos ou desalinhados à marca são proibidos.

**Rationale**: inconsistência visual é percebida como amadorismo e corrói a confiança.

### VI. Conteúdo Real, Específico e Sem Placeholder

- Conteúdos vagos, genéricos ou com cara de placeholder MUST NOT ser publicados. Isso inclui
  lorem ipsum, "Seu texto aqui", serviços sem descrição, preços "a consultar" sem justificativa
  e textos que serviriam a qualquer petshop.
- Cada serviço MUST informar: o que é, para quem é (porte, espécie), o que está incluído,
  duração ou faixa de preço quando aplicável, e como contratar.
- Textos MUST ser escritos em português do Brasil, com tom próximo, claro e profissional,
  respondendo às dúvidas reais do tutor (segurança, cuidados, horários, preços, localização).
- Durante o desenvolvimento, conteúdo ainda não fornecido pelo cliente MUST ser marcado como
  pendência rastreável e MUST NOT chegar à versão publicada.
- Informações de contato (nome, endereço, telefone — NAP) MUST ter uma única fonte de verdade
  no código e ser idênticas em todo o site.

**Rationale**: conteúdo genérico comunica descaso e não converte nem ranqueia.

### VII. SEO Local e Estrutura Semântica

- Cada página MUST ter `title` e `meta description` únicos e descritivos, incluindo serviço e
  localidade quando pertinente.
- Cada página MUST ter exatamente um `<h1>` e hierarquia de títulos sem saltos.
- O HTML MUST usar elementos semânticos (`header`, `nav`, `main`, `section`, `article`,
  `footer`, `address`) em vez de `div` genéricas quando houver elemento adequado.
- O site MUST incluir dados estruturados JSON-LD do tipo `PetStore`/`LocalBusiness` com nome,
  endereço, telefone, horário, geolocalização e link do Perfil da Empresa no Google, coerentes
  com o conteúdo visível.
- O site MUST fornecer URLs legíveis, `sitemap.xml`, `robots.txt`, URL canônica, metadados Open
  Graph e mapa incorporado ou link para rota.
- Imagens MUST ter `alt` descritivo e nomes de arquivo significativos.

**Rationale**: o cliente de petshop busca "petshop perto de mim"; aparecer na busca local é
aquisição de cliente.

### VIII. Acessibilidade como Requisito

Acessibilidade não é melhoria opcional; é critério de aceite.

- O site MUST atender às WCAG 2.2 nível AA.
- Contraste MUST ser no mínimo 4.5:1 para texto normal e 3:1 para texto grande e componentes
  de interface.
- Toda interação MUST ser operável por teclado, com foco visível e ordem lógica.
- Formulários MUST ter `label` associado, mensagens de erro textuais e anunciáveis.
- Informação MUST NOT ser transmitida apenas por cor.
- O idioma da página MUST ser declarado (`lang="pt-BR"`) e o zoom de 200% MUST NOT quebrar o
  layout.
- ARIA MUST ser usado apenas quando o HTML nativo não resolver.

**Rationale**: um site inacessível exclui clientes e transmite falta de cuidado.

### IX. Performance como Critério de Qualidade

Performance faz parte da qualidade, não é otimização posterior.

- Em mobile com rede 4G simulada, cada página MUST atingir: LCP ≤ 2,5s, INP ≤ 200ms,
  CLS ≤ 0,1.
- O Lighthouse (mobile) MUST pontuar no mínimo 90 em Performance, Acessibilidade, Boas
  Práticas e SEO em todas as páginas.
- Imagens MUST ser servidas em formato moderno (WebP/AVIF), dimensionadas para o uso, com
  `width`/`height` definidos e carregamento lento fora da primeira tela.
- Fontes MUST ser limitadas (no máximo 2 famílias) e carregadas sem bloquear a renderização.
- JavaScript MUST ser usado somente quando o HTML e o CSS não resolverem; scripts de terceiros
  (chat, pixels, widgets) MUST ter justificativa de negócio e carregamento adiado.

**Rationale**: cada segundo de espera no celular reduz contatos; lentidão anula o design.

### X. Código Limpo, Simples e Sustentável

- O código MUST seguir princípios de clean code: nomes descritivos, funções e componentes
  pequenos com responsabilidade única, sem duplicação, sem código morto ou comentado.
- A estrutura de pastas MUST ser previsível e separar conteúdo, componentes, estilos e
  recursos estáticos.
- A solução mais simples que atende ao requisito com padrão profissional MUST ser escolhida.
  Dependências, abstrações e camadas novas MUST ser justificadas por necessidade concreta.
- Hacks, improvisos, `!important` sem justificativa, estilos inline ad hoc, números mágicos e
  correções que mascaram a causa são proibidos.
- O projeto MUST NOT conter testes automatizados (unitários, de integração ou E2E). A qualidade
  é garantida pelos portões de revisão manual definidos nesta constituição.
- Formatação e lint MUST ser padronizados e aplicados de forma consistente em todo o código.

**Rationale**: um site comercial precisa ser mantido e evoluído com baixo custo e baixo risco.

## Padrões de Qualidade e Restrições

- **Navegadores suportados**: duas últimas versões de Chrome, Safari (incluindo iOS), Firefox
  e Edge, além do Chrome para Android.
- **Viewports de referência**: 360px, 390px, 768px, 1280px e 1440px.
- **Privacidade**: formulários e ferramentas de análise MUST respeitar a LGPD, com aviso de
  privacidade acessível e coleta mínima de dados.
- **Segurança**: o site MUST ser servido exclusivamente via HTTPS; links externos com
  `target="_blank"` MUST usar `rel="noopener noreferrer"`; segredos MUST NOT ser versionados.
- **Conteúdo mínimo obrigatório**: página inicial, serviços, sobre/equipe, avaliações,
  localização e contato, com rodapé contendo NAP, horário e redes sociais.
- **Proibições explícitas**: placeholders publicados, imagens genéricas apresentadas como
  reais, pop-ups intrusivos, carrosséis automáticos como elemento principal, rolagem
  horizontal no mobile e qualquer funcionalidade sem objetivo de negócio declarado.

## Fluxo de Desenvolvimento e Portões de Qualidade

- Toda especificação (`/speckit-specify`) MUST declarar o objetivo de negócio, o CTA principal
  e a prova de confiança envolvida.
- Todo plano (`/speckit-plan`) MUST passar pelo "Constitution Check", confirmando aderência aos
  princípios I a X e justificando qualquer complexidade adicional.
- Listas de tarefas MUST NOT incluir criação de testes automatizados.
- Antes de considerar uma entrega concluída, MUST ser feita verificação manual documentada:
  1. Revisão visual nas viewports de referência, sem quebras de layout.
  2. Auditoria Lighthouse mobile com as metas do Princípio IX.
  3. Navegação completa por teclado e checagem de contraste.
  4. Clique real em todos os CTAs e links de contato (WhatsApp, telefone, mapa, formulário).
  5. Busca por placeholders, textos genéricos e informações de contato divergentes.
  6. Validação do HTML e dos dados estruturados (validador W3C e Teste de Resultados
     Avançados do Google).
- Uma entrega que falhe em qualquer item acima MUST NOT ser considerada pronta.

## Governance

- Esta constituição prevalece sobre qualquer outra prática, preferência ou template do
  projeto. Em caso de conflito, a constituição vence.
- Emendas MUST ser feitas via `/speckit-constitution`, com justificativa, atualização da versão
  e registro no relatório de impacto.
- Versionamento semântico:
  - **MAJOR**: remoção ou redefinição incompatível de princípio ou regra de governança.
  - **MINOR**: novo princípio ou seção, ou ampliação material de orientação.
  - **PATCH**: esclarecimentos, redação e correções sem mudança de significado.
- Toda revisão de especificação, plano, tarefas ou código MUST verificar conformidade com esta
  constituição. Violações MUST ser corrigidas ou explicitamente justificadas na seção de
  complexidade do plano; exceções não justificadas são rejeitadas.
- A conformidade com esta constituição MUST ser revisada ao fim de cada funcionalidade
  entregue.

**Version**: 1.0.0 | **Ratified**: 2026-10-07 | **Last Amended**: 2026-10-07
