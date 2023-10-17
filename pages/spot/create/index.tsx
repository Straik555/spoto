import * as React from 'react'
import { useRouter } from 'next/router'
import AddSpot from '@screens/Spot/AddSpot/AddSpot'

const AddSpotRoute = () => {
  const router = useRouter()
  const { buildingId, setId, houseId, spotUrlBack } = router.query
  return (
    <AddSpot
      buildingId={buildingId as string}
      setId={setId as string}
      houseId={houseId as string}
      spotUrlBack={spotUrlBack as string}
    />
  )
}

export default AddSpotRoute
