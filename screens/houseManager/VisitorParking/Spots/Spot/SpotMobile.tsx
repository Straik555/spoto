import { SpotInfo } from '@api/spot/types'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import { PageHeaderMobile } from '@components/PageHeader'
import Loader from '@components/Loader/Loader'
import { Tab, TabPanel, TabsContainer, TabsHeader } from '@components/Tabs/Tabs'
import { ROUTES } from '@constants/routes'
import { SpotTabs } from '@screens/admin/Spots/Spot/Spot.model'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import Button from '@components/Button'
import { ButtonMode, ButtonIcon } from '@components/Button/Button.model'
import { spotApi } from '@api/spot'
import ScrollbarContainer from '@components/ScrollbarContainer/ScrollbarContainer'
import cn from 'classnames'
import MainContent from '@screens/Spot/MainContent'
import SpollardContent from '@screens/Spot/SpollardContent'

const SpotMobile: React.FC<{
  spotId: string
  houseId: string
  spotUrlBack?: string
}> = ({ spotId, houseId, spotUrlBack }) => {
  const { data: dataSpot, isLoading: isLoading } =
    spotApi.endpoints.getSpotById.useQuery(+spotId)
  const [deleteSpotById, { isLoading: isDeleteLoading }] =
    spotApi.endpoints.deleteSpotById.useMutation()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [spot, setSpot] = useState<SpotInfo>()
  const [activeTab, setActiveTab] = useState(SpotTabs.Main)
  const router = useRouter()

  useEffect(() => {
    if (dataSpot) {
      setSpot(dataSpot)
    }
  }, [dataSpot])

  const removeSpot = useCallback(() => {
    deleteSpotById(+spotId).then(() =>
      router.push({
        pathname: ROUTES.HOUSEMANAGER_VISITOR_PARKING_SPOTS,
        query: {
          houseId,
        },
      })
    )
  }, [])

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex-[1_0_auto]">
          <PageHeaderMobile
            title={`Spot ${spot?.name || ''}`}
            showBackButton
            routeBack={spotUrlBack}
            backButtonLink={{
              pathname: ROUTES.HOUSEMANAGER_VISITOR_PARKING_SPOTS,
              query: {
                houseId,
              },
            }}
            titleClassName="w-[215px]"
          />
          <ScrollbarContainer
            className={cn(
              'w-full flex flex-col overflow-y-auto h-[calc(100%-72px)]'
            )}
          >
            <Loader loading={isLoading}>
              <TabsContainer
                value={activeTab}
                type="header"
                onChange={setActiveTab}
              >
                <TabsHeader className="shadow-4">
                  <Tab className="basis-1/2" value={SpotTabs.Main}>
                    {SpotTabs.Main}
                  </Tab>
                  <Tab className="basis-1/2" value={SpotTabs.Spollard}>
                    {SpotTabs.Spollard}
                  </Tab>
                </TabsHeader>
                <div className="flex flex-col grow relative">
                  <TabPanel value={SpotTabs.Main}>
                    <MainContent spot={spot} />
                  </TabPanel>
                  <TabPanel value={SpotTabs.Spollard}>
                    <SpollardContent spot={spot} />
                  </TabPanel>
                </div>
              </TabsContainer>
              <div className="fixed bottom-0 left-0 w-full bg-white pt-[16px]">
                <div className="px-[16px]">
                  <Button
                    onClick={() =>
                      router.push({
                        pathname: ROUTES.SPOT_EDIT,
                        query: { spotId, houseId },
                      })
                    }
                    mode={ButtonMode.FULL_PRIMARY}
                    className="text-xs font-medium px-[10px] h-[44px]"
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
        disabled={isDeleteLoading}
      />
    </>
  )
}

export default React.memo(SpotMobile)
