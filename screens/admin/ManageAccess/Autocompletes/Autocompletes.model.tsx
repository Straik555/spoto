import { AllGroupInfo } from '@api/group/types'
import { UserInfo } from '@api/user/types'

export type UserOrGroupInfo = Partial<UserInfo> &
  Partial<AllGroupInfo> & {
    uniqueId: string | number
    label: string
  }

export type AutocompleteInputProps = { disabled: boolean }
