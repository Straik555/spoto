import React from 'react'
import Loader from '@components/Loader/Loader'
import { TabPanel, TabsContainer } from '@components/Tabs/Tabs'
import { ROUTES } from '@constants/routes'
import { useRouter } from 'next/router'
import { PageContent } from '@components/Layout/PageContent'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import { SetProps, SetTabs } from '@screens/admin/Sets/Set/Set.model'
import MainContent from '@screens/admin/Sets/Set/MainContent'
import UsersGroups from '@screens/Spot/AddSpot/UsersGroups'
import EditModeSpots from '@screens/admin/Sets/Set/EditModeSpots/EditModeSpots'
import Button from '@components/Button'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import useSetHook from '@screens/admin/Sets/Set/hooks'

const SetDesktop: React.FC<SetProps> = ({ setId }) => {
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
    <PageContent
      title={`Set ${dataSet?.name || ''}`}
      tabs={[SetTabs.Main, SetTabs.Spots, SetTabs.AccessRights]}
      setActiveTab={setActiveTab}
      activeTab={SetTabs.Main}
      actions={
        <div className="flex">
          <Button
            onClick={() =>
              router.push({
                pathname: ROUTES.ADMIN_SETS_EDIT,
                query: { setId },
              })
            }
            mode={ButtonMode.SMALL}
            className="!text-s-lg !h-[50px] !px-[36px]"
            icon={ButtonIcon.EDIT_WHITE}
          >
            Edit Set
          </Button>
          <Button
            onClick={() => setDeleteModalOpen(true)}
            mode={ButtonMode.SMALL_SECONDARY}
            className="!text-s-lg !h-[50px] !px-[25px] border-none ml-[5px]"
          >
            Delete Set
          </Button>
        </div>
      }
    >
      <div className="flex h-full">
        <section className="flex flex-col bg-bg grow">
          <Loader loading={isLoadingSet}>
            <TabsContainer value={activeTab} type="header">
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
            </TabsContainer>
          </Loader>
        </section>
      </div>
      <DeleteDialog
        open={deleteModalOpen}
        message="Delete this set?"
        onClose={() => {
          setDeleteModalOpen(false)
        }}
        onSubmit={() => {
          setDeleteModalOpen(false)
          removeSet()
        }}
      />
    </PageContent>
  )
}

export default React.memo(SetDesktop)
