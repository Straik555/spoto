import React from 'react'

import { UserInfo } from '@api/user/types'
import { AvailableUserProfile } from '@screens/auth/types'

export type ProfileSwitcherItemsProps = {
  activeProfileEmail?: UserInfo['email']
  availableUserProfilesValues: AvailableUserProfile[]
}

export type ProfileSwitcherState = {
  activeProfile?: AvailableUserProfile
  availableUserProfilesValues: AvailableUserProfile[]
  open: boolean
}

export type ProfileSwitcherActions = {
  toggleOpen?: () => void
}

export type UseProfileSwitcher = () => [
  ProfileSwitcherState,
  ProfileSwitcherActions
]

export type ProfileSwitcherLabelProps = {
  open: boolean
  toggleOpen?: ProfileSwitcherActions['toggleOpen']
} & Pick<ProfileSwitcherState, 'activeProfile'>

export type ProfileSwitcherContentProps = {
  activeProfileEmail?: UserInfo['email']
  availableUserProfilesValues: AvailableUserProfile[]
}

export type ProfileSwitcherSelectProps = {
  selectProfile: React.Dispatch<
    React.SetStateAction<AvailableUserProfile | null>
  >
  value: AvailableUserProfile | null
}
