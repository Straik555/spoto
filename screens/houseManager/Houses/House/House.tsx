import React from 'react'
import HouseMobile from '@screens/houseManager/Houses/House/HouseMobile'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'

const House: React.FC<{ houseId: string }> = ({ houseId }) => {
  return (
    <>
      <LayoutDesktop>
        <HouseMobile houseId={houseId as string} />
      </LayoutDesktop>
      <LayoutMobile>
        <HouseMobile houseId={houseId as string} />
      </LayoutMobile>
    </>
  )
}

export default House
