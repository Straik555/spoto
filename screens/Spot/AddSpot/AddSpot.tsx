import React from 'react'
import AddSpotMobile from '@screens/Spot/AddSpot/AddSpotMobile'
import AddSpotDesktop from '@screens/Spot/AddSpot/AddSpotDesktop'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'

const Spots: React.FC<{
  spotId?: string
  houseId: string
  setId?: string
  buildingId: string
  spotUrlBack?: string
}> = ({ spotId, houseId, buildingId, setId, spotUrlBack }) => {
  return (
    <>
      <LayoutDesktop>
        <AddSpotDesktop
          spotId={spotId as string}
          houseId={houseId as string}
          setId={setId as string}
          buildingId={buildingId as string}
          spotUrlBack={spotUrlBack as string}
        />
      </LayoutDesktop>
      <LayoutMobile>
        <AddSpotMobile
          spotId={spotId as string}
          houseId={houseId as string}
          setId={setId as string}
          buildingId={buildingId as string}
          spotUrlBack={spotUrlBack as string}
        />
      </LayoutMobile>
    </>
  )
}

export default Spots
