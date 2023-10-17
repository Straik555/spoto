import { useFieldError } from '@components/Form/hooks'
import { TextareaProps } from '@components/Form/Input/Input.model'
import InputError from '@components/Form/InputError'
import InputLabel from '@components/Form/InputLabel'
import cn from 'classnames'
import { Field, useFormikContext } from 'formik'
import React, { FC, PropsWithChildren, useMemo } from 'react'

const Textarea = <T,>(
  props: PropsWithChildren<TextareaProps<T>>
): ReturnType<FC<TextareaProps<T>>> => {
  return <Field as={TextareaInput} {...props} />
}

const TextareaInput: FC<TextareaProps> = ({
  disabled,
  label,
  placeholder = '',
  onChange,
  onFocus,
  onBlur,
  value,
  name,
  className,
  readOnly,
  containerClassName,
  inputClassName,
  labelClassName,
  onClick,
  rows = 6,
  max,
  hideFieldError,
}) => {
  const formikCtx = useFormikContext()
  const formikFieldProps = formikCtx.getFieldProps(name)
  const fieldError = useFieldError(name)

  const inputError = useMemo(
    () => !hideFieldError && fieldError,
    [fieldError, hideFieldError]
  )

  return (
    <div className={cn('mt-[16px] desktop:mt-[25px]', className)}>
      {label && (
        <InputLabel className={cn(labelClassName, 'flex justify-between')}>
          <span>{label}</span>{' '}
          <span>
            {max && (
              <>
                <span className="font-semibold text-primary mr-[1px]">
                  {`${formikFieldProps.value?.length || 0}`}
                </span>
                /<span className="ml-[1px]">{`${max}`}</span>
              </>
            )}
          </span>
        </InputLabel>
      )}

      <div className={cn('relative rounded-md shadow-sm', containerClassName)}>
        <textarea
          rows={rows}
          disabled={disabled}
          value={value}
          onChange={(e) => {
            const newValue = e.target.value

            if (max && newValue.length > max) return

            onChange?.(e)
            formikFieldProps.onChange(e)
          }}
          onBlur={(e) => {
            onBlur?.(e)
            formikFieldProps.onBlur(e)
          }}
          onFocus={onFocus}
          name={name}
          className={cn(
            'block w-full focus:border-primary focus:text-primary border outline-none rounded-md border-blue-2 px-[15px] py-[10px] text-blue-1 text-sm placeholder:text-blue-3',
            {
              'border-blue-2 text-blue-1': !inputError,
              '!text-red !border-red': inputError,
            },
            inputClassName
          )}
          placeholder={placeholder}
          readOnly={readOnly}
          onClick={(e) => {
            e.stopPropagation()
            onClick?.(e)
          }}
        />
      </div>
      {fieldError && <InputError>{fieldError}</InputError>}
    </div>
  )
}

export default Textarea
