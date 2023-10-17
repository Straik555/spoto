import { useTypedDispatch, useTypedSelector } from '@redux/hooks'
import {
  BookingType,
  GridCell,
  GridCellSetHeader,
  GridCellSpotHeader,
  GridCellTimeslot,
  GridCellType,
} from '@screens/superAdmin/BookingCalendar/BookingCalendar.model'
import { useBookingCalendarIntervals } from '@screens/superAdmin/BookingCalendar/hook'
import {
  SelectedBookingInfo,
  superAdminBookingCalendarSlice,
} from '@screens/superAdmin/BookingCalendar/slice'
import { canDeleteBooking } from '@screens/superAdmin/BookingCalendar/utils'
import classNames from 'classnames'
import React, { FC, HTMLAttributes } from 'react'

const SpotHeaderCell: FC<GridCellSpotHeader> = ({ children, selected }) => {
  return (
    <div
      className={classNames(
        'text-center  border-b border-b-blue-1 border border-blue-4 sticky top-[135px]',
        {
          'bg-primary': selected,
          'bg-white': !selected,
        }
      )}
    >
      <div
        className={classNames(
          'flex items-center justify-center h-full px-2 text-s-base whitespace-nowrap',
          {
            'text-blue-1': !selected,
            'text-white': selected,
          }
        )}
      >
        {children}
      </div>
    </div>
  )
}

const SetHeaderCell: FC<GridCellSetHeader> = ({ title, span }) => {
  return (
    <div
      className={classNames(
        `text-center bg-white col-span-${span} p-2 pb-0 sticky top-[107px]`
      )}
    >
      <div
        className={classNames(
          'flex items-center justify-center h-full px-2 text-s-base whitespace-nowrap text-blue-1 border border-b-0 border-blue-1'
        )}
      >
        {title}
      </div>
    </div>
  )
}

const HiddenTimeSlotHeaderCell = () => {
  return null
}

const TimeSlotCell: FC<GridCellTimeslot & HTMLAttributes<HTMLDivElement>> = ({
  span,
  bookingType,
  selected,
  data,
  ...rest
}) => {
  return (
    <div
      className={classNames(
        `text-center border-b border-x border-b-blue-3 border-x-blue-4 row-span-${span}`
      )}
      {...rest}
    >
      <div className="flex items-center justify-center h-full p-2">
        {bookingType === BookingType.BOOKED && (
          <div
            className={classNames('block w-full h-full rounded-md bg-blue-2', {
              'border-2 border-primary': selected,
              'opacity-30': !canDeleteBooking(data?.booking.state),
            })}
          />
        )}
      </div>
    </div>
  )
}

const BookingCalendarGrid: FC<{ data: GridCell[][] }> = ({
  data: gridData = [],
}) => {
  const dispatch = useTypedDispatch()
  const selectedGridItem = useTypedSelector(
    (state) => state.superAdminBookingCalendarSlice.selectedGridItem
  )

  const selectGridItem = (data: SelectedBookingInfo) => {
    dispatch(
      superAdminBookingCalendarSlice.actions.setSelectedGridItem(
        data.id === selectedGridItem?.id ? null : data
      )
    )
  }
  const intervals = useBookingCalendarIntervals()

  return (
    <div className="mt-8 mb-8">
      <div className="flex">
        <div className="flex w-[60px]">
          <div
            className={`grid grid-flow-col auto-cols-[60px] grid-rows-[repeat(99,_30px)]`}
          >
            <div />
            <div />
            {intervals.map((interval, rowIndex) => {
              return (
                <SpotHeaderCell
                  key={interval + rowIndex}
                  title={interval}
                  type={GridCellType.SPOT_HEADER}
                  idx={interval}
                  selected={
                    selectedGridItem &&
                    rowIndex >= selectedGridItem.rowStart - 2 &&
                    rowIndex < selectedGridItem.rowEnd - 2
                  }
                >
                  {interval}
                </SpotHeaderCell>
              )
            })}
          </div>
        </div>
        <div className="flex grow">
          <div
            className={`grid grid-flow-col auto-cols-min grid-rows-[repeat(99,_30px)]`}
          >
            {gridData.map((cells, colIndex) => {
              const hasNoSet = cells.length === 98
              return (
                <>
                  {cells.map((cell, rowIndex) => {
                    if (cell.type === GridCellType.HIDDEN_TIMESLOT) {
                      return <HiddenTimeSlotHeaderCell key={rowIndex} />
                    }

                    if (cell.type === GridCellType.SPOT_HEADER) {
                      return (
                        <SpotHeaderCell
                          key={cell.idx}
                          {...cell}
                          selected={
                            selectedGridItem &&
                            colIndex === selectedGridItem.col
                          }
                        >
                          {cell.title}
                        </SpotHeaderCell>
                      )
                    }

                    if (cell.type === GridCellType.SET_HEADER) {
                      return (
                        <SetHeaderCell key={cell.idx} {...cell}>
                          {cell.title}
                        </SetHeaderCell>
                      )
                    }

                    if (cell.type === GridCellType.TIMESLOT) {
                      return (
                        <TimeSlotCell
                          key={cell.idx}
                          {...cell}
                          onClick={() =>
                            selectGridItem({
                              col: colIndex,
                              rowStart: rowIndex + Number(hasNoSet),
                              rowEnd: rowIndex + cell.span + Number(hasNoSet),
                              data: cell.data,
                              id: cell.idx,
                            })
                          }
                          selected={
                            selectedGridItem &&
                            rowIndex >= selectedGridItem.rowStart - 2 &&
                            rowIndex < selectedGridItem.rowEnd - 2 &&
                            colIndex === selectedGridItem.col
                          }
                        />
                      )
                    }
                  })}
                </>
              )
            })}
          </div>
        </div>
      </div>
      {/*Trick to generate tailwind styles*/}
      <div className="hidden row-span-0 row-span-1 row-span-2 row-span-3 row-span-4 row-span-5 row-span-6 row-span-7 row-span-8 row-span-9 row-span-10 row-span-11 row-span-12 row-span-13 row-span-14 row-span-15 row-span-16 row-span-17 row-span-18 row-span-19 row-span-20 row-span-21 row-span-22 row-span-23 row-span-24 row-span-25 row-span-26 row-span-27 row-span-28 row-span-29 row-span-30 row-span-31 row-span-32 row-span-33 row-span-34 row-span-35 row-span-36 row-span-37 row-span-38 row-span-39 row-span-40 row-span-41 row-span-42 row-span-43 row-span-44 row-span-45 row-span-46 row-span-47 row-span-48 row-span-49 row-span-50 row-span-51 row-span-52 row-span-53 row-span-54 row-span-55 row-span-56 row-span-57 row-span-58 row-span-59 row-span-60 row-span-61 row-span-62 row-span-63 row-span-64 row-span-65 row-span-66 row-span-67 row-span-68 row-span-69 row-span-70 row-span-71 row-span-72 row-span-73 row-span-74 row-span-75 row-span-76 row-span-77 row-span-78 row-span-79 row-span-80 row-span-81 row-span-82 row-span-83 row-span-84 row-span-85 row-span-86 row-span-87 row-span-88 row-span-89 row-span-90 row-span-91 row-span-92 row-span-93 row-span-94 row-span-95 row-span-96" />
      <div className="hidden col-span-0 col-span-1 col-span-2 col-span-3 col-span-4 col-span-5 col-span-6 col-span-7 col-span-8 col-span-9 col-span-10 col-span-11 col-span-12 col-span-13 col-span-14 col-span-15 col-span-16 col-span-17 col-span-18 col-span-19 col-span-20 col-span-21 col-span-22 col-span-23 col-span-24 col-span-25 col-span-26 col-span-27 col-span-28 col-span-29 col-span-30 col-span-31 col-span-32 col-span-33 col-span-34 col-span-35 col-span-36 col-span-37 col-span-38 col-span-39 col-span-40 col-span-41 col-span-42 col-span-43 col-span-44 col-span-45 col-span-46 col-span-47 col-span-48 col-span-49 col-span-50 col-span-51 col-span-52 col-span-53 col-span-54 col-span-55 col-span-56 col-span-57 col-span-58 col-span-59 col-span-60 col-span-61 col-span-62 col-span-63 col-span-64 col-span-65 col-span-66 col-span-67 col-span-68 col-span-69 col-span-70 col-span-71 col-span-72 col-span-73 col-span-74 col-span-75 col-span-76 col-span-77 col-span-78 col-span-79 col-span-80 col-span-81 col-span-82 col-span-83 col-span-84 col-span-85 col-span-86 col-span-87 col-span-88 col-span-89 col-span-90 col-span-91 col-span-92 col-span-93 col-span-94 col-span-95 col-span-96" />
    </div>
  )
}
export default BookingCalendarGrid
