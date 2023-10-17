import Button from '@components/Button/Button'
import { ButtonMode } from '@components/Button/Button.model'
import Checkbox from '@components/Form/Checkbox/Checkbox'
import { withForm } from '@components/Form/withForm'
import { PlaceAvailabilityFormValues } from '@screens/admin/ManageAccess/PlaceAvailability/PlaceAvailability.model'
import { mapScheduleFormValuesToPayload } from '@screens/admin/ManageAccess/util'
import {
  BookingSettingsOptionPermanentFormValues,
  BookingSettingsOptionPermanentProps,
  BookingSettingsType,
} from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/BookingSettingsOption.model'
import { initialPermanentOptionFormValues } from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/constants'
import StartDate from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/StartDate'
import { permanentOptionValidationSchema } from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/validations'
import DropdownCheckbox from '@screens/owner/Spots/components/DropdownCheckbox/DropdownCheckbox'
import classNames from 'classnames'
import { useFormikContext } from 'formik'
import React, { FC, PropsWithChildren } from 'react'
import EndDate from './EndDate'

const BookingSettingsOptionPermanent: FC<
  BookingSettingsOptionPermanentProps
> = ({ className, onSave, disabled, children }) => {
  const form = useFormikContext<BookingSettingsOptionPermanentFormValues>()

  return (
    <div className={classNames(className)}>
      <DropdownCheckbox
        label="Permanent Access"
        name="type"
        value={BookingSettingsType.PERMANENT_ACCESS}
        containerClassName="!p-4"
        contentClassName="flex-col"
        labelClassName={classNames('!ml-0', {
          '!text-primary !font-semibold':
            form.values.type === BookingSettingsType.PERMANENT_ACCESS,
        })}
      >
        {children}

        <StartDate className="mt-3 mb-4" isPeriod={!form.values.onGoing} />

        <Checkbox
          value={true}
          name="onGoing"
          label="Ongoing"
          labelClassName={classNames('!ml-0 !text-s-lg', {
            '!text-primary !font-semibold': form.values.onGoing,
          })}
        />

        {!form.values.onGoing && <EndDate className="mt-4" isPeriod />}

        <Button
          mode={ButtonMode.FULL_PRIMARY}
          className="mt-4 !p-2 text-s-base"
          onClick={() => {
            const values = {
              startDate: form.values.startDate,
            } as Omit<PlaceAvailabilityFormValues, 'availableDayType'>

            if (!form.values.onGoing) {
              values.endDate = form.values.endDate
            }

            onSave?.(mapScheduleFormValuesToPayload(values))
          }}
          disabled={disabled || !form.isValid}
        >
          Save
        </Button>
      </DropdownCheckbox>
    </div>
  )
}

export default withForm<PropsWithChildren<BookingSettingsOptionPermanentProps>>(
  {
    initialValues: initialPermanentOptionFormValues,
    validationSchema: permanentOptionValidationSchema,
  },
  BookingSettingsOptionPermanent
)
