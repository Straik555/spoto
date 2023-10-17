import { FormEvent, HTMLAttributes } from 'react'

export enum ButtonMode {
  xSMALL = 'xsmall',
  SMALL = 'small',
  SMALL_SECONDARY = 'small_secondary',
  FULL_PRIMARY = 'full_primary',
  FULL_SECONDARY = 'full_secondary',
  BASE = 'base',
  Dashed = 'dashed',
}

export enum ButtonIcon {
  ADD = 'add',
  ADD_WHITE = 'add_white',
  EDIT = 'edit',
  EDIT_WHITE = 'edit_white',
  DELETE = 'delete',
  DELETE_OUTLINED = 'delete_outlined',
  DELETE_OUTLINED_BIG = 'delete_outlined_big',
  QR_PRINT = 'qr_print',
  NO_ICON = 'no_icon',
  LOG_IN = 'log_in',
}

export type ButtonProps = {
  mode?: ButtonMode
  disabled?: boolean
  onClick?:
    | (() => void)
    | ((e?: FormEvent<HTMLFormElement> | undefined) => void)
    | HTMLAttributes<HTMLButtonElement>['onClick']
  type?: 'button' | 'submit' | undefined
  className?: string
  iconClassName?: string
  icon?: ButtonIcon
}

export interface AddButtonProps {
  onClick: (e?) => void
  title?: string
}
