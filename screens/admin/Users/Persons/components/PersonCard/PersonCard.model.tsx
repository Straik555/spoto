import { SharedPlace } from '@api/sharedPlaces/types'

export type PersonCardProps = {
  onDelete: () => void
  user: {
    name: string
    id: string
    avatarUrl?: string
  }
}

export type PersonPlace = {
  id: string
} & Pick<SharedPlace, 'placeInfo' | 'schedule'>