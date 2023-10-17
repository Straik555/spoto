import { AllGroupInfo, GroupInfo } from '@api/group/types'
import { UserGroupInfo } from '@api/user/types'

export type AddUserGroup = {
  id: string
} & Pick<GroupInfo, 'name' | 'avatarUrl'>

export type FilterGroupProps = {
  id: string
} & Omit<UserGroupInfo, 'ownerId' | 'id'>

export type AddDialogGroupUserProps = {
  onDelete: (id: string) => void
  loadingGroupsList?: boolean
  title: string
  label: string
  placeholder?: string
  createGroup: (id: string) => void
  selectedItems: FilterGroupProps[] | []
  items: AddUserGroup[] | []
  open: boolean
  onClose(): void
}

export type AddDialogGroupUserFormValues = {
  group: AllGroupInfo | null
  groupName: string
}
