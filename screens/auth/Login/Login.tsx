import React from 'react'

import { LayoutDesktop, LayoutMobile } from '@components/Layout'

import LoginMobile from './LoginMobile'

const Login: React.FC = () => (
  <>
    <LayoutDesktop>
      <LoginMobile />
    </LayoutDesktop>
    <LayoutMobile>
      <LoginMobile />
    </LayoutMobile>
  </>
)

export default Login
