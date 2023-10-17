import React from 'react'
import SetsDesktop from '@screens/admin/Sets/SetsDesktop'
import SetsMobile from '@screens/admin/Sets/SetsMobile'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'

const Sets: React.FC = () => {
  return (
    <>
      <LayoutDesktop>
        <SetsDesktop />
      </LayoutDesktop>
      <LayoutMobile>
        <SetsMobile />
      </LayoutMobile>
    </>
  )
}

export default Sets
