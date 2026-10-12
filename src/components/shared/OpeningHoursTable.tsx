import { useSyncExternalStore } from 'react';
import { cn } from 'cn';
import { dayLabel, formatIsoDate } from '@/lib/format';
import { getTodayIndex } from '@/lib/opening-hours';
import type { OpeningHoursEntry, SpecialHoursNotice } from '@/types/content';

export type OpeningHoursTableProps = {
  hours: readonly OpeningHoursEntry[];
  specialHours?: readonly SpecialHoursNotice[];
  className?: string;
};

const subscribeToNothing = () => () => undefined;
const getClientTodayIndex = () => getTodayIndex(new Date());
const getServerTodayIndex = () => null;

function describeHours(entry: OpeningHoursEntry): string {
  return entry.closed === true ? 'Fechado' : `${entry.opens} às ${entry.closes}`;
}

function describeNotice(notice: SpecialHoursNotice): string {
  const hours =
    notice.closed === true || notice.opens === undefined || notice.closes === undefined
      ? 'fechado'
      : `${notice.opens} às ${notice.closes}`;
  return `${notice.label} (${formatIsoDate(notice.date)}): ${hours}`;
}

export function OpeningHoursTable({ hours, specialHours = [], className }: OpeningHoursTableProps) {
  // Destaque do dia atual só após a hidratação, para o HTML do build não divergir.
  const todayIndex = useSyncExternalStore(
    subscribeToNothing,
    getClientTodayIndex,
    getServerTodayIndex,
  );

  return (
    <div className={className}>
      {specialHours.length > 0 && (
        <ul className="mb-3 space-y-1 rounded-lg bg-secondary px-3 py-2 text-secondary-foreground">
          {specialHours.map((notice) => (
            <li key={notice.date}>{describeNotice(notice)}</li>
          ))}
        </ul>
      )}
      <table className="w-full border-collapse text-left">
        <caption className="mb-2 text-left font-semibold">Horário de funcionamento</caption>
        <tbody>
          {hours.map((entry, index) => {
            const isToday = index === todayIndex;
            return (
              <tr
                key={entry.day}
                className={cn('border-b last:border-b-0', isToday && 'font-semibold')}
              >
                <th scope="row" className="py-2 pr-4 font-medium">
                  {dayLabel(entry.day)}
                  {isToday && <span className="ml-2 text-sm">(hoje)</span>}
                </th>
                <td className="py-2 whitespace-nowrap tabular-nums">{describeHours(entry)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
