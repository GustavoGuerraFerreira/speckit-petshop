import type { ComponentProps } from 'react';
import { VisuallyHidden } from './VisuallyHidden';

const NEW_TAB_NOTICE = '(abre em nova aba)';

export type ExternalLinkProps = Omit<ComponentProps<'a'>, 'target' | 'rel' | 'aria-label'> & {
  href: string;
  ariaLabel?: string;
};

/** Único jeito permitido de abrir nova aba: aplica rel seguro e avisa o leitor de tela. */
export function ExternalLink({ ariaLabel, children, ...props }: ExternalLinkProps) {
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel === undefined ? undefined : `${ariaLabel} ${NEW_TAB_NOTICE}`}
    >
      {children}
      {ariaLabel === undefined && <VisuallyHidden> {NEW_TAB_NOTICE}</VisuallyHidden>}
    </a>
  );
}
