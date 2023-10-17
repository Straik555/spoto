import { AuthenticateUserPayload } from '@api/authentication/types'
import { UserInfo } from '@api/user/types'

export type ProfileInfo = {
  ownerId: number
  ownerCompanyName: string
} & UserInfo &
  Pick<AuthenticateUserPayload, 'title'>

export type GetCurrentProfileArgs = {
  token?: string
}

export type ChangeProfilePasswordArgs = {
  currentPassword: string
  newPassword: string
}

export type ResetProfilePasswordArgs = {
  email: string
}

export type SetNewProfilePasswordArgs = {
  userEmail: string
  token: string
  newPassword: string
}
