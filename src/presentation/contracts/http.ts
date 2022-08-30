export type HttpResponse<T = any> = {
  status: number
  data: T
}

export type HttpRequest<T = any> = {
  body: T,
}

export const serverError = (error: Error, statusCode?: number): HttpResponse => ({
  status: statusCode || 500,
  data: error.stack
})

export const ok = (data: any): HttpResponse => ({
  status: 200,
  data
})
