import { ReactNode } from 'react'

export type PersonWrapperProps = {
  children: ReactNode
  buttonContent: ReactNode
  search: string
  className?: string
  onChangeSearch: (n: string) => void
}
