import bookingApi from '@api/booking'
import Title from '@components/Title/Title'
import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import { dateFormats } from '@constants/global'
import { useDateUtil } from '@hooks/useDateUtil'
import { useTypedSelector } from '@redux/hooks'
import { canDeleteBooking } from '@screens/superAdmin/BookingCalendar/utils'
import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const BookingInfoCell: FC<{
  label: string
  description?: string
  suffix?: string
  noBorder?: boolean
}> = ({ label, description = 'N/A', suffix, noBorder }) => {
  return (
    <div
      className={classNames('flex flex-col pr-[25px] mr-[25px]', {
        'border-r border-blue-3': !noBorder,
      })}
    >
      <span className="pb-1 font-normal text-s-sm text-blue-1">{label}</span>
      <div className="flex">
        <span className="overflow-hidden font-semibold text-black text-s-base whitespace-nowrap text-ellipsis max-w-[200px]">
          {description}
        </span>
        {suffix && (
          <span className="pl-2 font-normal pt-[2px] text-s-sm text-blue-1">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

const BookingCalendarInfo: FC = () => {
  const selectedGridItem = useTypedSelector(
    (state) => state.superAdminBookingCalendarSlice.selectedGridItem
  )
  const dateUtil = useDateUtil()
  const booking = selectedGridItem?.data?.booking
  const startTime = booking
    ? dateUtil(booking.starts)
        .tz(booking.timeZone)
        .format(dateFormats.timeDisplay0)
    : ''
  const startDate = booking
    ? dateUtil(booking.starts).tz(booking.timeZone).format(dateFormats.display0)
    : ''
  const endTime = booking
    ? dateUtil(booking.ends)
        .tz(booking.timeZone)
        .format(dateFormats.timeDisplay0)
    : ''
  const endDate = booking
    ? dateUtil(booking.ends).tz(booking.timeZone).format(dateFormats.display0)
    : ''
  const [deleteBookingVisible, setDeleteBookingVisible] = useState(false)
  const [cancelOrEndBookingTrigger, { isSuccess, isError, isLoading }] =
    bookingApi.endpoints.cancelOrEndBooking.useMutation()

  useEffect(() => {
    if (isSuccess) {
      toast.success('Booking deleted')
    }

    if (isError) {
      toast.success('Failed to delete booking')
    }

    setDeleteBookingVisible(false)
  }, [isError, isSuccess])

  return (
    <div className="sticky top-0 block p-3 mt-6 bg-white border rounded-md border-blue-1">
      <div className="flex">
        <Title as="h4" className="mb-4 font-semibold font-s-base">
          Booking Information
        </Title>

        {selectedGridItem &&
          canDeleteBooking(selectedGridItem?.data?.booking.state) && (
            <Button
              mode={ButtonMode.SMALL_SECONDARY}
              className="ml-auto !border-red !text-red"
              iconClassName="!fill-blue-1 !mr-1"
              onClick={() => setDeleteBookingVisible(true)}
            >
              Delete
            </Button>
          )}
      </div>
      {selectedGridItem?.data ? (
        <div className="block">
          <div className="flex">
            <BookingInfoCell
              label="Start Time"
              description={startTime}
              suffix={startDate}
            />
            <BookingInfoCell
              label="End Time"
              description={endTime}
              suffix={endDate}
            />
            <BookingInfoCell label="User Email" description="N/A" />
            <BookingInfoCell label="Vehicle License Plate" description="N/A" />
            <BookingInfoCell
              label="Timezone"
              description={selectedGridItem?.data?.booking.timeZone}
            />
            <BookingInfoCell
              label="Address"
              description={selectedGridItem?.data?.booking.address}
              noBorder
            />
          </div>
          <div className="flex mt-4" />
        </div>
      ) : (
        <p className="text-s-base text-blue-1 pt-[22px]">
          Please select time range in spot to observing more booking
          information.
        </p>
      )}
      <DeleteDialog
        open={deleteBookingVisible}
        message="Are you sure you want to delete this booking?"
        onClose={() => setDeleteBookingVisible(false)}
        onSubmit={() => {
          cancelOrEndBookingTrigger(selectedGridItem!.data!.booking.id)
        }}
        disabled={isLoading}
      />
    </div>
  )
}
export default BookingCalendarInfo
