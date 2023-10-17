import Checkbox from '@components/Form/Checkbox/Checkbox'
import CheckboxGroup from '@components/Form/Checkbox/CheckboxGroup'
import Form from '@components/Form/Form'
import { weekdaysEnumToShortLabel } from '@screens/admin/Users/constants'
import classNames from 'classnames'
import React, { FC } from 'react'

export default {
  title: 'Reusable Components/Forms/Checkbox',
  component: Checkbox,
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
            <Checkbox name="input" value="0" label="Checkbox Label" />
          </Template>
        )
      }}
    </Form>
  )
}

export const Group: FC = () => {
  return (
    <Form initialValues={{ input: [] }}>
      {(formikProps) => {
        return (
          <Template value={JSON.stringify(formikProps.values.input)}>
            <CheckboxGroup name="input">
              <Checkbox value="0" label="Checkbox Label 0" />
              <Checkbox value="1" label="Checkbox Label 1" />
            </CheckboxGroup>
          </Template>
        )
      }}
    </Form>
  )
}

export const OnChangeHandler: FC = () => {
  return (
    <Form initialValues={{ input: '' }}>
      {(formikProps) => {
        return (
          <Template value={formikProps.values.input}>
            <Checkbox
              name="input"
              value="0"
              label="Checkbox Label"
              onChange={(checked) => {
                alert('New checked state: ' + checked)
              }}
            />
          </Template>
        )
      }}
    </Form>
  )
}

export const LargeSize: FC = () => {
  return (
    <Form initialValues={{ input: '' }}>
      {(formikProps) => {
        return (
          <Template value={formikProps.values.input}>
            <Checkbox name="input" value="0" label="Large Size" size="large" />
          </Template>
        )
      }}
    </Form>
  )
}

export const CustomRenderFunction: FC = () => {
  return (
    <Form initialValues={{ input: '' }}>
      {(formikProps) => {
        return (
          <Template value={formikProps.values.input}>
            <Checkbox
              name="input"
              value="0"
              label="Checkbox Label"
              renderCheckbox={({ checked }) => {
                return (
                  <div
                    className={classNames(
                      'flex w-[40px] h-[40px] mr-1 cursor-pointer items-center justify-center border rounded-full text-s-base border-primary',
                      {
                        'bg-white font-normal text-primary': !checked,
                        'bg-primary font-semibold text-white': checked,
                      }
                    )}
                  >
                    {weekdaysEnumToShortLabel['0']}
                  </div>
                )
              }}
            />
          </Template>
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
            <Checkbox
              name="input"
              value="0"
              label="Checkbox Label"
              className="p-2 mb-5 border border-blue-3"
              labelClassName="p-1 mb-2 border border-blue-3"
            />
          </Template>
        )
      }}
    </Form>
  )
}
