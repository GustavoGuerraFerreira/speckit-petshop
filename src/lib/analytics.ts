// Contrato: specs/001-petshop-home/contracts/analytics-events.md.
// Provedor ainda não definido (pendência de negócio): adaptador no-op.

export type TrackEvent =
  | 'whatsapp_click'
  | 'phone_click'
  | 'directions_click'
  | 'map_open'
  | 'reviews_click'
  | 'email_click';

const TRACK_EVENTS: ReadonlySet<string> = new Set<TrackEvent>([
  'whatsapp_click',
  'phone_click',
  'directions_click',
  'map_open',
  'reviews_click',
  'email_click',
]);

function isTrackEvent(value: string): value is TrackEvent {
  return TRACK_EVENTS.has(value);
}

type TrackProps = Readonly<{ context: string }>;
type AnalyticsProvider = (event: TrackEvent, props: TrackProps) => void;

// Sem provedor configurado: nenhum dado é enviado.
let provider: AnalyticsProvider | null = null;

export function setAnalyticsProvider(next: AnalyticsProvider): void {
  provider = next;
}

export function track(event: TrackEvent, props: TrackProps): void {
  provider?.(event, props);
}

export function registerClickTracking(): void {
  document.addEventListener(
    'click',
    (event) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>('[data-track]');
      const name = element?.dataset.track;
      if (element === null || name === undefined || !isTrackEvent(name)) return;
      try {
        track(name, { context: element.dataset.trackContext ?? 'unknown' });
      } catch {
        // Falha de medição nunca bloqueia a navegação.
      }
    },
    { passive: true },
  );
}
