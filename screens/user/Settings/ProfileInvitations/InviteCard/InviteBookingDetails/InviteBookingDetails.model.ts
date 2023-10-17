import { MyInviteInfo } from '@api/invite/types'
import { UserInvitationPlace } from '@api/user/types'

export type InviteBookingDetailsProps = { fullName: string } & Pick<
  MyInviteInfo,
  'avatarUrl' | 'email' | 'places'
>

export type InviteBookingDetailsModalProps = {
  onClose: () => void
} & InviteBookingDetailsProps

export type BookingScheduleDataCellProps = {
  containerClassName?: string
  isDesktop?: boolean
  label: string
  value: string
}

export type InviteBookingPlaceProps = Pick<
  UserInvitationPlace,
  'placeInfo' | 'schedule'
>
