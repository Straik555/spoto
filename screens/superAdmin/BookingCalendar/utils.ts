import { BookingState } from '@api/booking/types'

export const canDeleteBooking = (state?: BookingState) => {
  return !(state === BookingState.End || state === BookingState.Cancel)
}
