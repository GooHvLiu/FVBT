import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { APP_LOCALES, DEFAULT_LOCALE, localeMeta } from '@/config/locale'
import { siteConfig } from '@/config/site'
import { useLocalePath } from '@/composables/useAppLocale'
import { absoluteUrl } from '@/utils/path'

export interface SeoOptions {
  /** 页面标题对应的 i18n key */
  titleKey: string
  /** 页面描述对应的 i18n key，缺省用站点描述 */
  descriptionKey?: string
  /** 不参与索引的页面，例如 404 */
  noindex?: boolean
}

/** 统一注入 title / description / canonical / hreflang */
export function useAppSeo(options: SeoOptions): void {
  const route = useRoute()
  const { t, locale } = useI18n()
  const { pathFor } = useLocalePath()

  const title = computed(() => `${t(options.titleKey)} · ${siteConfig.name}`)
  const description = computed(() =>
    options.descriptionKey ? t(options.descriptionKey) : siteConfig.description,
  )
  const routeKey = computed(() => route.meta.key ?? 'home')

  useHead({
    title,
    htmlAttrs: {
      lang: computed(() => localeMeta[locale.value as keyof typeof localeMeta].htmlLang),
    },
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: siteConfig.name },
      { property: 'og:url', content: computed(() => absoluteUrl(siteConfig.url, route.path)) },
      { name: 'twitter:card', content: 'summary' },
      {
        name: 'robots',
        content: computed(() => (options.noindex ? 'noindex, nofollow' : 'index, follow')),
      },
    ],
    link: computed(() => {
      const canonical = { rel: 'canonical', href: absoluteUrl(siteConfig.url, route.path) }

      // 不参与索引的页面不需要多语言互指，否则会给出错误路径
      if (options.noindex) return [canonical]

      return [
        canonical,
        ...APP_LOCALES.map((item) => ({
          rel: 'alternate',
          hreflang: localeMeta[item].htmlLang,
          href: absoluteUrl(siteConfig.url, pathFor(routeKey.value, item)),
        })),
        {
          rel: 'alternate',
          hreflang: 'x-default',
          href: absoluteUrl(siteConfig.url, pathFor(routeKey.value, DEFAULT_LOCALE)),
        },
      ]
    }),
  })
}
