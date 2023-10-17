import { InvitationInfo } from '@api/invite/types'

export type UsersCardProps = {
  onDelete: () => void
  user: InvitationInfo
}
