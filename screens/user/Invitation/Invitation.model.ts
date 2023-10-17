import { Dayjs } from 'dayjs'

import { BookingGuestResponse } from '@api/booking/types'

export type BookingDetailsItemProps = {
  title: string
  subTitle: string
}

export type ModalProps = {
  modalIsOpen: boolean
  closeModal: () => void
  qrCode?: string
}

export type InvitationFormValues = {
  plateNumber: string
}

export type UseInvitationState = BookingGuestResponse & {
  isInvitationCanceled: boolean
  isInvitationDeclined: boolean
  isValid: boolean
  loading: boolean
  plateNumber: string
  startDate: Dayjs
  endDate: Dayjs
  isBookingFinished: boolean
  isBookingUpcoming: boolean
  pageTitle: string
}

export type UseInvitationActions = {
  handleCancelGuest: () => void
  handleSubmit: () => void
}

export type UseInvitation = () => [UseInvitationState, UseInvitationActions]
