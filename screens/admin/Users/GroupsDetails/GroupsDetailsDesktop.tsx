import React, { FC } from 'react'
import { Loader } from '@components/Loader'
import { PageContent } from '@components/Layout/PageContent'
import UsersAction from '@screens/admin/Users/components/UsersAction'
import { PersonTabs } from '@screens/admin/Users/Users.model'
import { TabPanel, TabsContainer } from '@components/Tabs'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import useGroupsDetails from '@screens/admin/Users/GroupsDetails/useGroupsDetails'
import { GroupsDetailsRouteParams } from '@screens/admin/Users/GroupsDetails/GroupsDetails.model'
import UserAvatar from '@screens/admin/Users/components/UserAvatar/UserAvatar'
import Image from '@components/Image/Image'
import { Button } from '@components/index'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import Form from '@components/Form/Form'
import { changeNameGroupValidationSchema } from '@screens/admin/Users/validations'
import Input from '@components/Form/Input/Input'
import TabsGroups from '@screens/admin/Users/GroupsDetails/TabGroups/TabsGroups'
import TabAccessRights from '@screens/admin/Users/GroupsDetails/TabAccessRights/TabAccessRights'
import GroupSpotsIcon from '@assets/icons/group-spot.svg'

const GroupsDetailsDesktop: FC<GroupsDetailsRouteParams> = ({ groupId }) => {
  const {
    isLoadingGroup,
    userInfo,
    deleteGroup,
    deleteUserVisible,
    setDeleteUserVisible,
    isFetchingGetGroup,
    onEditGroup,
    file,
    setActiveTab,
    activeTab,
    groupName,
    changeGroupName,
    upload,
    handleChange,
    handleClick,
    hiddenFileInput,
    isFetchingEditGroups,
  } = useGroupsDetails(groupId)
  return (
    <>
      {userInfo && (
        <Loader
          loading={isFetchingGetGroup || isFetchingEditGroups}
          className="mx-auto"
        >
          <PageContent
            title={String(userInfo?.name)}
            actions={
              <div className="mb-[18px] mt-[18px]">
                <UsersAction
                  classNameButtonDelete="!w-[160px]"
                  deleteMessage="Delete Group"
                  onDelete={() => setDeleteUserVisible(true)}
                  onSave={() => onEditGroup(file)}
                  isButtonSaveVisible={activeTab === PersonTabs.Main}
                />
              </div>
            }
            noCap
            activeTab={activeTab}
            tabs={[PersonTabs.Main, PersonTabs.Users, PersonTabs.Access]}
            setActiveTab={setActiveTab}
          >
            <TabsContainer value={activeTab} type="header">
              <TabPanel value={PersonTabs.Main}>
                <Loader loading={isFetchingGetGroup} className="mx-auto">
                  <div className="relative flex flex-col justify-between h-full">
                    <div className="flex items-center w-full">
                      <div className="relative">
                        <UserAvatar
                          className="!w-[200px] !h-[200px]"
                          thumbKey={upload ? '' : userInfo?.avatarUrl}
                          defaultAvatar={
                            upload ? (
                              <Image
                                src={upload}
                                className="rounded-full !w-[200px] !h-[200px]"
                              />
                            ) : (
                              <GroupSpotsIcon className="w-[200px] h-[200px]" />
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
                        className="w-full !max-w-[520px] ml-[55px]"
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
                            inputClassName="placeholder:text-s-lg"
                            label="Group name"
                            className="!mt-0"
                            placeholder="Group name"
                            labelClassName="!mb-[10px] !capitalize"
                          />
                        )}
                      </Form>
                    </div>
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
          </PageContent>
        </Loader>
      )}

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

export default GroupsDetailsDesktop
