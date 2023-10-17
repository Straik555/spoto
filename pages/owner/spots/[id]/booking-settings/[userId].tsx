import BookingSettings from '@screens/owner/Spots/BookingSettings/BookingSettings'
import { BookingSettingsRouteParams } from '@screens/owner/Spots/BookingSettings/BookingSettings.model'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

const BookingSettingsRoute: FC = () => {
  const router = useRouter()
  const { id, userId } = router.query as BookingSettingsRouteParams

  return <BookingSettings id={Number(id)} userId={userId} />
}

export default BookingSettingsRoute
