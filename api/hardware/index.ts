import {
  HardwareInfo,
  HardwareItem,
  LinkBody,
  SpotHardwareStatus,
  UnlinkBody,
} from '@api/hardware/types'
import { baseApiSlice } from '@api/index'

export const hardwareApiTagTypes = ['AllHardware']

const enchancedBaseApiSlice = baseApiSlice.enhanceEndpoints({
  addTagTypes: hardwareApiTagTypes,
})

export const hardwareApi = enchancedBaseApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUnlinkedByUser: builder.query<HardwareInfo[], void>({
      query: () => ({
        url: `/api/Hardware/unlinked-by-user`,
      }),
    }),
    getSpotHardwareStatus: builder.query<SpotHardwareStatus, void>({
      query: () => ({
        url: `/api/Hardware/spot-hardware-status`,
      }),
    }),
    getAllHardware: builder.query<HardwareItem[], void>({
      query: () => ({
        url: `virtual-things/api/hardware/all`,
      }),
      providesTags: ['AllHardware'],
    }),
    unlink: builder.mutation<void, UnlinkBody>({
      query: (data) => ({
        url: `/api/Hardware/unlink`,
        method: 'POST',
        data,
      }),
    }),
    link: builder.mutation<void, LinkBody>({
      query: (data) => ({
        url: `/api/Hardware/link`,
        method: 'POST',
        data,
      }),
    }),
  }),
})
