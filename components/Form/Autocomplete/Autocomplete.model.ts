import { FC } from 'react'

import { InputProps } from '@components/Form/Input/Input.model'
import { StaticActiveSetFocusFn } from '@hooks/useDetectClickOutside/useDetectClickOutside.model'

export type AutoCompleteFn = FC<AutocompleteProps> & StaticActiveSetFocusFn

export type CheckboxAutocompleteProps<T = any> = {
  data: T[]
  onSearch: (item: T, searchValue: string) => boolean
  savedItemsFieldName: string
  checkedItemsFieldName: string
  comparator: (a: T, b: T) => boolean
  hasSaveBtn?: boolean
  getAutocompleteItemProps?: (item: T) => AutocompleteItemProps
} & AutocompleteProps

export type AutocompleteProps = {
  wrapperClassName?: string
  dataAlwaysVisible?: boolean
  isFocused?: boolean
  onClose?: () => void
} & Omit<AutocompleteContextValue, 'errorVisible'> &
  Omit<InputProps, 'type'>

export type AutocompleteDataProps = {
  className?: string
  hidden?: boolean
} & Omit<JSX.IntrinsicElements['div'], 'onSelect'>

export type AutocompleteItemProps = {
  onSelect?: JSX.IntrinsicElements['div']['onClick']
  className?: string
  noHover?: boolean
  label?: string
} & Pick<InputProps, 'trailingIcon'> &
  Omit<JSX.IntrinsicElements['div'], 'onSelect'>

export type AutocompleteContextValue = {
  loading?: boolean
  errorVisible?: boolean
}

export type AutocompleteNoDataProps = {
  hidden?: boolean
  className?: string
}
