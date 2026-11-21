import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DEFAULT_LOCALE, localeMeta, type AppLocale } from '@/config/locale'
import { appRouteDefinitions } from '@/router/routes'
import { joinPath } from '@/utils/path'

/** 当前路由对应的语言 */
export function useAppLocale() {
  const route = useRoute()
  const locale = computed<AppLocale>(() => route.meta.locale ?? DEFAULT_LOCALE)
  const { pathFor } = useLocalePath()

  return { locale, pathFor }
}

/** 生成带语言前缀的站内路径，所有链接都从这里取 */
export function useLocalePath() {
  const route = useRoute()
  const locale = computed<AppLocale>(() => route.meta.locale ?? DEFAULT_LOCALE)

  function pathFor(routeKey: string, targetLocale: AppLocale = locale.value): string {
    const definition = appRouteDefinitions.find((item) => item.key === routeKey)
    return joinPath(localeMeta[targetLocale].prefix, definition?.path ?? '/')
  }

  return { locale, pathFor }
}

/** 切换语言：保留当前页面语义，找不到对应页面时回到首页 */
export function useSwitchLocale() {
  const router = useRouter()
  const route = useRoute()
  const { locale, pathFor } = useAppLocale()

  function switchLocale(target: AppLocale): void {
    if (target === locale.value) return

    const routeKey = route.meta.key ?? 'home'
    void router.push(pathFor(routeKey, target))
  }

  return { switchLocale }
}
