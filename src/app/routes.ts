export type PageKey = 'home' | 'privacy';

export type Route = Readonly<{ path: string; page: PageKey }>;

export const routes: readonly Route[] = [
  { path: '/', page: 'home' },
  { path: '/privacidade/', page: 'privacy' },
];

export function isPageKey(value: string | undefined): value is PageKey {
  return routes.some((route) => route.page === value);
}

/** Página a partir da URL — usada no `pnpm dev`, onde não há HTML pré-renderizado. */
export function getPageForPath(pathname: string): PageKey {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return routes.find((route) => route.path === normalized)?.page ?? 'home';
}
