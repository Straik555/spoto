import React, { FC } from 'react'
import { Loader } from '@components/Loader'
import { PersonTabs } from '@screens/admin/Users/Users.model'
import { Tab, TabPanel, TabsContainer, TabsHeader } from '@components/Tabs'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import cn from 'classnames'
import { PageHeaderMobile } from '@components/PageHeader'
import UserAvatar from '@screens/admin/Users/components/UserAvatar/UserAvatar'
import { PersonsDetailsRouteParams } from '@screens/admin/Users/PersonsDetails/PersonsDetails.model'
import usePersonsDetails from '@screens/admin/Users/PersonsDetails/usePersonsDetails'
import { TabGroups } from '@screens/admin/Users/PersonsDetails/TabGroups'
import TabAccessRights from '@screens/admin/Users/PersonsDetails/TabAccessRights/TabAccessRights'
import UsersAction from '@screens/admin/Users/components/UsersAction'
import DefaultUserIcon from '@assets/icons/default-user.svg'

const PersonsDetailsMobile: FC<PersonsDetailsRouteParams> = ({ userId }) => {
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
      <Loader loading={isFetchingGetUser} className="mx-auto">
        <PageHeaderMobile
          title={userInfo?.name}
          titleClassName="w-full max-w-[250px] overflow-ellipsis overflow-hidden whitespace-nowrap"
          showBackButton
          noCap
        />
        <TabsContainer value={activeTab} type="header" onChange={setActiveTab}>
          <TabsHeader>
            <Tab
              value={PersonTabs.Main}
              className={cn('pb-[5px] w-[125px]')}
              selectClassName={cn('!pb-[8px]')}
            >
              Main
            </Tab>
            <Tab
              value={PersonTabs.Groups}
              className={cn('pb-[5px] w-[125px]')}
              selectClassName={cn('!pb-[8px]')}
            >
              Groups
            </Tab>
            <Tab
              value={PersonTabs.Access}
              className={cn('pb-[5px] w-[125px]')}
              selectClassName={cn('!pb-[8px]')}
            >
              Access Rights
            </Tab>
          </TabsHeader>
          <TabPanel value={PersonTabs.Main}>
            <div className="relative flex flex-col justify-between h-full pb-[16px]">
              <div className="flex items-center w-full p-[16px]">
                <UserAvatar
                  className="!w-[75px] !h-[75px]"
                  thumbKey={userInfo?.avatarUrl}
                  defaultAvatar={
                    <DefaultUserIcon className="!w-[75px] !h-[75px]" />
                  }
                />
                <p className="m-0 font-semibold text-black text-s-xl ml-[35px]">
                  {userInfo?.name}
                </p>
              </div>
              <UsersAction
                classNameWrapper="!p-[16px_16px_0] flex-col"
                deleteMessage="Delete User"
                onDelete={() => setDeleteUserVisible(true)}
              />
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

export default PersonsDetailsMobile
