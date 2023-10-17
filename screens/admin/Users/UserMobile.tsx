import { PageHeaderMobile } from '@components/PageHeader'
import { UserType } from '@screens/admin/Users/Users.model'
import Loader from '@components/Loader/Loader'
import { Tab, TabPanel, TabsContainer, TabsHeader } from '@components/Tabs'
import Persons from '@screens/admin/Users/Persons'
import React from 'react'
import useUser from '@screens/admin/Users/useUser'
import Groups from '@screens/admin/Users/Groups'

const UserMobile = () => {
  const { userType, selectUserType, isLoading } = useUser()
  return (
    <>
      <PageHeaderMobile title="Users & Groups" />

      <Loader loading={isLoading}>
        <TabsContainer
          value={userType}
          type="header"
          onChange={(group) => {
            selectUserType(group)
          }}
        >
          <TabsHeader>
            <Tab value={UserType.USERS}>Users</Tab>
            <Tab value={UserType.USER_GROUPS}>User Groups</Tab>
          </TabsHeader>
          <TabPanel value={UserType.USERS}>
            <Persons />
          </TabPanel>
          <TabPanel value={UserType.USER_GROUPS}>
            <Groups />
          </TabPanel>
        </TabsContainer>
      </Loader>
    </>
  )
}

export default UserMobile
