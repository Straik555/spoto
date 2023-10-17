import React from 'react'
import DashBoardDesktop from '@screens/admin/Dashboard/DashBoardDesktop'
import DashBoardMobile from '@screens/admin/Dashboard/DashBoardMobile'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'

const DashBoard: React.FC = () => {
  return (
    <>
      <LayoutDesktop>
        <DashBoardDesktop />
      </LayoutDesktop>
      <LayoutMobile>
        <DashBoardMobile />
      </LayoutMobile>
    </>
  )
}

export default DashBoard
