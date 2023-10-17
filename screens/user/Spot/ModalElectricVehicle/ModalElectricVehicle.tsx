import Close from '@assets/icons/close-24.svg'
import { ButtonMode } from '@components/Button/Button.model'
import Dialog from '@components/Dialog/Dialog'
import { Button } from '@components/index'
import {
  ModalElectricVehicleVariant,
  TModalElectricVehicle,
} from '@screens/user/Spot/ModalElectricVehicle/ModalElectricVehicle.model'
import React, { FC, useEffect, useState } from 'react'
import Title from '@components/Title/Title'

export const ModalElectricVehicle: FC<TModalElectricVehicle> = ({
  closeModal,
  onSubmit,
  isOpen,
  variant,
}) => {
  const [localVariant, setLocalVariant] =
    useState<ModalElectricVehicleVariant>()

  useEffect(() => {
    if (!isOpen) return

    setLocalVariant(variant)
  }, [isOpen])

  return (
    <Dialog open={isOpen} onClose={closeModal} className="w-[343px] !p-4">
      <div className="absolute right-1 top-1" onClick={() => closeModal()}>
        <Close className="fill-blue-3" />
      </div>
      <Title
        as="h3"
        noCap
        className="font-semibold text-center text-s-xl mt-[12px] mb-[30px]"
      >
        {localVariant === ModalElectricVehicleVariant.NonEV
          ? 'Your selected vehicle is not an electric vehicle'
          : 'Your selected vehicle does not match the EV charger type'}
      </Title>
      <div className="w-full grid gap-x-[13px] grid-cols-2">
        <Button
          mode={ButtonMode.FULL_SECONDARY}
          onClick={() => {
            onSubmit()
            closeModal()
          }}
          className="!font-semibold !text-s-sm !text-primary !px-0 !py-[9px] border-primary border-[2px]"
        >
          Change spot
        </Button>
        <Button
          mode={ButtonMode.FULL_PRIMARY}
          onClick={() => closeModal()}
          className="px-0 text-white !font-semibold !text-s-sm !py-[9px]"
        >
          Change/Add Vehicle
        </Button>
      </div>
    </Dialog>
  )
}
