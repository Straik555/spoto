import * as React from 'react'
import { useRouter } from 'next/router'
import Spot from '@screens/admin/Spots/Spot/Spot'
import { SpotTabs } from '@screens/admin/Spots/Spot/Spot.model'

const SpotRoute = () => {
  const router = useRouter()
  const { spotId, activeTab, spotUrlBack } = router.query

  return (
    <Spot
      spotId={spotId as string}
      activeTabQuery={activeTab as SpotTabs}
      spotUrlBack={spotUrlBack as string}
    />
  )
}

export default SpotRoute
