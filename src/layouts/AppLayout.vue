<template>
  <a class="skip-link" href="#main">{{ t('common.skipToContent') }}</a>

  <AppHeader />

  <main id="main" class="app-main">
    <RouterView />
  </main>

  <AppFooter />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'

const { t } = useI18n()
</script>

<style scoped lang="scss">
.app-main {
  flex: 1;
  width: 100%;
}
</style>
