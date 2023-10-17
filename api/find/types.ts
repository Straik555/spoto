import { TimeApi } from '@api/types'
import { MarkerEntity } from '@screens/admin/Sets/ServerEntities.model'

type MapItem = {
  id: number
  lat: number
  lon: number
  searchQuery: string
}

export type HistoryProps = {
  page: number
  perPage: number
  totalCount: number
  items: MapItem[]
}

export type MapFindNearbyProps = {
  page: number
  perPage: number
  totalCount: number
  items: MarkerEntity[]
}

export type MapFindNearbyArgs = {
  Latitude: number
  Longitude: number
  Distance: number
  Height: number
  'ElectricCharger.Type1'?: boolean
  'ElectricCharger.Type2'?: boolean
  NearestTime: boolean
  'Time.Start': TimeApi | null
  'Time.End': TimeApi | null
  From: TimeApi | null
  LocationSearchQuery?: string
  ShouldReturnNonAvailableSpots: boolean
  Page: number
  PerPage: number
}
