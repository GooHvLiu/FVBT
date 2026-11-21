import type { AppLocale } from './locale'
import { APP_LOCALES, DEFAULT_LOCALE } from './locale'

export const siteConfig = {
  name: import.meta.env.VITE_APP_TITLE || 'FVBT',
  description:
    import.meta.env.VITE_APP_DESCRIPTION ||
    'FVBT 是一个 Vue 3 + TypeScript + Element Plus 的极简内容站基座。',
  /** 部署域名，末尾不带斜杠；用于 canonical 与 hreflang */
  url: (import.meta.env.VITE_SITE_URL || 'https://fvbt.example.com').replace(/\/+$/, ''),
  version: __APP_VERSION__,
  /** 开源仓库地址，替换成自己的仓库即可 */
  repository: 'https://github.com/GooHvLiu/FVBT',
  license: 'MIT',
  defaultLocale: DEFAULT_LOCALE as AppLocale,
  locales: APP_LOCALES,
}

export interface NavItem {
  /** 与路由定义中的 key 对应 */
  routeKey: string
  /** i18n 词条 key */
  labelKey: string
}

export const navItems: NavItem[] = [
  { routeKey: 'home', labelKey: 'nav.home' },
  { routeKey: 'demo', labelKey: 'nav.demo' },
]
