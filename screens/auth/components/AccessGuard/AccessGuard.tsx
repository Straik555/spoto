import { useCurrentProfile } from '@hooks/useCurrentProfile'
import { useTypedSelector } from '@redux/hooks'
import { TAuthorizedViewGuardProps } from '@screens/auth/components/AccessGuard/AccessGuard.model'
import _intersection from 'lodash/intersection'
import { FC, ReactElement, useEffect } from 'react'

const AccessGuard: FC<TAuthorizedViewGuardProps> = ({
  children,
  allowedRole,
  forbiddenRole = [],
  callback,
}): ReactElement | null => {
  const token = useTypedSelector((state) => state.authSlice.token)
  const { profile, isFetching, isUninitialized } = useCurrentProfile()
  const allowedRoles = Array.isArray(allowedRole) ? allowedRole : [allowedRole]
  const forbiddenRoles = Array.isArray(forbiddenRole)
    ? forbiddenRole
    : [forbiddenRole]
  const forbidToRender = !!_intersection(profile?.roles || [], forbiddenRoles)
    .length
  const willInitialize = Boolean(isUninitialized && token)

  const allowToRenderChildren = forbidToRender
    ? false
    : !allowedRole ||
      (profile?.roles && !!_intersection(profile.roles, allowedRoles).length)

  useEffect(() => {
    if (willInitialize || isFetching) return

    if (!allowToRenderChildren && callback) {
      callback()
    }
  }, [allowToRenderChildren, callback, willInitialize, isFetching])

  return allowToRenderChildren ? children : null
}

export default AccessGuard
