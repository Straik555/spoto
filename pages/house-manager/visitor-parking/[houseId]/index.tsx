import * as React from 'react'
import { useRouter } from 'next/router'
import Spots from '@screens/houseManager/VisitorParking/Spots'

const HouseManagerHousePage = () => {
  const router = useRouter()
  const { houseId } = router.query
  return <Spots houseId={houseId as string} />
}

export default HouseManagerHousePage
