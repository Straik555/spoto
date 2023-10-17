import { spotApi } from '@api/spot'
import { SpotInfo } from '@api/spot/types'
import { PageHeaderMobile } from '@components/PageHeader'
import Loader from '@components/Loader/Loader'
import SpotCard from '@screens/admin/Spots/SpotCard/SpotCard'
import { Tab, TabPanel, TabsContainer, TabsHeader } from '@components/Tabs/Tabs'
import { ROUTES } from '@constants/routes'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import DeleteDialog from '@components/Dialog/DeleteDialog'

const Spots: React.FC = () => {
  const router = useRouter()
  const { data = [], isLoading: isLoading } =
    spotApi.endpoints.getSpotsByUser.useQuery({})
  const [activeTab, setActiveTab] = useState('All')
  const [deleteSpotById] = spotApi.endpoints.deleteSpotById.useMutation()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [spotToDelete, setSpotToDelete] = useState<number | null>(null)

  const getContent = (filteredSpots: SpotInfo[]): ReactElement => {
    return filteredSpots.length ? (
      <section className="flex content-start w-full p-[16px] mb-[16px] grid grid-cols-2 gap-x-[11px] gap-y-[6px]">
        {filteredSpots.map((spot: SpotInfo) => (
          <SpotCard
            key={spot.id}
            id={spot.name}
            onClick={() => {
              router.push({
                pathname: ROUTES.ADMIN_SPOT_DETAILS,
                query: { spotId: spot.id, spotUrlBack: router.asPath },
              })
            }}
            status={spot.linked}
            isActive={spot.linked}
            electricCharger={spot.electricCharger}
            onDeleteSpot={() => {
              setSpotToDelete(spot.id)
              setDeleteModalOpen(true)
            }}
          />
        ))}
      </section>
    ) : (
      <div className="flex items-center justify-center w-full font-semibold grow text-blue-3 text-s-xl">
        No Spots
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeaderMobile title="Spots" />
      <section className="flex flex-col bg-bg grow">
        <Loader loading={isLoading}>
          <TabsContainer
            value={activeTab}
            type="header"
            onChange={setActiveTab}
          >
            <div>
              <TabsHeader className="shadow-4">
                <Tab className="basis-1/3" value="All">
                  All
                </Tab>
                <Tab className="basis-1/3" value="Linked">
                  Linked
                </Tab>
                <Tab className="basis-1/3" value="Unlinked">
                  Unlinked
                </Tab>
              </TabsHeader>
            </div>

            <div className="flex grow">
              <TabPanel value="All">{getContent(data)}</TabPanel>
              <TabPanel value="Linked">
                {getContent(data.filter((spot) => spot.linked))}
              </TabPanel>
              <TabPanel value="Unlinked">
                {getContent(data.filter((spot) => !spot.linked))}
              </TabPanel>
            </div>
          </TabsContainer>
        </Loader>
      </section>
      <DeleteDialog
        open={deleteModalOpen}
        message="Delete the spot?"
        onClose={() => {
          setDeleteModalOpen(false)
          setSpotToDelete(null)
        }}
        onSubmit={() => {
          setDeleteModalOpen(false)
          if (spotToDelete) deleteSpotById(+spotToDelete)
        }}
      />
    </div>
  )
}

export default React.memo(Spots)
