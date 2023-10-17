import React from 'react'
import HousesMobile from '@screens/houseManager/Houses/HousesMobile'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'

const Houses: React.FC = () => {
  return (
    <>
      <LayoutDesktop>
        <HousesMobile />
      </LayoutDesktop>
      <LayoutMobile>
        <HousesMobile />
      </LayoutMobile>
    </>
  )
}

export default Houses
