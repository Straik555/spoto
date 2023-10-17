import Button from '@components/Button/Button'
import { ButtonMode } from '@components/Button/Button.model'
import Checkbox from '@components/Form/Checkbox/Checkbox'
import { withForm } from '@components/Form/withForm'
import { PlaceAvailabilityFormValues } from '@screens/admin/ManageAccess/PlaceAvailability/PlaceAvailability.model'
import { mapScheduleFormValuesToPayload } from '@screens/admin/ManageAccess/util'
import {
  BookingSettingsOptionSingleFormValues,
  BookingSettingsOptionSingleProps,
  BookingSettingsType,
} from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/BookingSettingsOption.model'
import { initialSingleOptionFormValues } from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/constants'
import StartDate from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/StartDate'
import Time from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/Time'
import { singleOptionValidationSchema } from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/validations'
import DropdownCheckbox from '@screens/owner/Spots/components/DropdownCheckbox/DropdownCheckbox'
import classNames from 'classnames'
import { useFormikContext } from 'formik'
import React, { FC, PropsWithChildren } from 'react'

const BookingSettingsOptionSingle: FC<BookingSettingsOptionSingleProps> = ({
  className,
  onSave,
  disabled,
  children,
}) => {
  const form = useFormikContext<BookingSettingsOptionSingleFormValues>()

  return (
    <div className={classNames(className)}>
      <DropdownCheckbox
        label="Single Day Selection"
        name="type"
        value={BookingSettingsType.SINGLE_DAY}
        containerClassName="!p-4"
        contentClassName="flex-col"
        labelClassName={classNames('!ml-0', {
          '!text-primary !font-semibold':
            form.values.type === BookingSettingsType.SINGLE_DAY,
        })}
      >
        {children}

        <StartDate className="mt-3 mb-4" />

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
          onClick={() => {
            const values = {
              startDate: form.values.startDate,
              endDate: form.values.startDate,
            } as Omit<PlaceAvailabilityFormValues, 'availableDayType'>

            if (!form.values.accessAllDay) {
              values.timeFrom = form.values.timeFrom
              values.timeTo = form.values.timeTo
            }

            onSave?.(mapScheduleFormValuesToPayload(values))
          }}
          disabled={disabled}
        >
          Save
        </Button>
      </DropdownCheckbox>
    </div>
  )
}

export default withForm<PropsWithChildren<BookingSettingsOptionSingleProps>>(
  {
    initialValues: initialSingleOptionFormValues,
    validationSchema: singleOptionValidationSchema,
  },
  BookingSettingsOptionSingle
)
