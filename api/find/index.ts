import { baseApiSlice } from '@api/index'
import { HistoryProps, MapFindNearbyProps } from '@api/find/types'

const findMapApiTagTypes = ['MapHistory', 'MapFindNearby']

const enhancedBaseApiSlice = baseApiSlice.enhanceEndpoints({
  addTagTypes: findMapApiTagTypes,
})

const findMapApi = enhancedBaseApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getHistory: builder.query<HistoryProps, null>({
      query: () => ({
        url: '/api/Find/history/get',
        method: 'GET',
      }),
      providesTags: ['MapHistory'],
    }),
    getFindNearby: builder.query<MapFindNearbyProps, string>({
      query: (params) => ({
        url: `/api/Find/find-place-nearby?${params}`,
        method: 'GET',
      }),
      providesTags: ['MapMarkers'],
    }),
    clearHistory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/Find/history/clear/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['MapHistory'],
    }),
  }),
})

export default findMapApi
