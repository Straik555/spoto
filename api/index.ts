import { ApiError } from '@api/types'
import { RootState } from '@redux/store'
import { BaseQueryFn } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
})

const axiosBaseQuery =
  (): BaseQueryFn =>
  async (request: AxiosRequestConfig, { getState }) => {
    try {
      const token = (getState() as RootState).authSlice.token
      const apiResponse = await axiosInstance({
        ...request,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(request.headers || {}),
        },
      })

      return { data: apiResponse.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data,
        } as ApiError,
      }
    }
  }

export const authBaseApiSlice = createApi({
  reducerPath: 'spotoAuthApi',
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  refetchOnMountOrArgChange: false,
})

export const baseApiSlice = createApi({
  reducerPath: 'spotoApi',
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  refetchOnMountOrArgChange: 30,
})
