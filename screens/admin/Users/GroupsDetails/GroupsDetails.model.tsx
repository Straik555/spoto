import { GroupInfo } from '@api/group/types'

export type GroupsDetailsRouteParams = {
  groupId: string
}

export type TabProps = {
  groupId: string
  onDelete: () => void
  onSave: () => void
}

export type GroupsUserInfo = {
  id: number
} & Pick<GroupInfo, 'name' | 'avatarUrl'>
