import React from 'react'
import { Loader } from '@components/Loader'
import bookingApi from '@api/booking'
import { PageHeaderMobile } from '@components/PageHeader'
import ReservationCard from './ReservationCard'

const Reservations: React.FC = () => {
  const {
    data: reservationsList = [],
    isLoading,
    isFetching,
  } = bookingApi.endpoints.getUpcomingBookingsByOwner.useQuery({})

  return (
    <>
      <PageHeaderMobile title="Reservations" />

      <Loader loading={isLoading || isFetching}>
        {reservationsList.length ? (
          <div className="p-4">
            {reservationsList.map((item) => (
              <ReservationCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-s-base text-blue-2">
            No Reservations
          </p>
        )}
      </Loader>
    </>
  )
}

export default Reservations
