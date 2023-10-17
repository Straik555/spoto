import React, { ReactElement, useState } from 'react'
import { spotApi } from '@api/spot'
import { SpotInfo } from '@api/spot/types'
import Loader from '@components/Loader/Loader'
import SpotCard from '@screens/admin/Spots/SpotCard/SpotCard'
import { TabPanel, TabsContainer } from '@components/Tabs/Tabs'
import { ROUTES } from '@constants/routes'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { PageContent } from '@components/Layout/PageContent'
import { useSpotoMediaQuery } from '@hooks/useMediaQuery'
import DeleteDialog from '@components/Dialog/DeleteDialog'

const SpotsDesktop: React.FC = () => {
  const router = useRouter()
  const { data = [], isLoading: isLoading } =
    spotApi.endpoints.getSpotsByUser.useQuery({})
  const [activeTab, setActiveTab] = useState<string | undefined>('All')
  const { maxWidth1366, maxWidth1920 } = useSpotoMediaQuery()
  const [deleteSpotById] = spotApi.endpoints.deleteSpotById.useMutation()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [spotToDelete, setSpotToDelete] = useState<number | null>(null)

  const getContent = (filteredSpots: SpotInfo[]): ReactElement => {
    return filteredSpots.length ? (
      <section
        className={cn('flex content-start mb-[16px] grid gap-y-[9px] w-full', {
          'gap-x-[6px] grid-cols-3': maxWidth1366,
          'gap-x-[8px] grid-cols-4': !maxWidth1366 && maxWidth1920,
          'gap-x-[10px] grid-cols-5': !maxWidth1920,
        })}
      >
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
      <div className="flex items-center justify-center w-full font-medium grow text-blue-3 text-s-xl">
        No Spots
      </div>
    )
  }

  return (
    <PageContent
      title="Spots"
      tabs={['All', 'Linked', 'Unlinked']}
      setActiveTab={setActiveTab}
      activeTab="All"
    >
      <div className="flex flex-col h-full">
        <section className="flex bg-bg grow">
          <Loader loading={isLoading}>
            <TabsContainer value={activeTab} type="header">
              <TabPanel value="All">{getContent(data)}</TabPanel>
              <TabPanel value="Linked">
                {getContent(data.filter((spot) => spot.linked))}
              </TabPanel>
              <TabPanel value="Unlinked">
                {getContent(data.filter((spot) => !spot.linked))}
              </TabPanel>
            </TabsContainer>
          </Loader>
        </section>
      </div>
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
    </PageContent>
  )
}

export default React.memo(SpotsDesktop)
