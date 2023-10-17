import React from 'react'
import VisitorParkingMobile from '@screens/houseManager/VisitorParking/VisitorParkingMobile'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'

const VisitorParking: React.FC = () => {
  return (
    <>
      <LayoutDesktop>
        <VisitorParkingMobile />
      </LayoutDesktop>
      <LayoutMobile>
        <VisitorParkingMobile />
      </LayoutMobile>
    </>
  )
}

export default VisitorParking
