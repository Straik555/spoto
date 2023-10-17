import { useFieldError } from '@components/Form/hooks'
import {
  InputForNumberProps,
  InputProps,
  InputTypes,
  TextInputProps,
} from '@components/Form/Input/Input.model'
import InputError from '@components/Form/InputError'
import InputLabel from '@components/Form/InputLabel'
import { forceTrim } from '@utils/forceTrim'
import classNames from 'classnames'
import { Field } from 'formik'
import React, { FC, PropsWithChildren, useMemo } from 'react'
import NumberFormat from 'react-number-format'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'

const Input = <T,>(
  props: PropsWithChildren<InputProps<T>>
): ReturnType<FC<InputProps<T>>> => {
  const { onChange, onBlur, ...restProps } = props

  return (
    <Field
      as={TextInput}
      {...restProps}
      outerOnChange={onChange}
      outerOnBlur={onBlur}
    />
  )
}

export const InputForNumber = <T,>(
  props: PropsWithChildren<InputForNumberProps<T>>
): ReturnType<FC<InputProps<T>>> => {
  const formikCtx = useTypedFormikContext<T>()

  return (
    <NumberFormat
      allowNegative={false}
      name={props.name}
      label={props.label}
      className={props.className}
      inputClassName={props.inputClassName}
      containerClassName={props.containerClassName}
      labelClassName={props.labelClassName}
      placeholder={props.placeholder}
      decimalScale={2}
      fixedDecimalScale={true}
      suffix={props.suffix}
      customInput={TextInput}
      displayType="input"
      onValueChange={({ value }) => {
        props.onValueChange?.(value)
        formikCtx.setFieldValue(props.name, value)
      }}
    />
  )
}

const TextInput: FC<TextInputProps> = ({
  disabled,
  label,
  placeholder = '',
  trailingIcon,
  onChange,
  onFocus,
  onBlur,
  inputRef,
  value,
  name,
  className,
  readOnly,
  containerClassName,
  inputClassName,
  labelClassName,
  prefixIcon,
  type = InputTypes.TEXT,
  trim,
  onClick,
  hideFieldError,
  trailingIconClassName,
  customInput,
  outerOnChange,
  outerOnBlur,
  ...restProps
}) => {
  const fieldError = useFieldError(name)

  const inputError = useMemo(
    () => !hideFieldError && fieldError,
    [fieldError, hideFieldError]
  )

  return (
    <div className={classNames('mt-[16px] desktop:mt-[25px]', className)}>
      {label && (
        <InputLabel className={classNames(labelClassName)}>{label}</InputLabel>
      )}

      <div
        className={classNames(
          'relative rounded-md shadow-sm flex items-center',
          containerClassName
        )}
      >
        {prefixIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center h-full pl-3 pointer-events-none">
            {prefixIcon}
          </div>
        )}
        {customInput ? (
          customInput
        ) : (
          <input
            aria-label={name}
            ref={inputRef}
            disabled={disabled}
            type={type}
            value={trim ? forceTrim(value) : value}
            onChange={(e) => {
              onChange?.(e)
              outerOnChange?.(e)
            }}
            onBlur={(e) => {
              onBlur?.(e)
              outerOnBlur?.(e)
            }}
            onFocus={onFocus}
            name={name}
            className={classNames(
              'block w-full focus:border-primary focus:text-primary border outline-none rounded-[5px] px-[15px] py-[9px] text-s-lg placeholder:text-blue-3',
              {
                'pr-12': trailingIcon,
                'pl-[44px]': prefixIcon,
                '!border-blue-4 text-blue-4 !placeholder:text-blue-4 bg-white':
                  disabled,
                'border-blue-2 text-blue-1': !inputError,
                '!text-red !border-red': inputError,
              },
              inputClassName
            )}
            placeholder={placeholder}
            readOnly={readOnly}
            onClick={onClick}
            autoComplete="off"
            {...restProps}
          />
        )}
        {trailingIcon && (
          <div
            className={classNames(
              'absolute inset-y-0 flex items-center right-[15px]',
              trailingIconClassName
            )}
          >
            {trailingIcon}
          </div>
        )}
      </div>
      {inputError && <InputError>{inputError}</InputError>}
    </div>
  )
}

export default Input
