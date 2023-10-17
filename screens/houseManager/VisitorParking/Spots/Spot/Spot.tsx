import React from 'react'
import SpotMobile from '@screens/houseManager/VisitorParking/Spots/Spot/SpotMobile'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'

const Spots: React.FC<{
  spotId: string
  houseId: string
  spotUrlBack?: string
}> = ({ spotId, houseId, spotUrlBack }) => {
  return (
    <>
      <LayoutDesktop>
        <SpotMobile
          spotId={spotId as string}
          houseId={houseId as string}
          spotUrlBack={spotUrlBack as string}
        />
      </LayoutDesktop>
      <LayoutMobile>
        <SpotMobile
          spotId={spotId as string}
          houseId={houseId as string}
          spotUrlBack={spotUrlBack as string}
        />
      </LayoutMobile>
    </>
  )
}

export default Spots
