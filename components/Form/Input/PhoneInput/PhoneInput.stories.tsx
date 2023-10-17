import CheckGreenIcon from '@assets/icons/circle-icons/check-green-circle-20.svg'
import Form from '@components/Form/Form'
import Input from '@components/Form/Input/Input'
import React, { FC } from 'react'
import {
  createValidationSchema,
  requiredNameField,
} from '@screens/auth/Register/validation'
import 'react-phone-input-2/lib/style.css'

import PhoneInput from '@components/Form/Input/PhoneInput/PhoneInput'

export default {
  title: 'Reusable Components/Forms/PhoneInput',
  component: Input,
}

const Template: FC<{ value: string }> = ({ children, value }) => {
  return (
    <div className="w-[500px]">
      {children}
      <p className="mt-3">Value: {value}</p>
    </div>
  )
}

export const PhoneNumber: FC = () => {
  return (
    <Form
      initialValues={{
        input: '',
      }}
      validationSchema={createValidationSchema({ input: requiredNameField })}
    >
      {(formikProps) => {
        return (
          <Template value={formikProps.values.input}>
            <PhoneInput
              labelClassName="mb-[5px]"
              inputClassName="h-[44px]"
              label="Phone"
              name="input"
              hideFieldError
            />
          </Template>
        )
      }}
    </Form>
  )
}

export const PhoneNumberDisabled: FC = () => {
  return (
    <Form
      initialValues={{
        input: '',
      }}
      validationSchema={createValidationSchema({ input: requiredNameField })}
    >
      {(formikProps) => {
        return (
          <Template value={formikProps.values.input}>
            <PhoneInput
              labelClassName="mb-[5px]"
              inputClassName="h-[44px]"
              label="Phone"
              name="input"
              trailingIcon={<CheckGreenIcon className="ml-[5px]" />}
              trailingIconClassName="!relative right-0"
              hideFieldError
              disabled
            />
          </Template>
        )
      }}
    </Form>
  )
}
