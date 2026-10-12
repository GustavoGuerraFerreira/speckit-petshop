import { ResponsiveImage } from '@/components/shared/ResponsiveImage';
import type { ImageAsset } from '@/types/content';

export type SpaceGalleryProps = { images: readonly ImageAsset[] };

export function SpaceGallery({ images }: SpaceGalleryProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image) => (
        <li key={image.fallback.src}>
          <ResponsiveImage
            image={image}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="aspect-3/2 rounded-xl"
          />
        </li>
      ))}
    </ul>
  );
}
