import { AllGroupInfo } from '@api/group/types'
import { PlaceAccessSchedule } from '@api/sharedPlaces/types'
import { TimeApi } from '@api/types'
import { UserInfo } from '@api/user/types'
import { dateFormats } from '@constants/global'
import { getDateUtil } from '@hooks/useDateUtil'
import { UserOrGroupInfo } from '@screens/admin/ManageAccess/Autocompletes/Autocompletes.model'
import { PlaceAvailabilityFormValues } from '@screens/admin/ManageAccess/PlaceAvailability/PlaceAvailability.model'
import { getPersonFullName } from '@screens/admin/Users/utils/getPersonFullName'

export const mapScheduleFormValuesToPayload = (
  formValues: Omit<PlaceAvailabilityFormValues, 'availableDayType'>
): Omit<PlaceAccessSchedule, 'scheduleId'> => {
  const dateUtil = getDateUtil()
  const schedule = {
    from: dateUtil(formValues.startDate).format(dateFormats.api),
  } as PlaceAccessSchedule

  if (formValues.timeFrom) {
    if (!schedule.dayTime) schedule.dayTime = {}
    schedule.dayTime.start = formValues.timeFrom as TimeApi
  }

  if (formValues.timeTo) {
    if (!schedule.dayTime) schedule.dayTime = {}
    schedule.dayTime.end = formValues.timeTo as TimeApi
  }

  if (formValues.endDate) {
    schedule.to = dateUtil(formValues.endDate).format(dateFormats.api)
  }

  if (formValues.weekdays) {
    schedule.weekDays = formValues.weekdays
  }

  return schedule
}

export const mapUserOrGroupToSharedModel = (
  ug: UserInfo | AllGroupInfo
): UserOrGroupInfo => {
  if (ug['userId']) {
    const user = ug as UserInfo

    return {
      label: getPersonFullName(user),
      uniqueId: user.userId,
      userId: user.userId,
    }
  }

  const group = ug as AllGroupInfo

  return {
    label: group.name,
    uniqueId: group.id,
    id: group.id,
  }
}
