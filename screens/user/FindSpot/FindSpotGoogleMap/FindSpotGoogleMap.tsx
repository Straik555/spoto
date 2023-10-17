import React, { FC } from 'react'
import cn from 'classnames'

import { MarkerEntity } from '@screens/admin/Sets/ServerEntities.model'
import { FindSpotSelectCar } from '@screens/user/FindSpot'
import MarkerIcon from '@assets/icons/location-marker.svg'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import GoogleMap from '@components/GoogleMap/GoogleMap'
import { MapLoader } from '@components/Loader'

import { FindSpotFormValues } from '@screens/user/FindSpot/FindSpot.model'
import {
  FindSpotGoogleMapProps,
  WrapperMarkerProps,
} from './FindSpotGoogleMap.model'
import useFindSpot from '@screens/user/FindSpot/useFindSpot'

const WrapperMarker: FC<WrapperMarkerProps> = ({ children, className }) => (
  <div className={cn('absolute -translate-x-1/2 -translate-y-1/2', className)}>
    {children}
  </div>
)

const FindSpotGoogleMap: FC<FindSpotGoogleMapProps> = ({ findIsLoading }) => {
  const { filterSelectedMarker, filteredMarkers } = useFindSpot()
  const { values, setFieldValue } = useTypedFormikContext<FindSpotFormValues>()
  const { isNotEmpty, lat, lng, markerIndex, markers } = values
  const sumAvailableSpotCount = (markers: MarkerEntity[] | undefined) =>
    markers
      ?.map((marker: MarkerEntity) => marker.availableSpotCount)
      .reduce((acc, cur) => acc + cur, 0)

  return (
    <GoogleMap
      center={{
        lat,
        lng,
      }}
    >
      {findIsLoading && (
        <div className="absolute overflow-hidden w-[295px] h-[295px] -left-[138px] -top-[155px]">
          <MapLoader loading={findIsLoading} />
        </div>
      )}
      {isNotEmpty &&
        !findIsLoading &&
        filteredMarkers?.map((marker: MarkerEntity, idx: number) => {
          const selectedMarker = filterSelectedMarker(
            values.markers?.items,
            marker.buildingLatitude,
            marker.buildingLongitude
          )
          return (
            <WrapperMarker
              lat={marker.buildingLatitude}
              lng={marker.buildingLongitude}
              key={marker.id}
              className={cn('z-[2]', { '!z-[3]': markerIndex === idx })}
            >
              <FindSpotSelectCar
                active={markerIndex === idx}
                onClick={() => {
                  setFieldValue('selectedMarker', selectedMarker)
                  setFieldValue('markerIndex', idx)
                }}
                price={selectedMarker?.map(
                  (marker: MarkerEntity) => marker.price.perHour
                )}
                charging={
                  marker.electricCharger.type1 || marker.electricCharger.type2
                }
                isEmpty={!marker.availableSpotCount}
                availableSpotCount={Number(
                  sumAvailableSpotCount(selectedMarker)
                )}
              />
            </WrapperMarker>
          )
        })}
      {markers && !findIsLoading && (
        <WrapperMarker lat={lat} lng={lng} className="z-[1]">
          <MarkerIcon className="-mt-8 fill-primary" />
        </WrapperMarker>
      )}
    </GoogleMap>
  )
}

export default FindSpotGoogleMap
