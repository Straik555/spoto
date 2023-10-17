import { GroupInfo } from '@api/group/types'

export type PersonsDetailsRouteParams = {
  userId: string
}

export type PersonsTabProps = {
  userId: string
  onDelete: () => void
}

export type PersonsUserInfo = {
  userId: string
} & Pick<GroupInfo, 'name' | 'avatarUrl'>
