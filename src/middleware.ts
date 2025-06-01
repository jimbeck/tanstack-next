export { auth as middleware } from '@/auth';

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api/auth (API auth routes)
   * - api/health
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * - login (login route)
   * - / (root domain)
   */
  matcher: ['/login', '/api/auth/:path*'],
};
