import { Dispatch, SetStateAction } from 'react'

import { VehicleModel } from '@api/vehicle/types'

export interface SearchSelectorProps {
  spotId?: number
  location: string
  id: string
  starts: Date
  ends: Date
  vehicle?: VehicleModel
  history?: boolean
  timeZone: string
  favourite?: boolean
  onExtend?: () => void
  onFavorite?: () => void
  onEnd: () => void
  onBook?: () => void
  isDesktop?: boolean
}

export type UseMyBookingsCardState = {
  bookingPeriod: string
  formattedStartTime: string
  formattedEndDateTime: string
  humanizedBookingDuration: string
  isOnGoing: boolean
  open: boolean
  submitDisabled: boolean
  vehicleLabel: string
}
export type UseMyBookingsCardActions = {
  setOpen: Dispatch<SetStateAction<boolean>>
}
export type UseMyBookingsCard = (
  props: SearchSelectorProps
) => [UseMyBookingsCardState, UseMyBookingsCardActions]
