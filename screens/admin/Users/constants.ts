import { Weekdays } from '@api/types'
import { UserRouteType, UserType } from '@screens/admin/Users/Users.model'

export const routeParamToTypeMapping: Record<UserRouteType, UserType> = {
  group: UserType.USER_GROUPS,
  person: UserType.USERS,
}

export const userTypeToRouteParamMapping: Record<UserType, UserRouteType> = {
  [UserType.USER_GROUPS]: 'group',
  [UserType.USERS]: 'person',
}

export const weekdaysEnumToShortLabel = {
  [Weekdays.Monday]: 'Mo',
  [Weekdays.Tuesday]: 'Tu',
  [Weekdays.Wednesday]: 'We',
  [Weekdays.Thursday]: 'Th',
  [Weekdays.Friday]: 'Fr',
  [Weekdays.Saturday]: 'Sa',
  [Weekdays.Sunday]: 'Su',
}
