import CheckmarkIcon8 from '@assets/icons/check-8.svg'
import CheckmarkIcon14 from '@assets/icons/check-14.svg'
import {
  CheckboxInputComponentProps,
  CheckboxInputProps,
} from '@components/Form/Checkbox/Checkbox.model'
import { CheckboxGroupContext } from '@components/Form/Checkbox/CheckboxGroupContext'
import InputLabel from '@components/Form/InputLabel'
import { Switch as HeadlessSwitch } from '@headlessui/react'
import classNames from 'classnames'
import cn from 'classnames'
import { Field, useFormikContext } from 'formik'
import React, {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

const Checkbox = <T,>(
  props: PropsWithChildren<CheckboxInputProps<T>>
): ReturnType<FC<CheckboxInputProps<T>>> => {
  const groupCtx = useContext(CheckboxGroupContext)
  const formikCtx = useFormikContext()
  const name = (props.name || groupCtx.name) as string
  const formikFieldMeta = formikCtx.getFieldMeta(name)
  const currentValue = formikFieldMeta.value
  const [checked, setChecked] = useState(props.checkByDefault)
  useEffect(() => {
    if (props.checkByDefault) return
    setChecked(
      Array.isArray(currentValue)
        ? currentValue.includes(props.value)
        : currentValue === props.value
    )
  }, [currentValue, props.checkByDefault])

  return (
    <Field
      type="checkbox"
      as={CheckboxInput}
      name={groupCtx.name || props.name}
      {...props}
      checked={checked}
      onChange={(value) => {
        props.onChange?.(value)
        setChecked(value)
      }}
    />
  )
}

const CheckboxInput: FC<
  CheckboxInputComponentProps &
    Required<Pick<CheckboxInputComponentProps, 'checked'>>
> = ({
  label,
  value,
  name,
  checked,
  onChange,
  renderCheckbox,
  className,
  labelClassName,
  size,
}) => {
  const formikCtx = useFormikContext()
  const formikFieldHelpers = formikCtx.getFieldHelpers(name)
  const groupCtx = useContext(CheckboxGroupContext)
  const handleChange = (checkedNewValue) => {
    formikFieldHelpers.setTouched(true)

    if (groupCtx.setValue) {
      groupCtx.setValue(value, checkedNewValue)
    } else {
      if (typeof value === 'boolean') {
        formikCtx.setFieldValue(name, checkedNewValue)
      } else {
        formikCtx.setFieldValue(name, checkedNewValue ? value : '')
      }
    }
    onChange?.(checkedNewValue)
  }

  const renderInput = () => (
    <HeadlessSwitch
      className={cn({ ['mr-[10px]']: label })}
      checked={checked}
      onChange={handleChange}
    >
      {({ checked }) => {
        if (renderCheckbox) {
          return renderCheckbox({ checked })
        }

        return <CheckboxInputCheckmark checked={checked} size={size} />
      }}
    </HeadlessSwitch>
  )
  return (
    <div className={cn('flex items-center', className)}>
      {label ? (
        <InputLabel
          className={classNames(
            'flex items-center ml-[10px] !mb-0',
            { 'text-primary !font-semibold': checked },
            labelClassName
          )}
          onClick={() => handleChange(!checked)}
        >
          {renderInput()}
          {label}
        </InputLabel>
      ) : (
        renderInput()
      )}
    </div>
  )
}

export const CheckboxInputCheckmark: FC<
  Pick<CheckboxInputComponentProps, 'checked' | 'size'>
> = ({ checked, size }) => {
  return (
    <div
      className={cn(
        'flex group items-center justify-center bg-white  border rounded-[2px] transition-all cursor-pointer',
        {
          'border-primary': checked,
          'border-blue-2': !checked,
          'w-[20px] h-[20px]': size === 'large',
          'w-[15px] h-[15px]': size !== 'large',
        }
      )}
    >
      {size === 'large' ? (
        <CheckmarkIcon14
          className={cn('transition-all', {
            'fill-primary': checked,
            'w-[0px] h-[0px] fill-blue-2': !checked,
          })}
        />
      ) : (
        <CheckmarkIcon8
          className={cn('transition-all', {
            'fill-primary': checked,
            'w-[0px] h-[0px] fill-blue-2': !checked,
          })}
        />
      )}
    </div>
  )
}

export default Checkbox
