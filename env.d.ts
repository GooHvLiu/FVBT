/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 站点名称，用于标题与页头 */
  readonly VITE_APP_TITLE: string
  /** 站点默认描述，用于 SEO 兜底 */
  readonly VITE_APP_DESCRIPTION: string
  /** 站点正式域名，用于 canonical 与 hreflang */
  readonly VITE_SITE_URL: string
  /** 接口基础路径，后端接入时只改这里 */
  readonly VITE_API_BASE_URL: string
  /** 是否启用内置 Mock，'true' 时请求走本地模拟数据 */
  readonly VITE_USE_MOCK: 'true' | 'false'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** 构建时注入的版本号，取自 package.json */
declare const __APP_VERSION__: string
