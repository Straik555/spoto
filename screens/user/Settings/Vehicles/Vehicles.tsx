import React from 'react'
import VehiclesMobile from '@screens/user/Settings/Vehicles/VehiclesMobile'
import VehiclesDesktop from '@screens/user/Settings/Vehicles/VehiclesDesktop'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'

const Vehicles: React.FC = () => {
  return (
    <>
      <LayoutDesktop>
        <VehiclesDesktop />
      </LayoutDesktop>
      <LayoutMobile>
        <VehiclesMobile />
      </LayoutMobile>
    </>
  )
}

export default Vehicles
