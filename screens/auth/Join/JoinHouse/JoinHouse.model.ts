import { Dispatch, SetStateAction } from 'react'

import { AvailableUserProfile } from '@screens/auth/types'

export type JoinHouseProps = {
  houseName: string
  invitationToken: string
}

export type UseJoinHouseState = { profile: AvailableUserProfile | null }
export type UseJoinHouseActions = {
  handleJoinHouse: () => Promise<void>
  setProfile: Dispatch<SetStateAction<AvailableUserProfile | null>>
}
export type UseJoinHouse = (
  invitationToken: JoinHouseProps['invitationToken']
) => [UseJoinHouseState, UseJoinHouseActions]
