import { cn } from 'cn';
import type { TrustSignal } from '@/types/content';

export type TrustSignalListProps = {
  signals: readonly TrustSignal[];
  className?: string;
};

export function TrustSignalList({ signals, className }: TrustSignalListProps) {
  return (
    <ul className={cn('grid grid-cols-3 gap-2 sm:gap-3', className)}>
      {signals.map((signal) => (
        <li key={signal.kind} className="flex flex-col rounded-lg bg-card/80 px-3 py-2 shadow-card">
          <span className="text-lg font-bold text-primary sm:text-xl">{signal.value}</span>
          <span className="text-sm leading-snug text-muted-foreground">{signal.label}</span>
        </li>
      ))}
    </ul>
  );
}
