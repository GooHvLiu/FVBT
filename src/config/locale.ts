export const APP_LOCALES = ['zh-CN', 'en-US'] as const

export type AppLocale = (typeof APP_LOCALES)[number]

export interface LocaleMeta {
  /** 语言选择器里展示的名称 */
  label: string
  /** 写入 html lang 的值 */
  htmlLang: string
  /** 路由前缀，默认语言为空字符串 */
  prefix: string
}

export const DEFAULT_LOCALE: AppLocale = 'zh-CN'

export const localeMeta: Record<AppLocale, LocaleMeta> = {
  'zh-CN': { label: '中文', htmlLang: 'zh-CN', prefix: '' },
  'en-US': { label: 'English', htmlLang: 'en', prefix: '/en' },
}

export function isAppLocale(value: unknown): value is AppLocale {
  return typeof value === 'string' && (APP_LOCALES as readonly string[]).includes(value)
}

export function resolveLocale(value: unknown): AppLocale {
  return isAppLocale(value) ? value : DEFAULT_LOCALE
}

/** 按路径前缀判断语言，预渲染时用于给每个页面准备正确的词条 */
export function localeFromPath(path: string | undefined): AppLocale {
  if (!path) return DEFAULT_LOCALE

  const matched = APP_LOCALES.find((locale) => {
    const { prefix } = localeMeta[locale]
    return prefix !== '' && (path === prefix || path.startsWith(`${prefix}/`))
  })

  return matched ?? DEFAULT_LOCALE
}
