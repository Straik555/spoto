import React from 'react'
import SpotDesktop from './SpotDesktop'
import SpotMobile from './SpotMobile'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'
import { SpotProps } from '@screens/admin/Spots/Spot/Spot.model'

const Spot: React.FC<SpotProps> = ({ spotId, activeTabQuery, spotUrlBack }) => {
  return (
    <>
      <LayoutDesktop>
        <SpotDesktop
          spotId={spotId}
          activeTabQuery={activeTabQuery}
          spotUrlBack={spotUrlBack}
        />
      </LayoutDesktop>
      <LayoutMobile>
        <SpotMobile
          spotId={spotId}
          activeTabQuery={activeTabQuery}
          spotUrlBack={spotUrlBack}
        />
      </LayoutMobile>
    </>
  )
}

export default Spot
