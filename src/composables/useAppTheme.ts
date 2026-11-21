import { computed, ref } from 'vue'
import { readStorage, writeStorage } from '@/utils/storage'

export type ThemeMode = 'light' | 'dark'

const theme = ref<ThemeMode>('light')
let initialized = false

function applyTheme(mode: ThemeMode): void {
  theme.value = mode

  if (typeof document === 'undefined') return

  const root = document.documentElement
  root.dataset.theme = mode
  root.classList.toggle('dark', mode === 'dark')
  writeStorage('theme', mode)
}

/**
 * 在应用启动时调用一次。
 * index.html 里的内联脚本已经处理过首帧，这里负责把状态与存储对齐。
 */
export function initTheme(): void {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  const stored = readStorage('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const initial: ThemeMode =
    stored === 'dark' || stored === 'light' ? stored : prefersDark ? 'dark' : 'light'

  applyTheme(initial)
}

export function useAppTheme() {
  const isDark = computed(() => theme.value === 'dark')

  function setTheme(mode: ThemeMode): void {
    applyTheme(mode)
  }

  function toggleTheme(): void {
    applyTheme(isDark.value ? 'light' : 'dark')
  }

  return {
    theme: computed(() => theme.value),
    isDark,
    setTheme,
    toggleTheme,
  }
}
