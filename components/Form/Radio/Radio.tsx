import {
  RadioInputComponentProps,
  RadioInputProps,
} from '@components/Form/Radio/Radio.model'
import { RadioGroupContext } from '@components/Form/Radio/RadioGroupContext'
import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react'
import classNames from 'classnames'
import { Field } from 'formik'
import React, { FC, useContext } from 'react'

const Radio: FC<RadioInputProps> = (props) => {
  const radioGroupCtx = useContext(RadioGroupContext)

  return (
    <Field type="radio" as={RadioInput} name={radioGroupCtx.name} {...props} />
  )
}

const RadioInput: FC<RadioInputComponentProps> = ({
  label,
  value,
  name,
  renderRadio,
  labelClassName,
  className,
  onClick,
}) => {
  const groupCtx = useContext(RadioGroupContext)
  return (
    <div className={classNames('flex items-center', className)}>
      <HeadlessRadioGroup.Option key={name} value={value}>
        {({ checked }) => {
          if (renderRadio) {
            return renderRadio({ checked })
          }

          return (
            <div
              className={classNames(
                'flex items-center justify-center bg-white w-[15px] h-[15px] border rounded-full transition-all',
                {
                  'border-primary': checked,
                  'border-blue-2': !checked,
                }
              )}
              onClick={onClick}
            >
              <div
                className={classNames(
                  'rounded-full bg-primary transition-all',
                  {
                    'w-[7px] h-[7px]': checked,
                    'w-[0px] h-[0px]': !checked,
                  }
                )}
              />
            </div>
          )
        }}
      </HeadlessRadioGroup.Option>
      {label && (
        <label
          className={classNames(
            'block font-normal ml-[15px] text-s-base text-blue-2',
            labelClassName
          )}
        >
          <div onClick={() => groupCtx?.handleChange(value)}>{label}</div>
        </label>
      )}
    </div>
  )
}

export default Radio
