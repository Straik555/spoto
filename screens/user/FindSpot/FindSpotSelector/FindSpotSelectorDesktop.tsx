import cn from 'classnames'
import React from 'react'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import { FindSpotFormValues } from '@screens/user/FindSpot/FindSpot.model'
import { TimeAutocompletePair } from '@components/TimeAutocomplete'
import { ButtonMode } from '@components/Button/Button.model'
import DatePickerDialog from '@components/DatePickerDialog'
import { Button } from '@components/index'
import { dateFormats } from '@constants/global'
import { useDateUtil } from '@hooks/useDateUtil'
import useFindSpotSelector from '@screens/user/FindSpot/FindSpotSelector/useFindSpotSelector'
import { DatePickerVariant } from '@components/DatePickerDialog/DatePickerDialog.model'
import Title from '@components/Title/Title'
import Down from '@assets/icons/arrows/arrow-down-small.svg'
import Up from '@assets/icons/arrows/arrow-up-small.svg'
import CalendarIcon from '@assets/icons/calendar.svg'

const FindSpotSelectorDesktop = ({ handleSearch, getLocation }: any) => {
  const { values, setFieldValue } = useTypedFormikContext<FindSpotFormValues>()
  const dateUtil = useDateUtil()
  const [{ intervals, dayFrom, setDayFrom, modalIsOpen, setModalIsOpen }] =
    useFindSpotSelector()

  return (
    <div className="w-full bg-white rounded-[15px_15px_0_0] h-[calc(100%-80px)]">
      <Title as="h4" className="my-5 text-md">
        Select date & time:
      </Title>
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="mt-1">
            <div
              className="flex items-center justify-between w-full border border-solid cursor-pointer p-[22px_17px_22px_19px] border-blue-3 rounded-[5px] text-blue-1"
              onClick={() => {
                setDayFrom(new Date())
                setFieldValue('selectType', '')
                setFieldValue('timeFrom', '')
                setFieldValue('timeTo', '')
                setFieldValue('isSelectToday', !values.isSelectToday)
                setFieldValue('isSelectSpecificDay', false)
              }}
            >
              <div className="flex items-center">
                <p className="m-0 text-base">Today</p>
              </div>
              {values.isSelectToday ? (
                <Up className="stroke-blue-3" />
              ) : (
                <Down className="stroke-blue-3" />
              )}
            </div>
            {values.isSelectToday && (
              <div className="p-[15px_4px_20px] box-border">
                <Title
                  noCap
                  as="h6"
                  className="m-0 text-base not-italic font-semibold text-blue-1"
                >
                  Booking time
                </Title>
                <div
                  className="flex items-center mt-4 text-sm cursor-pointer w-max"
                  onClick={() => {
                    setFieldValue('selectType', 'nearest')
                    setFieldValue('timeFrom', '')
                    setFieldValue('timeTo', '')
                  }}
                >
                  <span
                    className={cn(
                      'mr-2 rounded-full p-1 bg-white border border-solid border-blue-3 w-[15px] h-[15px]',
                      {
                        '!bg-primary !border-primary':
                          values.selectType === 'nearest',
                      }
                    )}
                  />
                  <p
                    className={cn('text-[#bac3db] m-0', {
                      '!text-primary': values.selectType === 'nearest',
                    })}
                  >
                    Now
                  </p>
                </div>
                <div
                  className="flex items-center mt-4 text-sm cursor-pointer w-max"
                  onClick={() => {
                    setFieldValue('selectType', 'selectTime')
                  }}
                >
                  <span
                    className={cn(
                      'mr-2 rounded-full p-1 bg-white border border-solid border-blue-3 w-[15px] h-[15px]',
                      {
                        '!bg-primary !border-primary':
                          values.selectType === 'selectTime',
                      }
                    )}
                  />
                  <p
                    className={cn('text-[#bac3db] m-0', {
                      '!text-primary': values.selectType === 'selectTime',
                    })}
                  >
                    Later
                  </p>
                </div>
                {values.selectType === 'selectTime' && (
                  <TimeAutocompletePair
                    intervals={intervals}
                    name1="timeFrom"
                    label1="From"
                    name2="timeTo"
                    label2="To"
                    classNameWrapper="mt-4"
                  />
                )}
              </div>
            )}
          </div>
          <div className="mt-1">
            <div
              className="flex items-center justify-between w-full border border-solid cursor-pointer p-[22px_17px_22px_19px] border-blue-3 rounded-[5px] text-blue-1"
              onClick={() => {
                setFieldValue('selectType', '')
                setFieldValue('timeFrom', '')
                setFieldValue('timeTo', '')
                setFieldValue('isSelectToday', false)
                setFieldValue(
                  'isSelectSpecificDay',
                  !values.isSelectSpecificDay
                )
              }}
            >
              <div className="flex items-center">
                <p className="m-0 text-base">Specific day</p>
              </div>
              {values.isSelectSpecificDay ? (
                <Up className="stroke-blue-3" />
              ) : (
                <Down className="stroke-blue-3" />
              )}
            </div>
            {values.isSelectSpecificDay && (
              <div className="p-[15px_4px_20px] box-border">
                <Title
                  noCap
                  as="h6"
                  className="m-0 text-base not-italic font-semibold text-blue-1"
                >
                  Booking day
                </Title>
                {!modalIsOpen && (
                  <button
                    type="button"
                    className="relative w-full h-12 p-3 mt-2 mb-6 text-base text-left bg-white border rounded-md border-blue-2 text-blue-1"
                    onClick={() => setModalIsOpen(true)}
                  >
                    {dateUtil(dayFrom).format(dateFormats.display0)}
                    <CalendarIcon className="absolute top-2.5 right-4 fill-blue-3" />
                  </button>
                )}
                {modalIsOpen && (
                  <DatePickerDialog
                    dayFrom={dayFrom}
                    dayTo={new Date()}
                    isPeriod={false}
                    closeModal={() => setModalIsOpen(false)}
                    onSubmit={(day: Date) => setDayFrom(day)}
                    variant={DatePickerVariant.SEARCH}
                    inline
                  />
                )}
                {!modalIsOpen && (
                  <TimeAutocompletePair
                    intervals={intervals}
                    name1="timeFrom"
                    label1="From"
                    name2="timeTo"
                    label2="To"
                  />
                )}
              </div>
            )}
          </div>
        </div>
        <div>
          <Button
            className={cn('h-11 text-base w-full', {
              'bg-blue-3':
                values.selectType !== 'nearest' &&
                (!values.timeFrom || !values.timeTo),
            })}
            onClick={() => {
              const searchParams = {
                dayFrom,
                timeFrom: values.timeFrom,
                timeTo: values.timeTo,
                nearestTime: values.selectType === 'nearest',
              }
              if (values.searchMode === 1) {
                handleSearch(searchParams)
                setFieldValue('markerIndex', 0)
              } else {
                setFieldValue('selectIsOpen', false)
                getLocation(searchParams)
              }
            }}
            disabled={
              values.selectType !== 'nearest' &&
              (!values.timeFrom || !values.timeTo)
            }
            mode={ButtonMode.SMALL}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FindSpotSelectorDesktop
