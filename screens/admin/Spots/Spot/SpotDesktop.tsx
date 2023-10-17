import React, { useEffect, useState } from 'react'
import { spotApi } from '@api/spot'
import { SpotInfo } from '@api/spot/types'
import Button from '@components/Button/Button'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import Loader from '@components/Loader/Loader'
import { TabPanel, TabsContainer } from '@components/Tabs/Tabs'
import { ROUTES } from '@constants/routes'
import { SpotProps, SpotTabs } from '@screens/admin/Spots/Spot/Spot.model'
import { useRouter } from 'next/router'
import UsersGroups from '../../../Spot/AddSpot/UsersGroups'
import { PageContent } from '@components/Layout/PageContent'
import MainContent from '@screens/Spot/MainContent'
import SpollardContent from '@screens/Spot/SpollardContent'

const Spot: React.FC<SpotProps> = ({ spotId, activeTabQuery, spotUrlBack }) => {
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
      <PageContent
        title={`Spot ${spot?.name || ''}`}
        tabs={[SpotTabs.Main, SpotTabs.Spollard, SpotTabs.AccessRights]}
        actions={
          <div className="flex">
            <Button
              onClick={() =>
                router.push({
                  pathname: ROUTES.SPOT_EDIT,
                  query: { spotId, spotUrlBack },
                })
              }
              mode={ButtonMode.SMALL}
              className="!text-s-lg !h-[50px] !px-[36px]"
              icon={ButtonIcon.EDIT_WHITE}
            >
              Edit Spot
            </Button>
            <Button
              onClick={() => setDeleteModalOpen(true)}
              mode={ButtonMode.SMALL_SECONDARY}
              className="!text-s-lg !h-[50px] !px-[25px] border-none ml-[5px]"
            >
              Delete Spot
            </Button>
          </div>
        }
        setActiveTab={setActiveTab}
        activeTab={SpotTabs.Main}
      >
        <Loader loading={isLoading}>
          <TabsContainer
            value={activeTab}
            type="header"
            onChange={setActiveTab}
          >
            <TabPanel value={SpotTabs.Main}>
              <MainContent spot={spot} />
            </TabPanel>
            <TabPanel value={SpotTabs.Spollard}>
              <SpollardContent spot={spot} />
            </TabPanel>
            <TabPanel value={SpotTabs.AccessRights}>
              <UsersGroups spotId={spotId} />
            </TabPanel>
          </TabsContainer>
        </Loader>
      </PageContent>
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
