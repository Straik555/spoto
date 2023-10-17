import { sharedPlacesApi } from '@api/sharedPlaces'
import React, { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { spotApi } from '@api/spot'
import Button from '@components/Button'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import { Tab, TabPanel, TabsContainer, TabsHeader } from '@components/Tabs'
import SpotMain from '@screens/owner/Spots/Spot/SpotMain'
import SpotSpollard from '@screens/owner/Spots/Spot/SpotSpollard'
import SpotUsers from '@screens/owner/Spots/Spot/SpotUsers'
import { SpotDetailType, SpotProps } from './Spot.model'
import { PageHeaderMobile } from '@components/PageHeader'
import { ROUTES } from '@constants/routes'
import { LayoutMobile } from '@components/Layout'

const Spot: FC<SpotProps> = ({ id, type }) => {
  const { data: spot, isFetching } = spotApi.endpoints.getSpotById.useQuery(id)
  const { isFetching: usersByPlaceIsFetching } =
    sharedPlacesApi.endpoints.getUsersByPlace.useQueryState({ placeId: id })
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(type || SpotDetailType.Main)
  const [deleteSpotVisible, setDeleteSpotVisible] = useState(false)
  const [deleteSpot, deleteSpotRes] =
    spotApi.endpoints.deleteSpotById.useMutation()

  useEffect(() => {
    if (deleteSpotRes.isError) {
      // TODO: Handle error
      toast.error('Failed deleting spot')
    }

    if (deleteSpotRes.isSuccess) {
      setDeleteSpotVisible(false)
      router.push({ pathname: ROUTES.OWNER_SPOTS })
    }
  }, [deleteSpotRes.isError, deleteSpotRes.isSuccess])

  useEffect(() => {
    router.push({
      pathname: ROUTES.OWNER_SPOTS_FIND_TAB,
      query: { id, type: activeTab },
    })
  }, [activeTab])

  return (
    <LayoutMobile>
      <PageHeaderMobile
        title={spot?.name || ''}
        titleClassName="w-[205px]"
        rightContent={
          <Button
            mode={ButtonMode.BASE}
            className="w-auto px-4 py-2 bg-white text-primary px rounded-md text-s-sm"
            icon={ButtonIcon.EDIT}
            onClick={() =>
              router.push({
                pathname: ROUTES.OWNER_SPOTS_EDIT,
                query: {
                  id: id,
                  type: activeTab,
                },
              })
            }
          >
            Edit Spot
          </Button>
        }
        backButtonLink={ROUTES.OWNER_SPOTS}
        showBackButton
      />

      <TabsContainer value={activeTab} type="header" onChange={setActiveTab}>
        <TabsHeader>
          <Tab value={SpotDetailType.Main}>Main</Tab>
          <Tab value={SpotDetailType.Spollard}>Spollard</Tab>
          <Tab value={SpotDetailType.Users}>Users</Tab>
        </TabsHeader>

        <div className="p-4 grow">
          <TabPanel value={SpotDetailType.Main}>
            <SpotMain id={id} />
          </TabPanel>
          <TabPanel value={SpotDetailType.Spollard}>
            <SpotSpollard id={id} />
          </TabPanel>
          <TabPanel value={SpotDetailType.Users}>
            <SpotUsers id={id} />
          </TabPanel>
        </div>
      </TabsContainer>

      {!isFetching && !usersByPlaceIsFetching && (
        <div
          className="fixed bottom-0 block w-full py-3 font-semibold text-center cursor-pointer text-s-base text-blue-1"
          onClick={() => setDeleteSpotVisible(true)}
        >
          Delete spot
        </div>
      )}

      <DeleteDialog
        open={deleteSpotVisible}
        message="Delete this spot?"
        onClose={() => setDeleteSpotVisible(false)}
        onSubmit={() => deleteSpot(id)}
        disabled={deleteSpotRes.isLoading}
      />
    </LayoutMobile>
  )
}

export default Spot
