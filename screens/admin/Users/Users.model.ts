import { AllGroupInfo } from '@api/group/types'

export enum PersonTabs {
  Main = 'Main',
  Groups = 'Groups',
  Users = 'Users',
  Access = 'Access Right',
}

export type UserRouteType = 'group' | 'person'

export type UsersRouteParams = {
  type: UserRouteType[]
}

export enum UserType {
  USERS = 'Users',
  USER_GROUPS = 'User Groups',
}

export enum UserFilter {
  All,
  LINKED,
  UNLINKED,
}

export type CardUser = {
  id: string
} & Pick<AllGroupInfo, 'name' | 'avatarUrl'>

export type CardGroup = {
  id: number
} & Pick<AllGroupInfo, 'name' | 'avatarUrl'>

export type UsersProps = {
  type?: UserRouteType
}
