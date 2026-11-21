<template>
  <el-tooltip :content="t('nav.theme')" placement="bottom" :show-after="400">
    <button class="theme-toggle" type="button" :aria-label="t('nav.theme')" @click="toggleTheme">
      <el-icon>
        <Sunny v-if="!isDark" />
        <Moon v-else />
      </el-icon>
    </button>
  </el-tooltip>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Moon, Sunny } from '@/components/icons'
import { useAppTheme } from '@/composables/useAppTheme'

const { t } = useI18n()
const { isDark, toggleTheme } = useAppTheme()
</script>

<style scoped lang="scss">
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--fvbt-color-border);
  border-radius: var(--fvbt-radius-sm);
  background-color: transparent;
  color: var(--fvbt-color-text-secondary);
  cursor: pointer;
  transition: var(--fvbt-transition);

  &:hover {
    border-color: var(--fvbt-color-primary);
    color: var(--fvbt-color-primary);
  }
}
</style>
