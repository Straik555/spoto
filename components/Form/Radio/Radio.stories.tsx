import Form from '@components/Form/Form'
import BorderRadio from '@components/Form/Radio/BorderRadio'
import Radio from '@components/Form/Radio/Radio'
import RadioGroup from '@components/Form/Radio/RadioGroup'
import { weekdaysEnumToShortLabel } from '@screens/admin/Users/constants'
import classNames from 'classnames'
import React, { FC } from 'react'

export default {
  title: 'Reusable Components/Forms/Radio',
  component: Radio,
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
            <RadioGroup name="input">
              <Radio value="0" label="Radio Label 0" />
              <Radio value="1" label="Radio Label 1" />
            </RadioGroup>
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
            <RadioGroup name="input">
              <Radio
                value="0"
                label="Radio Label 0"
                className="p-2 mb-5 border border-blue-3"
                labelClassName="p-1 mb-2 border border-blue-3 !text-primary"
              />
              <Radio
                value="1"
                label="Radio Label 1"
                className="p-2 mb-5 border border-blue-3"
                labelClassName="p-1 mb-2 border border-blue-3 !text-primary"
              />
            </RadioGroup>
          </Template>
        )
      }}
    </Form>
  )
}

export const CustomStylesGroup: FC = () => {
  return (
    <Form initialValues={{ input: '' }}>
      {(formikProps) => {
        return (
          <Template value={formikProps.values.input}>
            <RadioGroup
              name="input"
              className="p-2 mb-5 border border-blue-3"
              radiosClassname="p-1 mb-2 border border-blue-3 !text-primary"
            >
              <Radio value="0" label="Radio Label 0" />
              <Radio value="1" label="Radio Label 1" />
            </RadioGroup>
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
            <RadioGroup name="input">
              <Radio
                value="0"
                label="Radio Label 0"
                renderRadio={({ checked }) => {
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
              <br />
              <Radio
                value="1"
                label="Radio Label 1"
                renderRadio={({ checked }) => {
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
                      {weekdaysEnumToShortLabel['1']}
                    </div>
                  )
                }}
              />
            </RadioGroup>
          </Template>
        )
      }}
    </Form>
  )
}

export const VariantBordered: FC = () => {
  return (
    <Form initialValues={{ input: '' }}>
      {(formikProps) => {
        return (
          <Template value={formikProps.values.input}>
            <RadioGroup name="input">
              <BorderRadio value="0" label="Radio Label 0" />
              <BorderRadio value="1" label="Radio Label 1" />
            </RadioGroup>
          </Template>
        )
      }}
    </Form>
  )
}
