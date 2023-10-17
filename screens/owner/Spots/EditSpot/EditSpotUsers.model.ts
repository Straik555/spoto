import { PlaceUser } from '@api/sharedPlaces/types'

export type EditSpotUsersProps = {
  spotId: number
}

export type EditSpotUsersListProps = {
  spotUsers: PlaceUser[]
} & EditSpotUsersProps

export type SpotUserProps = {
  user: PlaceUser
  className?: string
} & EditSpotUsersProps

export type EditSpotUsersFormValues = {
  search: string
  userIds: string[]
}

export type EditSpotUsersListFormValues = {
  userIds: string[]
}
