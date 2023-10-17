import { ReactNode } from 'react'

export type UserWrapperProps = {
  children: ReactNode
  search: string
  className?: string
  onChange: (e: string) => void
  buttonContent?: ReactNode
}
