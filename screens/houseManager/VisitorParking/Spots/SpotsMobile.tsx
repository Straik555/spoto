import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { PageHeaderMobile } from '@components/PageHeader'
import { ROUTES } from '@constants/routes'
import { houseApi } from '@api/house'
import { Loader } from '@components/Loader'
import { HouseModel, HouseSpot } from '@api/house/types'
import ElectricChargerIcon from '@assets/icons/circle-icons/charging-green-circle-18.svg'
import CloseIcon from '@assets/icons/close-20.svg'
import PlusIcon from '@assets/icons/circle-icons/white-plus-blue-circle-19.svg'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import { spotApi } from '@api/spot'
import s from './Spots.module.css'
import cn from 'classnames'

const SpotsMobile: React.FC<{ houseId: string }> = ({ houseId }) => {
  const router = useRouter()
  const [house, setHouse] = useState<HouseModel | null>(null)
  const [deleteSpotVisible, setDeleteSpotVisible] = useState(false)
  const [spotIdToDelete, setSpotIdToDelete] = useState('')
  const { data: houses } = houseApi.endpoints.getHousesByUser.useQuery()
  const { data: houseSpots, isLoading: houseSpotsLoading } =
    houseApi.endpoints.getHouseSpots.useQuery({ houseId })

  const [deleteSpot] = spotApi.endpoints.deleteSpotById.useMutation()

  useEffect(() => {
    if (houses && houses[0]) {
      const parentHouse = houses.filter((item) => item.id === +houseId)[0]
      if (parentHouse) setHouse(parentHouse)
    }
  }, [houses])

  const renderSpots = () => {
    const spotCard = (item: HouseSpot) => {
      return (
        <div
          key={item.id}
          className="min-w-[166px] w-[calc(50%-5px)] h-[72px] border border-blue-2 rounded-[5px]
        flex flex-col justify-between mb-[8px] px-[15px] pt-[10px] pb-[8px] relative"
          onClick={() =>
            item.id &&
            router.push({
              pathname: ROUTES.HOUSEMANAGER_VISITOR_PARKING_SPOT,
              query: {
                houseId,
                spotId: item.id,
              },
            })
          }
        >
          <div className="text-s-lg font-semibold text-blue-1 w-[120px] overflow-hidden overflow-ellipsis whitespace-nowrap">
            {item.name}
          </div>
          {(item.electricCharger.type1 || item.electricCharger.type2) && (
            <ElectricChargerIcon />
          )}
          <div className="absolute top-[15px] right-[12px]">
            <CloseIcon
              className="fill-blue-2"
              role="button"
              aria-label="delete houseSpot"
              onClick={(e) => {
                e.stopPropagation()
                setDeleteSpotVisible(true)
                setSpotIdToDelete(`${item.id}`)
              }}
            />
          </div>
        </div>
      )
    }
    return houseSpots?.map((item) => spotCard(item))
  }

  return (
    <div className="flex flex-col h-full bg-bg">
      <PageHeaderMobile
        title={house?.name}
        showBackButton
        backButtonLink={{
          pathname: ROUTES.HOUSEMANAGER_VISITOR_PARKING,
        }}
      />
      <Loader loading={houseSpotsLoading}>
        <div className="p-[16px]">
          <div
            role="button"
            aria-label="add apot"
            className={cn(
              s.dashedBorder,
              'rounded-[5px] h-[57px] flex justify-center items-center'
            )}
            onClick={() =>
              router.push({
                pathname: ROUTES.SPOT_CREATE,
                query: { houseId, buildingId: house?.buildingId },
              })
            }
          >
            <PlusIcon />
            <span className="ml-[13px] text-primary text-s-lg font-semibold">
              Add Spot
            </span>
          </div>
        </div>
        <section className="px-[16px] flex flex-wrap justify-between">
          {renderSpots()}
        </section>
      </Loader>
      <DeleteDialog
        open={deleteSpotVisible}
        message="Delete this spot?"
        onClose={() => {
          setDeleteSpotVisible(false)
          setSpotIdToDelete('')
        }}
        onSubmit={() => {
          setDeleteSpotVisible(false)
          if (spotIdToDelete) deleteSpot(+spotIdToDelete)
        }}
      />
    </div>
  )
}

export default React.memo(SpotsMobile)
