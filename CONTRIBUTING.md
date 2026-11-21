# 贡献指南

感谢你愿意改进 FVBT。为了少走弯路，提交前请花三分钟读完这份约定。

## 适合提什么

- 修复模板自身的缺陷：路由、i18n、主题令牌、请求层、构建与规范链。
- 提升可维护性的重构：更清晰的目录、更少的重复、更准的类型。
- 文档与示例完善，包括中英双语文案。

不适合提：

- 权限、动态菜单、微前端、表单引擎、多皮肤、GraphQL 这类后台能力，请提给 V3TM。
- 与本模板无关的个人业务代码。

## 流程

1. Fork 仓库并从 `develop` 切出分支，命名参考 `feat/locale-path`、`fix/mock-adapter`。
2. 本地开发：`npm install` → `npm run dev`。
3. 提交前自查：`npm run check`、`npm run format:check`、`npm run build` 三项都通过。
4. 提交信息遵循 Conventional Commits：`feat:`、`fix:`、`refactor:`、`docs:`、`chore:`。
5. 向 `develop` 发起 PR，一个 PR 只做一件事，并说明动机与影响面。

## 代码约定

- 组件用 `<script setup lang="ts">`，组合式函数放 `src/composables`，纯函数放 `src/utils`。
- 文案一律进 `src/locales`，中英同步；不要在模板里写死中文。
- 颜色、间距、圆角、字号只引用 `--fvbt-*` 变量。
- 站内链接用 `pathFor(routeKey)`，不要手写语言前缀。
- 新增 Element Plus 组件后跑一次 `npm run dev` 刷新 `src/types/components.d.ts`。
- 注释写「为什么」，不写「做了什么」，也不要留下调试代码与 TODO。

## 提交信息示例

```
feat(router): 语言切换保留当前页面
fix(seo): 404 页面不再输出 hreflang
docs(readme): 补充 Netlify 部署说明
```
