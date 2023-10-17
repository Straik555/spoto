import { DialogProps } from '@components/Dialog/Dialog.model'

export type BookingPeriodProps = {
  spotId: number
  takenTime: string[]
  closeModal: () => void
  onSubmit: () => void
} & Pick<DialogProps, 'open'>
