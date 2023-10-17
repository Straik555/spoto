import React, { FC, useState } from 'react'
import { ButtonMode } from '@components/Button/Button.model'
import Button from '@components/Button'
import { ParkingPlaceItemProps } from './ParkingPlaceItem.model'
import { HardwareItemStatus } from '@api/hardware/types'
import { uplinkApi } from '@api/uplink'

const ParkingPlaceItem: FC<ParkingPlaceItemProps> = ({ hardwareItem }) => {
  const [plateInputValue, setPlateInputValue] = useState('')
  const [updateUplinkChanged] =
    uplinkApi.endpoints.updateUplinkChanged.useMutation()
  const [updateUplinkVehicleChanged] =
    uplinkApi.endpoints.updateUplinkVehicleChanged.useMutation()

  const getHardwareOwner = (name: string, plate: string): string =>
    !name && !plate
      ? 'No user info'
      : `${name ? name : ''} ${plate ? plate : ''}`

  const handleSearchChange = (e): void => {
    setPlateInputValue(e.target.value)
  }

  const handleClickArrive = (): void => {
    updateUplinkChanged({
      hardwareId: hardwareItem.hardwareId,
      licensePlate: plateInputValue,
      name: hardwareItem.userName,
    })
    setPlateInputValue('')
  }

  const handleClickDrive = (position: number) =>
    updateUplinkVehicleChanged({
      hardwareId: hardwareItem.hardwareId,
      carPosition: position,
    })

  return (
    <div className="flex flex-wrap items-center justify-between mb-2">
      <div className="flex items-center">
        <div
          className={`w-6 h-6 m-2 rounded-full border border-solid ${
            hardwareItem.status === HardwareItemStatus.Open
              ? 'border-green bg-green'
              : 'border-red bg-red'
          }`}
        />
        <div
          className={`m-2 ${hardwareItem.occupied ? 'text-red' : 'text-green'}`}
        >
          {hardwareItem.hardwareId}
        </div>
        <div className="m-2 text-black">{hardwareItem.alias}</div>
      </div>
      <div className="m-2">{`${getHardwareOwner(
        hardwareItem.userName,
        hardwareItem.licensePlate
      )}`}</div>
      <div>
        <input
          className="inline-flex p-1 m-2 border"
          type="text"
          placeholder="licence plate"
          value={plateInputValue}
          onChange={(e) => handleSearchChange(e)}
        />
        <Button
          className="m-2"
          disabled={!plateInputValue || plateInputValue.length === 0}
          onClick={() => handleClickArrive()}
          mode={ButtonMode.SMALL_SECONDARY}
        >
          Arrive
        </Button>
        <Button
          className="m-2"
          onClick={() => handleClickDrive(1)}
          mode={ButtonMode.SMALL_SECONDARY}
        >
          Drive in
        </Button>
        <Button
          className="m-2"
          onClick={() => handleClickDrive(0)}
          mode={ButtonMode.SMALL_SECONDARY}
        >
          Drive out
        </Button>
      </div>
    </div>
  )
}

export default React.memo(ParkingPlaceItem)
