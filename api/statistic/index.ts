import { baseApiSlice } from '@api/index'
import {
  StatisticsInfo,
  StatisticByHouseInfo,
  StatisticByHouseQueryParams,
} from '@api/statistic/types'

export const statisticApiTagTypes = ['Statistic', 'StatisticByHouse']

const enhancedBaseApiSlice = baseApiSlice.enhanceEndpoints({
  addTagTypes: statisticApiTagTypes,
})

export const statisticApi = enhancedBaseApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getStatistics: builder.query<StatisticsInfo, void>({
      query: () => ({
        url: `/api/Statistic/get`,
      }),
      providesTags: ['Statistic'],
    }),
    getStatisticsByHouse: builder.query<
      StatisticByHouseInfo,
      StatisticByHouseQueryParams
    >({
      query: ({ houseId }) => ({
        url: '/api/Statistic/visitors-parking/by-house',
        params: houseId ? { houseId } : {},
      }),
      providesTags: ['StatisticByHouse'],
    }),
  }),
})
