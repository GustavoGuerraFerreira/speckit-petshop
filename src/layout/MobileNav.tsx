import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import type { NavItem, SectionId } from '@/types/content';

export type MobileNavProps = { items: readonly NavItem[]; anchorBase: string };

export function MobileNav({ items, anchorBase }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [pendingTarget, setPendingTarget] = useState<SectionId | null>(null);

  // O Sheet bloqueia a rolagem enquanto aberto: a navegação acontece depois de fechar.
  function handleCloseAutoFocus(event: Event) {
    if (pendingTarget === null) return;
    event.preventDefault();
    const target = document.getElementById(pendingTarget);
    window.history.pushState(null, '', `#${pendingTarget}`);
    target?.scrollIntoView();
    target?.focus({ preventScroll: true });
    setPendingTarget(null);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Abrir menu">
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" onCloseAutoFocus={handleCloseAutoFocus}>
        <SheetTitle className="px-4 pt-4 text-lg">Menu</SheetTitle>
        <SheetDescription className="sr-only">Navegue pelas seções da página.</SheetDescription>
        <nav aria-label="Principal" className="px-2">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.sectionId}>
                <a
                  href={`${anchorBase}#${item.sectionId}`}
                  onClick={(event) => {
                    if (anchorBase !== '') return;
                    event.preventDefault();
                    setPendingTarget(item.sectionId);
                    setOpen(false);
                  }}
                  className="flex min-h-12 items-center rounded-lg px-3 text-lg font-medium hover:bg-muted"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
