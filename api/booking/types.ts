import { MyBookingEntity } from '@screens/admin/Sets/ServerEntities.model'

export type BookingInfo = {
  id: string
  spotId: number
  placeName: string
  placeAvailability: number
  pricePerHour: string
  pricePerDay: string
  pricePerWeek: string
  pricePerMonth: string
  userId: string
  userFirstName: string
  userLastName: string
  userAvatar: string
  starts: string
  ends: string
}

export enum BookingMode {
  Soft = 'Soft',
  Hard = 'Hard',
  SoftFixed = 'SoftFixed',
}

export enum BookingState {
  PreBook = 'PreBook',
  Confirmed = 'Confirmed',
  End = 'End',
  Cancel = 'Cancel',
  WaitingForVehicleLeft = 'WaitingForVehicleLeft',
}

export type AdminBookingInfo = {
  setId: number
  setName: string
  spotId: number
  spotName: string
  /** TODO: move it to separate one */
  booking: {
    id: string
    address: string
    lat: number
    lon: number
    starts: string
    ends: string
    repeated: boolean
    price: number
    spotId: number
    timeZone: string
    isFavoritePlace: boolean
    state: BookingState
    bookingMode: BookingMode
    vehicleId: number
  }
}

export type GetUpcomingBookingsByOwnerQueryParams = {
  PlaceId?: number
}

export type BookingEntityContainer = {
  items: MyBookingEntity[]
}

export type GetAdminBookingsQueryParams = {
  from: string
  to: string
}

export type AddFavourite = {
  placeId: number
}

export type ExtendData = {
  bookingId: string
  extendedEnd: string
}

export type ExtendResponse = {
  bookingId: string
  extendMinutes: number
  extendedEnd: string
}

export type BookingAvailabilityPeriod = {
  startDate: string
  endDate: string
  placeId: number
}

export enum CalendarDayAvailability {
  Free,
  FreeStartOrEnd,
  Booked,
  DailyLimitReached,
}

export type AvailabilityCalendar = {
  date: string
  availability: CalendarDayAvailability
  intervals: {
    intervals: string[]
    timeZone: string
    intervalLengthInMins: number
  }
}

export type BookingAvailabilityResult = {
  intervals: string[]
  timeZone: string
  intervalLengthInMins: number
}

export type BookingAvailabilityRecurrent = {
  placeId: number
  from: string
  end: string
  repeat: boolean
  repeatWeekDays: number[]
  repeatCount: number
}

export type BookingAvailabilityRecurrentResult = {
  availabilityIssue: null | string
  available: boolean
  ends: string
  starts: string
  timeZone: string
}

export type BookingAvailability = {
  date: string
  placeId: number
}

export type BookingAvailabilityFromPeriod = {
  startDateTime: string
  placeId: number
}

export type BookingPreBook = {
  placeId: number
  vehicleId?: number
  from: string
  end: string
  repeat: boolean
  repeatWeekDays?: number[]
  repeatCount?: number
  bookingId?: string
}

export type BookingPreBookVisitor = {
  bookingId?: string
  apartmentId: number
  from: string
  end: string
}

export type BookingGuestEditSave = {
  bookingReferenceId: string
  vehicleLP: string
}

export type BookingPreBookVisitorResponse = {
  bookingId: string
  placeId: 0
  bill: {
    fee: 0
    taxType: 0
    taxPercent: 0
    totalTaxes: 0
    totalPrice: 0
  }
  start: string
  end: string
  timeZone: string
  openTimeStart: string
  openTimeEnd: string
  openTime24h: true
}

export type BookingBook = {
  vehicleId: number
  bookingId: string
}

export type BookingBookDetailsForPayment = {
  externalPaymentProcessor: string
  operationId: string
  operationSecret: string
  environment: string
  amount: number
  invoiceId: string
}

export type BookingBookResponse = {
  bookingReferenceId: string
  paymentRequired: true
  detailsForPayment: BookingBookDetailsForPayment
}

export type CancelGuestResponse = {
  message: string
  data: string
}

export type AvailabilityForVisitors = {
  startDate: string
  apartmentId: string
}

export type AvailabilityForVisitorsResult = {
  intervals: string[]
  intervalLengthInMins: number
  timeZone: string
}

export type BookingForVisitorsResult = {
  bookingId: string
  bookingReferenceId: string
  apartmentId: number
  status: string
  invitationEmail: string
  houseName: string
  starts: string
  ends: string
  timeZone: string
}

export type BookingForVisitors = {
  filterByApartmentId: number
}

export type BookingInviteGuest = {
  bookingReferenceId: string
  email: string
}

export type BookingInviteGuestResponse = {
  message: string
  data: string
}

export type AvailabilityCalendarForVisitors = {
  startDate: string
  endDate: string
  apartmentId: string
}

export enum CancellationReason {
  Cancelled = 'Cancelled',
  Declined = 'Declined',
}

export type BookingGuestResponse = {
  address: string
  cancellationReason: CancellationReason | ''
  ends: string
  qrCode: string
  referenceId: string
  residentUserName: string
  residentUserEmail: string
  spotName: string
  starts: string
  timeZone: string
  vehicleLP: string
}
