import React from 'react'
import ApartmentMobile from '@screens/houseManager/Houses/House/Tower/Apartment/ApartmentMobile'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'

const Apartment: React.FC<{
  houseId: string
  towerId: string
  apartmentId: string
}> = ({ houseId, towerId, apartmentId }) => {
  return (
    <>
      <LayoutDesktop>
        <ApartmentMobile
          towerId={towerId as string}
          houseId={houseId as string}
          apartmentId={apartmentId as string}
        />
      </LayoutDesktop>
      <LayoutMobile>
        <ApartmentMobile
          towerId={towerId as string}
          houseId={houseId as string}
          apartmentId={apartmentId as string}
        />
      </LayoutMobile>
    </>
  )
}

export default Apartment
