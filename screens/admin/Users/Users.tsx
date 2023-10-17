import { routeParamToTypeMapping } from '@screens/admin/Users/constants'
import { UsersProps } from '@screens/admin/Users/Users.model'
import React, { FC, useEffect } from 'react'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'
import UserMobile from '@screens/admin/Users/UserMobile'
import UserDesktop from '@screens/admin/Users/UserDesktop'
import useUser from '@screens/admin/Users/useUser'

const Users: FC<UsersProps> = ({ type }) => {
  const { userType, setUserType } = useUser()

  useEffect(() => {
    if (!type) return

    if (userType === routeParamToTypeMapping[type]) return

    setUserType(routeParamToTypeMapping[type])
  }, [type])
  return (
    <>
      <LayoutDesktop>
        <UserDesktop />
      </LayoutDesktop>
      <LayoutMobile>
        <UserMobile />
      </LayoutMobile>
    </>
  )
}

export default Users
