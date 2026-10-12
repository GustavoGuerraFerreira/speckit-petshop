import { useCallback, useRef, useSyncExternalStore } from 'react';

/**
 * Indica se algum dos elementos (por id) está visível na viewport.
 * No HTML do build e antes da hidratação retorna `initialValue`.
 */
export function useAnyInView(elementIds: readonly string[], initialValue: boolean): boolean {
  const anyInView = useRef(initialValue);
  const idsKey = elementIds.join(',');

  const subscribe = useCallback(
    (notify: () => void) => {
      const elements = idsKey
        .split(',')
        .map((id) => document.getElementById(id))
        .filter((element): element is HTMLElement => element !== null);
      if (elements.length === 0) {
        anyInView.current = false;
        return () => undefined;
      }

      const visible = new Set<Element>();
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        anyInView.current = visible.size > 0;
        notify();
      });
      elements.forEach((element) => {
        observer.observe(element);
      });
      return () => {
        observer.disconnect();
      };
    },
    [idsKey],
  );

  return useSyncExternalStore(
    subscribe,
    () => anyInView.current,
    () => initialValue,
  );
}
