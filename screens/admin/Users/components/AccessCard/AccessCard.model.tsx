import { PlaceAccessSchedule, SharedPlace } from '@api/sharedPlaces/types'

export enum AccessCardVariant {
  USER = 'user',
  GROUP = 'group',
}

export type AccessCardProps = {
  userOrGroupId?: string | number
  place: SharedPlace
  onDelete: (
    placeId: number,
    userOrGroupId: string | number | undefined
  ) => void
  variant: AccessCardVariant
}

export type AccessCardItem = {
  schedule: PlaceAccessSchedule[]
  handleEdit: () => void
}
