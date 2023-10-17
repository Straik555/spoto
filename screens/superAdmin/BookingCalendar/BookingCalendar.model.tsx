import { AdminBookingInfo, BookingState } from '@api/booking/types'
import { DateObject } from '@hooks/useDateUtil'

export type BookingCalendarFormValues = {
  startDate: DateObject
  endDate: DateObject
  bookingState: BookingState | null
}

export enum BookingType {
  BOOKED,
  FREE,
}

export enum GridCellType {
  SPOT_HEADER,
  SET_HEADER,
  TIMESLOT,
  HIDDEN_TIMESLOT,
}

export type GridCell =
  | GridCellSpotHeader
  | GridCellTimeslot
  | GridCellSetHeader
  | GridCellHiddenTimeslot

export type BaseGridCell = {
  idx: string
  selected?: boolean | null
}

export type GridCellSetHeader = {
  type: GridCellType.SET_HEADER
  title: string
  span: number
} & BaseGridCell

export type GridCellSpotHeader = {
  type: GridCellType.SPOT_HEADER
  title: string
} & BaseGridCell

export type GridCellTimeslot = {
  type: GridCellType.TIMESLOT
  span: number
  bookingType: BookingType
  hidden?: boolean
  data?: AdminBookingInfo
} & BaseGridCell

export type GridCellHiddenTimeslot = {
  type: GridCellType.HIDDEN_TIMESLOT
} & BaseGridCell
