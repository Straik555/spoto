import { PlaceGroup, PlaceUser, SharedPlace } from '@api/sharedPlaces/types'
import { UserCardSpotsDataItem } from '@screens/admin/Users/components/UserCard/UserCard.model'

export const mapUserPlaceToUserCardProps = (
  userPlace: Pick<PlaceGroup, 'id' | 'placeInfo' | 'schedule'> | SharedPlace
): UserCardSpotsDataItem => {
  return {
    schedule: userPlace.schedule,
    name: userPlace.placeInfo.placeName,
  }
}

export const mapPlaceGroupToUserCardProps = (
  placeGroup: PlaceGroup
): UserCardSpotsDataItem => {
  return {
    schedule: placeGroup.schedule,
  }
}

export const mapPlaceUserToUserCardProps = (
  placeUser: PlaceUser
): UserCardSpotsDataItem => {
  return {
    schedule: placeUser.schedule,
  }
}
