import { spotApi } from '@api/spot'
import { SpotInfo } from '@api/spot/types'
import Button from '@components/Button/Button'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import { PageHeaderMobile } from '@components/PageHeader'
import Loader from '@components/Loader/Loader'
import { Tab, TabPanel, TabsContainer, TabsHeader } from '@components/Tabs/Tabs'
import { ROUTES } from '@constants/routes'
import { SpotProps, SpotTabs } from '@screens/admin/Spots/Spot/Spot.model'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import UsersGroups from '@screens/Spot/AddSpot/UsersGroups'
import ScrollbarContainer from '@components/ScrollbarContainer/ScrollbarContainer'
import cn from 'classnames'
import MainContent from '@screens/Spot/MainContent'
import SpollardContent from '@screens/Spot/SpollardContent'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

const Spot: React.FC<SpotProps> = ({ spotId, activeTabQuery, spotUrlBack }) => {
  const { isDesktop } = useDeviceInfo()
  const { data: dataSpot, isLoading: isLoading } =
    spotApi.endpoints.getSpotById.useQuery(+spotId)
  const [deleteSpotById] = spotApi.endpoints.deleteSpotById.useMutation()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [spot, setSpot] = useState<SpotInfo>()
  const [activeTab, setActiveTab] = useState(activeTabQuery || SpotTabs.Main)

  const router = useRouter()

  useEffect(() => {
    if (dataSpot) {
      setSpot(dataSpot)
    }
  }, [dataSpot])

  const removeSpot = () => {
    deleteSpotById(+spotId).then(() => {
      if (spotUrlBack) {
        router.push(spotUrlBack)
      } else {
        router.back()
      }
    })
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-col flex-[1_0_auto]">
          <PageHeaderMobile
            title={`Spot ${spot?.name || ''}`}
            showBackButton
            routeBack={spotUrlBack}
          />
          <ScrollbarContainer
            className={cn(
              'w-full flex flex-col overflow-y-auto h-[calc(100%-72px)]',
              {
                'h-[calc(100%-174px)]': !isDesktop,
              }
            )}
          >
            <Loader loading={isLoading}>
              <TabsContainer
                value={activeTab}
                type="header"
                onChange={setActiveTab}
              >
                <TabsHeader className="shadow-4">
                  <Tab className="basis-1/3" value={SpotTabs.Main}>
                    {SpotTabs.Main}
                  </Tab>
                  <Tab className="basis-1/3" value={SpotTabs.Spollard}>
                    {SpotTabs.Spollard}
                  </Tab>
                  <Tab className="basis-1/3" value={SpotTabs.AccessRights}>
                    {SpotTabs.AccessRights}
                  </Tab>
                </TabsHeader>
                <div className="flex flex-col grow">
                  <TabPanel value={SpotTabs.Main}>
                    <MainContent spot={spot} />
                  </TabPanel>
                  <TabPanel value={SpotTabs.Spollard}>
                    <SpollardContent spot={spot} />
                  </TabPanel>
                  <TabPanel value={SpotTabs.AccessRights}>
                    <UsersGroups spotId={spotId} />
                  </TabPanel>
                </div>
              </TabsContainer>
              <div className="fixed bottom-0 left-0 w-full bg-white pt-[16px]">
                <div className="px-[16px]">
                  <Button
                    onClick={() =>
                      router.push({
                        pathname: ROUTES.SPOT_EDIT,
                        query: { spotId, spotUrlBack },
                      })
                    }
                    mode={ButtonMode.FULL_PRIMARY}
                    className="text-xs font-medium px-[10px] h-[42px]"
                    icon={ButtonIcon.EDIT_WHITE}
                  >
                    Edit Spot
                  </Button>
                </div>
                <div
                  className="w-auto mb-[26px] mt-[10px] text-base font-semibold text-center cursor-pointer text-primary flex-[0_0_auto]"
                  onClick={() => setDeleteModalOpen(true)}
                >
                  Delete Spot
                </div>
              </div>
            </Loader>
          </ScrollbarContainer>
        </div>
      </div>

      <DeleteDialog
        open={deleteModalOpen}
        message="Delete this spot?"
        onClose={() => setDeleteModalOpen(false)}
        onSubmit={() => removeSpot()}
      />
    </>
  )
}

export default React.memo(Spot)
