import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import { FindSpotFormValues } from '@screens/user/FindSpot/FindSpot.model'
import React, { FC } from 'react'
import Slider from 'react-slick'
import cn from 'classnames'
import Button from '@components/Button'
import Title from '@components/Title/Title'
import { ButtonMode } from '@components/Button/Button.model'
import { FindSpotSearchSelectorProps } from '@screens/user/FindSpot/FindSpotSetsCarousel/FindSpotSetsCarousel.model'
import { MarkerEntity } from '@screens/admin/Sets/ServerEntities.model'
import Charging from '@assets/icons/charging-16.svg'

const FindSpotSetsCarousel: FC<FindSpotSearchSelectorProps> = ({
  markers,
  goToSpot,
  onAdded,
}) => {
  const { values } = useTypedFormikContext<FindSpotFormValues>()

  const content = markers.map((marker: MarkerEntity) => {
    const isNotAvailable = !marker.availableSpotCount
    return (
      <div
        key={marker.id}
        className={cn('m-0 bg-white rounded-lg shadow-lg !w-[343px] ', {
          '!mx-auto': markers.length === 1,
          'mx-[2.5px]': markers.length > 1,
        })}
      >
        <div className="flex p-4 text-black">
          <div className="flex-1">
            <div className="flex items-center justify-between w-full">
              <Title
                as="h5"
                className={cn('font-semibold mb-0', {
                  'text-blue-3 opacity-80': isNotAvailable,
                })}
              >
                {marker.name}
              </Title>
              {(marker.electricCharger.type1 ||
                marker.electricCharger.type2) && (
                <div
                  className={cn(
                    'flex items-center justify-center p-[2px] bg-light-green w-[22px] h-[22px] rounded-full',
                    {
                      'opacity-50': isNotAvailable,
                    }
                  )}
                >
                  <Charging className="fill-green" />
                </div>
              )}
            </div>
            <p
              className={cn('text-blue-1 mt-[7px] text-left text-sm', {
                'text-blue-3 opacity-80': isNotAvailable,
              })}
            >
              {marker.openTime24h
                ? 'Open 24/7'
                : `${marker.openTimeStart} - ${marker.openTimeEnd}`}
            </p>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <div
                  className={cn(
                    'flex items-center justify-center text-sm font-semibold text-white bg-primary w-[25px] h-[25px] mr-[10px] rounded-[3px]',
                    {
                      'opacity-80 bg-blue-4': isNotAvailable,
                    }
                  )}
                >
                  P
                </div>
                <p
                  className={cn('mb-0 text-s-sm capitalize', {
                    'opacity-80 text-blue-3': isNotAvailable,
                  })}
                >
                  {isNotAvailable
                    ? 'No spoto available '
                    : `${marker.availableSpotCount} available`}
                </p>
              </div>
              <div
                className={cn(
                  'flex items-center justify-center text-xs p-[2px_10px] min-w-[60px] h-[22px] rounded-[100px] text-orange-text bg-yellow',
                  {
                    '!opacity-80 !text-blue-1 !bg-blue-4': isNotAvailable,
                  }
                )}
              >
                <p className="mb-0">{marker.distance.toFixed(2)} km</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex items-center justify-between p-4 text-black">
          {marker.price.perHour > 0 ? (
            <div className="w-1/4 text-center">
              <Title
                noCap
                className={cn(
                  'flex flex-col items-start mb-0 text-sm font-semibold text-black',
                  {
                    '!text-lg': marker?.price?.perDay === 0,
                    '!text-blue-3 opacity-80': isNotAvailable,
                  }
                )}
              >
                <span>
                  ${marker?.price?.perHour}/hr{' '}
                  {marker?.price?.perDay > 0 && 'or'}
                </span>
                {marker?.price?.perDay > 0 && (
                  <span className="mt-[6px]">${marker?.price?.perDay}/day</span>
                )}
              </Title>
            </div>
          ) : (
            <Title
              noCap
              className={cn('mb-0 text-lg text-black font-semibold', {
                '!text-blue-3 opacity-80': isNotAvailable,
              })}
            >
              Free
            </Title>
          )}
          <>
            {isNotAvailable ? (
              <Button
                onClick={() => onAdded(marker.id)}
                mode={ButtonMode.SMALL}
                className="h-10 capitalize text-s-sm w-[218px] !p-0"
                type="button"
              >
                Add this spot to my Waitlist
              </Button>
            ) : (
              <Button
                onClick={() => goToSpot(marker)}
                mode={ButtonMode.SMALL}
                className="h-10 text-base w-[218px]"
                type="button"
              >
                Select
              </Button>
            )}
          </>
        </div>
      </div>
    )
  })

  return (
    <div className="mb-4 text-center">
      {markers?.length > 1 ? (
        <Slider
          {...{
            className: 'center',
            centerMode: true,
            infinite: true,
            slidesToShow: 1,
            variableWidth: true,
            speed: 500,
            docs: false,
            arrows: false,
            centerPadding: '10px',
          }}
        >
          {content}
        </Slider>
      ) : (
        <div className="w-full">{content}</div>
      )}
    </div>
  )
}

export default FindSpotSetsCarousel
