import { ViteSSG } from 'vite-ssg'
import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus'
import { createI18nInstance } from '@/config/i18n'
import { localeFromPath, localeMeta, resolveLocale } from '@/config/locale'
import { initTheme } from '@/composables/useAppTheme'
import { createLocaleRoutes } from '@/router/routes'
import { scrollBehavior } from '@/router/scroll'
import App from './App.vue'

import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/styles/tokens.scss'
import '@/assets/styles/element.scss'
import '@/assets/styles/global.scss'

export const createApp = ViteSSG(
  App,
  {
    // 部署到子路径时（GitHub Pages 的 /FVBT/），路由基座必须与构建 base 保持一致
    base: import.meta.env.BASE_URL,
    routes: createLocaleRoutes(),
    scrollBehavior,
  },
  ({ app, router, isClient, routePath }) => {
    // 预渲染会逐个语言渲染页面，词条实例必须跟着页面走
    const i18n = createI18nInstance(localeFromPath(routePath))
    app.use(i18n)

    // 预渲染与客户端需要一致的 id / 层级起点，否则 Hydration 对不上
    app.provide(ID_INJECTION_KEY, { prefix: 1024, current: 0 })
    app.provide(ZINDEX_INJECTION_KEY, { current: 0 })

    if (isClient) {
      initTheme()
    }

    // 路由决定语言，语言决定 html lang
    router.beforeEach((to) => {
      const locale = resolveLocale(to.meta.locale)
      i18n.global.locale.value = locale

      if (isClient) {
        document.documentElement.lang = localeMeta[locale].htmlLang
      }

      return true
    })
  },
)
