import Spot from '@screens/user/Spot'
import { SpotProps } from '@screens/user/Spot/Spot.model'
import { useRouter } from 'next/router'
import React from 'react'

const SpotPage: React.FC<SpotProps> = () => {
  const router = useRouter()
  const { id } = router.query

  return <Spot placeId={Number(id)} />
}

export default SpotPage
