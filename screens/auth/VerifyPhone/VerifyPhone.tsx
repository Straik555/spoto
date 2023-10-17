import React from 'react'

import { LayoutDesktop, LayoutMobile } from '@components/Layout'

import VerifyPhoneMobile from './VerifyPhoneMobile'

const Register: React.FC = () => (
  <>
    <LayoutDesktop>
      <VerifyPhoneMobile />
    </LayoutDesktop>
    <LayoutMobile>
      <VerifyPhoneMobile />
    </LayoutMobile>
  </>
)

export default Register
