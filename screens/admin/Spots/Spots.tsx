import React from 'react'
import SpotsDesktop from '@screens/admin/Spots/SpotsDesktop'
import SpotsMobile from '@screens/admin/Spots/SpotsMobile'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'

const Spots: React.FC = () => {
  return (
    <>
      <LayoutDesktop>
        <SpotsDesktop />
      </LayoutDesktop>
      <LayoutMobile>
        <SpotsMobile />
      </LayoutMobile>
    </>
  )
}

export default Spots
