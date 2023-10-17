import dayjs from 'dayjs'

import { MyInviteInfo } from '@api/invite/types'

export type InviteCardState = {
  avatarUrl: string
  email: string
  confirmDeleteModal: boolean
  fullName: string
  invitedAt: string
  isDesktop: boolean
  isStatusAccepted: boolean
  isStatusPending: boolean
  places: MyInviteInfo['places']
}

export type InviteCardActions = {
  acceptInvite: () => void
  dateUtil: typeof dayjs
  deleteInvite: () => void
  rejectInvite: () => void
  toggleConfirmDeleteModal: () => void
}

export type UseInviteCard = (
  props: MyInviteInfo
) => [InviteCardState, InviteCardActions]
