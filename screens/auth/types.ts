import { AuthenticateUserPayload } from '@api/authentication/types'

export type AvailableUserProfile = {
  active: boolean
} & Omit<AuthenticateUserPayload, 'company' | 'phone'>

export type LoginQueryParams = {
  logoutReferer?: string
  expiredEmail?: string
  prefillEmail?: string
}

export type AvailableUserProfiles = {
  [key: AvailableUserProfile['email']]: AvailableUserProfile
}
