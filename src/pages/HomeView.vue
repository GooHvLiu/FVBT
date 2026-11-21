<template>
  <section class="hero">
    <div class="container">
      <p class="hero__eyebrow">{{ t('home.eyebrow') }}</p>
      <h1 class="hero__title">{{ t('home.title') }}</h1>
      <p class="hero__desc">{{ t('home.description') }}</p>

      <div class="hero__actions">
        <RouterLink class="button button--primary" :to="pathFor('demo')">
          {{ t('home.primaryAction') }}
          <el-icon><ArrowRight /></el-icon>
        </RouterLink>

        <a
          v-if="siteConfig.repository"
          class="button"
          :href="siteConfig.repository"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('home.secondaryAction') }}
        </a>
      </div>
    </div>
  </section>

  <section class="features">
    <div class="container">
      <h2 class="section-title">{{ t('home.featuresTitle') }}</h2>

      <ul class="feature-grid">
        <li v-for="feature in features" :key="feature.titleKey" class="feature-card">
          <h3>{{ t(feature.titleKey) }}</h3>
          <p>{{ t(feature.descKey) }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="scope">
    <div class="container scope__inner">
      <h2>{{ t('home.scopeTitle') }}</h2>
      <p>{{ t('home.scopeDesc') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { ArrowRight } from '@/components/icons'
import { siteConfig } from '@/config/site'
import { useLocalePath } from '@/composables/useAppLocale'
import { useAppSeo } from '@/composables/useAppSeo'

const { t } = useI18n()
const { pathFor } = useLocalePath()

useAppSeo({ titleKey: 'seo.homeTitle' })

const features = [
  { titleKey: 'home.featureRouterTitle', descKey: 'home.featureRouterDesc' },
  { titleKey: 'home.featureThemeTitle', descKey: 'home.featureThemeDesc' },
  { titleKey: 'home.featureRequestTitle', descKey: 'home.featureRequestDesc' },
]
</script>

<style scoped lang="scss">
@use '@/assets/styles/mixins.scss' as *;

.hero {
  padding-block: 96px 64px;

  @include respond-below('md') {
    padding-block: 64px 40px;
  }
}

.hero__eyebrow {
  color: var(--fvbt-color-primary);
  font-family: var(--fvbt-font-mono);
  font-size: var(--fvbt-font-size-sm);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.hero__title {
  max-width: 820px;
  margin-top: 16px;
  font-size: var(--fvbt-font-size-3xl);
}

.hero__desc {
  max-width: 640px;
  margin-top: 20px;
  font-size: var(--fvbt-font-size-lg);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 36px;
}

.button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding-inline: 20px;
  border: 1px solid var(--fvbt-color-border-strong);
  border-radius: var(--fvbt-radius-sm);
  background-color: transparent;
  color: var(--fvbt-color-text);
  font-size: var(--fvbt-font-size-sm);
  transition: var(--fvbt-transition);

  &:hover {
    border-color: var(--fvbt-color-primary);
    color: var(--fvbt-color-primary);
  }
}

.button--primary {
  border-color: var(--fvbt-color-primary);
  background-color: var(--fvbt-color-primary);
  color: var(--fvbt-color-primary-contrast);

  &:hover {
    background-color: var(--fvbt-color-primary-hover);
    color: var(--fvbt-color-primary-contrast);
  }
}

.section-title {
  font-size: var(--fvbt-font-size-2xl);
}

.features {
  padding-block: 24px 72px;

  @include respond-below('md') {
    padding-block: 8px 48px;
  }
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin: 32px 0 0;
  padding: 0;
  list-style: none;

  @include respond-below('lg') {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include respond-below('sm') {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  @include card;

  padding: 24px;

  h3 {
    font-size: var(--fvbt-font-size-lg);
  }

  p {
    margin-top: 10px;
    font-size: var(--fvbt-font-size-sm);
  }
}

.scope {
  padding-block: 0 88px;
}

.scope__inner {
  @include card;

  padding: 28px;
  border-left: 3px solid var(--fvbt-color-primary);

  h2 {
    font-size: var(--fvbt-font-size-xl);
  }

  p {
    margin-top: 10px;
  }
}
</style>
