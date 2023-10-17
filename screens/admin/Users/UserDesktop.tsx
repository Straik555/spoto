import { UserType } from '@screens/admin/Users/Users.model'
import Loader from '@components/Loader/Loader'
import { TabPanel, TabsContainer } from '@components/Tabs'
import Persons from '@screens/admin/Users/Persons'
import React from 'react'
import useUser from '@screens/admin/Users/useUser'
import { PageContent } from '@components/Layout/PageContent'
import Groups from '@screens/admin/Users/Groups'

const UserDesktop = () => {
  const { userType, selectUserType, isLoading } = useUser()
  return (
    <>
      <Loader loading={isLoading}>
        <PageContent
          title="Users & Groups"
          tabs={[UserType.USERS, UserType.USER_GROUPS]}
          setActiveTab={(group) => {
            selectUserType(group)
          }}
          activeTab={String(userType)}
        >
          <TabsContainer value={userType} type="header">
            <TabPanel value={UserType.USERS}>
              <Persons />
            </TabPanel>
            <TabPanel value={UserType.USER_GROUPS}>
              <Groups />
            </TabPanel>
          </TabsContainer>
        </PageContent>
      </Loader>
    </>
  )
}

export default UserDesktop
