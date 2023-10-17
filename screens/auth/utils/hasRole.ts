import { ProfileInfo } from '@api/profile/types'
import { UserRole } from '@constants/types'

export const hasRole = (
  role: UserRole,
  roles: ProfileInfo['roles'] = []
): boolean => {
  return roles.includes(role)
}
