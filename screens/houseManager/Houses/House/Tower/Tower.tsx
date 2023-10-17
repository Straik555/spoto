import React from 'react'
import TowerMobile from '@screens/houseManager/Houses/House/Tower/TowerMobile'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'

const Tower: React.FC<{ houseId: string; towerId: string }> = ({
  towerId,
  houseId,
}) => {
  return (
    <>
      <LayoutDesktop>
        <TowerMobile towerId={towerId as string} houseId={houseId as string} />
      </LayoutDesktop>
      <LayoutMobile>
        <TowerMobile towerId={towerId as string} houseId={houseId as string} />
      </LayoutMobile>
    </>
  )
}

export default Tower
