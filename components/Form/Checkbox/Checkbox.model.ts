import { ReactElement } from 'react'

export type CheckboxGroupProps<T = Record<string, string>> = {
  className?: string
  inputLabelClassName?: string
  radiosClassname?: string
  onChange?: (value: string[]) => void
  hideFieldError?: boolean
} & Pick<CheckboxInputProps, 'label'> &
  Pick<CheckboxGroupContextValue<T>, 'name'>

export type CheckboxInputProps<T = Record<string, string>> = {
  name?: keyof T
  onChange?: (value: boolean) => void
} & Omit<CheckboxInputComponentProps<T>, 'checked' | 'name'>

export type CheckboxInputComponentProps<T = Record<string, string>> = {
  name: keyof T
  value: any
  checked: boolean
  label?: string
  renderCheckbox?: (options: { checked: boolean }) => ReactElement
  onChange?: (value: boolean) => void
  className?: string
  labelClassName?: string
  checkByDefault?: boolean
  size?: 'small' | 'large'
}

export type CheckboxGroupContextValue<T = Record<string, string>> = {
  name: keyof T
  setValue?: (value: any, checked: boolean) => void
}
