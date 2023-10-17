import { BrandsModel, VehicleModel } from '@api/vehicle/types'
import { baseApiSlice } from '@api/index'

export const vehiclesApiVehicleTypes = ['Vehicles', 'Vehicle']

const enhancedBaseApiSlice = baseApiSlice.enhanceEndpoints({
  addTagTypes: vehiclesApiVehicleTypes,
})

export const vehicleApi = enhancedBaseApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getBrands: builder.query<BrandsModel[], null>({
      query: () => ({
        url: `/api/Vehicle/brands`,
      }),
    }),
    getVehicles: builder.query<VehicleModel[], null>({
      query: () => ({
        url: `/api/Vehicle/by-user`,
      }),
      providesTags: ['Vehicles'],
    }),
    getVehicle: builder.query<VehicleModel, string>({
      query: (id) => ({
        url: `/api/Vehicle/${id}`,
      }),
      providesTags: ['Vehicle'],
    }),
    addVehicle: builder.mutation({
      query: (data) => ({
        url: '/api/Vehicle',
        method: 'POST',
        data,
        body: data,
        headers: {
          'content-type': 'application/json',
          'Content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Vehicles'],
    }),
    updateVehicle: builder.mutation({
      query: (data) => ({
        url: '/api/Vehicle',
        method: 'PUT',
        data,
        body: data,
        headers: {
          'content-type': 'application/json',
          'Content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Vehicles', 'Vehicle'],
    }),
    deleteVehicle: builder.mutation({
      query: (id) => ({
        url: `/api/Vehicle/${id}`,
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'Content-type': 'application/json',
        },
        invalidatesTags: (id) => [{ type: 'Vehicles', id }],
      }),
    }),
  }),
})
