import { GroupPlaceInfo } from '@api/group/types'
import { Time, Weekdays } from '@api/types'

export type PlaceAccessSchedule = {
  scheduleId: string
  from: string | null
  to: string | null
  dayTime: Partial<Time> | null
  weekDays: Weekdays[] | null
}

export type SharedPlace = {
  id: number
  placeInfo: GroupPlaceInfo
  schedule: PlaceAccessSchedule[]
}

export type PlaceUser = {
  schedule: PlaceAccessSchedule[]
  firstName: string
  lastName: string
  userId: string
  avatarUrl: string
  id: string
}

export type GetUsersByPlaceParams = {
  placeId: number
  userId?: string
}

export type PlaceGroup = {
  schedule: PlaceAccessSchedule[]
  groupName: string
  groupId: number
  avatarUrl: string
  id: string
  placeInfo: GroupPlaceInfo
}

export type GetGroupsByPlaceParams = {
  placeId: number
  groupId?: number
}

export type GetPersonSpotAccessInfo = DeleteSpotPersonAccess
export type GetGroupSpotAccessInfo = DeleteSpotGroupAccess

export type DeleteSpotPersonAccess = {
  userId: string | number
  spotId: number
}

export type DeleteSpotGroupAccess = {
  groupId: number | string
  spotId: number
}

export type AddPlacesToUserParams = {
  userId: string
  data: {
    placeIds: number[]
    schedule: Omit<PlaceAccessSchedule, 'scheduleId'>[]
  }
}

export type AddPlacesToGroupParams = {
  groupId: string
  data: {
    placeIds: number[]
    schedule: Omit<PlaceAccessSchedule, 'scheduleId'>[]
  }
}

export type AddUsersAndGroupsToPlaceParams = {
  placeId: number
  data: {
    userIds?: string[]
    groupIds?: number[]
    schedule: Omit<PlaceAccessSchedule, 'scheduleId'>[]
  }
}

export type AddGroupsToPlaceParams = {
  placeId: number
  data: {
    groupIds: number[]
    schedule: Omit<PlaceAccessSchedule, 'scheduleId'>[]
  }
}

export type EditSpotGroupAccess = {
  groupId: number
} & Pick<EditSpotPersonAccess, 'spotId' | 'data'>

export type EditSpotPersonAccess = {
  userId: string
  spotId: string
  data: {
    schedule: PlaceAccessSchedule[]
  }
}
