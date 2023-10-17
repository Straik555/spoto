import EditSpot from '@screens/owner/Spots/EditSpot/EditSpot'
import { SpotRouteParams } from '@screens/owner/Spots/Spot/Spot.model'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

const EditSpotRoute: FC = () => {
  const router = useRouter()
  const { id, type } = router.query as SpotRouteParams
  const extractedType = type ? type[0] : undefined

  return <EditSpot id={Number(id)} type={extractedType} />
}

export default EditSpotRoute
