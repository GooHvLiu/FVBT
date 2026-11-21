<template>
  <footer class="app-footer">
    <div class="container app-footer__inner">
      <p class="app-footer__copy">© {{ year }} {{ siteConfig.name }}</p>

      <div class="app-footer__meta">
        <a
          v-if="siteConfig.repository"
          :href="siteConfig.repository"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('nav.repository') }}
        </a>
        <span>{{ siteConfig.license }}</span>
        <span>v{{ siteConfig.version }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { siteConfig } from '@/config/site'

const { t } = useI18n()
const year = computed(() => new Date().getFullYear())
</script>

<style scoped lang="scss">
.app-footer {
  border-top: 1px solid var(--fvbt-color-border);
  background-color: var(--fvbt-color-surface);
}

.app-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding-block: 20px;
  color: var(--fvbt-color-text-muted);
  font-size: var(--fvbt-font-size-sm);
}

.app-footer__copy {
  color: inherit;
}

.app-footer__meta {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
