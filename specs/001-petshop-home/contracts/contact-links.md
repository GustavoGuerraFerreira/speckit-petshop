# Contrato: Links de Contato e Conversão

**Arquivo de implementação**: `src/lib/contact-links.ts` (funções puras) |
**Componentes**: `WhatsAppButton`, `PhoneLink`, `DirectionsLink`, `ExternalLink`
(ver [component-api.md](./component-api.md)) | **Requisitos**: FR-005…FR-008, FR-010, Princípio III

Todo link de contato é um `<a href>` nativo presente no HTML pré-renderizado: funciona antes da
hidratação e sem JavaScript.

## WhatsApp

```text
https://wa.me/<digits>?text=<encodeURIComponent(mensagem)>
```

- `<digits>`: `business.whatsapp.e164` sem o `+` (ex.: `5511987654321`).
- `mensagem`: texto pt-BR, sempre começando com saudação e identificando o contexto.
- Abre em nova aba: `target="_blank" rel="noopener noreferrer"`. No desktop sem app, o próprio
  `wa.me` redireciona ao WhatsApp Web (edge case).

| Contexto (`trackingContext`) | Origem da mensagem | Exemplo de mensagem |
|---|---|---|
| `header`, `hero`, `differentials`, `floating`, `contact` | `generalMessage` em `src/content/messages.ts` | "Olá! Vim pelo site e gostaria de agendar um horário." |
| `service:<id>` | `service.whatsappMessage` | "Olá! Vim pelo site e gostaria de agendar *Tosa na tesoura*." |
| `product:<id>` | `product.whatsappMessage` | "Olá! Vocês têm *Ração X 15 kg* disponível? Prefiro retirada." |
| `faq` | `faqMessage` | "Olá! Vim pelo site e tenho uma dúvida:" |
| `testimonials` | `generalMessage` | — |

Assinatura:

```ts
buildWhatsAppUrl(phone: PhoneNumber, message: string): string
```

Pré-condições: `phone.e164` casa com `/^\+55\d{10,11}$/`; `message` não vazia e ≤ 500 caracteres.
Violação lança erro **no build** (conteúdo inválido não chega à produção).

## Telefone

```text
tel:+5511987654321
```

- Texto visível = `business.phone.display` (legível e selecionável — edge case desktop).
- `buildTelUrl(phone: PhoneNumber): string`.

## Como chegar

```text
https://www.google.com/maps/dir/?api=1&destination=<encodeURIComponent(business.mapsDirectionsQuery)>
```

- Universal: no celular abre o app de mapas; no desktop, o Google Maps web.
- `buildDirectionsUrl(query: string): string`.

## Mapa incorporado (fachada)

- Estado inicial: `business.mapPreview` (imagem estática com `alt` descritivo) + botão
  "Ver mapa interativo" + endereço em texto + "Como chegar".
- Após clique: `<iframe src={business.mapEmbedUrl} title="Mapa com a localização do <tradeName>"
  loading="lazy" referrerpolicy="strict-origin-when-cross-origin"
  sandbox="allow-scripts allow-same-origin allow-popups">`.
- `mapEmbedUrl` MUST ter origem `https://www.google.com` (coerente com `frame-src` da CSP).

## E-mail e redes sociais

- `mailto:<business.email>`.
- Redes: `ExternalLink` com `aria-label` "Instagram do <tradeName> (abre em nova aba)".

## Regras gerais

1. Rótulos descrevem ação + canal ("Agendar pelo WhatsApp", "Ligar para (11) 98765-4321",
   "Como chegar pelo Google Maps"); nunca "Clique aqui" (FR-010).
2. Links que abrem nova aba informam isso ao leitor de tela (texto visualmente oculto ou ícone com
   rótulo).
3. Todo link de contato carrega `data-track` / `data-track-context`
   ([analytics-events.md](./analytics-events.md)).
4. Alvos de toque ≥ 44×44px (XR-003).
