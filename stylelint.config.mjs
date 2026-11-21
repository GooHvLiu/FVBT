export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recommended-vue/scss'],
  ignoreFiles: ['dist/**/*', 'dist-ssg/**/*', 'node_modules/**/*'],
  rules: {
    // BEM 与语义化命名并存，不做强制格式约束
    'selector-class-pattern': null,
    'custom-property-pattern': null,
    'scss/dollar-variable-pattern': null,
    'scss/at-mixin-pattern': null,
    // 组件内样式按就近原则书写，不要求严格顺序
    'no-descending-specificity': null,
    // Element Plus 的深层选择器需要穿透
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['deep', 'global', 'slotted'] },
    ],
  },
}
