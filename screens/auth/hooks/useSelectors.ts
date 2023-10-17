import { useTypedSelector } from '@redux/hooks'
import { AvailableUserProfiles } from '@screens/auth/types'

export const getProfileByToken = (
  token: string,
  profiles: AvailableUserProfiles
) => {
  return Object.values(profiles).find((ep) => ep.token === token)
}

export const getActiveProfile = (profiles: AvailableUserProfiles) => {
  return Object.values(profiles).find((ep) => ep.active)
}

export const getProfileByEmail = (
  email: string,
  profiles: AvailableUserProfiles
) => {
  return Object.values(profiles).find((ep) => ep.email === email)
}

export const useSelectProfileByToken = (token: string) => {
  const profiles = useTypedSelector(
    (state) => state.authSlice.availableUserProfiles
  )

  return getProfileByToken(token, profiles)
}

export const useSelectActiveProfile = () => {
  const profiles = useTypedSelector(
    (state) => state.authSlice.availableUserProfiles
  )

  return getActiveProfile(profiles)
}
