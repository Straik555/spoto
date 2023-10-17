import Form from '@components/Form/Form'
import PasswordInput from '@components/Form/Input/PasswordInput'
import React, { FC } from 'react'

export default {
  title: 'Reusable Components/Forms/PasswordInput',
  component: PasswordInput,
}

const Template: FC<{ value: string }> = ({ children, value }) => {
  return (
    <div className="w-[500px]">
      {children}
      <p className="mt-3">Value: {value}</p>
    </div>
  )
}

export const Default: FC = () => {
  return (
    <Form initialValues={{ input: '' }}>
      {(formikProps) => {
        return (
          <Template value={formikProps.values.input}>
            <PasswordInput name="input" />
          </Template>
        )
      }}
    </Form>
  )
}
