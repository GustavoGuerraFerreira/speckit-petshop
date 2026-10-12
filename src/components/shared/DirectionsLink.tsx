import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buildDirectionsUrl } from '@/lib/contact-links';
import { ExternalLink } from './ExternalLink';

export type DirectionsLinkProps = {
  query: string;
  context: string;
  className?: string;
};

export function DirectionsLink({ query, context, className }: DirectionsLinkProps) {
  return (
    <Button asChild variant="outline" className={className}>
      <ExternalLink
        href={buildDirectionsUrl(query)}
        data-track="directions_click"
        data-track-context={context}
      >
        <MapPin aria-hidden="true" />
        Como chegar pelo Google Maps
      </ExternalLink>
    </Button>
  );
}
