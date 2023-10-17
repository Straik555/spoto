import { LayoutDesktop, LayoutMobile } from '@components/Layout'
import BookingsDesktop from '@screens/user/Bookings/BookingsDesktop'
import BookingsMobile from '@screens/user/Bookings/BookingsMobile'
import React, { FC } from 'react'

const Bookings: FC = () => {
  return (
    <>
      <LayoutDesktop>
        <BookingsDesktop />
      </LayoutDesktop>
      <LayoutMobile>
        <BookingsMobile />
      </LayoutMobile>
    </>
  )
}
export default Bookings
