import type { RouteRecordRaw } from 'vue-router'
import { APP_LOCALES, DEFAULT_LOCALE, localeMeta, type AppLocale } from '@/config/locale'
import { joinPath } from '@/utils/path'

export interface AppRouteDefinition {
  /** 跨语言稳定的页面标识，语言切换时依据它定位 */
  key: string
  /** 不带语言前缀的路径 */
  path: string
  component: NonNullable<RouteRecordRaw['component']>
  /** 不在导航中展示的页面，例如 404 */
  hidden?: boolean
}

export const appRouteDefinitions: AppRouteDefinition[] = [
  {
    key: 'home',
    path: '/',
    component: () => import('@/pages/HomeView.vue'),
  },
  {
    key: 'demo',
    path: '/demo',
    component: () => import('@/pages/DemoView.vue'),
  },
]

const standaloneRoutes: AppRouteDefinition[] = [
  {
    key: 'not-found-page',
    path: '/404',
    component: () => import('@/pages/NotFoundView.vue'),
    hidden: true,
  },
]

function toRoute(definition: AppRouteDefinition, locale: AppLocale): RouteRecordRaw {
  return {
    path: joinPath(localeMeta[locale].prefix, definition.path),
    name: `${definition.key}-${locale}`,
    component: definition.component,
    meta: {
      key: definition.key,
      locale,
      hidden: definition.hidden ?? false,
    },
  }
}

/**
 * 按语言展开路由。
 * 兜底路由放在最后，并且非默认语言在前，避免根路径的 catch-all 抢走 /en/*。
 */
export function createLocaleRoutes(): RouteRecordRaw[] {
  const routes = APP_LOCALES.flatMap((locale) => [
    ...appRouteDefinitions.map((definition) => toRoute(definition, locale)),
    ...standaloneRoutes.map((definition) => toRoute(definition, locale)),
  ])

  const localeOrder = [...APP_LOCALES].sort((a, b) => {
    if (a === b) return 0
    if (a === DEFAULT_LOCALE) return 1
    if (b === DEFAULT_LOCALE) return -1
    return 0
  })

  const fallbacks = localeOrder.map<RouteRecordRaw>((locale) => ({
    path: joinPath(localeMeta[locale].prefix, '/:pathMatch(.*)*'),
    name: `catch-all-${locale}`,
    component: () => import('@/pages/NotFoundView.vue'),
    meta: {
      key: 'not-found',
      locale,
      hidden: true,
    },
  }))

  return [...routes, ...fallbacks]
}
