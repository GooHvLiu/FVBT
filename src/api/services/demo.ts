import { request } from '@/api/client'
import type { OverviewData } from '@/api/types'

/**
 * 示例服务：页面只调用这里的方法，不直接碰 axios。
 * 接入后端时方法签名不变，只改 baseURL 与 Mock 开关。
 */
export const demoService = {
  getOverview(): Promise<OverviewData> {
    return request<OverviewData>({
      url: '/demo/overview',
      method: 'GET',
    })
  },
}
