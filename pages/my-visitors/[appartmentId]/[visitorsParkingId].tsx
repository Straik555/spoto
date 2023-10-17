import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { VisitorsParkingDetailsProps } from '@screens/user/MyVisitors/VisitorsParkingDetails/VisitorsParkingDetails.model'
import VisitorsParkingDetails from '@screens/user/MyVisitors/VisitorsParkingDetails'

const DetailsGuest: FC<VisitorsParkingDetailsProps> = () => {
  const router = useRouter()
  const { visitorsParkingId, appartmentId } = router.query
  return (
    <VisitorsParkingDetails
      guestId={String(visitorsParkingId)}
      appartmentId={Number(appartmentId)}
    />
  )
}

export default DetailsGuest
