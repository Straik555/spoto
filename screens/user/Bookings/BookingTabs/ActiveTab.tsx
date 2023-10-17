import bookingApi from '@api/booking'
import { vehicleApi } from '@api/vehicle'
import { ButtonMode } from '@components/Button/Button.model'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import { Button } from '@components/index'
import Loader from '@components/Loader/Loader'
import { ROUTES } from '@constants/routes'
import { MyBookingEntity } from '@screens/admin/Sets/ServerEntities.model'
import { MyBookingsCard } from '@screens/user/Bookings'
import { BookingTabsProps } from '@screens/user/Bookings/BookingTabs/BookingTabs.module'
import { useGroupedBooking } from '@screens/user/Bookings/BookingTabs/hooks'
import { ExtendTimeModal } from '@screens/user/Bookings/ExtendModal'
import cn from 'classnames'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { toast } from 'react-toastify'

const ActiveTab: FC<BookingTabsProps> = ({ isDesktop }) => {
  const [spot, setSpot] = useState<MyBookingEntity | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const router = useRouter()
  const { data: vehicles = [] } =
    vehicleApi.endpoints.getVehicles.useQuery(null)
  const { data: upcoming, isLoading } =
    bookingApi.endpoints.getUpcomingBookingsByUser.useQuery(null)
  const [cancelOrEndBooking, { isLoading: isLoadingCancel }] =
    bookingApi.endpoints.cancelOrEndBooking.useMutation()

  const handleEnd = async (id: string) => {
    try {
      await cancelOrEndBooking(id)
    } catch (e) {
      toast.error('Internal server error.')
    }
  }

  const groupedUpcomingBookings = useGroupedBooking(upcoming?.items, (a, b) =>
    a.isAfter(b) ? 1 : -1
  )

  return (
    <Loader loading={isLoading}>
      {upcoming?.items?.length ? (
        <div
          className={cn('px-4', { 'py-4': !isDesktop, 'py-[20px]': isDesktop })}
        >
          {groupedUpcomingBookings?.map(([date, bookings]) => {
            return (
              <div key={date}>
                <div className={cn({ 'flex flex-wrap': isDesktop })}>
                  {bookings.map((booking) => (
                    <MyBookingsCard
                      key={booking.id}
                      id={booking.id}
                      location={booking.address}
                      starts={booking.starts}
                      ends={booking.ends}
                      vehicle={vehicles.find(
                        (v) => v.licensePlate === booking.vehicleLP
                      )}
                      spotId={booking.spotId}
                      timeZone={booking.timeZone}
                      onExtend={() => setSpot(booking)}
                      onEnd={() => setDeleteId(booking.id)}
                      isDesktop={isDesktop}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-4 text-center grow">
          <p
            className={cn(
              'flex justify-center items-center text-s-xl font-semibold text-blue-3 grow'
            )}
          >
            No Active Bookings
          </p>
          <Button
            className={cn('m-[16px] !font-semibold', {
              'w-[270px] h-[50px] text-s-xl': isDesktop,
              'h-10 !h-[44px] text-s-lg': !isDesktop,
            })}
            mode={ButtonMode.FULL_PRIMARY}
            onClick={() => router.push({ pathname: ROUTES.HOME })}
          >
            Find a Spot
          </Button>
        </div>
      )}
      {spot && (
        <ExtendTimeModal
          isOpen={true}
          closeModal={() => setSpot(null)}
          spot={spot}
          noRange
        />
      )}

      <DeleteDialog
        open={Boolean(deleteId)}
        message="Are you sure you want to end parking?"
        onClose={() => setDeleteId(null)}
        onSubmit={() => {
          if (!deleteId) return

          handleEnd(deleteId)
          setDeleteId(null)
        }}
        disabled={isLoadingCancel}
        confirmTitle="End Parking"
      />
    </Loader>
  )
}

export default ActiveTab
