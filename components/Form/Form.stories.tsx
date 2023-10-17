import Form from '@components/Form/Form'
import Input from '@components/Form/Input/Input'
import { withForm } from '@components/Form/withForm'
import { useFormikContext } from 'formik'
import React, { FC } from 'react'

export default {
  title: 'Reusable Components/Forms/Form',
  component: Form,
}

const Template: FC<{ value: string }> = ({ children, value }) => {
  return (
    <div className="w-[500px]">
      {children}
      <p className="mt-3">Value: {value}</p>
    </div>
  )
}

export const RenderProp: FC = () => {
  return (
    <Form initialValues={{ input: '' }}>
      {(formikProps) => {
        return (
          <Template value={formikProps.values.input}>
            <Input name="input" />
          </Template>
        )
      }}
    </Form>
  )
}

const ContextContent = () => {
  const formik = useFormikContext<{ input: string }>()

  return (
    <Template value={formik.values.input}>
      <Input name="input" />
    </Template>
  )
}

export const Context: FC = () => {
  return (
    <Form initialValues={{ input: '' }}>
      <ContextContent />
    </Form>
  )
}

export const HOCContextWrapper: FC = withForm(
  {
    initialValues: { input: '' },
  },
  () => {
    return <ContextContent />
  }
)

export const CustomStyles: FC = () => {
  return (
    <Form
      initialValues={{ input: '' }}
      className="p-2 mb-5 border border-blue-3"
    >
      {(formikProps) => {
        return (
          <Template value={formikProps.values.input}>
            <Input name="input" />
          </Template>
        )
      }}
    </Form>
  )
}
