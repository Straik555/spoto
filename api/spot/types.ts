import { BuildingModel } from '@api/building/types'
import { Time, Weekdays } from '@api/types'

export type ElectricChargerInfo = {
  type1: boolean
  type2: boolean
}

export type SpotInfo = {
  id: number
  name: string
  description: string
  price: {
    perHour: number
    perDay: number
    perWeek: number
    perMonth: number
  }
  linked: boolean
  hardwareId: number
  hardwareSerial: string
  height: number
  electricCharger: ElectricChargerInfo
  building: BuildingModel
  workingTime: Time
  commercialTime: Time
  scheduleInheritance: boolean
  working24h: boolean
  commercial24h: boolean
  availabilityState: SpotAvailabilityState | null
  parentHeight: number
}

export type PlaceAccessScheduleDeprecated = {
  from: string
  to: string | null
  dayTimeStartH: number
  dayTimeStartM: number
  dayTimeEndH: number
  dayTimeEndM: number
  weekDays: Weekdays[] | null
}

export type GetSpotsByUserQueryParams = {
  Name?: string
  UserId?: string
  FilterByGroupId?: number
  HideAlreadyAccessibleByUserAccess?: boolean
  HideAlreadyAccessibleByGroupAccess?: boolean
}

export enum SpotAvailabilityState {
  PUBLIC = 2,
  PRIVATE = 1,
}

export type UpdateSpotAvailabilityParams = {
  spotId: number
  availabilityState: SpotAvailabilityState
}

export type CreateSpotParams = {
  name: string
  description: string
  price?: {
    perHour?: number
    perDay?: number
    perWeek?: number
    perMonth?: number
  }
  buildingId?: number
  hardwareId?: number | null
  address?: string
  lat?: number
  lon?: number
  height: number | string | null
  electricCharger: ElectricChargerInfo
  scheduleInheritance?: boolean
  working24h?: boolean
  workingTime?: Time
  commercial24h?: boolean
  commercialTime?: Time
  availabilityState?: SpotAvailabilityState
}

export type UpdateSpotParams = { id: number } & CreateSpotParams
