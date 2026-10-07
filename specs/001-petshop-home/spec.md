# Feature Specification: Home Page Comercial do Petshop

**Feature Branch**: `001-petshop-home`

**Created**: 2026-10-07

**Status**: Draft

**Input**: User description: "Crie a especificação de uma página completa, profissional e comercial
para um petshop, com foco em transmitir confiança, apresentar os serviços e produtos do negócio e
aumentar a geração de contatos e agendamentos."

## Visão Geral

### Objetivo principal da página

Converter visitantes que procuram um petshop confiável na região em **contatos e agendamentos**
(principalmente via WhatsApp e telefone), demonstrando com provas concretas que o negócio é real,
organizado e cuidadoso com os animais.

**Objetivo de negócio (Princípio I)**: aumentar o número de agendamentos de serviços e de pedidos
de produtos iniciados a partir do site.
**CTA principal**: "Agendar pelo WhatsApp".
**CTAs secundários**: "Ligar agora", "Ver serviços", "Como chegar".

### Perfil do público

- **Tutor local de cães e gatos** (perfil principal): 25–55 anos, mora ou trabalha a até ~5 km do
  petshop, acessa majoritariamente pelo celular, frequentemente a partir de uma busca no Google ou
  no Google Maps ("petshop perto de mim", "banho e tosa em [bairro]").
- **Tutor cauteloso / primeira vez**: tem animal idoso, filhote, ansioso ou de raça sensível;
  precisa de segurança antes de confiar o pet a desconhecidos.
- **Cliente recorrente**: já conhece o petshop e quer apenas o contato, o horário ou o endereço
  rapidamente.
- **Comprador de produtos**: quer saber se o petshop vende ração, petiscos, acessórios ou
  medicamentos e se há entrega ou retirada.

### Principais necessidades do usuário

1. Entender em poucos segundos o que o petshop oferece e onde fica.
2. Saber quais serviços existem, para quais animais/portes, o que incluem e quanto custam
   (ao menos faixa de preço).
3. Saber se há produtos à venda e como comprá-los.
4. Ter segurança de que o animal será bem tratado (equipe, estrutura, protocolos, avaliações).
5. Entrar em contato ou agendar com o mínimo de esforço.
6. Saber endereço, horário de funcionamento e como chegar.
7. Tirar dúvidas comuns sem precisar perguntar (vacinas, tempo de serviço, busca e entrega).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Entender a proposta e agendar pelo WhatsApp (Priority: P1)

Uma tutora encontra o petshop no Google pelo celular. Ao abrir a página, entende imediatamente que
se trata de um petshop de banho, tosa e cuidados na sua região, vê sinais de confiança (nota de
avaliação, anos de atuação, equipe) e toca em "Agendar pelo WhatsApp". O WhatsApp abre com uma
mensagem pronta e ela envia o pedido de agendamento.

**Why this priority**: é o fluxo de maior valor de negócio; sozinho já gera agendamentos.

**Independent Test**: abrir a página em um celular, ler a primeira tela por 5 segundos, descrever
o negócio e iniciar uma conversa no WhatsApp com mensagem pré-preenchida, sem rolar a página.

**Acceptance Scenarios**:

1. **Given** um visitante no celular (largura de 360px), **When** a página carrega, **Then** a
   primeira tela exibe, sem rolagem: nome/marca, proposta de valor com tipo de serviço e
   localidade, ao menos uma prova de confiança e o botão "Agendar pelo WhatsApp".
2. **Given** o visitante tocou em "Agendar pelo WhatsApp", **When** o WhatsApp abre, **Then** a
   conversa é com o número oficial do petshop e contém uma mensagem pronta de agendamento.
3. **Given** o visitante rolou até o meio da página, **When** decide entrar em contato, **Then**
   um acesso ao WhatsApp e ao telefone está disponível a no máximo um toque.

---

### User Story 2 - Avaliar serviços e escolher o adequado (Priority: P1)

Um tutor quer saber se o petshop faz tosa na tesoura para o seu cão de porte médio, quanto custa e
quanto tempo leva. Ele acessa a seção de serviços, encontra a informação e toca no CTA do próprio
serviço, que abre o WhatsApp com a mensagem já mencionando aquele serviço.

**Why this priority**: o serviço é o principal produto do negócio; sem clareza, não há
agendamento qualificado.

**Independent Test**: a partir da primeira tela, chegar à seção de serviços, identificar
descrição, porte atendido, itens incluídos e faixa de preço de um serviço e iniciar o contato
contextual desse serviço.

**Acceptance Scenarios**:

1. **Given** o visitante na seção de serviços, **When** lê um serviço, **Then** vê o nome, para
   quais animais/portes é indicado, o que está incluído, duração estimada e preço ou faixa de
   preço "a partir de".
2. **Given** o visitante toca no CTA de um serviço específico, **When** o WhatsApp abre, **Then**
   a mensagem pronta cita o nome desse serviço.

---

### User Story 3 - Construir confiança antes do primeiro contato (Priority: P1)

Uma tutora de um gato idoso e ansioso tem receio de deixá-lo em um lugar desconhecido. Ela lê
sobre a história do petshop, a equipe e suas qualificações, os protocolos de cuidado, vê fotos
reais do espaço e lê avaliações de outros clientes antes de decidir agendar.

**Why this priority**: para o tutor cauteloso, a confiança é pré-requisito do contato; sem prova
visível a conversão não acontece (Princípio II).

**Independent Test**: um avaliador que não conhece o negócio consegue citar, após percorrer as
seções institucional, de diferenciais e de depoimentos, ao menos 3 fatos concretos e verificáveis
que justificam confiar no petshop.

**Acceptance Scenarios**:

1. **Given** o visitante na seção institucional, **When** a lê, **Then** encontra história ou ano
   de fundação, fotos reais do espaço e da equipe e o nome e a função dos profissionais principais.
2. **Given** o visitante na seção de depoimentos, **When** lê as avaliações, **Then** cada uma
   exibe nome do cliente, nota, origem (ex.: Google) e há um link para ver todas as avaliações na
   fonte original.
3. **Given** o visitante na seção de diferenciais, **When** a lê, **Then** cada diferencial é
   concreto e verificável (ex.: "Secagem sem gaiola de calor", "Profissionais com certificação em
   tosa"), nunca genérico ("atendimento de qualidade").

---

### User Story 4 - Encontrar localização e horário (Priority: P2)

Um cliente recorrente quer saber se o petshop está aberto no sábado à tarde e como chegar. Ele vai
direto à seção de contato (ou ao rodapé), vê o horário, o endereço completo, o mapa e toca em
"Como chegar", que abre a rota no aplicativo de mapas.

**Why this priority**: necessidade frequente e de alta intenção, mas posterior à decisão de
contratar.

**Independent Test**: a partir de qualquer ponto da página, encontrar horário de sábado e abrir a
rota até o petshop em no máximo 2 interações.

**Acceptance Scenarios**:

1. **Given** o visitante em qualquer ponto da página, **When** usa o menu ou rola até o contato,
   **Then** vê endereço completo, telefone, WhatsApp, e-mail e horário por dia da semana.
2. **Given** o visitante toca em "Como chegar", **When** a ação é executada, **Then** o aplicativo
   ou site de mapas abre com o endereço do petshop como destino.
3. **Given** o visitante toca no número de telefone, **When** está no celular, **Then** a ligação
   é iniciada.

---

### User Story 5 - Descobrir produtos à venda (Priority: P2)

Uma tutora quer saber se pode comprar a ração do seu cão no petshop. Ela vê a seção de produtos em
destaque, identifica categorias e marcas disponíveis e toca em "Consultar disponibilidade", que
abre o WhatsApp mencionando o produto.

**Why this priority**: gera receita adicional e recorrência, mas é secundário ao serviço.

**Independent Test**: identificar ao menos uma categoria de produto, uma marca trabalhada e a
forma de compra (retirada/entrega) e iniciar contato sobre um produto.

**Acceptance Scenarios**:

1. **Given** o visitante na seção de produtos, **When** a lê, **Then** vê produtos ou categorias
   em destaque com foto real, nome, indicação de uso e forma de adquirir.
2. **Given** o visitante toca no CTA de um produto, **When** o WhatsApp abre, **Then** a mensagem
   pronta cita o produto ou a categoria.

---

### User Story 6 - Tirar dúvidas antes de contratar (Priority: P3)

Um tutor quer saber se precisa apresentar a carteira de vacinação e se o petshop busca o animal em
casa. Ele abre a seção de perguntas frequentes, encontra as respostas e, ao final, vê um convite
para falar com a equipe caso a dúvida persista.

**Why this priority**: reduz atrito e perguntas repetidas, mas não é decisivo sozinho.

**Independent Test**: encontrar a resposta para "Preciso levar a carteira de vacinação?" em menos
de 30 segundos a partir da primeira tela.

**Acceptance Scenarios**:

1. **Given** o visitante na seção de FAQ, **When** expande uma pergunta, **Then** a resposta é
   exibida de forma completa e objetiva, sem recarregar a página.
2. **Given** o visitante leu as perguntas, **When** chega ao fim da seção, **Then** encontra um
   CTA para falar com a equipe pelo WhatsApp.

---

### Edge Cases

- **Fora do horário de atendimento**: o CTA de WhatsApp continua disponível e a página deixa claro
  o horário de resposta (ex.: "Respondemos a partir das 8h"), evitando a expectativa de resposta
  imediata.
- **Visitante no desktop sem WhatsApp instalado**: o CTA abre o WhatsApp Web; o telefone é
  exibido como texto legível e copiável.
- **Mapa incorporado não carrega** (bloqueio, conexão lenta): endereço em texto e o link "Como
  chegar" permanecem visíveis e funcionais.
- **Imagens não carregam ou conexão lenta**: textos, CTAs e dados de contato permanecem
  utilizáveis; o layout não "pula" quando as imagens chegam.
- **Telas muito estreitas (320px) ou zoom de 200%**: nenhum conteúdo é cortado e não há rolagem
  horizontal.
- **Navegação apenas por teclado ou leitor de tela**: todas as seções, o menu, o FAQ e os CTAs são
  alcançáveis e anunciados corretamente.
- **Preço variável por porte/pelagem**: o serviço mostra o preço "a partir de" e explica do que
  depende, em vez de omitir o preço.
- **Produto sem estoque**: a seção de produtos não promete disponibilidade imediata; o CTA é de
  consulta de disponibilidade.
- **Feriados ou horário especial**: o horário exibido deve permitir uma observação de horário
  especial sem quebrar o layout.
- **Usuário com movimento reduzido ativado**: animações não essenciais são desativadas.

## Seções obrigatórias da home

A ordem abaixo é a ordem de exibição na página. Cada seção existe para um objetivo de negócio.

| # | Seção | Objetivo da seção | Conteúdo mínimo | CTA |
|---|-------|-------------------|-----------------|-----|
| 0 | Cabeçalho | Orientar e manter o contato sempre acessível | Logo, menu âncora para as seções, botão de WhatsApp | Agendar pelo WhatsApp |
| 1 | Principal (hero) | Fazer o visitante entender o negócio em até 5s e agir | Título com serviço + localidade, subtítulo com benefício, foto real, 2–3 provas de valor (ex.: nota no Google e nº de avaliações, anos de atuação, nº de pets atendidos) | Agendar pelo WhatsApp; Ver serviços |
| 2 | Institucional (Sobre) | Mostrar que é um negócio real e quem cuida do animal | História/ano de fundação, missão em linguagem concreta, fotos reais do espaço e da equipe, nomes e funções | Conhecer os serviços |
| 3 | Diferenciais | Responder "por que este petshop e não outro" | 4–6 diferenciais concretos e verificáveis, com ícone ou foto | Agendar pelo WhatsApp |
| 4 | Serviços | Apresentar o que pode ser contratado e qualificar o pedido | Por serviço: nome, espécie/porte, itens incluídos, duração estimada, preço "a partir de", foto real | Agendar este serviço (contextual) |
| 5 | Produtos em destaque | Mostrar que há loja e gerar pedidos | 4–8 produtos ou categorias com foto real, marcas trabalhadas, forma de compra (retirada/entrega) | Consultar disponibilidade (contextual) |
| 6 | Prova social / Depoimentos | Validar a confiança com a voz de clientes reais | 3–6 avaliações reais com nome, nota e origem; nota média e total de avaliações; link para a fonte | Ver todas as avaliações; Agendar |
| 7 | Perguntas frequentes | Eliminar objeções e dúvidas operacionais | 6–10 perguntas reais (vacinas, tempo de serviço, busca e entrega, pagamento, animais agressivos/ansiosos, cancelamento) | Ainda tem dúvidas? Fale conosco |
| 8 | Contato e localização | Facilitar o contato e a visita | Endereço completo, mapa, horário por dia, telefone, WhatsApp, e-mail, redes sociais | WhatsApp; Ligar; Como chegar |
| 9 | Rodapé | Consolidar as informações e reforçar SEO local | Nome, endereço, telefone, horário, redes sociais, links das seções, CNPJ/razão social, aviso de privacidade, ano de copyright | — |

Além das seções, a página MUST oferecer um **acesso de contato persistente no mobile** (ex.: botão
fixo de WhatsApp) visível durante toda a rolagem, sem cobrir conteúdo ou outros CTAs.

## Requirements *(mandatory)*

### Requisitos funcionais

**Estrutura e navegação**

- **FR-001**: A página MUST conter as seções 0 a 9 da tabela de seções obrigatórias, na ordem
  definida.
- **FR-002**: O cabeçalho MUST conter um menu que leva a cada seção principal (Sobre, Serviços,
  Produtos, Avaliações, Dúvidas, Contato) com rolagem até a seção correspondente.
- **FR-003**: No mobile, o menu MUST ser recolhível, abrir e fechar por toque e teclado e fechar
  automaticamente ao selecionar um item.
- **FR-004**: Cada seção MUST ter um endereço próprio (âncora) que pode ser compartilhado e abre a
  página já posicionada na seção.

**Contato e conversão**

- **FR-005**: Todos os CTAs de WhatsApp MUST abrir uma conversa com o número oficial do petshop com
  mensagem pré-preenchida adequada ao contexto (geral, serviço específico, produto específico,
  dúvida).
- **FR-006**: O número de telefone MUST ser clicável e iniciar a ligação em dispositivos móveis.
- **FR-007**: O link "Como chegar" MUST abrir a rota até o endereço do petshop em um serviço de
  mapas.
- **FR-008**: No mobile, um acesso ao WhatsApp MUST permanecer visível durante toda a rolagem,
  exceto quando o próprio CTA de contato da seção visível já estiver na tela, e MUST NOT cobrir
  textos, campos ou outros botões.
- **FR-009**: O CTA principal da primeira tela MUST ser o elemento de ação de maior destaque visual
  da tela.
- **FR-010**: Os textos dos CTAs MUST descrever a ação e o canal (ex.: "Agendar pelo WhatsApp"),
  sem textos genéricos isolados ("Clique aqui").
- **FR-011**: A página MUST NOT exibir pop-ups, banners intrusivos ou carrosséis com troca
  automática que interrompam a leitura ou disputem atenção com o CTA principal.

**Serviços e produtos**

- **FR-012**: Cada serviço MUST exibir: nome, espécie e porte atendidos, itens incluídos, duração
  estimada, preço ou faixa "a partir de" com o que influencia o preço, e um CTA contextual.
- **FR-013**: Cada produto ou categoria em destaque MUST exibir: foto real, nome, indicação de uso
  ou público e forma de compra (retirada, entrega ou ambas).
- **FR-014**: A seção de produtos MUST informar as principais marcas trabalhadas.

**Confiança e prova social**

- **FR-015**: A primeira tela MUST exibir ao menos 2 provas de valor verificáveis (ex.: nota média
  e total de avaliações no Google, anos de atuação).
- **FR-016**: Cada depoimento MUST exibir nome (ou nome e inicial do sobrenome) do cliente, nota,
  origem e texto real; a seção MUST conter link para a página de avaliações na fonte original.
- **FR-017**: A seção institucional MUST exibir fotos reais do espaço e da equipe, com nome e
  função dos profissionais principais.
- **FR-018**: Os diferenciais MUST ser afirmações concretas e verificáveis; frases genéricas sem
  evidência MUST NOT ser usadas.

**Perguntas frequentes**

- **FR-019**: Cada pergunta do FAQ MUST poder ser expandida e recolhida individualmente, por toque e
  por teclado, com indicação visual do estado.
- **FR-020**: O FAQ MUST terminar com um CTA de contato para dúvidas não respondidas.

**Contato, localização e rodapé**

- **FR-021**: A seção de contato MUST exibir endereço completo, telefone, WhatsApp, e-mail, horário
  de funcionamento por dia da semana e um mapa com a localização.
- **FR-022**: Nome, endereço e telefone MUST ser idênticos em todas as ocorrências da página e nos
  dados estruturados (fonte única de verdade).
- **FR-023**: O rodapé MUST conter nome, endereço, telefone, horário, redes sociais, links das
  seções, CNPJ/razão social, link para o aviso de privacidade e ano de copyright.
- **FR-024**: A página MUST indicar o horário de resposta do WhatsApp para contatos fora do horário
  de funcionamento.

**SEO local e descoberta**

- **FR-025**: A página MUST ter título e descrição para buscadores que incluam o nome do negócio, o
  serviço principal e a cidade/bairro.
- **FR-026**: A página MUST ter exatamente um título principal (nível 1) e hierarquia de títulos
  sem saltos; cada seção MUST ter um título de nível 2.
- **FR-027**: A página MUST conter dados estruturados de negócio local do tipo petshop com nome,
  endereço, telefone, horário, coordenadas, faixa de preço, nota agregada (quando houver) e link do
  perfil no Google, coerentes com o conteúdo visível.
- **FR-028**: A seção de perguntas frequentes MUST ser marcada como dados estruturados de FAQ.
- **FR-029**: A página MUST ter metadados de compartilhamento (título, descrição e imagem) para
  que o link exibido em WhatsApp e redes sociais mostre uma prévia profissional.
- **FR-030**: Textos de serviços e da seção institucional MUST mencionar naturalmente a cidade e os
  bairros atendidos.
- **FR-031**: Todas as imagens com conteúdo MUST ter texto alternativo descritivo; imagens
  decorativas MUST ser ignoradas por leitores de tela.

**Privacidade**

- **FR-032**: A página MUST disponibilizar um aviso de privacidade (LGPD) acessível pelo rodapé; se
  houver ferramentas de análise de acesso, o consentimento MUST ser solicitado de forma não
  intrusiva.

### Requisitos de conteúdo

- **CR-001**: Todo conteúdo publicado MUST ser real e específico do petshop: nenhum lorem ipsum,
  "seu texto aqui", serviço sem descrição ou frase que serviria a qualquer petshop.
- **CR-002**: Fotos MUST ser reais (espaço, equipe, animais atendidos com autorização do tutor).
  Imagens de banco podem ser usadas apenas como elemento decorativo e nunca representando a equipe,
  o espaço ou clientes.
- **CR-003**: O título principal MUST comunicar o quê (serviço), onde (localidade) e para quem
  (cães e/ou gatos) — ex.: "Banho, tosa e cuidado para cães e gatos em [Bairro], [Cidade]".
- **CR-004**: Textos MUST estar em português do Brasil, com tom próximo, acolhedor e profissional,
  frases curtas e parágrafos de no máximo 3–4 linhas no mobile.
- **CR-005**: Afirmações superlativas ("o melhor", "o mais completo") MUST NOT ser usadas sem prova
  explícita ao lado.
- **CR-006**: Depoimentos MUST ser reais e ter autorização ou origem pública verificável (ex.:
  Google); depoimentos inventados são proibidos.
- **CR-007**: Números exibidos (nota, total de avaliações, anos, pets atendidos) MUST ser
  verdadeiros e ter data de referência registrada internamente para atualização.
- **CR-008**: As perguntas frequentes MUST refletir dúvidas reais recebidas pelo atendimento.
- **CR-009**: Conteúdo pendente de fornecimento pelo cliente MUST ser registrado como pendência
  rastreável e MUST impedir a publicação enquanto não for resolvido.

### Requisitos de experiência

- **XR-001**: A página MUST ser projetada primeiro para celular (360px) e funcionar sem rolagem
  horizontal de 320px a 1920px.
- **XR-002**: Um visitante MUST conseguir identificar o que o negócio faz, onde fica e como
  contatar em até 5 segundos de leitura da primeira tela.
- **XR-003**: Alvos de toque MUST ter no mínimo 44×44px e espaçamento que evite toques acidentais;
  texto corrido MUST ter no mínimo 16px.
- **XR-004**: O visual MUST transmitir um negócio premium, moderno e acolhedor: paleta restrita,
  tipografia consistente, espaçamento generoso, fotos com tratamento uniforme e componentes
  idênticos para funções idênticas.
- **XR-005**: A página MUST atender às WCAG 2.2 nível AA: contraste mínimo, foco visível, navegação
  completa por teclado, idioma declarado e informação que não depende só de cor.
- **XR-006**: A página MUST carregar rapidamente em celular com rede móvel: conteúdo principal
  visível em até 2,5s, resposta a interações em até 200ms e sem deslocamentos de layout
  perceptíveis durante o carregamento.
- **XR-007**: Animações MUST ser sutis, servir à compreensão e ser desativadas quando o usuário
  preferir movimento reduzido.
- **XR-008**: A rolagem até as seções a partir do menu MUST posicionar o título da seção visível,
  sem ficar escondido sob o cabeçalho.

### Key Entities

- **Negócio**: nome fantasia, razão social, CNPJ, endereço, coordenadas, telefone, WhatsApp,
  e-mail, redes sociais, horário por dia, horário de resposta, ano de fundação, link do perfil no
  Google, nota média e total de avaliações. Fonte única para todas as exibições de contato.
- **Serviço**: nome, descrição, espécies e portes atendidos, itens incluídos, duração estimada,
  preço "a partir de", fatores de preço, foto, mensagem pré-preenchida de agendamento.
- **Produto/Categoria em destaque**: nome, categoria, indicação de uso, marca, foto, forma de
  compra, mensagem pré-preenchida de consulta.
- **Diferencial**: título curto, descrição concreta, evidência associada, ícone ou foto.
- **Membro da equipe**: nome, função, qualificação/certificação, foto.
- **Depoimento**: nome do cliente, nota, texto, origem, data.
- **Pergunta frequente**: pergunta, resposta.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em teste com ao menos 5 pessoas que não conhecem o negócio, ao menos 90% conseguem
  dizer o que o petshop faz, em que região atende e como contatá-lo após 5 segundos de exposição à
  primeira tela no celular.
- **SC-002**: Ao menos 90% dos participantes do teste conseguem iniciar um agendamento pelo
  WhatsApp em até 2 toques a partir da primeira tela.
- **SC-003**: Ao menos 90% dos participantes encontram o preço "a partir de" de um serviço
  solicitado em até 30 segundos.
- **SC-004**: Ao menos 90% dos participantes encontram o horário de sábado e abrem a rota até o
  petshop em até 20 segundos.
- **SC-005**: Ao menos 80% dos participantes citam espontaneamente 3 motivos concretos para
  confiar no petshop após percorrer a página.
- **SC-006**: O conteúdo principal fica visível em até 2,5 segundos em celular intermediário com
  rede móvel 4G, e a auditoria de qualidade mobile da página atinge nota mínima de 90 em
  desempenho, acessibilidade, boas práticas e SEO.
- **SC-007**: Revisão manual não encontra nenhum texto de placeholder, imagem genérica
  representando equipe/espaço/clientes ou divergência de nome, endereço e telefone.
- **SC-008**: Nos 90 dias seguintes à publicação, o número mensal de contatos iniciados pelo site
  (cliques em WhatsApp e telefone) supera a linha de base registrada no lançamento, e ao menos 5%
  das visitas resultam em clique de contato.
- **SC-009**: A página aparece entre os resultados da busca por "petshop" + bairro/cidade do
  negócio e os dados de negócio local são reconhecidos como válidos pela ferramenta de validação
  de resultados avançados do buscador.

## Assumptions

- **Origem do conteúdo**: o site é de um petshop real. Dados do negócio, fotos, equipe, serviços,
  preços, produtos, avaliações e perguntas frequentes são fornecidos pelo cliente. Qualquer item
  ainda não fornecido é registrado como pendência rastreável e bloqueia a publicação (CR-009).
- **Produtos**: nesta entrega, a seção de produtos é uma vitrine; o pedido é feito pelo WhatsApp
  com mensagem pré-preenchida, sem carrinho, pagamento online ou controle de estoque no site. Uma
  loja online com compra e pagamento é uma evolução futura, a ser especificada como funcionalidade
  separada, e está fora do escopo desta entrega.
- **Escopo desta entrega**: apenas a home page (página única com seções). Aviso de privacidade é uma
  página simples e estática. Páginas individuais por serviço, blog e área do cliente estão fora do
  escopo.
- **Canal de agendamento**: o agendamento é feito via WhatsApp com mensagem pré-preenchida; não há
  sistema de agenda online com escolha de horário nesta entrega.
- **Público animal**: o petshop atende cães e gatos. Serviços previstos como base: banho, tosa
  (máquina e tesoura), tosa higiênica, hidratação/estética, e serviços complementares como busca e
  entrega (táxi dog), sujeitos à confirmação com o negócio.
- **Serviço veterinário**: se houver atendimento veterinário, o responsável técnico e o registro
  profissional serão exibidos; caso contrário, o site não fará referência a serviços clínicos.
- **Avaliações**: as avaliações exibidas são copiadas manualmente de fontes públicas (ex.: perfil do
  Google), com atualização periódica; não há integração automática nesta entrega.
- **Idioma**: apenas português do Brasil.
- **Medição**: cliques em WhatsApp, telefone e "Como chegar" serão mensurados por ferramenta de
  análise de acesso respeitando a LGPD, para viabilizar o SC-008.
- **Dependência**: a publicação depende do fornecimento, pelo negócio, de logo, fotos reais, dados
  de contato, CNPJ, tabela de serviços e preços, lista de produtos/marcas, avaliações e perguntas
  frequentes.
