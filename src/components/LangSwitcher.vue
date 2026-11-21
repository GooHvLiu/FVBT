<template>
  <el-dropdown trigger="click" placement="bottom-end" @command="handleCommand">
    <button class="lang-button" type="button" :aria-label="t('nav.language')">
      <span>{{ currentLabel }}</span>
      <el-icon class="lang-button__icon"><ArrowDown /></el-icon>
    </button>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="option in localeOptions"
          :key="option.value"
          :command="option.value"
          :disabled="option.value === locale"
        >
          {{ option.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowDown } from '@/components/icons'
import { APP_LOCALES, localeMeta, type AppLocale } from '@/config/locale'
import { useAppLocale, useSwitchLocale } from '@/composables/useAppLocale'

const { t } = useI18n()
const { locale } = useAppLocale()
const { switchLocale } = useSwitchLocale()

const localeOptions = APP_LOCALES.map((value) => ({
  value,
  label: localeMeta[value].label,
}))

const currentLabel = computed(() => localeMeta[locale.value].label)

function handleCommand(command: string | number | object): void {
  switchLocale(command as AppLocale)
}
</script>

<style scoped lang="scss">
.lang-button {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--fvbt-color-border);
  border-radius: var(--fvbt-radius-sm);
  background-color: transparent;
  color: var(--fvbt-color-text-secondary);
  font-size: var(--fvbt-font-size-sm);
  cursor: pointer;
  transition: var(--fvbt-transition);

  &:hover {
    border-color: var(--fvbt-color-primary);
    color: var(--fvbt-color-primary);
  }
}

.lang-button__icon {
  font-size: 12px;
}
</style>
