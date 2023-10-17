import React from 'react'

import { LayoutDesktop, LayoutMobile } from '@components/Layout'

import RegisterMobile from './RegisterMobile'

const Register: React.FC = () => (
  <>
    <LayoutDesktop>
      <RegisterMobile />
    </LayoutDesktop>
    <LayoutMobile>
      <RegisterMobile />
    </LayoutMobile>
  </>
)

export default Register
