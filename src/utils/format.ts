/** 按当前语言格式化日期，默认输出「2026年11月21日」这类本地化写法 */
export function formatDate(
  value: Date | string | number,
  locale: string,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' },
): string {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat(locale, options).format(date)
}

/** 按当前语言加千分位 */
export function formatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(value)
}

/** 按当前语言格式化相对时间，用于「3 天前」这类展示 */
export function formatRelativeTime(
  value: Date | string | number,
  locale: string,
  now: Date = new Date(),
): string {
  const target = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(target.getTime())) return ''

  const diff = target.getTime() - now.getTime()
  const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ['year', 1000 * 60 * 60 * 24 * 365],
    ['month', 1000 * 60 * 60 * 24 * 30],
    ['day', 1000 * 60 * 60 * 24],
    ['hour', 1000 * 60 * 60],
    ['minute', 1000 * 60],
  ]
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  for (const [unit, size] of units) {
    if (Math.abs(diff) >= size || unit === 'minute') {
      return formatter.format(Math.round(diff / size), unit)
    }
  }

  return formatter.format(0, 'minute')
}
