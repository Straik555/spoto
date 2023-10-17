import { useRouter } from 'next/router'
import React, { FC } from 'react'
import ReservationDetails from '@screens/owner/Reservations/ReservationDetails'

const ReservationDetailsPage: FC = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }

  return <ReservationDetails id={id} />
}

export default ReservationDetailsPage
