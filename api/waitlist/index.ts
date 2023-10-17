import { baseApiSlice } from '@api/index'
import {
  WaitListSpots,
  WaitListSearches,
  DeleteWaitList,
  CreateSpotWaitList,
  CreateSearchWaitList,
  WaitListApiTagTypes,
} from '@api/waitlist/types'

export const waitListApiTagTypes = [
  WaitListApiTagTypes.SpotWaitList,
  WaitListApiTagTypes.SearchesWaitList,
]

const enchancedBaseApiSlice = baseApiSlice.enhanceEndpoints({
  addTagTypes: waitListApiTagTypes,
})

export const waitListApi = enchancedBaseApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSpotWaitList: builder.query<WaitListSpots[], null>({
      query: () => ({
        url: '/api/WaitList/spots',
        method: 'GET',
      }),
      providesTags: [WaitListApiTagTypes.SpotWaitList],
    }),
    getSearchWaitList: builder.query<WaitListSearches[], null>({
      query: () => ({
        url: '/api/WaitList/searches',
        method: 'GET',
      }),
      providesTags: [WaitListApiTagTypes.SearchesWaitList],
    }),
    createSpotWaitList: builder.mutation<WaitListSpots[], CreateSpotWaitList>({
      query: (data) => ({
        url: '/api/WaitList/spots',
        method: 'POST',
        data,
      }),
      invalidatesTags: [WaitListApiTagTypes.SpotWaitList],
    }),
    createSearchesWaitList: builder.mutation<
      WaitListSearches[],
      CreateSearchWaitList
    >({
      query: (data) => ({
        url: '/api/WaitList/searches',
        method: 'POST',
        data,
      }),
      invalidatesTags: [WaitListApiTagTypes.SearchesWaitList],
    }),
    deleteSpotWaitList: builder.mutation<WaitListSpots[], DeleteWaitList>({
      query: ({ spotId }) => ({
        url: `/api/WaitList/spots/${spotId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [WaitListApiTagTypes.SpotWaitList],
    }),
    deleteSearchesWaitList: builder.mutation<
      WaitListSearches[],
      DeleteWaitList
    >({
      query: ({ spotId }) => ({
        url: `/api/WaitList/searches/${spotId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [WaitListApiTagTypes.SearchesWaitList],
    }),
  }),
})
