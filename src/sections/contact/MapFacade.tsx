import { useState } from 'react';
import { Map as MapIcon } from 'lucide-react';
import { ResponsiveImage } from '@/components/shared/ResponsiveImage';
import { Button } from '@/components/ui/button';
import type { Business } from '@/types/content';

export type MapFacadeProps = { business: Business };

/** Mapa de terceiro carregado só após ação do usuário (performance, LGPD e CSP). */
export function MapFacade({ business }: MapFacadeProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-muted shadow-card">
      {loaded ? (
        <iframe
          src={business.mapEmbedUrl}
          title={`Mapa com a localização do ${business.tradeName}`}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-popups"
          className="size-full border-0"
        />
      ) : (
        <>
          <ResponsiveImage
            image={business.mapPreview}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="size-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              type="button"
              size="lg"
              onClick={() => {
                setLoaded(true);
              }}
              data-track="map_open"
              data-track-context="contact"
              className="shadow-floating"
            >
              <MapIcon aria-hidden="true" />
              Ver mapa interativo
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
