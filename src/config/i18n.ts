import { createI18n } from 'vue-i18n'
import { DEFAULT_LOCALE, type AppLocale } from '@/config/locale'
import enUS from '@/locales/en-US'
import zhCN from '@/locales/zh-CN'

/**
 * 每个应用实例独享一份 i18n。
 * 预渲染会并发渲染多个语言页面，共用全局实例会互相改写 locale。
 */
export function createI18nInstance(locale: AppLocale = DEFAULT_LOCALE) {
  return createI18n({
    legacy: false,
    locale,
    fallbackLocale: DEFAULT_LOCALE,
    messages: {
      'zh-CN': zhCN,
      'en-US': enUS,
    },
    // 只在开发期提示缺失词条，避免线上控制台噪音
    missingWarn: import.meta.env.DEV,
    fallbackWarn: import.meta.env.DEV,
  })
}
