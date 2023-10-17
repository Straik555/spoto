import bookingApi from '@api/booking'
import { withForm } from '@components/Form/withForm'
import { LayoutDesktop } from '@components/Layout'
import Loader from '@components/Loader/Loader'
import { dateFormats } from '@constants/global'
import { getDateUtil } from '@hooks/useDateUtil'
import { BookingCalendarFormValues } from '@screens/superAdmin/BookingCalendar/BookingCalendar.model'
import BookingCalendarForm from '@screens/superAdmin/BookingCalendar/BookingCalendarForm'
import BookingCalendarGrid from '@screens/superAdmin/BookingCalendar/BookingCalendarGrid'
import BookingCalendarInfo from '@screens/superAdmin/BookingCalendar/BookingCalendarInfo'
import { useBookingToGridData } from '@screens/superAdmin/BookingCalendar/hook'
import { useFormikContext } from 'formik'
import _filter from 'lodash/filter'
import React, { FC } from 'react'

const BookingCalendar: FC = () => {
  const form = useFormikContext<BookingCalendarFormValues>()
  const { data, isLoading } = bookingApi.endpoints.getBookingsByAdmin.useQuery(
    {
      from: encodeURIComponent(form.values.startDate.format(dateFormats.apiZ)),
      to: encodeURIComponent(form.values.endDate.format(dateFormats.apiZ)),
    },
    {
      skip: !form.values.startDate || !form.values.endDate,
    }
  )
  const bookings = _filter(data?.items, (b) => {
    return form.values.bookingState
      ? b.booking.state === form.values.bookingState
      : true
  })
  const gridData = useBookingToGridData(bookings)

  return (
    <LayoutDesktop>
      <Loader loading={isLoading}>
        <div className="relative block w-full h-full overflow-hidden">
          <div className="absolute w-full h-full px-6 pb-6 mt-6 overflow-auto">
            <BookingCalendarForm />
            <BookingCalendarInfo />
            <BookingCalendarGrid data={gridData} />
          </div>
        </div>
      </Loader>
    </LayoutDesktop>
  )
}
export default withForm(
  {
    initialValues: {
      startDate: getDateUtil()().startOf('day'),
      endDate: getDateUtil()().endOf('day'),
      bookingState: null,
    } as BookingCalendarFormValues,
    className: 'w-full h-full',
  },
  BookingCalendar
)
