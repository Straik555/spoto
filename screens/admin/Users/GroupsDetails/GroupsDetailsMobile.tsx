import React, { FC } from 'react'
import { Loader } from '@components/Loader'
import { PersonTabs } from '@screens/admin/Users/Users.model'
import { Tab, TabPanel, TabsContainer, TabsHeader } from '@components/Tabs'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import cn from 'classnames'
import { Button } from '@components/index'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import Image from '@components/Image/Image'
import { changeNameGroupValidationSchema } from '@screens/admin/Users/validations'
import Input from '@components/Form/Input/Input'
import Form from '@components/Form/Form'
import { PageHeaderMobile } from '@components/PageHeader'
import { GroupsDetailsRouteParams } from '@screens/admin/Users/GroupsDetails/GroupsDetails.model'
import UserAvatar from '@screens/admin/Users/components/UserAvatar/UserAvatar'
import useGroupsDetails from '@screens/admin/Users/GroupsDetails/useGroupsDetails'
import GroupSpotsIcon from '@assets/icons/group-spot.svg'
import TabsGroups from '@screens/admin/Users/GroupsDetails/TabGroups/TabsGroups'
import TabAccessRights from '@screens/admin/Users/GroupsDetails/TabAccessRights/TabAccessRights'
import UsersAction from '@screens/admin/Users/components/UsersAction'

const GroupsDetailsMobile: FC<GroupsDetailsRouteParams> = ({ groupId }) => {
  const {
    isLoadingGroup,
    userInfo,
    deleteGroup,
    deleteUserVisible,
    setDeleteUserVisible,
    isFetchingGetGroup,
    groupName,
    changeGroupName,
    handleClick,
    handleChange,
    upload,
    hiddenFileInput,
    activeTab,
    setActiveTab,
    file,
    onEditGroup,
  } = useGroupsDetails(groupId)

  return (
    <>
      <Loader loading={isFetchingGetGroup} className="mx-auto">
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
              value={PersonTabs.Users}
              className={cn('pb-[5px] w-[125px]')}
              selectClassName={cn('!pb-[8px]')}
            >
              Users
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
            <Loader loading={isFetchingGetGroup} className="mx-auto">
              <div className="relative flex flex-col justify-between h-full pb-[16px]">
                <div className="flex flex-col items-center w-full px-[16px] pt-[16px]">
                  <div className="relative">
                    <UserAvatar
                      className="!w-[150px] !h-[150px] my-[16px]"
                      thumbKey={upload ? '' : userInfo?.avatarUrl}
                      defaultAvatar={
                        upload ? (
                          <Image
                            src={upload}
                            className="rounded-full !w-[150px] !h-[150px]"
                          />
                        ) : (
                          <GroupSpotsIcon className="!w-[150px] !h-[150px]" />
                        )
                      }
                    />
                    <form encType="multipart/form-data">
                      <Button
                        onClick={handleClick}
                        mode={ButtonMode.FULL_SECONDARY}
                        type="button"
                        icon={ButtonIcon.EDIT}
                        iconClassName="!m-0"
                        className="absolute flex bg-white !items-center !justify-center shadow-[4px_4px_12px_rgba(211,211,248,0.59)] !p-0 rounded-[100px] !h-[50px] !w-[50px] bottom-[4px] right-[4px]"
                      />
                      <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={handleChange}
                        className="hidden"
                      />
                    </form>
                  </div>
                  <Form
                    initialValues={{ groupName: userInfo?.name }}
                    className="w-full !w-full"
                    validationSchema={changeNameGroupValidationSchema}
                  >
                    {(form) => (
                      <Input
                        name="groupName"
                        value={groupName}
                        onChange={(e) => {
                          changeGroupName(e.target.value)
                          form.setFieldValue('groupName', e.target.value)
                        }}
                        containerClassName="w-full"
                        inputClassName={cn(
                          'text-s-lg placeholder:text-s-lg placeholder:!capitalize'
                        )}
                        label="Group name"
                        className="!mt-0"
                        placeholder="Group name"
                        labelClassName="!mb-[10px] !capitalize"
                      />
                    )}
                  </Form>
                </div>
                <UsersAction
                  classNameWrapper="!p-[16px_16px_0] flex-col"
                  deleteMessage="Delete Group"
                  onDelete={() => setDeleteUserVisible(true)}
                  onSave={() => onEditGroup(file)}
                  isButtonSaveVisible
                />
              </div>
            </Loader>
          </TabPanel>
          <TabPanel value={PersonTabs.Users}>
            <TabsGroups
              onTab={() => setActiveTab(PersonTabs.Main)}
              groupId={groupId}
              onDelete={() => setDeleteUserVisible(true)}
            />
          </TabPanel>
          <TabPanel value={PersonTabs.Access}>
            <TabAccessRights
              groupId={groupId}
              user={userInfo}
              onDelete={() => setDeleteUserVisible(true)}
            />
          </TabPanel>
        </TabsContainer>
      </Loader>

      <DeleteDialog
        open={deleteUserVisible}
        message="Delete this group?"
        onClose={() => setDeleteUserVisible(false)}
        onSubmit={() => deleteGroup(Number(groupId))}
        disabled={isLoadingGroup}
      />
    </>
  )
}

export default GroupsDetailsMobile
