import React from 'react'

import { LayoutDesktop, LayoutMobile } from '@components/Layout'

import ManageAccessDesktop from './ManageAccessDesktop'
import ManageAccessMobile from './ManageAccessMobile'

const ManageAccess: React.FC = () => (
  <>
    <LayoutDesktop>
      <ManageAccessDesktop />
    </LayoutDesktop>
    <LayoutMobile>
      <ManageAccessMobile />
    </LayoutMobile>
  </>
)

export default ManageAccess
