import { profileApi } from '@api/profile'
import { UserRole } from '@constants/types'
import { hasRole } from '@screens/auth/utils/hasRole'
import { useMemo } from 'react'

export const useCurrentProfile = () => {
  const {
    data: profile,
    isFetching,
    isLoading,
    isUninitialized,
    originalArgs,
    error,
  } = profileApi.endpoints.getCurrentProfile.useQueryState(null)

  return useMemo(
    () => ({
      profile,
      isFetching,
      isLoading,
      isUninitialized,
      originalArgs,
      error,
    }),
    [isFetching, isLoading, isUninitialized, originalArgs, profile, error]
  )
}

export const useHasRole = (role: UserRole): boolean => {
  const { profile } = useCurrentProfile()
  return hasRole(role, profile?.roles)
}
