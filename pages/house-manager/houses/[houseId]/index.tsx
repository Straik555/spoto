import * as React from 'react'
import { useRouter } from 'next/router'
import House from '@screens/houseManager/Houses/House'

const HouseManagerHousePage = () => {
  const router = useRouter()
  const { houseId } = router.query
  return <House houseId={houseId as string} />
}

export default HouseManagerHousePage
