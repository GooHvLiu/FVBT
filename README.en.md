# FVBT

A front-end base you can start working on immediately: **Vue 3 + TypeScript + Element Plus + Vite**, with bilingual routing, light/dark design tokens, a thin request layer and a complete engineering chain.

FVBT only covers content-oriented sites. For permissions, dynamic menus or workflows, use V3TM instead of building them twice.

- Version: **1.0.0**
- License: **MIT**
- Docs language: English / 中文（`README.md`）

---

## 1. Scope

Every new site repeats the same setup: locale-prefixed routes, i18n dictionaries, design tokens, request wrappers and lint rules — each time slightly different. FVBT freezes that setup into one maintainable baseline.

**What stays**

| Capability             | Detail                                                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------------------------- |
| Locale-prefixed routes | Chinese on the root path, English under `/en`; paths are generated from a `routeKey`, never hand-written |
| i18n                   | `vue-i18n` in Composition API mode, with dictionaries structurally enforced by types                     |
| Design tokens          | One set of `--fvbt-*` variables for the template and a mapping layer for Element Plus                    |
| Request layer          | axios instance + interceptors + services + mock adapter; switching a backend is config only              |
| SEO                    | `@unhead/vue` injects title, description, canonical and hreflang                                         |
| Pre-rendering          | `vite-ssg` emits static HTML, ready for Netlify-style hosting                                            |
| Quality gates          | ESLint, Stylelint, Prettier, vue-tsc, commitlint, husky, lint-staged                                     |

**What is deliberately left out**

RBAC, dynamic menus, micro-frontends, form engines, multi-skin theming, GraphQL, a state store, unit-test scaffolding and component wrapper layers. Those belong to a higher-level framework (V3TM) or to a specific product; shipping them here would only produce dead code.

---

## 2. Highlights

- **Works out of the box** — `npm install` then `npm run dev`; no alias, tsconfig or build script edits needed.
- **Routes carry the language** — `/` ↔ `/en`, switching keeps the current page, links never hardcode a prefix.
- **Themable** — colors, spacing, radii and type scale live in `tokens.scss`; one edit applies everywhere.
- **Dark mode** — an inline script decides the first frame, so there is no white flash, and component styles stay single-source.
- **On-demand UI** — Element Plus components and styles load on demand; the shared bundle is about 190 kB (70 kB gzip).
- **Mock first** — the request flow is demonstrable without a backend, and page code does not change when one arrives.
- **Static-host friendly** — pre-rendered `index.html`, `demo.html`, `en.html`, `404.html`; Netlify picks them up directly.
- **Disciplined tooling** — format on save, lint on commit, Conventional Commits.

---

## 3. Stack

| Area         | Choice                                | Version |
| ------------ | ------------------------------------- | ------- |
| Framework    | Vue                                   | 3.5.46  |
| Language     | TypeScript                            | 6.0.3   |
| Build        | Vite                                  | 8.3.8   |
| Pre-render   | vite-ssg                              | 28.3.0  |
| UI           | Element Plus                          | 2.14.8  |
| Icons        | @element-plus/icons-vue               | 2.3.2   |
| Router       | vue-router                            | 5.5.1   |
| i18n         | vue-i18n                              | 11.4.23 |
| HTTP         | axios                                 | 1.21.1  |
| Head manager | @unhead/vue                           | 2.1.18  |
| Styles       | Sass (`@use`)                         | 1.108.2 |
| Tooling      | ESLint 10 / Stylelint 18 / Prettier 3 | —       |

All dependencies are pinned exactly (`save-exact=true`), so different machines install the same versions.

> TypeScript stays at 6.0.3 because `typescript-eslint@8` requires `<6.1.0`, and `@unhead/vue` stays at 2.1.18 because `vite-ssg@28` depends on 2.x. Check peer ranges before bumping either of them.

---

## 4. Requirements

- Node.js **>= 20.19.0** (22 recommended, `.nvmrc` included)
- npm **>= 10**
- No global CLI required

```bash
node -v   # v22.x
npm -v    # 10.x
```

---

## 5. Getting started

```bash
npm install       # install dependencies
npm run dev       # http://localhost:5173
npm run build     # type check + pre-rendered build
npm run preview   # preview the build at http://localhost:4173
```

`npm install` runs `husky`; when the folder is not a Git repository it prints `.git can't be found`. Initialize the repository and run `npm run prepare` again.

---

## 6. Project layout

```
FVBT
├─ public/favicon.svg
├─ src/
│  ├─ api/                 # client, mock adapter, types, per-domain services
│  ├─ assets/styles/       # tokens, mixins, Element Plus mapping, globals
│  ├─ components/          # header, footer, language & theme switches, icon barrel
│  ├─ composables/         # locale, theme and SEO helpers
│  ├─ config/              # site info, locale registry, i18n instance
│  ├─ layouts/             # skip link + header + main + footer
│  ├─ locales/             # zh-CN (structure source) and en-US
│  ├─ pages/               # home, component demo, 404
│  ├─ router/              # route definitions, scroll behaviour
│  ├─ types/               # generated component types, route meta augmentation
│  ├─ utils/               # path, storage, formatting, message wrapper
│  ├─ App.vue
│  └─ main.ts
├─ .env / .env.development / .env.staging / .env.production
├─ netlify.toml
├─ index.html
├─ vite.config.ts
└─ tsconfig.json / tsconfig.app.json / tsconfig.node.json
```

---

## 7. Scripts

| Script                  | Purpose                                                |
| ----------------------- | ------------------------------------------------------ |
| `npm run dev`           | Development server                                     |
| `npm run build`         | `vue-tsc --build` then `vite-ssg build`                |
| `npm run preview`       | Preview `dist`                                         |
| `npm run typecheck`     | Type check only (`--force` bypasses incremental cache) |
| `npm run lint`          | ESLint, warnings fail the run                          |
| `npm run lint:fix`      | ESLint with autofix                                    |
| `npm run stylelint`     | Lint `.vue` / `.scss` / `.css`                         |
| `npm run stylelint:fix` | Stylelint with autofix                                 |
| `npm run format`        | Prettier over the repository                           |
| `npm run format:check`  | Prettier check for CI                                  |
| `npm run check`         | lint + stylelint + typecheck                           |
| `npm run prepare`       | Install husky hooks                                    |

---

## 8. Configuration

### 8.1 Environment

| Variable               | Purpose                                                         | Default                    |
| ---------------------- | --------------------------------------------------------------- | -------------------------- |
| `VITE_APP_TITLE`       | Site name used in the footer and title suffix                   | `FVBT`                     |
| `VITE_APP_DESCRIPTION` | Fallback description                                            | see `.env`                 |
| `VITE_SITE_URL`        | Deployment origin for canonical and hreflang, no trailing slash | `https://fvbt.example.com` |
| `VITE_API_BASE_URL`    | API prefix                                                      | `/api`                     |
| `VITE_USE_MOCK`        | `true` uses the mock adapter                                    | per environment file       |

`.env` holds shared defaults, `.env.development` enables mocks, `.env.staging` points at the staging origin, and `.env.production` keeps mocks on so the static demo stays complete — switch `VITE_USE_MOCK` to `false` and replace `VITE_API_BASE_URL` when a real backend exists.

### 8.2 Site info

Edit `src/config/site.ts`:

```ts
export const siteConfig = {
  name: import.meta.env.VITE_APP_TITLE || 'FVBT',
  url: (import.meta.env.VITE_SITE_URL || 'https://fvbt.example.com').replace(/\/+$/, ''),
  repository: 'https://github.com/your-account/fvbt', // point to your repository
  license: 'MIT',
  // ...
}
```

`navItems` drives the header navigation; each `routeKey` must exist in `router/routes.ts` and each `labelKey` in the dictionaries.

### 8.3 Tokens

`src/assets/styles/tokens.scss` ships light and dark sets of `--fvbt-*` variables: colors, surfaces, borders, radii, shadows, font stacks, type scale, line height, transitions. Business styles reference variables only, so theme changes propagate automatically. Element Plus variables are mapped to the same tokens in `element.scss`.

---

## 9. Conventions

### Routes

Register a page once in `appRouteDefinitions`; `createLocaleRoutes()` expands it into `/`, `/en`, `/demo`, `/en/demo` and appends the catch-all.

```ts
{ key: 'demo', path: '/demo', component: () => import('@/pages/DemoView.vue') }
```

Always build links with `pathFor('demo')` instead of writing `/en/demo`.

### i18n

Dictionaries are grouped by namespace (`common`, `nav`, `home`, `demo`, `notFound`, `seo`). `zh-CN.ts` is the structural source; `en-US.ts` is typed against `MessageSchema`, so a missing key fails the build. Use `t` for copy and `formatDate` / `formatNumber` for dates and numbers.

### Theme

```ts
const { theme, isDark, setTheme, toggleTheme } = useAppTheme()
```

The resolved theme is written to both `html[data-theme]` and `.dark`, persisted as `fvbt:theme`, and applied before the first paint by the inline script in `index.html`.

### Requests

The chain is always page → service → client → axios or mock:

```ts
export const demoService = {
  getOverview: () => request<OverviewData>('/demo/overview'),
}
```

`client.ts` unwraps the `{ code, data, message }` envelope and throws `ApiError` when `code !== 0`. The mock adapter only intercepts when `VITE_USE_MOCK === 'true'`, so pages never branch on environment.

### Feedback and icons

- Messages go through `showMessage` in `utils/feedback.ts`; Element Plus message styles are imported only there.
- Icons come from `@/components/icons`; register new ones in `icons/index.ts`.
- Element Plus components are resolved on demand by `unplugin-vue-components`, so `<el-button>` works without imports.

---

## 10. Recipes

**Add a page** — create `src/pages/AboutView.vue` with `useAppSeo`, register `{ key: 'about', path: '/about', ... }`, add the nav item plus `nav.about` in both dictionaries.

**Add a language** — extend `APP_LOCALES` and `localeMeta` in `src/config/locale.ts`, add a dictionary file typed as `MessageSchema`, register it in `config/i18n.ts`. Routes, the switcher and hreflang extend automatically.

**Add an endpoint** — extend `api/types.ts`, add a service file, and give the mock adapter a matching response until the real API is available.

---

## 11. Build and deploy

`npm run build` type-checks first, then pre-renders:

```
dist/
├─ index.html        # Chinese home
├─ demo.html         # Chinese demo
├─ en.html           # English home
├─ en/demo.html      # English demo
├─ 404.html          # unmatched paths
└─ assets/           # hashed js / css
```

`netlify.toml` already declares `npm run build` and `publish = "dist"`, plus a `/*` → `/404.html` fallback and immutable caching for `assets/*`. Import the repository on Netlify, then add `VITE_SITE_URL` and any other environment variables in the site settings.

The output is plain static HTML, so Nginx, Cloudflare Pages, Vercel and GitHub Pages work too — make sure unmatched paths fall back to `404.html`.

---

## 12. Quality gates

| Stage          | Tool                                                  | Trigger                               |
| -------------- | ----------------------------------------------------- | ------------------------------------- |
| Code           | ESLint (flat config, Vue + TS recommended)            | save, `npm run lint`, pre-commit      |
| Styles         | Stylelint (standard-scss + recommended-vue)           | save, `npm run stylelint`, pre-commit |
| Format         | Prettier (no semicolons, single quotes, 100 cols, LF) | save, pre-commit, CI                  |
| Types          | vue-tsc (strict, no unused locals)                    | `npm run typecheck`, build, CI        |
| Commit message | commitlint (Conventional Commits)                     | commit-msg hook                       |
| Staged files   | lint-staged                                           | pre-commit                            |

```
feat(router): support locale-prefixed routes
fix(api): pass the error code through
docs(readme): document deployment
```

---

## 13. FAQ

**Build fails with an unknown `.css` extension?**
Node tried to load Element Plus styles during pre-rendering. `vite.config.ts` sets `ssr.noExternal: ['element-plus']`; keep it if you edit the config.

**Type check cannot find `el-*` components?**
`src/types/components.d.ts` is generated by `unplugin-vue-components` and committed. Run `npm run dev` or `npm run build` after adding new Element Plus components.

**Dark mode flashes?**
The first frame is decided by the inline script in `index.html` reading `fvbt:theme` and the system preference. Removing it reintroduces the flash.

**`prepare` says `.git can't be found`?**
The folder is not a Git repository yet. Initialize it and run `npm run prepare`.

**Can I drop pre-rendering?**
Yes: change `build` to `vue-tsc --build && vite build` and replace the `ViteSSG` wrapper in `main.ts` with a plain app. You lose static first paint and the SEO benefit.

---

## 14. Contributing

Issues and pull requests are welcome. Before submitting:

```bash
npm run check
npm run build
```

One PR, one concern. New capabilities should come with both dictionaries and README updates, and should not conflict with the scope declared above.

---

## 15. License

[MIT](./LICENSE) © 2026 FVBT
