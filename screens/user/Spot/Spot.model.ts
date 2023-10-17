import { BookingPreBookVisitorResponse } from '@api/booking/types'
import { DateObject } from '@hooks/useDateUtil'

export type SpotProps = {
  placeId: number
}

export type SpotQueryParams = {
  startDate?: string
  endDate?: string
}

export type SpotRouteParams = {
  placeId: string
}

export type SpotFormValues = {
  startDate?: string
  startTime?: string
  endDate?: string
  endTime?: string
  selectedVehicleId?: number
}

export type SpotUpdateFormValues = {
  startDate?: string | Date | DateObject
  startTime?: string | Date | DateObject
} & SpotFormValues

export enum BookingType {
  SingleDay,
  MultipleDays,
}

export type ParsedPreBookInfo = {
  startDateTime: DateObject
  endDateTime: DateObject
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  dateDisplay: string
  bookingType: BookingType
  openTimeStart: string
  openTimeEnd: string
  bookingDurationMs: number
  bookingDurationHumanized: string
  preBookResponse: BookingPreBookVisitorResponse
}
