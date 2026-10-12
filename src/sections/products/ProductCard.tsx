import { ResponsiveImage } from '@/components/shared/ResponsiveImage';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { purchaseOptionLabel } from '@/lib/format';
import type { FeaturedProduct, PhoneNumber } from '@/types/content';

export type ProductCardProps = {
  product: FeaturedProduct;
  whatsapp: PhoneNumber;
};

export function ProductCard({ product, whatsapp }: ProductCardProps) {
  return (
    <Card className="h-full gap-0 py-0 text-base shadow-card ring-0">
      <article className="flex h-full flex-col">
        <ResponsiveImage
          image={product.image}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-4/3"
        />
        <div className="flex flex-1 flex-col gap-3 p-5">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            {product.category}
          </p>
          <h3 className="text-h3 font-bold">{product.name}</h3>
          {product.brand !== undefined && <p className="text-muted-foreground">{product.brand}</p>}
          <p>{product.usage}</p>
          <ul className="flex flex-wrap gap-2" aria-label="Formas de compra">
            {product.purchaseOptions.map((option) => (
              <li key={option}>
                <Badge variant="secondary">{purchaseOptionLabel(option)}</Badge>
              </li>
            ))}
          </ul>
          <WhatsAppButton
            phone={whatsapp}
            message={product.whatsappMessage}
            context={`product:${product.id}`}
            label="Consultar disponibilidade pelo WhatsApp"
            variant="outline"
            className="mt-auto w-full"
          />
        </div>
      </article>
    </Card>
  );
}
