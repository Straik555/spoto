import { ReactElement } from 'react'
import { UserRole } from '@constants/types'

export type TAuthorizedViewGuardProps = {
  children: ReactElement
  allowedRole: UserRole | UserRole[] | null
  forbiddenRole?: UserRole | UserRole[]
  callback?: () => void
}
