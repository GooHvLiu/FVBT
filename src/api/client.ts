import axios, { type AxiosRequestConfig } from 'axios'
import { mockAdapter, NETWORK_ERROR_CODE } from './mock'
import type { ApiEnvelope } from './types'
import { readStorage } from '@/utils/storage'

/** 统一抛出的业务错误，页面只需要判断 message 与 code */
export class ApiError extends Error {
  readonly code: number
  readonly status?: number

  constructor(message: string, code: number, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.status = status
  }
}

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use((config) => {
  const token = readStorage('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError<ApiEnvelope<unknown>>(error)) {
      const payload = error.response?.data
      const code = payload?.code ?? error.response?.status ?? NETWORK_ERROR_CODE
      const message = payload?.message || error.message
      return Promise.reject(new ApiError(message, code, error.response?.status))
    }

    return Promise.reject(
      error instanceof Error ? error : new ApiError('请求失败', NETWORK_ERROR_CODE),
    )
  },
)

// 打开 Mock 开关后，所有请求交给本地适配器处理
if (import.meta.env.VITE_USE_MOCK === 'true') {
  http.defaults.adapter = mockAdapter
}

/** 发起请求并拆掉外层信封，页面拿到的是业务数据 */
export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await http.request<ApiEnvelope<T>>(config)
  const envelope = response.data

  if (!envelope || typeof envelope.code !== 'number') {
    throw new ApiError('响应格式不正确', NETWORK_ERROR_CODE, response.status)
  }

  if (envelope.code !== 0) {
    throw new ApiError(envelope.message || '请求失败', envelope.code, response.status)
  }

  return envelope.data
}

export { http }
