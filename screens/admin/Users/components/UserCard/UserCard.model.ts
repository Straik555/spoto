import { PlaceAccessSchedule } from '@api/sharedPlaces/types'
import { ReactElement } from 'react'
import { UserAvatarProps } from '../UserAvatar/UserAvatar.model'

export enum UserCardDefaultAvatar {
  GROUP = 'group',
  PERSON = 'person',
  PERSON_DETAILS = 'personDetails',
  USER = 'user',
}

export type UserCardProps = {
  classNameHeader?: string
  name: string
  onDetail?: () => void
  onDelete?: () => void
  onEdit?: () => void
  onMouseEnter?: () => void
  withoutImg?: boolean
  defaultAvatar?: UserCardDefaultAvatar
} & Pick<UserAvatarProps, 'thumbSrc' | 'thumbKey'>

export type UserCardDetailsProps = {
  onVisibilityChange?: (visible: boolean) => void
  isAccess?: boolean
}

export type UserCardSpotInfoRowProps = {
  name: string
  data: string
  className?: string
}

export type UserCardSpotProps = {
  className?: string
  action?: ReactElement
  schedule: PlaceAccessSchedule
  name?: string
}

export type UserCardSpotsDataItem = {
  schedule: PlaceAccessSchedule[]
  name?: string
}

export type UserCardSpotsProps = {
  data: UserCardSpotsDataItem[]
}

export type UserCardSpotActionProps = {
  onDelete?: () => void
  onEdit?: () => void
  onDetails?: () => void
  disabled?: boolean
}
