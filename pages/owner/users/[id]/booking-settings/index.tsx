import BookingSettings from '@screens/owner/Users/BookingSettings/BookingSettings'
import { BookingSettingsRouteParams } from '@screens/owner/Users/BookingSettings/BookingSettings.model'
import { useRouter } from 'next/router'
import { FC } from 'react'

const BookingSettingsRoute: FC = () => {
  const router = useRouter()
  const { id } = router.query as BookingSettingsRouteParams

  return <BookingSettings userId={id} />
}

export default BookingSettingsRoute
