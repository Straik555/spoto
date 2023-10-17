import { InputProps } from '@components/Form/Input/Input.model'
import cn from 'classnames'
import React, { FC, PropsWithChildren } from 'react'
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import Input from '../Input'
import { AUSTRALIAN_COUNTRY_CODE } from './constants'
import { PhoneInputProps } from './PhoneInput.model'
import s from './PhoneInput.module.css'
import usePhoneInput from './usePhoneInput'

const PhoneInput = <T,>(
  props: PropsWithChildren<PhoneInputProps<T>>
): ReturnType<FC<InputProps<T>>> => {
  const {
    containerClassName,
    disabled,
    inputClassName,
    label,
    labelClassName,
    wrapperClassName,
    name,
    hideFieldError,
    trailingIcon,
    trailingIconClassName,
    inputContainerClassName,
  } = props

  const [state, actions] = usePhoneInput({ hideFieldError, name })
  const { fieldValue, inputError, inputRef, isAustralia, masks } = state
  const { checkIfValid, handleBlur, handleChange } = actions

  return (
    <Input<T>
      label={label}
      labelClassName={labelClassName}
      className={wrapperClassName}
      containerClassName={cn(inputContainerClassName, 'phone_input_container')}
      name={name}
      hideFieldError={hideFieldError}
      trailingIcon={trailingIcon}
      trailingIconClassName={trailingIconClassName}
      customInput={
        <ReactPhoneInput
          isValid={checkIfValid}
          dropdownClass="font-poppins"
          inputProps={{ name, ref: inputRef }}
          disabled={disabled}
          key={masks?.[AUSTRALIAN_COUNTRY_CODE]}
          masks={masks}
          countryCodeEditable={false}
          preferredCountries={[AUSTRALIAN_COUNTRY_CODE]}
          placeholder="000000000"
          inputClass={cn(
            'font-normal border !h-full !pl-[10px] focus:text-primary !text-s-lg !ml-[95px] !w-[calc(100%-95px)] font-poppins',
            {
              '!opacity-30 !text-blue-3': disabled,
              '!text-red !border-red': inputError,
              '!border-blue-2 focus:!border-primary text-blue-1': !inputError,
            },
            inputClassName
          )}
          containerClass={cn('h-[44px]', containerClassName, {
            [s.phoneInputContainerAustralia]: isAustralia,
            [s.phoneInputContainer]: !isAustralia,
          })}
          buttonClass={cn('border !border-blue-2 !rounded-[3px] w-[87px]', {
            '!bg-white': !disabled,
            '!bg-white !opacity-30': disabled,
          })}
          value={fieldValue}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      }
    />
  )
}

export default PhoneInput
