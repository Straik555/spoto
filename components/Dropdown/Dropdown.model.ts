import { ReactElement } from 'react'

export type DropdownProps = {
  action: ReactElement
}

export type DropdownButtonProps = {
  className?: string
}

export type DropdownItemsProps = {
  className?: string
}

export type DropdownItemProps = {
  activeClassName?: string
  className?: string
  onClick?: () => void
  disabled?: boolean
}
