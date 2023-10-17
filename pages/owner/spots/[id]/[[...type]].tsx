import Spot from '@screens/owner/Spots/Spot/Spot'
import { SpotRouteParams } from '@screens/owner/Spots/Spot/Spot.model'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

const SpotRoute: FC = () => {
  const router = useRouter()
  const { id, type } = router.query as SpotRouteParams
  const extractedType = type ? type[0] : undefined

  return <Spot id={Number(id)} type={extractedType} />
}

export default SpotRoute
