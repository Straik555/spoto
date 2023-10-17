import { MyBookingEntity } from '@screens/admin/Sets/ServerEntities.model'

export interface ExtendModalProps {
  isOpen: boolean
  closeModal: () => void
  spot: MyBookingEntity
  noAvailableTime?: boolean
  noRange?: boolean
}

export type TimerProps = {
  time: number
}
