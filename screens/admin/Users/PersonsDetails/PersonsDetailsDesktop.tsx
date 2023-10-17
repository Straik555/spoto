import React, { FC } from 'react'
import { Loader } from '@components/Loader'
import { PageContent } from '@components/Layout/PageContent'
import { PersonTabs } from '@screens/admin/Users/Users.model'
import { TabPanel, TabsContainer } from '@components/Tabs'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import usePersonsDetails from '@screens/admin/Users/PersonsDetails/usePersonsDetails'
import UsersAction from '@screens/admin/Users/components/UsersAction'
import { PersonsDetailsRouteParams } from '@screens/admin/Users/PersonsDetails/PersonsDetails.model'
import UserAvatar from '@screens/admin/Users/components/UserAvatar/UserAvatar'
import { TabGroups } from '@screens/admin/Users/PersonsDetails/TabGroups'
import TabAccessRights from '@screens/admin/Users/PersonsDetails/TabAccessRights/TabAccessRights'
import DefaultUserIcon from '@assets/icons/default-user.svg'

const PersonsDetailsDesktop: FC<PersonsDetailsRouteParams> = ({ userId }) => {
  const {
    isFetchingGetUser,
    isLoadingUser,
    userInfo,
    deleteUser,
    deleteUserVisible,
    setDeleteUserVisible,
    setActiveTab,
    activeTab,
  } = usePersonsDetails(userId)

  return (
    <>
      <Loader loading={isFetchingGetUser || isLoadingUser} className="mx-auto">
        <PageContent
          title={String(userInfo?.name)}
          actions={
            <div className="mb-[18px] mt-[18px]">
              <UsersAction
                classNameButtonDelete="!w-[148px]"
                deleteMessage="Delete User"
                onDelete={() => setDeleteUserVisible(true)}
              />
            </div>
          }
          noCap
          activeTab={activeTab}
          tabs={[PersonTabs.Main, PersonTabs.Groups, PersonTabs.Access]}
          setActiveTab={setActiveTab}
        >
          <TabsContainer value={activeTab} type="header">
            <TabPanel value={PersonTabs.Main}>
              <div className="relative flex flex-col justify-between h-full">
                <div className="flex items-center w-full">
                  <UserAvatar
                    className="!w-[100px] !h-[100px]"
                    thumbKey={userInfo?.avatarUrl}
                    defaultAvatar={
                      <DefaultUserIcon className="!w-[100px] !h-[100px]" />
                    }
                  />
                  <p className="m-0 font-semibold text-black text-s-xl ml-[35px]">
                    {userInfo?.name}
                  </p>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={PersonTabs.Groups}>
              <TabGroups
                onTab={() => setActiveTab(PersonTabs.Main)}
                userId={userId}
                onDelete={() => setDeleteUserVisible(true)}
              />
            </TabPanel>
            <TabPanel value={PersonTabs.Access}>
              <TabAccessRights
                user={userInfo}
                userId={userId}
                onDelete={() => setDeleteUserVisible(true)}
              />
            </TabPanel>
          </TabsContainer>
        </PageContent>
      </Loader>

      <DeleteDialog
        open={deleteUserVisible}
        message="'Delete this user?"
        onClose={() => setDeleteUserVisible(false)}
        onSubmit={() => deleteUser(userId)}
        disabled={isLoadingUser}
      />
    </>
  )
}

export default PersonsDetailsDesktop
