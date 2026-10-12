import { ResponsiveImage } from '@/components/shared/ResponsiveImage';
import type { Brand } from '@/types/content';

export type BrandListProps = { brands: readonly Brand[] };

export function BrandList({ brands }: BrandListProps) {
  return (
    <ul className="flex flex-wrap items-center gap-3">
      {brands.map((brand) => (
        <li key={brand.name} className="rounded-lg bg-card px-4 py-2 font-semibold shadow-card">
          {brand.logo === undefined ? (
            brand.name
          ) : (
            <ResponsiveImage
              image={brand.logo}
              sizes="120px"
              className="h-8 w-auto object-contain"
            />
          )}
        </li>
      ))}
    </ul>
  );
}
