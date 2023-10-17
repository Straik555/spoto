import {
  PersonsTabProps,
  PersonsUserInfo,
} from '@screens/admin/Users/PersonsDetails/PersonsDetails.model'

export type TabAccessRights = {
  user: PersonsUserInfo | null
} & PersonsTabProps
