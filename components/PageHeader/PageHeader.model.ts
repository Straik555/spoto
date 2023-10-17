import { ROUTES, Url } from '@constants/routes'
import { TAuthorizedViewGuardProps } from '@screens/auth/components/AccessGuard/AccessGuard.model'
import { ReactNode } from 'react'

export enum PageHeaderView {
  default = 'default',
  white = 'white',
}

export type PageHeaderProps = {
  backButtonLink?: Url
  showBackButton?: boolean
  view?: PageHeaderView
  title?: string | JSX.Element
  titleClassName?: string
  rightContent?: JSX.Element | null
  // routeBack - we keep in localStorage, use if we can get access to component from different spots
  routeBack?: string
  className?: string
  noCap?: boolean
}

export type PageHeaderItemType = {
  title: string
  icon: ReactNode
  pageRoute: ROUTES
} & Pick<TAuthorizedViewGuardProps, 'allowedRole' | 'forbiddenRole'>
