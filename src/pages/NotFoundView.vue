<template>
  <div class="container not-found">
    <p class="not-found__code">404</p>
    <h1>{{ t('notFound.title') }}</h1>
    <p class="not-found__desc">{{ t('notFound.description') }}</p>

    <RouterLink class="not-found__action" :to="pathFor('home')">
      {{ t('notFound.backHome') }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { useLocalePath } from '@/composables/useAppLocale'
import { useAppSeo } from '@/composables/useAppSeo'

const { t } = useI18n()
const { pathFor } = useLocalePath()

useAppSeo({ titleKey: 'seo.notFoundTitle', noindex: true })
</script>

<style scoped lang="scss">
.not-found {
  padding-block: 120px 140px;
  text-align: center;

  h1 {
    font-size: var(--fvbt-font-size-2xl);
  }
}

.not-found__code {
  color: var(--fvbt-color-primary);
  font-family: var(--fvbt-font-mono);
  font-size: 64px;
  line-height: 1;
}

.not-found__desc {
  max-width: 460px;
  margin: 16px auto 0;
}

.not-found__action {
  display: inline-flex;
  align-items: center;
  height: 44px;
  margin-top: 28px;
  padding-inline: 22px;
  border-radius: var(--fvbt-radius-sm);
  background-color: var(--fvbt-color-primary);
  color: var(--fvbt-color-primary-contrast);
  font-size: var(--fvbt-font-size-sm);

  &:hover {
    background-color: var(--fvbt-color-primary-hover);
    color: var(--fvbt-color-primary-contrast);
  }
}
</style>
