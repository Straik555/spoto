import { Time } from '@api/types'

export type WaitListSpots = {
  availableSpots: number
  countOfSpots: number
  distance: number | null
  from: string
  id: number
  isAvailable: boolean
  isNotified: boolean
  placeId: number
  placeName: string
  placePricePerHour: number
  placeType: number
  placeTimeZone: string
  time: Time
}

export type WaitListSearches = {
  id: number
  isAvailable: boolean
  isNotified: boolean
  time: Time
  searchQuery: string
  latitude: number
  longitude: number
  from: string
  distance: number | null
}

export type CreateSpotWaitList = {
  placeIds: number[]
  startInUtc: string
  endInUtc: string
}

export type CreateSearchWaitList = {
  latitude: number
  longitude: number
  distance: number
  locationSearchQuery: string
  time: Time
  from: string
}

export type DeleteWaitList = {
  spotId: number
}

export enum WaitListApiTagTypes {
  SpotWaitList = 'SpotWaitList',
  SearchesWaitList = 'SearchesWaitList',
}
