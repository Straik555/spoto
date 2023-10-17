import {
  GroupsUserInfo,
  TabProps,
} from '@screens/admin/Users/GroupsDetails/GroupsDetails.model'

export type TabRightAccessProps = {
  user: GroupsUserInfo | null
} & Omit<TabProps, 'onSave'>
