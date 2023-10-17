export type Time = {
  start: TimeApi
  end: TimeApi
}

//time format - HH:mm
export type TimeApi = `${number}:${number}`

export type PaginatedResult<V> = {
  totalCount: number
  page: number
  perPage: number
  items: V[]
}

export type PaginationQueryParams = {
  Page?: number
  PerPage?: number
}

export enum PlaceType {
  SPOT,
  SET,
}

export enum Weekdays {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7,
}

export enum ApiStatusCodes {
  Unauthorized = 401,
  InternalServerError = 500,
}

export type ApiError = {
  status: ApiStatusCodes
  data: any
  message: string
}
