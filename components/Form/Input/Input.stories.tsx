import CalendarIcon from '@assets/icons/calendar.svg'
import SearchIcon from '@assets/icons/search-15.svg'
import Form from '@components/Form/Form'
import Input from '@components/Form/Input/Input'
import { InputForNumber } from '@components/Form/Input/Input'
import React, { FC, useEffect, useRef } from 'react'
import {
  createValidationSchema,
  requiredNameField,
} from '@screens/auth/Register/validation'
import { InputTypes } from '@components/Form/Input/Input.model'

export default {
  title: 'Reusable Components/Forms/Input',
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

export const Default: FC = () => {
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

export const TypeNumber: FC = () => {
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
            <Input
              hideFieldError
              name="input"
              type={InputTypes.NUMBER}
              placeholder="0.00 m"
            />
          </Template>
        )
      }}
    </Form>
  )
}

export const LabelAndPlaceholder: FC = () => {
  return (
    <Form initialValues={{ input: '' }}>
      {(formikProps) => {
        return (
          <Template value={formikProps.values.input}>
            <Input name="input" label="Label" placeholder="Placeholder" />
          </Template>
        )
      }}
    </Form>
  )
}

export const Disabled: FC = () => {
  return (
    <Form initialValues={{ input: '' }}>
      {(formikProps) => {
        return (
          <Template value={formikProps.values.input}>
            <Input name="input" disabled />
          </Template>
        )
      }}
    </Form>
  )
}

export const PrefixSuffixIcons: FC = () => {
  return (
    <Form initialValues={{ input: '' }}>
      {(formikProps) => {
        return (
          <Template value={formikProps.values.input}>
            <Input
              name="input"
              placeholder="Search"
              prefixIcon={<SearchIcon className="fill-blue-3" />}
              inputClassName="pl-9 pr-12"
              trailingIcon={<CalendarIcon className="fill-blue-3" />}
            />
          </Template>
        )
      }}
    </Form>
  )
}

export const WithInputRef: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!inputRef.current) return

    inputRef.current.focus()
  }, [inputRef])

  return (
    <Form initialValues={{ input: '' }}>
      {(formikProps) => {
        return (
          <Template value={formikProps.values.input}>
            <Input
              name="input"
              placeholder="Imperatively Focused"
              inputRef={inputRef}
            />
          </Template>
        )
      }}
    </Form>
  )
}

export const WithValue: FC = () => {
  return (
    <Form
      initialValues={{
        input: '      Non-trimmed value    ',
        inputTrimmed: '      Trimmed value    ',
      }}
    >
      {(formikProps) => {
        return (
          <>
            <Template value={formikProps.values.input}>
              <Input name="input" />
            </Template>
            <br />
            <Template value={formikProps.values.inputTrimmed}>
              <Input name="inputTrimmed" trim />
            </Template>
          </>
        )
      }}
    </Form>
  )
}

export const CustomStyles: FC = () => {
  return (
    <Form initialValues={{ input: '' }}>
      {(formikProps) => {
        return (
          <Template value={formikProps.values.input}>
            <Input
              name="input"
              label="Label"
              placeholder="Black Placeholder"
              className="p-2 mb-5 border border-blue-3"
              labelClassName="p-1 mb-2 border border-blue-3"
              containerClassName="p-1 my-5 border border-blue-3 rounded-none"
              inputClassName="!border-primary !text-primary placeholder:text-black"
            />
          </Template>
        )
      }}
    </Form>
  )
}

export const NoErrorMessage: FC = () => {
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
            <Input hideFieldError name="input" />
          </Template>
        )
      }}
    </Form>
  )
}

export const InputForNumbers: FC = () => {
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
            <InputForNumber
              placeholder="0.00 m"
              name="input"
              suffix=" m"
              onValueChange={(value) =>
                formikProps.setFieldValue('input', value)
              }
            />
          </Template>
        )
      }}
    </Form>
  )
}
