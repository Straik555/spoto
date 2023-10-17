import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'

import { FindSpot } from '@screens/user/FindSpot'
import { useCurrentProfile } from '@hooks/useCurrentProfile'
import { UserRole } from '@constants/types'
import { hasRole } from '@screens/auth/utils/hasRole'
import { ROUTES } from '@constants/routes'
import Loader from '@components/Loader/Loader'

const Home: React.FC = () => {
  const { profile, isLoading } = useCurrentProfile()
  const router = useRouter()

  const shouldRedirectToHouseMangerDashBoard = useMemo(() => {
    if (profile) {
      const { roles } = profile
      const hasClientRole = hasRole(UserRole.Client, roles)
      const hasHouseManagerRole = hasRole(UserRole.HouseManager, roles)
      return hasHouseManagerRole && !hasClientRole
    }
    return false
  }, [profile])

  useEffect(() => {
    if (shouldRedirectToHouseMangerDashBoard) {
      router.push(ROUTES.HOUSEMANAGER_DASHBOARD)
    }
  }, [router, shouldRedirectToHouseMangerDashBoard])

  return (
    <Loader loading={isLoading || shouldRedirectToHouseMangerDashBoard}>
      <FindSpot />
    </Loader>
  )
}

export default Home
