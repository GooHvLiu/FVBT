<template>
  <header class="app-header">
    <div class="container app-header__inner">
      <RouterLink class="app-header__brand" :to="pathFor('home')">
        <span class="app-header__mark" aria-hidden="true">F</span>
        <span class="app-header__name">{{ t('common.appName') }}</span>
      </RouterLink>

      <nav class="app-header__nav" :aria-label="t('nav.menu')">
        <RouterLink
          v-for="item in navItems"
          :key="item.routeKey"
          class="app-header__link"
          :to="pathFor(item.routeKey)"
        >
          {{ t(item.labelKey) }}
        </RouterLink>
      </nav>

      <div class="app-header__actions">
        <LangSwitcher />
        <ThemeToggle />

        <button
          class="app-header__menu"
          type="button"
          :aria-label="t('nav.menu')"
          :aria-expanded="menuOpen ? 'true' : 'false'"
          @click="menuOpen = true"
        >
          <el-icon><Menu /></el-icon>
        </button>
      </div>
    </div>

    <!-- 顶栏带 backdrop-filter，会把 fixed 子元素限制在自身盒模型内，抽屉必须挂到 body -->
    <el-drawer
      v-model="menuOpen"
      direction="rtl"
      size="300px"
      :title="t('nav.menu')"
      append-to-body
    >
      <nav class="drawer-nav" :aria-label="t('nav.menu')">
        <RouterLink
          v-for="item in navItems"
          :key="item.routeKey"
          class="drawer-nav__link"
          :to="pathFor(item.routeKey)"
          @click="menuOpen = false"
        >
          {{ t(item.labelKey) }}
        </RouterLink>
      </nav>

      <div class="drawer-actions">
        <LangSwitcher />
        <ThemeToggle />
      </div>
    </el-drawer>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { Menu } from '@/components/icons'
import LangSwitcher from '@/components/LangSwitcher.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { navItems } from '@/config/site'
import { useLocalePath } from '@/composables/useAppLocale'

const { t } = useI18n()
const { pathFor } = useLocalePath()
const menuOpen = ref(false)
</script>

<style scoped lang="scss">
@use '@/assets/styles/mixins.scss' as *;

.app-header {
  position: sticky;
  top: 0;
  z-index: 30;
  border-bottom: 1px solid var(--fvbt-color-border);
  background-color: var(--fvbt-color-header);
  backdrop-filter: blur(12px);
}

.app-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: var(--fvbt-header-height);
}

.app-header__brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  letter-spacing: 0.02em;

  &:hover {
    color: var(--fvbt-color-text);
  }
}

.app-header__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: var(--fvbt-radius-sm);
  background-color: var(--fvbt-color-primary);
  color: var(--fvbt-color-primary-contrast);
  font-size: var(--fvbt-font-size-sm);
}

.app-header__name {
  font-size: var(--fvbt-font-size-lg);
}

.app-header__nav {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;

  @include respond-below('md') {
    display: none;
  }
}

.app-header__link {
  padding: 6px 12px;
  border-radius: var(--fvbt-radius-sm);
  color: var(--fvbt-color-text-secondary);
  font-size: var(--fvbt-font-size-sm);
  transition: var(--fvbt-transition);

  &:hover {
    background-color: var(--fvbt-color-surface-muted);
    color: var(--fvbt-color-text);
  }

  &.router-link-exact-active {
    background-color: var(--fvbt-color-primary-soft);
    color: var(--fvbt-color-primary);
  }
}

.app-header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.app-header__menu {
  display: none;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--fvbt-color-border);
  border-radius: var(--fvbt-radius-sm);
  background-color: transparent;
  color: var(--fvbt-color-text-secondary);
  cursor: pointer;

  @include respond-below('md') {
    display: inline-flex;
  }
}

.drawer-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.drawer-nav__link {
  padding: 12px 8px;
  border-radius: var(--fvbt-radius-sm);
  color: var(--fvbt-color-text);
  font-size: var(--fvbt-font-size-base);

  &:hover {
    background-color: var(--fvbt-color-surface-muted);
  }

  &.router-link-exact-active {
    color: var(--fvbt-color-primary);
  }
}

.drawer-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
}
</style>
