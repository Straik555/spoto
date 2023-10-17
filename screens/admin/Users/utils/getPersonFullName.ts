import { UserInfo } from '@api/user/types'

export const getPersonFullName = (
  user?: Pick<UserInfo, 'firstName' | 'lastName'>
): string => {
  return user ? `${user.firstName} ${user.lastName}`.trim() : ''
}
