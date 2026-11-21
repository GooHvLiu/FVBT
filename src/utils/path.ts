/** 拼接语言前缀与路由路径，统一收敛斜杠 */
export function joinPath(prefix: string, path: string): string {
  const segments = [prefix, path]
    .map((segment) => segment.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)

  return segments.length > 0 ? `/${segments.join('/')}` : '/'
}

/** 去掉域名末尾斜杠，用于 canonical 拼接 */
export function absoluteUrl(base: string, path: string): string {
  return `${base.replace(/\/+$/, '')}${path.startsWith('/') ? path : `/${path}`}`
}
