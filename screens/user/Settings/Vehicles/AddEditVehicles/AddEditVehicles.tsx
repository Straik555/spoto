import React from 'react'
import AddEditVehiclesMobile from '@screens/user/Settings/Vehicles/AddEditVehicles/AddEditVehiclesMobile'
import AddEditVehiclesDesktop from '@screens/user/Settings/Vehicles/AddEditVehicles/AddEditVehiclesDesktop'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'

const AddEditVehicles: React.FC<{ vehicleId?: string }> = ({ vehicleId }) => {
  return (
    <>
      <LayoutDesktop>
        <AddEditVehiclesDesktop vehicleId={vehicleId} />
      </LayoutDesktop>
      <LayoutMobile>
        <AddEditVehiclesMobile vehicleId={vehicleId} />
      </LayoutMobile>
    </>
  )
}

export default AddEditVehicles
