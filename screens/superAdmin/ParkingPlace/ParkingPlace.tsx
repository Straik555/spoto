import { hardwareApi } from '@api/hardware'
import { HardwareItem } from '@api/hardware/types'
import { LayoutDesktop } from '@components/Layout'
import Loader from '@components/Loader/Loader'
import ParkingPlaceItem from '@screens/superAdmin/ParkingPlace/ParkingPlaceItem'
import React, { FC } from 'react'

const ParkingPlace: FC = () => {
  const { data, isLoading } = hardwareApi.endpoints.getAllHardware.useQuery()

  const renderNoData = () => <p>No Data</p>

  const renderData = (data: HardwareItem[]) =>
    data.map((item) => <ParkingPlaceItem key={item.id} hardwareItem={item} />)

  return (
    <LayoutDesktop>
      <Loader loading={isLoading}>
        <div className="relative block w-full h-full">
          <div className="absolute w-full h-full p-8 overflow-auto">
            {data && data.length ? renderData(data) : renderNoData()}
          </div>
        </div>
      </Loader>
    </LayoutDesktop>
  )
}

export default React.memo(ParkingPlace)
