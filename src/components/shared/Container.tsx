import type { ComponentProps, ElementType } from 'react';
import { cn } from 'cn';

export type ContainerProps = ComponentProps<'div'> & { as?: ElementType };

export function Container({ as: Component = 'div', className, ...props }: ContainerProps) {
  return (
    <Component
      className={cn('mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  );
}
