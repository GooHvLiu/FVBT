import type { AppLocale } from '@/config/locale'

declare module 'vue-router' {
  interface RouteMeta {
    /** 跨语言稳定的页面标识 */
    key?: string
    /** 当前路由所属语言 */
    locale?: AppLocale
    /** 不在导航中展示 */
    hidden?: boolean
  }
}

export {}
