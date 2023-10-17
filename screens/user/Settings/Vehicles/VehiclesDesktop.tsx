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
import { ROUTES } from '@constants/routes'
import ProfileSettingsWrapperDesktop from '@screens/user/Settings/ProfileSettings/components/ProfileSettingsWrapper'
import s from './Vehicles.module.css'

const VehiclesDesktop: React.FC = () => {
  const router = useRouter()
  const [vehicleCardToDelete, setVehicleCardToDelete] = useState<number | null>(
    null
  )
  const [deleteVehicle, { isLoading: isDeleteLoading }] =
    vehicleApi.endpoints.deleteVehicle.useMutation()

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
        <div
          className="flex mb-4 mr-4 overflow-hidden min-w-[700px] h-[253px] rounded-[10px]"
          key={item.id}
        >
          <div
            className={
              item.carPhoto || item.brandLogo
                ? cn(s.cardLogoDesktop)
                : cn(s.cardLogoDesktopDefault)
            }
          >
            <Image
              srcKey={
                !item.carPhoto.includes('data:')
                  ? item.carPhoto || item.brandLogo
                  : ''
              }
              src={item.carPhoto}
            />
          </div>
          <div className="flex flex-col border border-l-0 border-blue-3 rounded-r-[10px] w-[427px] px-[25px] py-[20px]">
            <div>
              <div className="text-base font-normal text-blue-1 mb-[5px]">
                Brand
              </div>
              <div className="text-lg font-semibold text-black mb-[20px]">
                {item.brand}
              </div>
            </div>
            <div>
              <div className="text-base font-normal text-blue-1 mb-[5px]">
                Plate number
              </div>
              <div className="text-lg font-semibold text-black mb-[26px]">
                {item.licensePlate}
              </div>
            </div>
            <div className="flex">
              <Button
                mode={ButtonMode.FULL_PRIMARY}
                icon={ButtonIcon.EDIT_WHITE}
                onClick={() =>
                  router.push({
                    pathname: ROUTES.VEHICLES_EDIT,
                    query: { vehicleId: item.id },
                  })
                }
                className="w-auto mr-1 text-base border-2 border-primary px-[30px] whitespace-nowrap"
              >
                Edit Vehicle
              </Button>
              <Button
                mode={ButtonMode.FULL_SECONDARY}
                icon={ButtonIcon.DELETE_OUTLINED}
                onClick={() => setVehicleCardToDelete(item.id)}
                className="w-auto text-base font-semibold border-2 px-[30px] border-primary whitespace-nowrap text-primary"
              >
                Delete Vehicle
              </Button>
            </div>
          </div>
        </div>
      )
    }
    return (
      <section className="flex flex-wrap px-[75px] py-[35px]">
        {vehicles?.map((item) => vehicleCard(item))}
      </section>
    )
  }

  const renderEmptyScreen = () => (
    <div className="flex flex-col items-center w-full pt-[100px]">
      <div className="mb-6 text-lg font-medium text-center text-blue-2">
        No active vehicle
      </div>
      <Button
        className="w-auto text-lg font-semibold px-[81px] py-[11px]"
        mode={ButtonMode.FULL_PRIMARY}
        onClick={() => router.push({ pathname: ROUTES.VEHICLES_CREATE })}
      >
        Add Vehicle
      </Button>
    </div>
  )

  return (
    <ProfileSettingsWrapperDesktop
      headerTitle="My Vehicles"
      headerRightContent={
        vehicles.length ? (
          <Button
            icon={ButtonIcon.ADD_WHITE}
            className="w-auto text-base !font-semibold px-[20px] py-[13px] my-[18px]"
            mode={ButtonMode.FULL_PRIMARY}
            onClick={() => router.push({ pathname: ROUTES.VEHICLES_CREATE })}
          >
            Add Vehicle
          </Button>
        ) : (
          <div />
        )
      }
    >
      <Loader loading={isLoading}>
        {vehicles.length ? renderVehicles() : renderEmptyScreen()}
      </Loader>

      <DeleteDialog
        open={Boolean(vehicleCardToDelete)}
        message="Delete this vehicle?"
        onClose={() => setVehicleCardToDelete(null)}
        onSubmit={() => removeVehicle()}
        disabled={isDeleteLoading}
      />
    </ProfileSettingsWrapperDesktop>
  )
}

export default React.memo(VehiclesDesktop)
