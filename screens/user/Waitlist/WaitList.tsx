import React from 'react'
import WaitListMobile from '@screens/user/Waitlist/WaitListMobile'
import WaitListDesktop from '@screens/user/Waitlist/WaitListDesktop'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'

const WaitList: React.FC = () => {
  return (
    <>
      <LayoutDesktop>
        <WaitListDesktop />
      </LayoutDesktop>
      <LayoutMobile>
        <WaitListMobile />
      </LayoutMobile>
    </>
  )
}

export default WaitList
