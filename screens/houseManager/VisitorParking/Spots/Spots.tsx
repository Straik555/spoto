import React from 'react'
import SpotsMobile from '@screens/houseManager/VisitorParking/Spots/SpotsMobile'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'

const Spots: React.FC<{ houseId: string }> = ({ houseId }) => {
  return (
    <>
      <LayoutDesktop>
        <SpotsMobile houseId={houseId as string} />
      </LayoutDesktop>
      <LayoutMobile>
        <SpotsMobile houseId={houseId as string} />
      </LayoutMobile>
    </>
  )
}

export default Spots
