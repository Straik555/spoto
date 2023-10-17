import React from 'react'

import { Url } from '@constants/routes'

export type MenuItemProps = {
  active: boolean
  icon: React.ReactNode
  pageRoute?: Url
  onClick?: () => void
  title: string
}
