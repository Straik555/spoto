import { Time } from '@api/types'

export interface BuildingEntity {
  address: string
  id: number
  lat: number
  lon: number
  ownerId: number
  height: number
  cityId: number
  commercialTime: Time
  workingTime: Time
}

export interface SpotEntity {
  building: BuildingEntity
  commercialTime: Time
  workingTime: Time
  price: SpotPrice
  id: number
  height: number
  electricCharger: ElectricChargerInfo
  name: string
  description: string
  linked: boolean
  hardwareId: number
  hardwareSerial: string | null
}

export interface ElectricChargerInfo {
  type1: boolean
  type2: boolean
}

export interface SpotPrice {
  perHour: number
  perDay: number
  perWeek: number
  perMonth: number
}

export interface HardwareEntity {
  id: number
  hardwareSerial: string
  status: string
}

export interface StatisticEntity {
  bookingsIn24Hours: number
  occupiedSpots: number
  totalSpots: number
  totalUsers: number
  unlinkedSpots: number
  unlinkedUsers: number
}

export interface MyBookingEntity {
  address: string
  vehicleId: number
  vehicleLP: string
  image: string
  starts: Date
  ends: Date
  id: string
  spotId: number
  timeZone: string
  placeId: number
}

interface ElectricCharger {
  type1: boolean
  type2: boolean
}

interface RequestedIntervalUtc {
  end: string
  start: string
}

interface Schedule {
  requestedIntervalUtc: RequestedIntervalUtc
  intervalsUtc: RequestedIntervalUtc
}

export interface MarkerEntity {
  id: number
  img: string
  name: string
  distance: number
  openTime24h: boolean
  openTimeStart: string
  openTimeEnd: string
  timeZone: string
  availableSpotCount: number
  buildingLatitude: number
  buildingLongitude: number
  spotCount: number
  building: {
    lat: number
    lon: number
  }
  price: {
    perHour: number
    perDay: number
  }
  placeType: number
  electricCharger: ElectricCharger
  schedule: Schedule
  requestedIntervalUtc: RequestedIntervalUtc
}

export interface WaitListPropsSpots {
  countOfSpots: number
  distance: number | null
  from: string
  id: number
  isAvailable: boolean
  isNotified: boolean
  placeId: number
  placeName: string
  placePricePerHour: number
  placeType: string
  time: Time
}
export interface WaitListPropsSearches {
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
