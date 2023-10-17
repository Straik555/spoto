import InputError from '@components/Form/InputError'
import InputLabel from '@components/Form/InputLabel'
import { RadioGroupProps } from '@components/Form/Radio/Radio.model'
import { RadioGroupContext } from '@components/Form/Radio/RadioGroupContext'
import { RadioGroup as HeadlessuiRadioGroup } from '@headlessui/react'
import classNames from 'classnames'
import { useFormikContext } from 'formik'
import React, { FC } from 'react'

const RadioGroup: FC<RadioGroupProps> = ({
  label,
  className,
  radiosClassname,
  name,
  onChange,
  children,
  noCap,
}) => {
  const formikCtx = useFormikContext()
  const formikFieldMeta = formikCtx.getFieldMeta(name)
  const formikFieldProps = formikCtx.getFieldProps(name)
  const handleChange = (value) => {
    formikCtx.setFieldValue(name, value)
    onChange?.(value)
  }

  return (
    <RadioGroupContext.Provider value={{ name, handleChange }}>
      <HeadlessuiRadioGroup
        value={formikFieldProps.value}
        onChange={handleChange}
      >
        <div className={classNames('block mt-[16px] normal-case', className)}>
          {label && <InputLabel noCap={noCap}>{label}</InputLabel>}
          <div className={classNames('block', radiosClassname)}>{children}</div>
          {formikFieldMeta.touched && formikFieldMeta.error && (
            <InputError>{formikFieldMeta.error}</InputError>
          )}
        </div>
      </HeadlessuiRadioGroup>
    </RadioGroupContext.Provider>
  )
}

export default RadioGroup
