import type { ImageAsset, ImageMimeType } from '@/types/content';

type PictureImport = Readonly<{
  sources: Readonly<Record<string, string>>;
  img: Readonly<{ src: string; w: number; h: number }>;
}>;

const MIME_BY_FORMAT: Readonly<Record<string, ImageMimeType>> = {
  avif: 'image/avif',
  webp: 'image/webp',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
};

const FORMAT_PRIORITY: readonly ImageMimeType[] = [
  'image/avif',
  'image/webp',
  'image/jpeg',
  'image/png',
];

/** Converte a saída `picture` do vite-imagetools no contrato `ImageAsset`. */
export function toImageAsset(picture: PictureImport, alt: string): ImageAsset {
  const sources = Object.entries(picture.sources)
    .map(([format, srcSet]) => {
      const type = MIME_BY_FORMAT[format];
      if (type === undefined) throw new Error(`Formato de imagem não suportado: ${format}`);
      return { type, srcSet };
    })
    .sort((a, b) => FORMAT_PRIORITY.indexOf(a.type) - FORMAT_PRIORITY.indexOf(b.type));

  return {
    sources,
    fallback: { src: picture.img.src },
    width: picture.img.w,
    height: picture.img.h,
    alt,
  };
}
