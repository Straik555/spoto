import { baseApiSlice } from '@api/index'
import {
  HouseModel,
  TowerModel,
  TowerModelById,
  ApartmentModel,
  HouseSpot,
  HousesApartmentsByUserResponse,
  HousesApartmentsByUserQrCodeResponse,
  HousesApartmentsByUserQrCode,
  HouseParams,
  QrCodeModel,
  PerformQrCodeParams,
} from '@api/house/types'

export enum HouseApiTagTypes {
  Apartments = 'Apartments',
  HouseSpots = 'HouseSpots',
  HouseSpot = 'HouseSpot',
}

export const houseApiTagTypes = [
  HouseApiTagTypes.Apartments,
  HouseApiTagTypes.HouseSpots,
]

const enhancedBaseApiSlice = baseApiSlice.enhanceEndpoints({
  addTagTypes: houseApiTagTypes,
})

export const houseApi = enhancedBaseApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getHousesByUser: builder.query<HouseModel[], void>({
      query: (queryParams) => ({
        url: `/api/House/by-user`,
        params: queryParams,
      }),
    }),
    getTowers: builder.query<TowerModel[], number>({
      query: (houseId) => ({
        url: `/api/House/${houseId}/towers`,
      }),
    }),
    getTowerById: builder.query<TowerModelById, number>({
      query: (towerId) => ({
        url: `/api/House/towers/${towerId}`,
      }),
    }),
    performQrCode: builder.mutation<Blob | undefined, PerformQrCodeParams>({
      query: ({ towerId, apartmentIds }) => ({
        url: `/api/House/towers/${towerId}/perform-qrcode`,
        method: 'POST',
        data: { apartmentIds },
        responseType: 'blob',
      }),
    }),
    getApartmentsById: builder.query<ApartmentModel, number>({
      query: (apartmentId) => ({
        url: `/api/House/apartments/${apartmentId}`,
      }),
      providesTags: [HouseApiTagTypes.Apartments],
    }),
    renewQrCode: builder.mutation<QrCodeModel, number>({
      query: (apartmentId) => ({
        url: `/api/House/apartments/${apartmentId}/qr-code`,
        method: 'POST',
      }),
    }),
    getQrCode: builder.query<QrCodeModel, number>({
      query: (apartmentId) => ({
        url: `/api/House/apartments/${apartmentId}/qr-code`,
      }),
    }),
    joinHouse: builder.mutation<string, string>({
      query: (token) => ({
        url: `/api/House/join?token=${token}`,
        method: 'POST',
      }),
    }),
    getHouseSpots: builder.query<HouseSpot[], HouseParams>({
      query: (queryParams) => ({
        url: `/api/Spot/by-house`,
        params: queryParams,
      }),
      providesTags: [HouseApiTagTypes.HouseSpots],
    }),
    getHousesApartmentsByUser: builder.query<
      HousesApartmentsByUserResponse[],
      null
    >({
      query: () => ({
        url: `/api/House/apartments/by-user`,
        method: 'GET',
      }),
    }),
    getHousesApartmentsByUserQrCode: builder.query<
      HousesApartmentsByUserQrCodeResponse,
      HousesApartmentsByUserQrCode
    >({
      query: ({ apartmentId }) => ({
        url: `/api/House/apartments/${apartmentId}/qr-code`,
        method: 'GET',
      }),
    }),
  }),
})
