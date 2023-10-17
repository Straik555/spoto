import Button from '@components/Button/Button'
import { ButtonMode } from '@components/Button/Button.model'
import Checkbox from '@components/Form/Checkbox/Checkbox'
import { withForm } from '@components/Form/withForm'
import { mapScheduleFormValuesToPayload } from '@screens/admin/ManageAccess/util'
import {
  BookingSettingsOptionRangeFormValues,
  BookingSettingsOptionRangeProps,
  BookingSettingsType,
} from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/BookingSettingsOption.model'
import { initialRangeOptionFormValues } from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/constants'
import StartDate from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/StartDate'
import Time from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/Time'
import { rangeOptionValidationSchema } from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/validations'
import DropdownCheckbox from '@screens/owner/Spots/components/DropdownCheckbox/DropdownCheckbox'
import classNames from 'classnames'
import { useFormikContext } from 'formik'
import React, { FC, PropsWithChildren } from 'react'
import EndDate from './EndDate'

const BookingSettingsOptionRange: FC<BookingSettingsOptionRangeProps> = ({
  className,
  onSave,
  disabled,
  children,
}) => {
  const form = useFormikContext<BookingSettingsOptionRangeFormValues>()

  return (
    <div className={classNames(className)}>
      <DropdownCheckbox
        label="Date Range Selection"
        name="type"
        value={BookingSettingsType.RANGE}
        containerClassName="!p-4"
        contentClassName="flex-col"
        labelClassName={classNames('!ml-0', {
          '!text-primary !font-semibold':
            form.values.type === BookingSettingsType.RANGE,
        })}
      >
        {children}

        <StartDate className="mt-3 mb-4" isPeriod />

        <EndDate className="mb-4" isPeriod />

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

export default withForm<PropsWithChildren<BookingSettingsOptionRangeProps>>(
  {
    initialValues: initialRangeOptionFormValues,
    validationSchema: rangeOptionValidationSchema,
  },
  BookingSettingsOptionRange
)
