import * as React from 'react'
import { useRouter } from 'next/router'
import Spot from '@screens/houseManager/VisitorParking/Spots/Spot'

const HouseManagerHousePage = () => {
  const router = useRouter()
  const { spotId, houseId, spotUrlBack } = router.query
  return (
    <Spot
      spotId={spotId as string}
      houseId={houseId as string}
      spotUrlBack={spotUrlBack as string}
    />
  )
}

export default HouseManagerHousePage
