import React, { FC } from 'react'
import { useRouter } from 'next/router'
import VisitorsParking from '@screens/user/MyVisitors/VisitorsParking'

const VisitorsParkingEdit: FC = () => {
  const router = useRouter()
  const { appartmentId, visitorsParkingId } = router.query
  return (
    <VisitorsParking
      visitorsParkingId={String(visitorsParkingId)}
      appartmentId={String(appartmentId)}
    />
  )
}

export default VisitorsParkingEdit
