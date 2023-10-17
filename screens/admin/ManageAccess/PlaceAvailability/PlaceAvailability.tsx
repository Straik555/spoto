import { useFormikContext } from 'formik'
import React, { FC, useState } from 'react'
import cn from 'classnames'

import { Weekdays } from '@api/types'
import CalendarIcon from '@assets/icons/calendar.svg'
import WorkingHours from '@screens/admin/Sets/CreateEditSet/WorkingHours/WorkingHours'
import DatePickerDialog from '@components/DatePickerDialog'
import CheckboxGroup from '@components/Form/Checkbox/CheckboxGroup'
import Input from '@components/Form/Input/Input'
import RadioGroup from '@components/Form/Radio/RadioGroup'
import { withForm } from '@components/Form/withForm'
import { dateFormats } from '@constants/global'
import { useDateUtil } from '@hooks/useDateUtil'
import { DatePickerVariant } from '@components/DatePickerDialog/DatePickerDialog.model'
import InlineDatePicker from '@components/InlineDatePicker/InlineDatePicker'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

import AvailabilityRadio from './AvailabilityRadio/AvailabilityRadio'
import WeekdayCheckbox from './WeekdayCheckbox/WeekdayCheckbox'
import { placeAvailabilityValidationSchema } from './validations'
import usePlaceAvailability from './usePlaceAvailability'
import {
  AvailableDayTypes,
  PlaceAvailabilityFormValues,
  PlaceAvailabilityProps,
} from './PlaceAvailability.model'

const PlaceAvailability: FC<PlaceAvailabilityProps> = (props) => {
  const [state, actions] = usePlaceAvailability(props)
  const { dateUtil, form, isDatePickerOpen, isDesktop } = state
  const { setIsDatePickerOpen } = actions

  return (
    <div className="block">
      <RadioGroup name="availableDayType" label="Available day">
        <AvailabilityRadio
          value={AvailableDayTypes.DAY}
          label="Select Available Days"
        >
          <PlaceAvailabilityWeekdays />
        </AvailabilityRadio>
        <AvailabilityRadio
          value={AvailableDayTypes.RANGE}
          label="Select Available Date Range"
        >
          <PlaceAvailabilityWeekdays />

          {isDesktop && (
            <InlineDatePicker
              isDisabled={(value) =>
                dateUtil(form.values.startDate).isSameOrAfter(dateUtil(value))
              }
              onChange={(value) => {
                form.setFieldValue(
                  'endDate',
                  dateUtil(value).format(dateFormats.display0)
                )
              }}
              title="To"
              name="endDate"
              value={form.values.endDate}
            />
          )}

          {!isDesktop && (
            <>
              <Input
                className="mt-4"
                name="endDate"
                label="To"
                readOnly
                placeholder="Select Date"
                trailingIcon={<CalendarIcon className="fill-blue-3" />}
                onClick={() => {
                  setIsDatePickerOpen(true)
                }}
              />
              {isDatePickerOpen && (
                <DatePickerDialog
                  isDisabled={(value) =>
                    dateUtil(form.values.startDate).isSameOrAfter(
                      dateUtil(value)
                    )
                  }
                  dayFrom={
                    form.values.endDate
                      ? dateUtil(form.values.endDate).toDate()
                      : dateUtil().add(-10).toDate()
                  }
                  dayTo={dateUtil().add(10).toDate()}
                  modalIsOpen={isDatePickerOpen}
                  isPeriod={false}
                  closeModal={() => {
                    setIsDatePickerOpen(false)
                  }}
                  onSubmit={(value) => {
                    form.setFieldValue(
                      'endDate',
                      dateUtil(value).format(dateFormats.display0)
                    )
                    setIsDatePickerOpen(false)
                  }}
                  title="Select date"
                  backBtnVisible={false}
                  variant={DatePickerVariant.SETTINGS}
                  defaultTitle
                />
              )}
            </>
          )}
        </AvailabilityRadio>
      </RadioGroup>

      <WorkingHours
        title="Available hours"
        timeFrom={form.values.timeFrom!}
        setTimeFrom={(value) => {
          form.setValues({
            ...form.values,
            timeFrom: value,
          })
          form.setFieldTouched('timeFrom', true)
        }}
        timeTo={form.values.timeTo!}
        setTimeTo={(value) => {
          form.setValues({
            ...form.values,
            timeTo: value,
          })
          form.setFieldTouched('timeTo', true)
        }}
        optionClassName="!mt-0"
      />
    </div>
  )
}

const PlaceAvailabilityWeekdays: FC = () => {
  const dateUtil = useDateUtil()
  const { isDesktop } = useDeviceInfo()
  const form = useFormikContext<PlaceAvailabilityFormValues>()
  const [isSelectStartDateModalOpen, setSelectStartDateModalOpen] =
    useState<boolean>(false)

  return (
    <>
      <CheckboxGroup
        name="weekdays"
        label="Select available days for user"
        radiosClassname="flex justify-between"
      >
        <WeekdayCheckbox value={Weekdays.Sunday} />
        <WeekdayCheckbox value={Weekdays.Monday} />
        <WeekdayCheckbox value={Weekdays.Tuesday} />
        <WeekdayCheckbox value={Weekdays.Wednesday} />
        <WeekdayCheckbox value={Weekdays.Thursday} />
        <WeekdayCheckbox value={Weekdays.Friday} />
        <WeekdayCheckbox value={Weekdays.Saturday} />
      </CheckboxGroup>

      {isDesktop && (
        <InlineDatePicker
          isDisabled={(value) =>
            dateUtil(dateUtil(value)).isSameOrAfter(form.values.endDate)
          }
          onChange={(value) => {
            form.setFieldValue(
              'startDate',
              dateUtil(value).format(dateFormats.display0)
            )
          }}
          title="From"
          name="startDate"
          value={form.values.startDate}
        />
      )}

      {!isDesktop && (
        <>
          <Input
            className="mt-6"
            name="startDate"
            label="From"
            readOnly
            placeholder="Select Date"
            trailingIcon={<CalendarIcon className="fill-blue-3" />}
            onClick={() => setSelectStartDateModalOpen(true)}
          />

          {isSelectStartDateModalOpen && (
            <DatePickerDialog
              isDisabled={(value) =>
                dateUtil(dateUtil(value)).isSameOrAfter(form.values.endDate)
              }
              dayFrom={
                form.values.startDate
                  ? dateUtil(form.values.startDate).toDate()
                  : dateUtil().add(-10).toDate()
              }
              dayTo={dateUtil().add(10).toDate()}
              modalIsOpen={isSelectStartDateModalOpen}
              isPeriod={false}
              closeModal={() => setSelectStartDateModalOpen(false)}
              onSubmit={(value) => {
                form.setFieldValue(
                  'startDate',
                  dateUtil(value).format(dateFormats.display0)
                )
                setSelectStartDateModalOpen(false)
              }}
              title="Select date"
              backBtnVisible={false}
              variant={DatePickerVariant.SETTINGS}
              defaultTitle
            />
          )}
        </>
      )}
    </>
  )
}

export default withForm<PlaceAvailabilityProps>(
  {
    initialValues: {
      weekdays: [],
      startDate: '',
      endDate: '',
      timeFrom: '00:00',
      timeTo: '00:00',
      availableDayType: -1,
    } as PlaceAvailabilityFormValues,
    validationSchema: placeAvailabilityValidationSchema,
    initialTouched: {},
  },
  PlaceAvailability
)
