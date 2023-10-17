import React from 'react'

import { LayoutDesktop, LayoutMobile } from '@components/Layout'

import ForgotPasswordMobile from './ForgotPasswordMobile'

const ForgotPassword: React.FC = () => (
  <>
    <LayoutDesktop>
      <ForgotPasswordMobile />
    </LayoutDesktop>
    <LayoutMobile>
      <ForgotPasswordMobile />
    </LayoutMobile>
  </>
)

export default ForgotPassword
