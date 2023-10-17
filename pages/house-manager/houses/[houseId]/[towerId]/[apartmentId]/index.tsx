import * as React from 'react'
import { useRouter } from 'next/router'
import Apartment from '@screens/houseManager/Houses/House/Tower/Apartment'

const HouseManagerApartmentPage = () => {
  const router = useRouter()
  const { houseId, towerId, apartmentId } = router.query
  return (
    <Apartment
      houseId={houseId as string}
      towerId={towerId as string}
      apartmentId={apartmentId as string}
    />
  )
}

export default HouseManagerApartmentPage
