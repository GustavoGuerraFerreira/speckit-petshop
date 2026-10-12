import { cn } from 'cn';
import type { ImageAsset } from '@/types/content';

export type ResponsiveImageProps = {
  image: ImageAsset;
  sizes: string;
  priority?: boolean;
  className?: string;
  pictureClassName?: string;
};

export function ResponsiveImage({
  image,
  sizes,
  priority = false,
  className,
  pictureClassName,
}: ResponsiveImageProps) {
  return (
    <picture className={pictureClassName}>
      {image.sources.map((source) => (
        <source key={source.type} type={source.type} srcSet={source.srcSet} sizes={sizes} />
      ))}
      <img
        src={image.fallback.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        className={cn('h-auto w-full object-cover', className)}
      />
    </picture>
  );
}
