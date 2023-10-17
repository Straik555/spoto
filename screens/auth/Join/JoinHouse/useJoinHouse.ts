import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { houseApi } from '@api/house'
import { useTypedDispatch, useTypedSelector } from '@redux/hooks'
import { useCurrentProfile } from '@hooks/useCurrentProfile'
import { AvailableUserProfile } from '@screens/auth/types'
import { getProfileByEmail } from '@screens/auth/hooks/useSelectors'
import { authSlice } from '@screens/auth/slice'
import { profileApi, ProfileApiTagTypes } from '@api/profile'
import { inviteApi, InviteApiTagTypes } from '@api/invite'
import { ROUTES } from '@constants/routes'

import { UseJoinHouse } from './JoinHouse.model'

const useJoinHouse: UseJoinHouse = (invitationToken) => {
  const [joinHouse, { isSuccess }] = houseApi.endpoints.joinHouse.useMutation()
  const router = useRouter()
  const dispatch = useTypedDispatch()
  const { profile: currentProfile } = useCurrentProfile()

  const availableUserProfiles = useTypedSelector(
    (state) => state.authSlice.availableUserProfiles
  )

  const [profile, setProfile] = useState<AvailableUserProfile | null>(null)

  useEffect(() => {
    if (currentProfile?.email && !profile) {
      const currentAvailableProfile = getProfileByEmail(
        currentProfile?.email,
        availableUserProfiles
      )
      if (currentAvailableProfile) {
        setProfile(currentAvailableProfile)
      }
    }
  }, [availableUserProfiles, currentProfile?.email, profile])

  const handleJoinHouse = useCallback(async () => {
    if (profile) {
      const { email, token } = profile
      await dispatch(authSlice.actions.markProfileAsActive(email))
      if (token) {
        await dispatch(authSlice.actions.setToken(token))
      }
      await dispatch(
        profileApi.util.invalidateTags([ProfileApiTagTypes.ProfileInfo])
      )
      await joinHouse(String(invitationToken))
    }
  }, [dispatch, invitationToken, joinHouse, profile])

  useEffect(() => {
    if (isSuccess) {
      dispatch(inviteApi.util.invalidateTags([InviteApiTagTypes.MyInvitesList]))
      router.push({ pathname: ROUTES.PROFILE_INVITATIONS })
    }
  }, [dispatch, isSuccess, router])

  const state = { profile }
  const actions = { handleJoinHouse, setProfile }
  return [state, actions]
}

export default useJoinHouse
