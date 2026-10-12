# Contrato: Eventos de Conversão

**Arquivo de implementação**: `src/lib/analytics.ts` | **Requisitos**: SC-008, FR-032, Princípio I
(sinal observável de sucesso), Princípio IX (terceiros adiados)

## Marcação

Todo elemento de conversão carrega dois atributos de dados no HTML pré-renderizado:

```html
<a href="https://wa.me/…" data-track="whatsapp_click" data-track-context="service:tosa-tesoura">…</a>
```

Um único listener delegado em `document` (registrado após a hidratação, `passive`) lê os
atributos do `closest('[data-track]')` e chama `track(event, { context })`. Nenhum componente chama
o provedor diretamente.

## Eventos

| `data-track` | Quando | `data-track-context` (valores) |
|---|---|---|
| `whatsapp_click` | Clique em qualquer link `wa.me` | `header`, `hero`, `floating`, `differentials`, `service:<id>`, `product:<id>`, `testimonials`, `faq`, `contact`, `footer` |
| `phone_click` | Clique em `tel:` | `header`, `contact`, `footer`, `floating` |
| `directions_click` | Clique em "Como chegar" | `contact`, `footer` |
| `map_open` | Clique em "Ver mapa interativo" | `contact` |
| `reviews_click` | Clique em "Ver todas as avaliações" | `testimonials`, `hero` |
| `email_click` | Clique em `mailto:` | `contact`, `footer` |

## Adaptador

```ts
type TrackEvent = 'whatsapp_click' | 'phone_click' | 'directions_click'
  | 'map_open' | 'reviews_click' | 'email_click';

track(event: TrackEvent, props: { context: string }): void
```

- Padrão: **no-op** (provedor não definido — pendência de negócio, ver research R-09).
- Com provedor sem cookies (Plausible/Umami): script carregado com `defer`, domínio adicionado a
  `script-src`/`connect-src` da CSP ([security-headers.md](./security-headers.md)).
- **Proibido** enviar dados pessoais (nome, telefone digitado, texto de mensagem) em qualquer
  evento.
- Falha do provedor nunca bloqueia a navegação do link.
