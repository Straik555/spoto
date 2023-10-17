import { baseApiSlice } from '@api/index'
import { PlaceInfo } from '@api/place/types'

export enum PlaceApiTagTypes {
  PlaceInfo = 'PlaceInfo',
}

export const placeApiTagTypes = [PlaceApiTagTypes.PlaceInfo]

const enhancedBaseApiSlice = baseApiSlice.enhanceEndpoints({
  addTagTypes: placeApiTagTypes,
})

export const placeApi = enhancedBaseApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getPlaceById: builder.query<PlaceInfo, number>({
      query: (placeId) => ({
        url: `/api/Place/${placeId}`,
      }),
      providesTags: [PlaceApiTagTypes.PlaceInfo],
    }),
  }),
})
