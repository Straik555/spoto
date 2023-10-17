export interface StatisticsInfo {
  bookingsIn24Hours: number
  occupiedSpots: number
  totalSpots: number
  totalUsers: number
  unlinkedSpots: number
  unlinkedUsers: number
}

export type StatisticByHouseInfo = {
  totalSpots: number
  occupiedSpots: number
  availableSpots: number
}

export type StatisticByHouseQueryParams = {
  houseId: number
}
