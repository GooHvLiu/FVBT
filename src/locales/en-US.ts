import type { MessageSchema } from './zh-CN'

const messages: MessageSchema = {
  common: {
    appName: 'FVBT',
    skipToContent: 'Skip to content',
    loading: 'Loading',
    retry: 'Retry',
    close: 'Close',
    externalLink: 'Open in a new window',
  },
  nav: {
    home: 'Home',
    demo: 'Components',
    menu: 'Menu',
    theme: 'Toggle theme',
    language: 'Change language',
    repository: 'Repository',
  },
  home: {
    eyebrow: 'Vue 3 · TypeScript · Element Plus',
    title: 'A front-end base you can keep maintaining',
    description:
      'Routing, i18n, design tokens, a request layer and linting are already wired up, so a new project starts from here instead of three days of setup.',
    primaryAction: 'Browse components',
    secondaryAction: 'View source',
    featuresTitle: 'What is inside',
    featureRouterTitle: 'Locale-prefixed routes',
    featureRouterDesc:
      'Chinese and English live on separate paths, switching keeps the current page, and every link comes from one place.',
    featureThemeTitle: 'Design tokens',
    featureThemeDesc:
      'Light and dark tokens drive Element Plus, and business styles reference variables instead of hard-coded colors.',
    featureRequestTitle: 'Thin request layer',
    featureRequestDesc:
      'Instance, interceptors, services and mocks are separate layers; wiring a backend changes config only.',
    scopeTitle: 'Where it stops',
    scopeDesc:
      'This is a content-site base only. For permissions, dynamic menus and workflows, use V3TM instead of building them twice.',
  },
  demo: {
    title: 'Components',
    description:
      'The samples below confirm that Element Plus, i18n and theming are connected, and can be replaced with real content.',
    basicTitle: 'Basic components',
    buttonPrimary: 'Primary button',
    buttonDefault: 'Secondary button',
    tagStable: 'Stable',
    tagBeta: 'Beta',
    formTitle: 'Form controls',
    formName: 'Name',
    formNamePlaceholder: 'Enter a name',
    formEnabled: 'Enable the sample switch',
    formDensity: 'Density',
    densityCompact: 'Compact',
    densityDefault: 'Default',
    densityLoose: 'Loose',
    feedbackTitle: 'Feedback',
    feedbackAction: 'Show a message',
    feedbackMessage: 'A message coming from the shared wrapper',
    dialogAction: 'Open the dialog',
    dialogTitle: 'Dialog sample',
    dialogContent: 'Dialog content follows the active language and theme as well.',
    dialogConfirm: 'Got it',
    requestTitle: 'Request layer',
    requestDesc:
      'Pages call service methods only; mocks and real APIs are switched by environment variables.',
    requestMockBadge: 'Mock mode',
    requestRealBadge: 'Real API',
    requestHint: 'To connect a backend, change VITE_API_BASE_URL and VITE_USE_MOCK in .env.',
    requestPosts: 'Posts',
    requestTags: 'Tags',
    requestVisits: 'Visits',
    requestUpdated: 'Updated {date}',
    requestEmpty: 'Real API mode is on and no backend is configured yet.',
    i18nTitle: 'Internationalization',
    i18nDesc: 'Current locale {locale}, date sample {date}, number sample {number}.',
    themeTitle: 'Theme',
    themeDesc: 'Current theme {theme}; token and Element Plus variables update together.',
    themeLight: 'Light',
    themeDark: 'Dark',
  },
  notFound: {
    title: 'This page went missing',
    description: 'The link may be broken, or the address was typed incorrectly.',
    backHome: 'Back to home',
  },
  seo: {
    defaultDescription:
      'FVBT is a minimal Vue 3 + TypeScript + Element Plus base for content sites, with i18n and design tokens built in.',
    homeTitle: 'Minimal front-end base',
    demoTitle: 'Components',
    notFoundTitle: 'Page not found',
  },
}

export default messages
