# 1.0.0

首个公开版本，定位为内容型站点基座。

## 能力

- 语言前缀路由：中文根路径，英文 `/en`，页面路径由 `routeKey` 统一生成
- `vue-i18n` 中英双语，词条结构由类型约束强制一致
- `--fvbt-*` 设计令牌驱动亮暗主题，并映射到 Element Plus 变量
- axios 请求层：实例、拦截器、服务层与 Mock 适配器分离
- `@unhead/vue` 输出 title、description、canonical 与 hreflang
- `vite-ssg` 预渲染，产物可直接部署到 Netlify
- Element Plus 组件与样式按需引入
- ESLint、Stylelint、Prettier、vue-tsc、commitlint、husky、lint-staged 全链路

## 已知边界

不含 RBAC、动态菜单、微前端、表单引擎、多皮肤系统、GraphQL 与状态库；后台能力请使用 V3TM。
