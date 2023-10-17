import React from 'react'

import { LayoutDesktop, LayoutMobile } from '@components/Layout'

import ResetPasswordMobile from './ResetPasswordMobile'

const Register: React.FC = () => (
  <>
    <LayoutDesktop>
      <ResetPasswordMobile />
    </LayoutDesktop>
    <LayoutMobile>
      <ResetPasswordMobile />
    </LayoutMobile>
  </>
)

export default Register
