import { InviteByQrData, InviteByTokenData } from '@api/invite/types'
import { ProfileInfo } from '@api/profile/types'

export type UseJoinState = {
  emailsMatch: boolean
  hasAccount: boolean
  loading: boolean
  inviteByTokenData?: InviteByTokenData
  inviteByQrData?: InviteByQrData
  profile?: ProfileInfo
  qr?: string | string[]
}

export type UseJoinActions = {
  toggleHasAccount: () => void
}

export type UseJoin = () => [UseJoinState, UseJoinActions]
