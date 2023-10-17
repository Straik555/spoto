import * as React from 'react'
import { useRouter } from 'next/router'
import Tower from '@screens/houseManager/Houses/House/Tower'

const HouseManagerTowerPage = () => {
  const router = useRouter()
  const { houseId, towerId } = router.query
  return <Tower houseId={houseId as string} towerId={towerId as string} />
}

export default HouseManagerTowerPage
