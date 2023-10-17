import React from 'react'

import { LayoutDesktop, LayoutMobile } from '@components/Layout'

import ChangePasswordDesktop from './ChangePasswordDesktop'
import ChangePasswordMobile from './ChangePasswordMobile'

const ChangePassword: React.FC = () => (
  <>
    <LayoutDesktop>
      <ChangePasswordDesktop />
    </LayoutDesktop>
    <LayoutMobile>
      <ChangePasswordMobile />
    </LayoutMobile>
  </>
)

export default ChangePassword
