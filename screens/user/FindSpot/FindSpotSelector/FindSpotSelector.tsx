import React from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { ButtonMode } from '@components/Button/Button.model'
import DatePickerDialog from '@components/DatePickerDialog'
import { Button } from '@components/index'
import { TimeDialog } from '@screens/user/components/TimeDialog'
import { dateFormats } from '@constants/global'
import { useDateUtil } from '@hooks/useDateUtil'
import Input from '@components/Form/Input/Input'
import RadioGroup from '@components/Form/Radio/RadioGroup'
import Radio from '@components/Form/Radio/Radio'
import useFindSpotSelector from '@screens/user/FindSpot/FindSpotSelector/useFindSpotSelector'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import { DatePickerVariant } from '@components/DatePickerDialog/DatePickerDialog.model'
import { FindSpotFormValues } from '@screens/user/FindSpot/FindSpot.model'
import Title from '@components/Title/Title'
import useFindSpot from '@screens/user/FindSpot/useFindSpot'
import Down from '@assets/icons/arrows/arrow-down-small.svg'
import Left from '@assets/icons/arrows/arrow-left-small.svg'
import Up from '@assets/icons/arrows/arrow-up-small.svg'
import CalendarIcon from '@assets/icons/calendar.svg'

const FindSpotSelector = ({ handleSearch, openModal, getLocation }: any) => {
  const { values, setFieldValue } = useTypedFormikContext<FindSpotFormValues>()
  const dateUtil = useDateUtil()
  const router = useRouter()
  const { searchQueryParams } = useFindSpot()
  const [
    {
      dayFrom,
      isOpen,
      modalIsOpen,
      intervals,
      setDayFrom,
      setIsOpen,
      setModalIsOpen,
    },
  ] = useFindSpotSelector()

  return (
    <div className="w-full pb-4 mb-4 bg-white pt-[10px] rounded-[15px] h-[calc(100%-80px)]">
      <div
        className="flex items-center px-4 text-sm text-blue-1"
        onClick={() => {
          searchQueryParams({
            vehicleType1: values.vehicleType1,
            vehicleType2: values.vehicleType2,
            sliderHeight: values.sliderHeight,
            isToday:
              values.prevSelectType === 'selectTime' ||
              values.prevSelectType === 'nearest',
            timeFrom: values.prevStartDate,
            timeTo: values.prevEndDate,
            address: values.address,
          })
          setFieldValue(
            'isSelectToday',
            values.prevSelectType === ('selectTime' || 'nearest')
          )
          setFieldValue(
            'isSelectSpecificDay',
            values.prevSelectType === 'specificDay'
          )
          setFieldValue('timeFrom', values.prevStartDate)
          setFieldValue('timeTo', values.prevEndDate)
          setFieldValue(
            'startDate',
            dateUtil(values.prevStartDate).utc().format(dateFormats.display3)
          )
          setFieldValue('selectIsOpen', false)
          if (values.markers) {
            setFieldValue('modalIsOpen', false)
            return
          }
          if (values.searchMode != 2) {
            openModal()
          } else {
            setFieldValue('searchMode', 0)
          }
        }}
      >
        <Left className="font-normal mr-[6px] stroke-blue-1" /> Back
      </div>
      <Title
        as="h4"
        className="px-4 text-lg font-semibold text-center mb-[30px]"
      >
        Select date & time:
      </Title>
      <div className="px-4">
        <RadioGroup
          className={cn(
            'relative bg-white z-[1] flex text-blue-1 items-center h-[64px] justify-between w-full flex items-center p-[23px_18px_20px_14px] rounded-[5px] border border-solid border-blue-3',
            {
              '!text-primary !border-primary': values.isSelectToday,
            }
          )}
          radiosClassname="!flex justify-between items-center w-full"
          name="isSelectToday"
          onChange={(value) => {
            setDayFrom(new Date())
            setFieldValue('timeFrom', '')
            setFieldValue('timeTo', '')
            setFieldValue('selectType', '')
            setFieldValue('isSelectSpecificDay', false)
            setFieldValue('isSelectToday', value)
            setFieldValue('startDate', dateUtil().toDate())
          }}
        >
          <Radio
            label="Today"
            value={true}
            labelClassName={cn('!ml-[10px] text-base capitalize', {
              '!text-primary': values.isSelectToday,
            })}
          />
          {values.isSelectToday ? (
            <Up className="!stroke-primary" />
          ) : (
            <Down className="stroke-blue-3" />
          )}
        </RadioGroup>
        {values.isSelectToday && (
          <RadioGroup
            className="border border-solid -mt-[3px] p-[12px_15px_15px] bg-bg rounded-[0_0_5px_5px] box-border border-primary"
            name="selectType"
            onChange={(value) => {
              setFieldValue('selectType', value)
              setFieldValue('timeFrom', '')
              setFieldValue('timeTo', '')
              setFieldValue('startDate', dateUtil().toDate())
              searchQueryParams({
                vehicleType1: values.vehicleType1,
                vehicleType2: values.vehicleType2,
                sliderHeight: values.sliderHeight,
                isToday: true,
                timeFrom: null,
                timeTo: null,
                address: values.address,
              })
            }}
          >
            <Radio
              label="Now"
              value="nearest"
              labelClassName={cn('text-blue-1 text-base !ml-2', {
                '!text-primary': values.selectType === 'nearest',
              })}
              className="flex items-center mt-2"
            />
            <Radio
              label="Later"
              value="selectTime"
              className="flex items-center mt-2"
              labelClassName={cn('text-blue-1 text-base !ml-2', {
                '!text-primary': values.selectType === 'selectTime',
              })}
            />
            {values.selectType === 'selectTime' && (
              <div className="flex justify-between mt-[14px]">
                <div>
                  <small className="text-s-base text-blue-1">Start</small>
                  <div
                    className="flex items-center justify-between py-3 text-base text-left bg-white border mt-[5px] p-[14px_20px_14px_14px] h-11 rounded-md border-blue-2 text-blue-1 !w-[135px]"
                    onClick={() => setIsOpen(true)}
                  >
                    <p className="m-0">
                      {values.timeFrom
                        ? dateUtil(values.timeFrom)
                            .utc()
                            .format(dateFormats.timeDisplay0)
                        : '00:00'}
                    </p>
                    <Down className="stroke-blue-3" />
                  </div>
                </div>
                <div>
                  <small className="text-s-base text-blue-1">End</small>
                  <div
                    className="flex items-center justify-between py-3 text-base text-left bg-white border mt-[5px] p-[14px_20px_14px_14px] h-11 !w-[135px] rounded-md border-blue-2 text-blue-1"
                    onClick={() => setIsOpen(true)}
                  >
                    <p className="m-0">
                      {values.timeTo
                        ? dateUtil(values.timeTo)
                            .utc()
                            .format(dateFormats.timeDisplay0)
                        : '00:00'}
                    </p>
                    <Down className="stroke-blue-3" />
                  </div>
                </div>
              </div>
            )}
          </RadioGroup>
        )}
      </div>
      <div className="px-4 mt-2">
        <RadioGroup
          className={cn(
            'relative bg-white z-[1] flex text-blue-1 items-center h-[64px] justify-between w-full flex items-center p-[19px_18px_20px_14px] border border-solid border-blue-3 rounded-[5px] mt-[8px]',
            {
              '!text-primary !border-primary': values.isSelectSpecificDay,
            }
          )}
          radiosClassname="!flex justify-between items-center w-full"
          name="isSelectSpecificDay"
          onChange={(value) => {
            setFieldValue('timeFrom', '')
            setFieldValue('timeTo', '')
            setFieldValue('selectType', '')
            setFieldValue('isSelectToday', false)
            setFieldValue('isSelectSpecificDay', value)
            searchQueryParams({
              vehicleType1: values.vehicleType1,
              vehicleType2: values.vehicleType2,
              sliderHeight: values.sliderHeight,
              isToday: false,
              timeFrom: `${dateUtil().format(dateFormats.iso8601)}Z`,
              timeTo: null,
              address: values.address,
            })
          }}
        >
          <Radio
            label="Specific day"
            value={true}
            labelClassName={cn('!ml-[10px] text-base capitalize', {
              '!text-primary': values.isSelectSpecificDay,
            })}
          />
          {values.isSelectSpecificDay ? (
            <Up className="stroke-primary" />
          ) : (
            <Down className="stroke-blue-3" />
          )}
        </RadioGroup>
        {values.isSelectSpecificDay && (
          <div className="relative border border-solid -mt-[4px] border-primary box-border rounded-[0_0_5px_5px] bg-bg p-[16px] pt-[20px]">
            <Input
              className="!mt-0"
              name="startDate"
              containerClassName="!shadow-none"
              inputClassName="relative w-full h-11 p-3 mb-[14px] text-base text-left bg-white border rounded-md border-blue-2 text-blue-1 outline-none"
              onClick={() => setModalIsOpen(true)}
              value={dateUtil(dayFrom).format(dateFormats.display0)}
              trailingIcon={<CalendarIcon className="fill-blue-3" />}
              trailingIconClassName="!-top-[22px]"
              readOnly
            />
            <div className="flex justify-between">
              <div>
                <small className="text-s-base text-blue-1">Start</small>
                <div
                  className="flex items-center justify-between px-4 py-3 text-base text-left bg-white border mt-[5px] h-11 w-[135px] rounded-md border-blue-2 text-blue-1"
                  onClick={() => setIsOpen(true)}
                >
                  <p className="m-0">
                    {values.timeFrom
                      ? dateUtil(values.timeFrom)
                          .utc()
                          .format(dateFormats.timeDisplay0)
                      : '00:00'}
                  </p>
                  <Down className="stroke-blue-3" />
                </div>
              </div>
              <div>
                <small className="text-s-base text-blue-1">End</small>
                <div
                  className="flex items-center justify-between px-4 py-3 text-base text-left bg-white border mt-[5px] h-11 w-[135px] rounded-md border-blue-2 text-blue-1"
                  onClick={() => setIsOpen(true)}
                >
                  <p className="m-0">
                    {values.timeTo
                      ? dateUtil(values.timeTo)
                          .utc()
                          .format(dateFormats.timeDisplay0)
                      : '00:00'}
                  </p>
                  <Down className="stroke-blue-3" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <hr className="my-[16px]" />
      <div className="px-4">
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
      {modalIsOpen && (
        <DatePickerDialog
          dayFrom={dayFrom}
          dayTo={new Date()}
          modalIsOpen={modalIsOpen}
          isPeriod={false}
          closeModal={() => setModalIsOpen(false)}
          onSubmit={(day: Date) => {
            setDayFrom(day)
            setFieldValue('startDate', day)
            setFieldValue('timeFrom', null)
            setFieldValue('timeTo', null)
            searchQueryParams({
              vehicleType1: values.vehicleType1,
              vehicleType2: values.vehicleType2,
              sliderHeight: values.sliderHeight,
              isToday: false,
              timeFrom: `${dateUtil(day).format(dateFormats.iso8601)}Z`,
              timeTo: null,
              address: values.address,
            })
          }}
          variant={DatePickerVariant.SEARCH}
        />
      )}
      {isOpen && (
        <TimeDialog
          closeModal={() => setIsOpen(false)}
          onSubmit={(startDate, endDate) => {
            setFieldValue('timeFrom', startDate)
            setFieldValue('timeTo', endDate)
            searchQueryParams({
              vehicleType1: values.vehicleType1,
              vehicleType2: values.vehicleType2,
              sliderHeight: values.sliderHeight,
              isToday: JSON.parse(String(router.query?.isToday)),
              timeFrom: startDate,
              timeTo: endDate,
              address: values.address,
            })
          }}
          isOpen={isOpen}
          intervals={intervals}
          startDate={values.timeFrom}
          endDate={values.timeTo}
        />
      )}
    </div>
  )
}

export default FindSpotSelector
