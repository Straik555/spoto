import { FieldConfig } from 'formik'
import { ReactElement, RefObject } from 'react'

export enum InputTypes {
  EMAIL = 'email',
  TEXT = 'text',
  PASSWORD = 'password',
  NUMBER = 'number',
}

export type TextInputProps<T = Record<string, string>> = {
  outerOnChange?: InputProps['onChange']
  outerOnBlur?: InputProps['onBlur']
} & InputProps<T>

export type InputForNumberProps<T = Record<string, string>> = {
  onValueChange?: (value: string) => void
} & InputProps<T>

export type InputProps<T = Record<string, string>> = {
  disabled?: boolean
  label?: string
  placeholder?: string
  trailingIcon?: ReactElement | boolean
  inputRef?: RefObject<HTMLInputElement>
  value?: string
  className?: string
  containerClassName?: string
  trailingIconClassName?: string
  inputClassName?: string
  labelClassName?: string
  prefixIcon?: ReactElement
  type?: InputTypes
  trim?: boolean
  name: keyof T
  hideFieldError?: boolean
  customInput?: ReactElement | undefined
  formatter?: string
  suffix?: string
} & Omit<FieldConfig<string>, 'value' | 'name'> &
  JSX.IntrinsicElements['input']

export type PasswordInputProps<T = Record<string, string>> = Omit<
  InputProps<T>,
  'type' | 'trailingIcon' | 'inputRef'
>

export type TextareaProps<T = Record<string, string>> = {
  rows?: number
  max?: number
} & Pick<
  InputProps<T>,
  | 'disabled'
  | 'label'
  | 'placeholder'
  | 'value'
  | 'className'
  | 'containerClassName'
  | 'inputClassName'
  | 'labelClassName'
  | 'name'
  | 'hideFieldError'
> &
  Omit<FieldConfig<string>, 'value'> &
  JSX.IntrinsicElements['textarea']
