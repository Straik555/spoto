import { CheckboxGroupProps } from '@components/Form/Checkbox/Checkbox.model'
import { CheckboxGroupContext } from '@components/Form/Checkbox/CheckboxGroupContext'
import InputError from '@components/Form/InputError'
import InputLabel from '@components/Form/InputLabel'
import classNames from 'classnames'
import { useFormikContext } from 'formik'
import _without from 'lodash/without'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

const CheckboxGroup: FC<CheckboxGroupProps> = ({
  label,
  className,
  radiosClassname,
  name,
  onChange,
  children,
  hideFieldError,
  inputLabelClassName,
}) => {
  const formikCtx = useFormikContext()
  const formikFieldMeta = formikCtx.getFieldMeta(name)
  const [value, setValue] = useState<string[]>(
    formikFieldMeta.value as string[]
  )

  const updateValue = useCallback(
    (value: string, checked: boolean) => {
      return setValue((previousValue) => {
        const newValue = checked
          ? [...previousValue, value]
          : _without(previousValue, value)

        onChange?.(newValue)

        return newValue
      })
    },
    [onChange]
  )

  const contextValue = useMemo(() => {
    return {
      name,
      setValue: updateValue,
    }
  }, [name, updateValue])

  useEffect(() => {
    formikCtx.setFieldValue(name, value)
  }, [name, value])

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div className={classNames('block', className)}>
        {label && (
          <InputLabel className={inputLabelClassName}>{label}</InputLabel>
        )}
        <div className={classNames('block', radiosClassname)}>{children}</div>
        {formikFieldMeta.touched &&
          formikFieldMeta.error &&
          !hideFieldError && <InputError>{formikFieldMeta.error}</InputError>}
      </div>
    </CheckboxGroupContext.Provider>
  )
}

export default CheckboxGroup
