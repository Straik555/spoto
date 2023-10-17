import { PersonsTabProps } from '@screens/admin/Users/PersonsDetails/PersonsDetails.model'

export type TabGroupsProps = {
  onTab: () => void
} & PersonsTabProps
