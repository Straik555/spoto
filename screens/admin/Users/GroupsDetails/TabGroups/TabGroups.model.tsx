import { TabProps } from '@screens/admin/Users/GroupsDetails/GroupsDetails.model'

export type TabGroupsProps = {
  onTab: () => void
} & Omit<TabProps, 'onSave'>
