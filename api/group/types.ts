import { ElectricChargerInfo } from '@api/spot/types'
import { PaginationQueryParams, PlaceType } from '@api/types'
import { UserInfo } from '@api/user/types'

export type AllGroupInfo = Pick<
  GroupInfo,
  'id' | 'name' | 'avatarUrl' | 'ownerId'
>

export type GroupInfo = {
  id: number
  name: string
  ownerId: number
  avatarUrl: string
}

export type GroupUser = Pick<
  UserInfo,
  'userId' | 'firstName' | 'lastName' | 'email' | 'avatarUrl' | 'phone'
>

export type GroupPlaceInfo = {
  electricCharger: ElectricChargerInfo | null
  placeId: number
  placeName: string
  placeType: PlaceType
}

export type GetGroupInfosQueryParams = {
  Name?: string
  UserId?: string
  HideAlreadyAccessibleByUser?: boolean
} & PaginationQueryParams

export type CreateGroupBody = {
  name: string
  formData: FormData | null
}

export type EditGroupBody = {
  id: number
  formData?: FormData
} & CreateGroupBody

export type DeleteUserFromGroupBody = {
  userIds: string[]
  groupId: number
}

export type AddUsersToGroupArgs = {
  groupId: number
  userIds: string[]
}
