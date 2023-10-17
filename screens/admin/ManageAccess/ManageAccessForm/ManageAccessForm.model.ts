import { GroupInfo } from '@api/group/types'

import { SetModel } from '@api/set/types'
import { PlaceAccessSchedule } from '@api/sharedPlaces/types'
import { SpotInfo } from '@api/spot/types'
import { UserInfo } from '@api/user/types'
import { FormikContextType } from 'formik'

import { PlaceAvailabilityFormValues } from '../PlaceAvailability/PlaceAvailability.model'

export type ManageAccessFormProps = {
  handleAvailabilityFormChange: (
    context: FormikContextType<PlaceAvailabilityFormValues>
  ) => void
  isEditMode: boolean
  placeId?: string
  set?: SetModel
  spot?: SpotInfo
  usersAndGroupsSelectedItem: UserInfo[] | GroupInfo[]
  schedule: PlaceAccessSchedule | null
}
