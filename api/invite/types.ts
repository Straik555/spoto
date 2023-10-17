import { SharedPlace } from '@api/sharedPlaces/types'
import { UserInvitationPlace } from '@api/user/types'

export enum InvitationStatus {
  Sent = 0,
  Accepted = 1,
  Declined = 2,
  Cancelled = 3,
  Revoked = 4,
}

export type InvitationInfo = {
  id: number
  invitedUserId: string
  firstName: string
  lastName: string
  email: string
  status: InvitationStatus
  isExpired: boolean
  expiresUtc: string
  invitedAtUtc: string
  updatedAtUtc: string
  avatarUrl: string
  places: SharedPlace[]
}

export type CreateInviteData = {
  apartmentId?: number
  email: string
}

export type InviteByTokenData = {
  apartmentInviteHouseName: string
  inviteeEmail: string
  isInviteeRegistered: boolean
}

export type InviteByQrData = { houseName: string }

export type MyInviteInfo = {
  id: number
  firstName: string
  lastName: string
  email: string
  ownerName: string
  status: InvitationStatus
  isExpired: boolean
  expires: string
  invitedAt: string
  avatarUrl: string
  places: UserInvitationPlace[]
}
