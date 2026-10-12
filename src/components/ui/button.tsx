// Gerado por shadcn (radix-nova). Edições locais: variante `whatsapp`, remoção de
// `destructive`/`xs`/`sm`/`icon-*`, tamanhos com alvo de toque mínimo de 44px (XR-003)
// e altura flexível para rótulos longos quebrarem linha sem corte.
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';
import { Slot } from 'radix-ui';

const buttonVariants = cva(
  'group/button inline-flex min-h-11 max-w-full min-w-11 items-center justify-center gap-2 rounded-lg border border-transparent bg-clip-padding text-center text-base font-semibold transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-5',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border-primary bg-transparent text-primary hover:bg-accent',
        ghost: 'text-foreground hover:bg-muted',
        whatsapp: 'bg-whatsapp text-whatsapp-foreground shadow-card hover:bg-whatsapp/90',
        link: 'text-primary underline underline-offset-4 hover:no-underline',
      },
      size: {
        default: 'px-4 py-2',
        lg: 'min-h-13 px-6 py-2.5 text-lg',
        icon: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
