import { baseApiSlice } from '@api/index'
import {
  CreateSpotParams,
  GetSpotsByUserQueryParams,
  SpotInfo,
  UpdateSpotAvailabilityParams,
  UpdateSpotParams,
} from '@api/spot/types'
import { HouseApiTagTypes } from '@api/house'
import { BookingApiTagTypes } from '@api/booking'
import { SetApiTagTypes } from '@api/set'

export enum SpotApiTagTypes {
  Spots = 'Spots',
  Spot = 'Spot',
}

export const spotApiTagTypes = [
  SpotApiTagTypes.Spots,
  SpotApiTagTypes.Spot,
  SetApiTagTypes.SetById,
]

const enhancedBaseApiSlice = baseApiSlice.enhanceEndpoints({
  addTagTypes: [
    ...spotApiTagTypes,
    HouseApiTagTypes.Apartments,
    HouseApiTagTypes.HouseSpots,
    HouseApiTagTypes.HouseSpot,
    BookingApiTagTypes.BookingsUpcoming,
    SetApiTagTypes.SetsSpots,
  ],
})

export const spotApi = enhancedBaseApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSpotsByUser: builder.query<SpotInfo[], GetSpotsByUserQueryParams>({
      query: (queryParams) => ({
        url: `/api/Spot/by-user`,
        params: queryParams,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: SpotApiTagTypes.Spots as const,
                id,
              })),
              SpotApiTagTypes.Spots,
            ]
          : [SpotApiTagTypes.Spots],
    }),
    getSpotById: builder.query<SpotInfo, number>({
      query: (spotId) => ({
        url: `/api/Spot/${spotId}`,
      }),
      providesTags: [SpotApiTagTypes.Spot, HouseApiTagTypes.HouseSpot],
    }),
    createSpot: builder.mutation<SpotInfo, CreateSpotParams>({
      query: (data) => ({
        url: `/api/Spot`,
        data,
        method: 'POST',
      }),
      invalidatesTags: [SpotApiTagTypes.Spots, HouseApiTagTypes.HouseSpots],
    }),
    updateSpot: builder.mutation<SpotInfo, UpdateSpotParams>({
      query: (data) => ({
        url: `/api/Spot`,
        data,
        method: 'PUT',
      }),
      invalidatesTags: [
        SpotApiTagTypes.Spot,
        SpotApiTagTypes.Spots,
        HouseApiTagTypes.HouseSpot,
        HouseApiTagTypes.HouseSpots,
        SetApiTagTypes.SetsSpots,
      ],
    }),
    deleteSpotById: builder.mutation<SpotInfo, number>({
      query: (spotId) => ({
        url: `/api/Spot/${spotId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        SetApiTagTypes.SetById,
        SpotApiTagTypes.Spots,
        SpotApiTagTypes.Spots,
        HouseApiTagTypes.HouseSpots,
      ],
    }),
    updateSpotAvailability: builder.mutation<
      void,
      UpdateSpotAvailabilityParams
    >({
      query: (data) => ({
        url: `/api/Spot/availability`,
        data,
        method: 'PUT',
      }),
      invalidatesTags: [BookingApiTagTypes.BookingsUpcoming],
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          spotApi.util.updateQueryData('getSpotsByUser', {}, (posts) => {
            const existingPost = posts.find((post) => post.id === params.spotId)

            if (!existingPost) return

            existingPost.availabilityState = params.availabilityState
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
})
