import React, { useState } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import Button from '@components/Button'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import { vehicleApi } from '@api/vehicle'
import Loader from '@components/Loader/Loader'
import Image from '@components/Image/Image'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import { VehicleModel } from '@api/vehicle/types'
import { PageHeaderMobile } from '@components/PageHeader'
import { ROUTES } from '@constants/routes'
import PencilIcon from '@assets/icons/pencil-12.svg'
import TrashOutlinedIcon from '@assets/icons/trash-filled-14.svg'
import s from './Vehicles.module.css'

const Vehicles: React.FC = () => {
  const router = useRouter()
  const [vehicleCardToDelete, setVehicleCardToDelete] = useState<number | null>(
    null
  )
  const [deleteVehicle] = vehicleApi.endpoints.deleteVehicle.useMutation()

  const {
    data: vehicles = [],
    refetch,
    isLoading,
  } = vehicleApi.endpoints.getVehicles.useQuery(null)

  const removeVehicle = async () => {
    await deleteVehicle(vehicleCardToDelete)
    refetch()
    setVehicleCardToDelete(null)
  }

  const renderVehicles = () => {
    const vehicleCard = (item: VehicleModel) => {
      return (
        <div className={s.cardWrapper} key={item.id}>
          <div
            className={
              item.carPhoto || item.brandLogo ? s.cardLogo : s.cardLogoDefault
            }
          >
            <div className={s.cardButtons}>
              <button
                className={cn(s.cardButton)}
                onClick={() =>
                  router.push({
                    pathname: ROUTES.VEHICLES_EDIT,
                    query: { vehicleId: item.id },
                  })
                }
              >
                <PencilIcon className="fill-primary" />
              </button>
              <button
                className={cn(s.cardButton)}
                onClick={() => setVehicleCardToDelete(item.id)}
              >
                <TrashOutlinedIcon className="fill-primary" />
              </button>
            </div>
            <Image
              srcKey={
                !item.carPhoto.includes('data:')
                  ? item.carPhoto || item.brandLogo
                  : ''
              }
              src={item.carPhoto}
            />
          </div>
          <div className="flex flex-col text-xs">
            <div className="flex items-center border-b h-[39px] pt-[2px]">
              <div className="text-[10px] text-blue-1 basis-1/2 w-[36%] pl-5">
                Brand
              </div>
              <div className="w-[63%] font-semibold">{item.brand}</div>
            </div>
            <div className="flex items-center border-b h-[39px] pt-[2px]">
              <div className="text-[10px] text-blue-1 basis-1/2 w-[36%] pl-5">
                Plate number
              </div>
              <div className="w-[63%] font-semibold">{item.licensePlate}</div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <section className="max-h-[calc(100vh-134px)] overflow-y-auto p-4">
        {vehicles?.map((item) => vehicleCard(item))}
      </section>
    )
  }

  const renderEmptyScreen = () => (
    <div className="flex items-center justify-center text-blue-3 text-lg font-semibold grow p-4 pb-[76px]">
      No Active Vehicle
    </div>
  )

  return (
    <div className={s.wrapper}>
      <PageHeaderMobile title={'My Vehicles'} />
      <Loader loading={isLoading}>
        <div className="flex flex-col grow relative">
          {vehicles.length ? renderVehicles() : renderEmptyScreen()}
          <Button
            className="my-4 !py-2.5 !text-base !font-semibold rounded-md fixed bottom-0 left-0 mx-4 w-[calc(100%-32px)]"
            mode={ButtonMode.FULL_PRIMARY}
            icon={ButtonIcon.ADD_WHITE}
            onClick={() => router.push({ pathname: ROUTES.VEHICLES_CREATE })}
          >
            Add Vehicle
          </Button>
        </div>
      </Loader>

      <DeleteDialog
        open={Boolean(vehicleCardToDelete)}
        message="Delete this vehicle?"
        onClose={() => setVehicleCardToDelete(null)}
        onSubmit={() => removeVehicle()}
      />
    </div>
  )
}

export default React.memo(Vehicles)
