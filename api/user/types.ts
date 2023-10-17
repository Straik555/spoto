import { SharedPlace } from '@api/sharedPlaces/types'
import { PaginationQueryParams } from '@api/types'
import { UserRole } from '@constants/types'

export type UserInfo = {
  userId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  isEmailConfirmed: boolean
  isPhoneConfirmed: boolean
  avatarUrl: string
  roles: UserRole[]
}

export type UserGroupInfo = {
  avatarUrl: string
  id: number
  name: string
  ownerId: number
}

export type GetUserInfosQueryParams = {
  UserState?: 0 | 1 | 2
  Name?: string
  GroupId?: number
  HideAlreadyInGroup?: boolean
} & PaginationQueryParams

export type UserInvitationPlace = Omit<SharedPlace, 'name'>

export type InviteUserPayload = {
  firstName: string
  lastName: string
  email: string
}

export type AddGroupsToUserPayload = {
  userId: string
  groupIds: number[]
}
