export interface ApiEnvelope<T> {
  code: number
  message: string
  data: T
}

export interface OverviewData {
  posts: number
  tags: number
  visits: number
  updatedAt: string
}
