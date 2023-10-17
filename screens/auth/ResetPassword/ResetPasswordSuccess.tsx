import React from 'react'

import { LayoutDesktop, LayoutMobile } from '@components/Layout'

import ResetPasswordSuccessMobile from './ResetPasswordSuccessMobile'

const Register: React.FC = () => (
  <>
    <LayoutDesktop>
      <ResetPasswordSuccessMobile />
    </LayoutDesktop>
    <LayoutMobile>
      <ResetPasswordSuccessMobile />
    </LayoutMobile>
  </>
)

export default Register
