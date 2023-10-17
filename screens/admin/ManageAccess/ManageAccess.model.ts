import { SetModel } from '@api/set/types'
import { SpotInfo } from '@api/spot/types'
import { UserOrGroupInfo } from '@screens/admin/ManageAccess/Autocompletes/Autocompletes.model'

export type ManageAccessQueryParams = {
  groupId?: string
  spotId?: string
  setId?: string
  userId?: string
}

export type ManageAccessValues = {
  spotName: string
  selectedSpots: SpotInfo[]
  checkedSpots: SpotInfo[]
  setName: string
  selectedSets: SetModel[]
  checkedSets: SetModel[]
  userOrGroupName: string
  selectedUserGroups: UserOrGroupInfo[]
  checkedUserGroups: UserOrGroupInfo[]
}
