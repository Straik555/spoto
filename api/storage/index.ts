import { baseApiSlice } from '@api/index'

export const storageApi = baseApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getStorageDownload: builder.query<string, string>({
      query: (key) => ({
        url: `/api/Storage/download?key=${key}`,
        headers: {
          'content-type': 'application/json',
          'Content-type': 'application/json',
        },
      }),
    }),
    getStorageUpload: builder.mutation<string, FormData>({
      query: (data) => ({
        url: `/api/Storage/upload`,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          type: 'formData',
        },
        data,
      }),
    }),
  }),
})
