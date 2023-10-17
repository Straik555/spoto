import { Weekdays } from '@api/types'
import Button from '@components/Button/Button'
import { ButtonMode } from '@components/Button/Button.model'
import Checkbox from '@components/Form/Checkbox/Checkbox'
import CheckboxGroup from '@components/Form/Checkbox/CheckboxGroup'
import { withForm } from '@components/Form/withForm'
import WeekdayCheckbox from '@screens/admin/ManageAccess/PlaceAvailability/WeekdayCheckbox/WeekdayCheckbox'
import { mapScheduleFormValuesToPayload } from '@screens/admin/ManageAccess/util'
import {
  BookingSettingsOptionSingleFormValues,
  BookingSettingsOptionWeekdayProps,
  BookingSettingsType,
} from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/BookingSettingsOption.model'
import { initialWeekdayOptionFormValues } from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/constants'
import Time from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/Time'
import { weekdayOptionValidationSchema } from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/validations'
import DropdownCheckbox from '@screens/owner/Spots/components/DropdownCheckbox/DropdownCheckbox'
import classNames from 'classnames'
import { useFormikContext } from 'formik'
import React, { FC, PropsWithChildren } from 'react'

const BookingSettingsOptionWeekday: FC<BookingSettingsOptionWeekdayProps> = ({
  className,
  onSave,
  disabled,
  children,
}) => {
  const form = useFormikContext<BookingSettingsOptionSingleFormValues>()

  return (
    <div className={classNames(className)}>
      <DropdownCheckbox
        label="Days of the Week Selection"
        name="type"
        value={BookingSettingsType.WEEKDAY}
        containerClassName="!p-4"
        contentClassName="flex-col"
        labelClassName={classNames('!ml-0', {
          '!text-primary !font-semibold':
            form.values.type === BookingSettingsType.WEEKDAY,
        })}
      >
        {children}

        <CheckboxGroup
          name="weekdays"
          label="Every"
          radiosClassname="flex"
          className="mt-3 mb-3"
        >
          <WeekdayCheckbox value={Weekdays.Sunday} />
          <WeekdayCheckbox value={Weekdays.Monday} />
          <WeekdayCheckbox value={Weekdays.Tuesday} />
          <WeekdayCheckbox value={Weekdays.Wednesday} />
          <WeekdayCheckbox value={Weekdays.Thursday} />
          <WeekdayCheckbox value={Weekdays.Friday} />
          <WeekdayCheckbox value={Weekdays.Saturday} />
        </CheckboxGroup>

        <Checkbox
          value={true}
          name="accessAllDay"
          label="Access All Day"
          labelClassName={classNames('!ml-0 !text-s-lg', {
            '!text-primary !font-semibold': form.values.accessAllDay,
          })}
        />

        {!form.values.accessAllDay && <Time className="mt-4" />}

        <Button
          mode={ButtonMode.FULL_PRIMARY}
          className="mt-4 !p-2 text-s-base"
          onClick={() => onSave?.(mapScheduleFormValuesToPayload(form.values))}
          disabled={disabled}
        >
          Save
        </Button>
      </DropdownCheckbox>
    </div>
  )
}

export default withForm<PropsWithChildren<BookingSettingsOptionWeekdayProps>>(
  {
    initialValues: initialWeekdayOptionFormValues,
    validationSchema: weekdayOptionValidationSchema,
  },
  BookingSettingsOptionWeekday
)
