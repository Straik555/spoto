import { ReactElement } from 'react'

export type RadioGroupProps = {
  className?: string
  radiosClassname?: string
  name: string
  onChange?: (value: unknown) => void
  noCap?: boolean
} & Omit<RadioInputProps, 'name' | 'as'>

export type RadioInputProps = Omit<RadioInputComponentProps, 'name'>

export type RadioInputComponentProps = {
  label?: string
  value?: unknown
  name: string
  renderRadio?: (options: { checked: boolean }) => ReactElement
  className?: string
  labelClassName?: string
} & Pick<JSX.IntrinsicElements['div'], 'onClick'>

export type RadioGroupContextValue = {
  name: string
  setValue?: (value: unknown, checked: boolean) => void
  handleChange: (value: unknown) => void
} & Pick<JSX.IntrinsicElements['input'], 'onChange'>

export type BorderRadioInputProps = {
  className?: string
} & RadioInputProps
