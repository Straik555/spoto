import { ApiError, ApiStatusCodes } from '@api/types'
import { useCurrentProfile } from '@hooks/useCurrentProfile'
import { useMemo } from 'react'

export const useAuthInfo = (): {
  tokenExpired: boolean
} => {
  const { error } = useCurrentProfile()

  return useMemo(() => {
    return {
      tokenExpired: error
        ? (error as ApiError).status === ApiStatusCodes.Unauthorized
        : false,
    }
  }, [error])
}
