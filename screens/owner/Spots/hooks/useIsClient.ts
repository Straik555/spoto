import { UserRole } from '@constants/types'
import { useHasRole } from '@hooks/useCurrentProfile'

export const useIsClient = (): boolean => {
  const isClient = useHasRole(UserRole.Client)
  const isOwner = useHasRole(UserRole.PersonalOwner)

  return isClient && !isOwner
}
