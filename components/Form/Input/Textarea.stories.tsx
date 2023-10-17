import Form from '@components/Form/Form'
import Textarea from '@components/Form/Input/Textarea'
import React, { FC } from 'react'

export default {
  title: 'Reusable Components/Forms/Textarea',
  component: Textarea,
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
            <Textarea name="input" />
          </Template>
        )
      }}
    </Form>
  )
}

export const ConfiguredRows: FC = () => {
  return (
    <Form initialValues={{ input: '' }}>
      {(formikProps) => {
        return (
          <Template value={formikProps.values.input}>
            <Textarea name="input" rows={10} />
          </Template>
        )
      }}
    </Form>
  )
}

export const LimitCharacters: FC = () => {
  return (
    <Form initialValues={{ input: '' }}>
      {(formikProps) => {
        return (
          <Template value={formikProps.values.input}>
            <Textarea name="input" label="Limited" max={20} />
          </Template>
        )
      }}
    </Form>
  )
}
