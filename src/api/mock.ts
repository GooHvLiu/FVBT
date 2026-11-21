import type { AxiosAdapter, InternalAxiosRequestConfig } from 'axios'
import type { ApiEnvelope } from './types'

const NETWORK_ERROR_CODE = -1

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function buildResponse(
  config: InternalAxiosRequestConfig,
  body: ApiEnvelope<unknown>,
  status = 200,
): ReturnType<AxiosAdapter> {
  return Promise.resolve({
    data: body,
    status,
    statusText: status === 200 ? 'OK' : 'Not Found',
    headers: {},
    config,
  })
}

/**
 * 极简 Mock 适配器，只覆盖示例接口。
 * 接入真实后端时把 VITE_USE_MOCK 改为 false，本文件可以整目录删除。
 */
export const mockAdapter: AxiosAdapter = async (config) => {
  await sleep(320)

  const url = config.url ?? ''

  if (url.endsWith('/demo/overview')) {
    return buildResponse(config, {
      code: 0,
      message: 'ok',
      data: {
        posts: 24,
        tags: 12,
        visits: 3821,
        updatedAt: new Date().toISOString(),
      },
    })
  }

  return buildResponse(
    config,
    {
      code: 404,
      message: `No mock handler for ${url}`,
      data: null,
    },
    404,
  )
}

export { NETWORK_ERROR_CODE }
