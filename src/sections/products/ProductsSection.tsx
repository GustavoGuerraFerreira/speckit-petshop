import { Truck } from 'lucide-react';
import { Section } from '@/components/shared/Section';
import { SectionHeading } from '@/components/shared/SectionHeading';
import type { Business, ProductsContent } from '@/types/content';
import { BrandList } from './BrandList';
import { ProductCard } from './ProductCard';

export type ProductsSectionProps = {
  products: ProductsContent;
  business: Business;
};

export function ProductsSection({ products, business }: ProductsSectionProps) {
  return (
    <Section id="produtos" labelledBy="produtos-titulo" tone="muted">
      <SectionHeading
        id="produtos-titulo"
        eyebrow="Loja"
        title={products.heading}
        description={products.intro}
      />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.items.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} whatsapp={business.whatsapp} />
          </li>
        ))}
      </ul>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-h3 font-bold">Marcas que trabalhamos</h3>
          <BrandList brands={products.brands} />
        </div>
        <div>
          <h3 className="mb-4 text-h3 font-bold">Retirada e entrega</h3>
          <p className="flex gap-3">
            <Truck aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary" />
            <span>{products.purchaseNote}</span>
          </p>
        </div>
      </div>
    </Section>
  );
}
