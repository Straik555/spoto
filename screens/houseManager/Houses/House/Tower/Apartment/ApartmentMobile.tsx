import React, { useState } from 'react'
import { PageHeaderMobile } from '@components/PageHeader'
import UserAvatar from '@screens/admin/Users/components/UserAvatar/UserAvatar'
import CloseIcon from '@assets/icons/close-14.svg'
import DefaultUserIcon from '@assets/icons/default-user.svg'
import { Loader } from '@components/Loader'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import { houseApi } from '@api/house'
import { inviteApi } from '@api/invite'
import { ROUTES } from '@constants/routes'
import { dateFormats } from '@constants/global'
import { useDateUtil } from '@hooks/useDateUtil'

import InviteResidentModal from './InviteResidentModal/InviteResidentModal'
import { Tab, TabsContainer, TabsHeader, TabPanel } from '@components/Tabs'
import { TabsValues } from '@components/Tabs/Tabs.model'

const ApartmentMobile: React.FC<{
  houseId: string
  towerId: string
  apartmentId: string
}> = ({ houseId, towerId, apartmentId }) => {
  const [tab, setTab] = useState<TabsValues>(TabsValues['tab-1'])
  const [deleteUserVisible, setDeleteUserVisible] = useState(false)
  const [inviteIdToDelete, setInviteIdToDelete] = useState('')
  const isUser = tab === TabsValues['tab-1']
  const dateUtil = useDateUtil()

  const { data: apartment, isLoading: isLoadingApartment } =
    houseApi.endpoints.getApartmentsById.useQuery(+apartmentId, {
      skip: !apartmentId,
    })

  const [deleteUserInvitationById] =
    inviteApi.endpoints.deleteInvitationById.useMutation()

  const userCard = (item, index) => {
    return (
      <div
        key={isUser ? item.inviteId : index}
        className="mb-[8px] border cursor-pointer border-blue-3 rounded-[5px] grid grid-cols-1"
      >
        <div className="col-span-1">
          <div className="flex items-center justify-between p-[10px] px-[16px] relative">
            <div className="relative flex items-center">
              <UserAvatar
                thumbKey={item.avatar}
                defaultAvatar={<DefaultUserIcon className="w-[35px] h-[35px]" />}
                className="!w-[35px] h-[35px]"
              />
              <p className="m-0 text-black font-s-base ml-[15px]">
                <div
                  className={`font-semibold w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap ${
                    !item.isAccepted && isUser ? 'text-blue-1' : 'text-black'
                  }`}
                >
                  {item.userName}
                </div>
              </p>
            </div>
            {tab === TabsValues['tab-1'] && (
              <div
                className="absolute top-[10px] right-[10px]"
                aria-label="delete user"
                onClick={() => {
                  setDeleteUserVisible(true)
                  setInviteIdToDelete(item.inviteId)
                }}
              >
                <CloseIcon className="fill-blue-3" />
              </div>
            )}
          </div>
          {tab === TabsValues['tab-2'] && (
            <div className="flex justify-between px-[16px] py-[10px] border-t">
              <div className="w-1/2">
                <div className="text-s-xs text-blue-1 mb-[3px]">
                  Active From
                </div>
                <div className="text-s-sm font-semibold">
                  {dateUtil(item.from).format(dateFormats.display0)}
                </div>
              </div>
              <div className="w-1/2">
                <div className="text-s-xs text-blue-1 mb-[3px]">Active To</div>
                <div className="text-s-sm font-semibold">
                  {dateUtil(item.to).format(dateFormats.display0)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const displayNoUsers = () => (
    <div className="flex justify-center items-center w-full grow text-xl font-semibold text-blue-2">
      {`${isUser ? 'No Occupants' : 'No History'}`}
    </div>
  )

  const getUsersLayout = () => {
    return (
      <>
        {apartment && apartment.users && apartment.users[0]
          ? apartment.users.map((user, index) => userCard(user, index))
          : displayNoUsers()}
        <InviteResidentModal />
      </>
    )
  }

  const getHistoryLayout = () => {
    return (
      <>
        {apartment && apartment.histories && apartment.histories[0]
          ? apartment.histories.map((history, index) =>
              userCard(history, index)
            )
          : displayNoUsers()}
      </>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeaderMobile
        title={apartment?.name}
        showBackButton
        backButtonLink={{
          pathname: ROUTES.HOUSEMANAGER_HOUSE_TOWER,
          query: {
            houseId,
            towerId,
          },
        }}
      />
      <Loader loading={isLoadingApartment}>
        <TabsContainer value={tab} type="header" onChange={setTab}>
          <TabsHeader>
            <Tab value={TabsValues['tab-1']}>Occupants</Tab>
            <Tab value={TabsValues['tab-2']}>History</Tab>
          </TabsHeader>
          <TabPanel value={TabsValues['tab-1']}>
            <div className="p-4 flex flex-col grow max-h-[calc(100vh-171px)] overflow-y-auto">
              {getUsersLayout()}
            </div>
          </TabPanel>
          <TabPanel value={TabsValues['tab-2']}>
            <div className="p-4 flex flex-col grow">{getHistoryLayout()}</div>
          </TabPanel>
        </TabsContainer>
      </Loader>
      <DeleteDialog
        open={deleteUserVisible}
        message="Delete this occupant?"
        onClose={() => {
          setDeleteUserVisible(false)
          setInviteIdToDelete('')
        }}
        onSubmit={() => {
          setDeleteUserVisible(false)
          if (inviteIdToDelete) deleteUserInvitationById(+inviteIdToDelete)
        }}
      />
    </div>
  )
}

export default React.memo(ApartmentMobile)
