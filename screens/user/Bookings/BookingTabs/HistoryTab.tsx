import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react'
import bookingApi from '@api/booking'
import { vehicleApi } from '@api/vehicle'
import { ApiError } from '@api/types'
import { ButtonMode } from '@components/Button/Button.model'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import { Button } from '@components/index'
import Loader from '@components/Loader/Loader'
import { ROUTES } from '@constants/routes'
import { useDateUtil } from '@hooks/useDateUtil'
import { MyBookingEntity } from '@screens/admin/Sets/ServerEntities.model'
import { MyBookingsCard } from '@screens/user/Bookings'
import { useGroupedBooking } from '@screens/user/Bookings/BookingTabs/hooks'
import cn from 'classnames'
import _debounce from 'lodash/debounce'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { BookingTabsProps } from '@screens/user/Bookings/BookingTabs/BookingTabs.module'
import SearchIcon from '@assets/icons/search-15.svg'
import SearchIconFull from '@assets/icons/search-20.svg'

const HistoryTab: FC<BookingTabsProps> = ({ isDesktop }) => {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [searchValue, setSearchValue] = useState<string>('')
  const router = useRouter()
  const dateUtil = useDateUtil()
  const { data: vehicles = [] } =
    vehicleApi.endpoints.getVehicles.useQuery(null)
  const [
    getBookingPastByLocationTrigger,
    { data: past, isFetching: isPastLoading },
  ] = bookingApi.endpoints.getBookingPastByLocation.useLazyQuery()
  const getBookingPastByLocation = useMemo(
    () => _debounce(getBookingPastByLocationTrigger, 300),
    []
  )
  const { data: favourites, isLoading: isFavouritesLoading } =
    bookingApi.endpoints.getBookingFavourite.useQuery(null)
  const [
    addFavourite,
    {
      isSuccess: isSuccessFavourite,
      isError: isErrorFavourite,
      error: errorFavourite,
    },
  ] = bookingApi.endpoints.favoritesAdd.useMutation()
  const [deletePastBooking, { isLoading: isLoadingDeleteBooking }] =
    bookingApi.endpoints.deleteBookingPast.useMutation()
  const [
    deleteFavourite,
    {
      isSuccess: isSuccessDeleteFavourite,
      isError: isErrorDeleteFavourite,
      error: errorDeleteFavourite,
    },
  ] = bookingApi.endpoints.favoritesDelete.useMutation()

  useEffect(() => {
    if (isSuccessFavourite) {
      toast.success('You successfully added this location in Favourites.')
    }
  }, [isSuccessFavourite])

  useEffect(() => {
    if (isErrorFavourite) {
      toast.error((errorFavourite as ApiError).data.message)
    }
  }, [isErrorFavourite])

  useEffect(() => {
    if (isSuccessDeleteFavourite) {
      toast.success('You successfully deleted this location from Favourites.')
    }
  }, [isSuccessDeleteFavourite])

  useEffect(() => {
    if (isErrorDeleteFavourite) {
      toast.error((errorDeleteFavourite as ApiError).data.message)
    }
  }, [isErrorDeleteFavourite])

  useEffect(() => {
    getBookingPastByLocationTrigger('')
  }, [])

  useEffect(() => {
    getBookingPastByLocation(searchValue)
  }, [searchValue])

  const groupedPastBookings = useGroupedBooking(past?.items)

  return (
    <>
      <div
        className={cn('relative', {
          'px-4 pt-[15px] pb-[18px]': !isDesktop,
          'mb-[15px]': isDesktop,
        })}
      >
        {isDesktop ? (
          <SearchIconFull className="absolute top-[14px] left-[15px] fill-blue-1" />
        ) : (
          <SearchIcon className="absolute top-7 left-8 fill-blue-1" />
        )}
        <input
          type="text"
          placeholder="Search"
          className={cn(
            'w-full border pl-10 pr-4 text-xs rounded-[5px] bg-[#edf0fb] font-semibold',
            {
              'h-[50px] pl-11 text-sm': isDesktop,
              'h-10': !isDesktop,
            }
          )}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
      </div>
      <Loader loading={isPastLoading || isFavouritesLoading}>
        {past?.items?.length ? (
          <div className={cn('p-4 pt-0', { 'mb-[15px]': isDesktop })}>
            {groupedPastBookings?.map(([date, bookings]) => {
              const isToday = dateUtil(date).isToday()
              return (
                <div key={date}>
                  <div
                    className={cn('w-full text-center text-blue-1', {
                      'text-lg mb-[15px]': isDesktop,
                      'text-xs my-4 font-semibold': !isDesktop,
                    })}
                  >
                    {isToday ? 'Today' : date}
                  </div>
                  <div className={cn({ 'flex flex-wrap': isDesktop })}>
                    {bookings.map((booking: MyBookingEntity) => (
                      <MyBookingsCard
                        key={booking.id}
                        id={booking.id}
                        location={booking.address}
                        starts={booking.starts}
                        ends={booking.ends}
                        vehicle={vehicles.find(
                          (v) => v.licensePlate === booking.vehicleLP
                        )}
                        timeZone={booking.timeZone}
                        onEnd={() => setDeleteId(booking.id)}
                        favourite={favourites?.some(
                          (spot) => spot?.placeId === booking.spotId
                        )}
                        history
                        isDesktop={isDesktop}
                        onFavorite={() => {
                          favourites?.some(
                            (spot) => spot?.placeId === booking.spotId
                          )
                            ? deleteFavourite(booking?.spotId)
                            : addFavourite({ placeId: booking.spotId })
                        }}
                        onBook={() =>
                          router.push({
                            pathname: ROUTES.FIND_SPOT,
                            query: {
                              id: booking.spotId,
                            },
                          })
                        }
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center grow flex flex-col justify-center items-center px-4">
            <p
              className={cn(
                'flex justify-center items-center text-s-xl font-semibold text-blue-3 grow'
              )}
            >
              No Bookings
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
      </Loader>
      <DeleteDialog
        open={Boolean(deleteId)}
        message="Delete this location?"
        onClose={() => setDeleteId(null)}
        onSubmit={() => {
          if (!deleteId) return

          deletePastBooking(deleteId)
          setDeleteId(null)
        }}
        disabled={isLoadingDeleteBooking}
      />
    </>
  )
}

export default HistoryTab
