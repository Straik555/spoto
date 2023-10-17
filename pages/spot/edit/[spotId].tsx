import * as React from 'react'
import { useRouter } from 'next/router'
import AddSpot from '@screens/Spot/AddSpot/AddSpot'

const EditSpotRoute = () => {
  const router = useRouter()
  const { buildingId, setId, houseId, spotId, spotUrlBack } = router.query
  return (
    <AddSpot
      buildingId={buildingId as string}
      setId={setId as string}
      houseId={houseId as string}
      spotId={spotId as string}
      spotUrlBack={spotUrlBack as string}
    />
  )
}

export default EditSpotRoute
