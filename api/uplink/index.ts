import { baseApiSlice } from '@api/index'
import {
  UplinkLpChangedProps,
  UplinkLpVehicleChangedProps,
} from '@api/uplink/types'
import { hardwareApiTagTypes } from '@api/hardware'

export const uplinkApiApiTypes = [...hardwareApiTagTypes]

const enchancedBaseApiSlice = baseApiSlice.enhanceEndpoints({
  addTagTypes: uplinkApiApiTypes,
})

export const uplinkApi = enchancedBaseApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    updateUplinkChanged: builder.mutation<void, UplinkLpChangedProps>({
      query: (data) => ({
        url: `virtual-things/api/Uplink/lp-changed`,
        data,
        method: 'POST',
      }),
      invalidatesTags: ['AllHardware'],
    }),
    updateUplinkVehicleChanged: builder.mutation<
      void,
      UplinkLpVehicleChangedProps
    >({
      query: (data) => ({
        url: `virtual-things/api/Uplink/vehicle-changed`,
        data,
        method: 'POST',
      }),
      invalidatesTags: ['AllHardware'],
    }),
  }),
})
