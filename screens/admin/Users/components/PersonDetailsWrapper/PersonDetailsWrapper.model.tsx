import { ReactNode } from 'react'

export type PersonDetailsWrapperProps = {
  deleteButton: ReactNode
  addButton: ReactNode
  children: ReactNode
  className?: string
}
