import { baseApiSlice } from '@api/index'
import { BuildingModel } from './types'

export const buildingApiTagTypes = ['Building']

const enhancedBaseApiSlice = baseApiSlice.enhanceEndpoints({
  addTagTypes: buildingApiTagTypes,
})

export const buildingApi = enhancedBaseApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getBuildingsByUser: builder.query<BuildingModel[], void>({
      query: () => ({
        url: `/api/Building/by-user`,
      }),
    }),
    getBuildingsByBuildingId: builder.query<BuildingModel, string | number>({
      query: (buildingId) => ({
        url: `/api/Building/${buildingId}`,
      }),
    }),
  }),
})
