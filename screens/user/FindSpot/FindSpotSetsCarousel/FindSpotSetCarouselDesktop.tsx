import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import ScrollbarContainer from '@components/ScrollbarContainer/ScrollbarContainer'
import { MarkerEntity } from '@screens/admin/Sets/ServerEntities.model'
import {
  FindSpotSearchSelectorProps,
  SetsCarouselDesktopItemProps,
} from '@screens/user/FindSpot/FindSpotSetsCarousel/FindSpotSetsCarousel.model'
import cn from 'classnames'
import React, { FC, useEffect, useRef, useState } from 'react'

const SetsCarouselDesktopItem: FC<SetsCarouselDesktopItemProps> = ({
  marker,
  markerIndex,
  activeMarkerIndex,
  onChange,
  onAdded,
  goToSpot,
}) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const isNotAvailable = !marker.availableSpotCount

  useEffect(() => {
    if (!itemRef.current) return

    if (activeMarkerIndex === markerIndex) {
      itemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [activeMarkerIndex])

  return (
    <div
      ref={itemRef}
      key={marker.id}
      className={cn(
        'bg-white rounded-lg shadow-lg',
        {
          'bg-[rgba(78,119,247,0.1)]': markerIndex === activeMarkerIndex,
        },
        ' mb-2'
      )}
      onClick={() => {
        onChange(markerIndex)
      }}
    >
      <div className="flex p-4 text-black">
        <div className="w-1/4">
          {marker.img ? (
            <img src={marker.img} alt="" className="rounded-lg" />
          ) : (
            <img
              src="https://via.placeholder.com/75"
              alt=""
              className="rounded-lg"
            />
          )}
        </div>
        <div className="flex-1 pl-4">
          <p
            className={cn('font-bold mb-0 capitalize', {
              'text-blue-3 opacity-80': isNotAvailable,
            })}
          >
            {marker.name}
          </p>
          <p
            className={cn('text-blue-1 mb-2 text-xs', {
              'text-blue-3 opacity-80': isNotAvailable,
            })}
          >
            {marker.openTime24h
              ? 'Open 24 hours'
              : `${marker.openTimeStart} - ${marker.openTimeEnd}`}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center text-sm font-semibold text-white bg-primary w-[25px] h-[25px] mr-[10px] rounded-[3px]">
                P
              </div>
              <p
                className={cn('mb-0 text-sm capitalize', {
                  'opacity-80 text-blue-3': isNotAvailable,
                })}
              >
                {isNotAvailable
                  ? 'No spoto available '
                  : `${marker.availableSpotCount} available`}
              </p>
            </div>
            <div className="flex items-center justify-center text-xs p-[2px_10px] min-w-[60px] h-[22px] rounded-[100px] text-orange-text bg-yellow">
              <p className="mb-0">{marker.distance.toFixed(2)} km</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex items-center p-4 text-black">
        <div
          className={cn('w-1/4 text-center', {
            'text-blue-3 opacity-80': isNotAvailable,
          })}
        >
          <p className="mb-0 text-lg font-bold">${marker.price.perHour}</p>
          <p className="mb-0 text-xs text-blue-1">per hour</p>
        </div>
        <div className="flex-1 pl-4">
          {isNotAvailable ? (
            <Button
              onClick={() => onAdded(marker.id)}
              mode={ButtonMode.SMALL}
              className="w-full h-10 text-sm"
              type="button"
            >
              Add to Waitlist
            </Button>
          ) : (
            <Button
              onClick={() => goToSpot(marker)}
              mode={ButtonMode.SMALL}
              className="w-full h-10 text-sm"
              type="button"
            >
              Select
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

const SetsCarouselDesktop: FC<FindSpotSearchSelectorProps> = ({
  markers,
  ...restProps
}) => {
  const [markerIndex, setMarkerIndex] = useState(0)

  return (
    <div className="h-full py-5">
      <ScrollbarContainer className="h-full pr-2 overflow-x-hidden overflow-y-auto w-[380px]">
        {markers.map((marker: MarkerEntity, idx) => {
          return (
            <SetsCarouselDesktopItem
              key={marker.id}
              marker={marker}
              markerIndex={idx}
              activeMarkerIndex={markerIndex}
              onChange={(idx) => setMarkerIndex(idx)}
              {...restProps}
            />
          )
        })}
      </ScrollbarContainer>
    </div>
  )
}

export default SetsCarouselDesktop
