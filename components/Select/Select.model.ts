import React from 'react'

export interface SelectProps {
  buttonClassName?: string
  value?: any
  title?: string
  label?: string | React.ReactElement | null
  className?: string
  titleClassName?: string
  selectClassName?: string
  optionClassName?: string
  placeholderClassName?: string
  onSelect: (s: any | null) => void
  placeholder?: string
  bordered?: boolean
  disabled?: boolean
}

export interface OptionProps {
  text?: string
  value?: string | number | null
  active: boolean
  className?: string
}

export enum SelectPlacement {
  TOP,
  BOTTOM,
}
