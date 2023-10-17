import React, { useState } from 'react'
import { SpotInfo } from '@api/spot/types'
import SpotCard from '@screens/admin/Spots/SpotCard/SpotCard'
import { ROUTES } from '@constants/routes'
import { EditModeSpotsProps } from '@screens/admin/Sets/Set/EditModeSpots/EditModeSpots.model'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import { useSpotoMediaQuery } from '@hooks/useMediaQuery'
import Button from '@components/Button'
import { ButtonMode, ButtonIcon } from '@components/Button/Button.model'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import { spotApi } from '@api/spot'

const EditModeSpots: React.FC<EditModeSpotsProps> = ({
  spots,
  setId,
  buildingId,
}) => {
  const router = useRouter()
  const { isDesktop } = useDeviceInfo()
  const { maxWidth1366, maxWidth1920, minWidth1920 } = useSpotoMediaQuery()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [spotToDelete, setSpotToDelete] = useState<number | null>(null)
  const [deleteSpotById] = spotApi.endpoints.deleteSpotById.useMutation()

  const navigateToCreateSpot = () => {
    if (setId && buildingId) {
      router.push({
        pathname: ROUTES.SPOT_CREATE,
        query: {
          setId,
          buildingId,
        },
      })
    }
  }

  return (
    <>
      {isDesktop && (
        <Button
          mode={ButtonMode.SMALL}
          className="self-end w-[169px] px-4 py-[13px] rounded-md text-s-lg mb-[25px]"
          icon={ButtonIcon.ADD_WHITE}
          onClick={() => navigateToCreateSpot()}
        >
          Add Spot
        </Button>
      )}
      {!isDesktop && (
        <div className="p-[16px]">
          <Button
            mode={ButtonMode.Dashed}
            className="self-end w-full py-[16px] rounded-md text-s-lg text-primary text-s-lg font-semibold"
            icon={ButtonIcon.ADD}
            onClick={() => navigateToCreateSpot()}
          >
            Add Spot
          </Button>
        </div>
      )}
      <section
        className={cn('grid', {
          'gap-x-[11px] gap-y-[5px] grid-cols-2 px-[16px]': !isDesktop,
          'gap-x-[6px] gap-y-[9px] grid-cols-3': maxWidth1366 && isDesktop,
          'gap-x-[8px] gap-y-[9px] grid-cols-4':
            !maxWidth1366 && maxWidth1920 && isDesktop,
          'gap-x-[10px] gap-y-[9px] grid-cols-5': minWidth1920 && isDesktop,
        })}
      >
        {spots?.map((spot: SpotInfo) => (
          <SpotCard
            key={spot.id}
            id={spot.name}
            onClick={() => {
              if (setId) {
                router.push({
                  pathname: ROUTES.ADMIN_SPOT_DETAILS,
                  query: {
                    spotId: spot.id,
                    spotUrlBack: router.asPath,
                  },
                })
              }
            }}
            onDeleteSpot={() => {
              setSpotToDelete(spot.id)
              setDeleteModalOpen(true)
            }}
            status={spot.linked}
            isActive={spot.linked}
            electricCharger={spot.electricCharger}
          />
        ))}
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
      </section>
      {(!spots || (spots && !spots[0])) && (
        <div className="flex w-full justify-center text-blue-2 text-sm font-medium">
          No Spots
        </div>
      )}
    </>
  )
}

export default React.memo(EditModeSpots)
