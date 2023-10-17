import React, { useEffect, useMemo } from 'react'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import UserAvatar from '@screens/admin/Users/components/UserAvatar/UserAvatar'
import bookingApi from '@api/booking'
import { Loader } from '@components/Loader'
import { Button } from '@components/index'
import { PageHeaderMobile } from '@components/PageHeader'
import { toast } from 'react-toastify'
import { ButtonMode } from '@components/Button/Button.model'
import { ROUTES } from '@constants/routes'
import ReservationInfoRecords, {
  ReservationInfoRecord,
} from './components/ReservationInfoRecords'

const ReservationDetails: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter()

  const {
    data: reservation,
    isLoading,
    isFetching,
  } = bookingApi.endpoints.getUpcomingBookingsByOwnerById.useQuery(id, {
    skip: !id,
  })

  const [
    cancelOrEndBooking,
    { isSuccess: cancelBookingSuccess, isError: cancelBookingError },
  ] = bookingApi.endpoints.cancelOrEndBooking.useMutation()

  const {
    starts,
    ends,
    pricePerHour,
    placeName,
    userFirstName,
    userLastName,
    userAvatar,
  } = reservation || {}

  const fullName = useMemo(() => {
    return `${userFirstName} ${userLastName}`
  }, [userFirstName, userLastName])

  useEffect(() => {
    if (cancelBookingSuccess) {
      toast.success('Reservation successfully canceled!')
      router.push({ pathname: ROUTES.OWNER_RESERVATIONS })
    }
  }, [cancelBookingSuccess])

  useEffect(() => {
    if (cancelBookingError) {
      toast.error('Failed to cancel reservation!')
    }
  }, [cancelBookingError])

  return (
    <div className="flex flex-col w-full h-full">
      <PageHeaderMobile
        title="Reservations"
        backButtonLink={{ pathname: ROUTES.OWNER_RESERVATIONS }}
        showBackButton
      />
      <Loader loading={isLoading || isFetching}>
        {!isEmpty(reservation) ? (
          <div className="flex flex-col justify-between px-4 py-5 grow">
            <div>
              <div className="flex pb-5 border-b border-blue-4">
                <UserAvatar
                  thumbKey={userAvatar}
                  className="w-[75px] h-[75px]"
                />
                <div className="flex flex-col justify-center">
                  <div className="m-0 ml-6 font-semibold text-black text-s-base">
                    {fullName}
                  </div>
                  <div className="flex items-center ml-6 font-semibold text-primary">
                    {placeName}
                  </div>
                </div>
              </div>
              {!!pricePerHour && (
                <ReservationInfoRecord
                  name="Hourly Rate"
                  label={`$${pricePerHour}`}
                  labelFontSize="lg"
                  nameFontSize="sm"
                  recordClassName="flex-col pl-5 pt-5"
                />
              )}
              <ReservationInfoRecords
                containerClassName="py-4 grid grid-cols-2 gap-x-20 gap-y-5"
                recordClassName="flex-col"
                labelFontSize="lg"
                nameFontSize="sm"
                starts={starts}
                ends={ends}
              />
            </div>
            <Button
              mode={ButtonMode.FULL_SECONDARY}
              onClick={() => cancelOrEndBooking(id)}
            >
              Cancel reservation
            </Button>
          </div>
        ) : (
          <p className="mt-16 text-center text-s-base text-blue-2">
            Reservation data is empty
          </p>
        )}
      </Loader>
    </div>
  )
}

export default ReservationDetails
