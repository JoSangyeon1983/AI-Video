/* ============================================
   공통 유틸리티 함수
   ============================================ */

/**
 * URL 경로에 trailing slash를 보장합니다.
 * @example ensureTrailingSlash("/work") → "/work/"
 */
export function ensureTrailingSlash(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

/**
 * 현재 경로가 대상 href와 일치(또는 하위 경로)인지 확인합니다.
 * Header, Footer 등 네비게이션 활성 상태 판별에 공용.
 */
export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
