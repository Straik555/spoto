import React from 'react'
import { useRouter } from 'next/router'
import EditModeSpots from '@screens/admin/Sets/Set/EditModeSpots/EditModeSpots'
import { SetProps } from '@screens/admin/Sets/Set/Set.model'
import Button from '@components/Button/Button'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import { Loader } from '@components/Loader'
import { PageHeaderMobile } from '@components/PageHeader'
import { ROUTES } from '@constants/routes'
import { TabsContainer, TabsHeader, TabPanel, Tab } from '@components/Tabs'
import { SetTabs } from '@screens/admin/Sets/Set/Set.model'
import cn from 'classnames'
import MainContent from '@screens/admin/Sets/Set/MainContent'
import ScrollbarContainer from '@components/ScrollbarContainer/ScrollbarContainer'
import UsersGroups from '@screens/Spot/AddSpot/UsersGroups'
import useSetHook from '@screens/admin/Sets/Set/hooks'

const SetMobile: React.FC<SetProps> = ({ setId }) => {
  const router = useRouter()
  const {
    dataSet,
    isLoadingSet,
    activeTab,
    setActiveTab,
    deleteModalOpen,
    setDeleteModalOpen,
    removeSet,
  } = useSetHook({ setId })

  return (
    <>
      <div className="flex flex-col h-full">
        <PageHeaderMobile
          title={`${(dataSet && dataSet.name) ?? ''}`}
          backButtonLink={{ pathname: ROUTES.ADMIN_SETS }}
          showBackButton
        />
        <ScrollbarContainer
          className={cn(
            'w-full flex flex-col overflow-y-auto h-[calc(100%-72px)]'
          )}
        >
          <Loader loading={isLoadingSet}>
            <TabsContainer
              value={activeTab}
              type="header"
              onChange={setActiveTab}
            >
              <TabsHeader className="shadow-4">
                <Tab className="basis-1/3" value={SetTabs.Main}>
                  {SetTabs.Main}
                </Tab>
                <Tab className="basis-1/3" value={SetTabs.Spots}>
                  {SetTabs.Spots}
                </Tab>
                <Tab className="basis-1/3" value={SetTabs.AccessRights}>
                  {SetTabs.AccessRights}
                </Tab>
              </TabsHeader>
              <div className="flex flex-col grow relative">
                <TabPanel value={SetTabs.Main}>
                  <MainContent set={dataSet} />
                </TabPanel>
                <TabPanel value={SetTabs.Spots}>
                  {dataSet?.spots && (
                    <EditModeSpots
                      spots={dataSet?.spots}
                      setId={setId}
                      buildingId={dataSet?.building?.id}
                    />
                  )}
                </TabPanel>
                <TabPanel value={SetTabs.AccessRights}>
                  <UsersGroups spotId={`${dataSet?.id}`} />
                </TabPanel>
              </div>
            </TabsContainer>
          </Loader>
        </ScrollbarContainer>
        <div className="fixed bottom-0 left-0 w-full bg-white pt-[16px]">
          <div className="px-[16px]">
            <Button
              onClick={() =>
                router.push({
                  pathname: ROUTES.ADMIN_SETS_EDIT,
                  query: { setId },
                })
              }
              mode={ButtonMode.FULL_PRIMARY}
              className="text-xs font-medium px-[10px] h-[44px]"
              icon={ButtonIcon.EDIT_WHITE}
            >
              Edit Set
            </Button>
          </div>
          <div
            className="w-auto mb-[26px] mt-[10px] text-base font-semibold text-center cursor-pointer text-primary flex-[0_0_auto]"
            onClick={() => setDeleteModalOpen(true)}
          >
            Delete Set
          </div>
        </div>
      </div>

      <DeleteDialog
        open={deleteModalOpen}
        message="Delete this set?"
        onClose={() => setDeleteModalOpen(false)}
        onSubmit={() => {
          removeSet()
        }}
      />
    </>
  )
}

export default React.memo(SetMobile)
