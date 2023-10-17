import { baseApiSlice } from '@api/index'
import { AddSpots, DeleteSet, SetModel } from '@api/set/types'
import { GetSpotsByUserQueryParams, SpotInfo } from '@api/spot/types'

export enum SetApiTagTypes {
  SetsByBuilding = 'SetsByBuilding',
  SetsSpots = 'SetsSpots',
  SpotsWithoutSet = 'SpotsWithoutSet',
  SetById = 'SetById',
}

export const setApiTagTypes = [
  'SetsByBuilding',
  'SetsSpots',
  'SpotsWithoutSet',
  'SetById',
]

const enhancedBaseApiSlice = baseApiSlice.enhanceEndpoints({
  addTagTypes: setApiTagTypes,
})

export const setApi = enhancedBaseApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUserSetsByUser: builder.query<SetModel[], GetSpotsByUserQueryParams>({
      query: (queryParams) => ({
        url: `/api/Set/by-user`,
        params: queryParams,
      }),
    }),
    getSetById: builder.query<SetModel, number>({
      query: (setId) => ({
        url: `/api/Set/${setId}?includeSpots=true`,
      }),
      providesTags: [SetApiTagTypes.SetById],
    }),
    getSetSpots: builder.query<SpotInfo[], number>({
      query: (setId) => ({
        url: `/api/Set/get-spots?setId=${setId}`,
      }),
      providesTags: [SetApiTagTypes.SetsSpots],
    }),
    getSpotsWithoutSet: builder.query<SpotInfo[], number>({
      query: (buildingId) => ({
        url: `api/Spot/by-building-without-set?buildingId=${buildingId}`,
      }),
      providesTags: ['SpotsWithoutSet'],
    }),
    addSpots: builder.mutation<void, AddSpots>({
      query: (data) => ({
        url: `/api/Set/add-spots`,
        data,
        method: 'POST',
      }),
      invalidatesTags: [
        SetApiTagTypes.SetsSpots,
        SetApiTagTypes.SpotsWithoutSet,
      ],
    }),
    deleteSetById: builder.mutation<void, number>({
      query: (setId) => ({
        url: `/api/Set/${setId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [SetApiTagTypes.SetsByBuilding],
    }),
    createSet: builder.mutation<void, SetModel>({
      query: (data) => ({
        url: `/api/Set`,
        data,
        method: 'POST',
      }),
      invalidatesTags: [SetApiTagTypes.SetsByBuilding],
    }),
    updateSet: builder.mutation<void, SetModel>({
      query: (data) => ({
        url: `/api/Set`,
        data,
        method: 'PUT',
      }),
      invalidatesTags: [SetApiTagTypes.SetsByBuilding, SetApiTagTypes.SetById],
    }),
    getSetsByBuilding: builder.query<SetModel[], number>({
      query: (buildingId) => ({
        url: `/api/Set/by-building?buildingId=${buildingId}`,
      }),
      providesTags: [SetApiTagTypes.SetsByBuilding],
    }),
  }),
})
