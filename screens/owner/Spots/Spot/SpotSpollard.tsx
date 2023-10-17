import { spotApi } from '@api/spot'
import Loader from '@components/Loader/Loader'
import { SpotSpollardProps } from '@screens/owner/Spots/Spot/Spot.model'
import { SpotInfoRow } from '@screens/owner/Spots/Spot/SpotMain'
import React, { FC } from 'react'

const SpotSpollard: FC<SpotSpollardProps> = ({ id }) => {
  const {
    data: spot,
    isLoading,
    isFetching,
  } = spotApi.endpoints.getSpotById.useQueryState(id)

  return (
    <Loader loading={isLoading || isFetching}>
      {spot && (
        <>
          <SpotInfoRow label="Spollard Id">
            {spot.hardwareSerial || 'N/A'}
          </SpotInfoRow>
        </>
      )}
    </Loader>
  )
}

export default SpotSpollard
