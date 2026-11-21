const STORAGE_PREFIX = 'fvbt:'

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function readStorage(key: string): string | null {
  if (!isBrowser()) return null

  try {
    return window.localStorage.getItem(`${STORAGE_PREFIX}${key}`)
  } catch {
    return null
  }
}

export function writeStorage(key: string, value: string): void {
  if (!isBrowser()) return

  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, value)
  } catch {
    // 隐私模式下写入会失败，忽略即可，不影响页面功能
  }
}

export function readStoredJson<T>(key: string): T | null {
  const raw = readStorage(key)
  if (!raw) return null

  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function writeStoredJson(key: string, value: unknown): void {
  writeStorage(key, JSON.stringify(value))
}
