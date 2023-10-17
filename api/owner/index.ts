import { baseApiSlice } from '@api/index'
import { profileApiTagTypes } from '@api/profile'
import { GetOwnersByUserQueryParams, OwnersInfo } from './types'

export const ownersApiTagTypes = ['Owners', ...profileApiTagTypes]

const enhancedBaseApiSlice = baseApiSlice.enhanceEndpoints({
  addTagTypes: ownersApiTagTypes,
})

export const ownersApi = enhancedBaseApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getOwnersByUser: builder.query<OwnersInfo[], GetOwnersByUserQueryParams>({
      query: (queryParams) => ({
        url: `/api/Owner/get-by-user`,
        params: queryParams,
      }),
    }),
  }),
})
