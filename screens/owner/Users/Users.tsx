import React, { FC } from 'react'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'
import UsersMobile from '@screens/owner/Users/UsersMobile'
import UsersDesktop from '@screens/owner/Users/UsersDesktop'

const Users: FC = () => {
  return (
    <>
      <LayoutDesktop>
        <UsersDesktop />
      </LayoutDesktop>
      <LayoutMobile>
        <UsersMobile />
      </LayoutMobile>
    </>
  )
}

export default Users
