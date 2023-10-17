import { spotApi } from '@api/spot'
import { SpotAvailabilityState, SpotInfo } from '@api/spot/types'
import Loader from '@components/Loader/Loader'
import Title from '@components/Title/Title'
import ElectricChargerDisplayValue from '@screens/owner/Spots/components/ElectricChargerDisplayValue/ElectricChargerDisplayValue'
import HardwareStatusDisplayValue from '@screens/owner/Spots/components/HardwareStatusDisplayValue/HardwareStatusDisplayValue'
import {
  SpotMainInfoRowProps,
  SpotMainProps,
} from '@screens/owner/Spots/Spot/Spot.model'
import classNames from 'classnames'
import React, { FC } from 'react'
import NumberFormat from 'react-number-format'

const SpotoMainPrice: FC<{ label: string; amount: number }> = ({
  label,
  amount,
}) => {
  return (
    <div className="flex flex-col">
      <div className="font-normal text-s-sm text-blue-1">{label}</div>
      <div className="mt-1 font-semibold text-black text-s-lg">
        <NumberFormat
          displayType="text"
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          value={amount}
        />
      </div>
    </div>
  )
}

const SpotoMainPrices: FC<{ className?: string; price: SpotInfo['price'] }> = ({
  price,
  className,
}) => {
  return (
    <div
      className={classNames(
        'flex justify-between p-4 rounded-md bg-blue-4',
        className
      )}
    >
      <SpotoMainPrice label="Hourly Rate" amount={price.perHour} />
      <SpotoMainPrice label="Daily Rate" amount={price.perDay} />
      <SpotoMainPrice label="Weekly Rate" amount={price.perWeek} />
    </div>
  )
}

const SpotMain: FC<SpotMainProps> = ({ id }) => {
  const {
    data: spot,
    isLoading,
    isFetching,
  } = spotApi.endpoints.getSpotById.useQueryState(id)
  const isPublic = spot?.availabilityState === SpotAvailabilityState.PUBLIC

  return (
    <Loader loading={isLoading || isFetching}>
      {spot && (
        <>
          <SpotInfoRow
            label="Spot description"
            valueClassName="font-normal text-s-base break-all"
          >
            {spot.description}
          </SpotInfoRow>

          <SpotInfoRow label="Location">
            {spot.building?.address || ''}
          </SpotInfoRow>

          <SpotInfoRow label="Spot status">
            {isPublic ? 'Public' : 'Private'}

            {isPublic && (
              <SpotoMainPrices className="mt-3" price={spot.price} />
            )}
          </SpotInfoRow>

          <SpotInfoRow label="Maximum vehicle height">
            <NumberFormat
              displayType="text"
              suffix="m"
              decimalScale={2}
              fixedDecimalScale
              value={spot.height}
            />
          </SpotInfoRow>

          <SpotInfoRow label="Electric vehicle charger">
            <ElectricChargerDisplayValue info={spot.electricCharger} />
          </SpotInfoRow>

          <SpotInfoRow label="Hardware Status">
            <HardwareStatusDisplayValue linked={spot.linked} />
          </SpotInfoRow>
        </>
      )}
    </Loader>
  )
}

export const SpotInfoRow: FC<SpotMainInfoRowProps> = ({
  label,
  valueClassName,
  children,
}) => {
  return (
    <div className="block mb-6">
      <Title as="p" className="mb-2 font-normal text-blue-1 text-s-sm">
        {label}
      </Title>
      <p className={classNames('m-0 font-semibold text-s-lg', valueClassName)}>
        {children}
      </p>
    </div>
  )
}

export default SpotMain
