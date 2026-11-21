import fs from 'node:fs'
import path from 'node:path'

/**
 * 预渲染输出为目录式（/404/index.html），静态托管仍需要一个根级 404.html，
 * Netlify 的兜底重写与 GitHub Pages 的默认 404 都依赖它。
 */
const dist = path.resolve(import.meta.dirname, '../dist')
const source = path.join(dist, '404', 'index.html')
const target = path.join(dist, '404.html')

if (fs.existsSync(source)) {
  fs.copyFileSync(source, target)
  console.log('[postbuild] 404.html 已生成')
} else {
  console.warn('[postbuild] 未找到 dist/404/index.html，跳过 404.html 生成')
}
