import { SharedPlace } from '@api/sharedPlaces/types'

export type UserCardItemPlace = {
  id: string
} & Pick<SharedPlace, 'placeInfo' | 'schedule'>
