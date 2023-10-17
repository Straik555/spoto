import * as React from 'react'
import { useRouter } from 'next/router'
import AddEditVehicles from '@screens/user/Settings/Vehicles/AddEditVehicles'

const AddSpotRoute = () => {
  const router = useRouter()
  const { vehicleId } = router.query
  return <AddEditVehicles vehicleId={vehicleId as string} />
}

export default AddSpotRoute
