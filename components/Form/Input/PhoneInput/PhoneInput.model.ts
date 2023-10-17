import { InputProps } from '@components/Form/Input/Input.model'
import React from 'react'
import {
  CountryData,
  PhoneInputProps as ReactPhoneInputProps,
} from 'react-phone-input-2'

import { AUSTRALIAN_COUNTRY_CODE } from './constants'

export type PhoneInputProps<T = Record<string, string>> = {
  wrapperClassName?: string
  inputContainerClassName?: string
} & InputProps<T>

export type UsePhoneInputProps = Pick<
  PhoneInputProps,
  'name' | 'hideFieldError'
>

export type PhoneInputState = {
  fieldValue: string
  inputError: string
  inputRef: React.RefObject<HTMLInputElement>
  isAustralia: boolean
  masks: { [AUSTRALIAN_COUNTRY_CODE]: string }
}
export type PhoneInputActions = {
  checkIfValid: ReactPhoneInputProps['isValid']
  handleBlur: () => void
  handleChange: (value: string, country: CountryData) => void
}

export type UsePhoneInput = (
  props: PhoneInputProps
) => [PhoneInputState, PhoneInputActions]
