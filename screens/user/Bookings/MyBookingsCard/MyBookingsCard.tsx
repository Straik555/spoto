import React, { FC } from 'react'
import cn from 'classnames'

import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import { SearchSelectorProps } from '@screens/user/Bookings/MyBookingsCard/MyBookingsCard.model'
import ChevronDownIcon from '@assets/icons/arrows/arrow-down-small-bold.svg'
import StarIcon from '@assets/icons/star.svg'
import TouchIcon from '@assets/icons/touch.svg'
import useMyBookingsCard from '@screens/user/Bookings/MyBookingsCard/useMyBookingsCard'

const MyBookingsCard: FC<SearchSelectorProps> = (props) => {
  const {
    location,
    history,
    favourite,
    onExtend,
    onFavorite,
    onEnd,
    onBook,
    isDesktop,
  } = props
  const [state, actions] = useMyBookingsCard(props)
  const {
    bookingPeriod,
    formattedStartTime,
    formattedEndDateTime,
    humanizedBookingDuration,
    isOnGoing,
    open,
    submitDisabled,
    vehicleLabel,
  } = state
  const { setOpen } = actions

  return (
    <div
      className={cn('relative border', {
        'mb-6': history,
        'w-[483px] h-[288px] mx-[4.75px] mb-[15px] rounded-[10px] py-5 px-[25px]':
          isDesktop,
        'rounded-[10px] mb-2 py-4': !isDesktop,
        'bg-[#F0F3FF] border-primary': isOnGoing,
        'bg-white border-blue-2': !isOnGoing,
      })}
    >
      <div
        className={cn({
          'flex flex-col justify-between w-full h-full': isDesktop,
        })}
      >
        <div className={cn({ 'px-4': !isDesktop })}>
          <div className="flex items-center justify-between">
            <span
              className={cn('text-xs leading-[15px] text-[#8d9dcf]', {
                'text-[16px] leading-6': isDesktop,
              })}
            >
              Location
            </span>
            <p
              className={cn('mb-0', {
                'text-xs text-blue-1': !isDesktop,
                'text-base text-gray-400 text-[#8d9dcf]': isDesktop,
              })}
            >
              {bookingPeriod}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={cn(
                'mb-0 mt-[5px] text-black overflow-ellipsis overflow-hidden whitespace-nowrap pr-5 w-max',
                {
                  'text-xl': isDesktop,
                  'max-w-[230px]': !isDesktop,
                }
              )}
            >
              {location}
            </p>
          </div>
        </div>
        <div className="mt-2">
          {!isDesktop && (
            <button
              className="flex items-center mx-[21px]"
              onClick={() => setOpen(!open)}
            >
              <TouchIcon className="mr-[2px]" />
              <span className="ml-1 mr-2 text-xs font-semibold text-primary">
                {open ? 'Less' : 'More'} Booking Info
              </span>
              <div className={cn({ 'rotate-180': open })}>
                <ChevronDownIcon className="stroke-primary" />
              </div>
            </button>
          )}
          {open && (
            <>
              {!isDesktop && <hr className="mt-[16px] border-blue-3" />}
              <div
                className={cn(
                  'rounded-[5px] box-border border border-solid border-blue-2',
                  {
                    'px-[14px] py-[10px] mt-[16px] text-xs mx-[10px]':
                      !isDesktop,
                    'mx-0 py-[14px] px-5 mt-[15px]': isDesktop,
                    'bg-white': isOnGoing,
                    'bg-[#F0F3FF]': !isOnGoing,
                  }
                )}
              >
                <p className="flex justify-between">
                  <span
                    className={cn('text-xs leading-[18px] text-blue-1 ', {
                      'text-[14px] leading-[21px]': isDesktop,
                    })}
                  >
                    Vehicle
                  </span>
                  <span
                    className={cn('font-semibold text-black', {
                      'text-base': isDesktop,
                    })}
                  >
                    {vehicleLabel}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span
                    className={cn('text-xs leading-[18px] text-blue-1', {
                      'text-[14px] leading-[21px]': isDesktop,
                    })}
                  >
                    Booking Length
                  </span>
                  <span
                    className={cn('font-semibold text-black', {
                      'text-base': isDesktop,
                    })}
                  >
                    {humanizedBookingDuration}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span
                    className={cn('text-xs leading-[18px] text-blue-1', {
                      'text-[14px] leading-[21px]': isDesktop,
                    })}
                  >
                    Start - End
                  </span>
                  <span
                    className={cn('font-semibold text-black', {
                      'text-base': isDesktop,
                    })}
                  >
                    {formattedStartTime}
                    <span> - </span>
                    {formattedEndDateTime}
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
        {!isDesktop && (
          <hr
            className={cn('border-blue-3', {
              'mt-[19px]': !open,
              'mt-[16px]': open,
            })}
          />
        )}
        <div
          className={cn('flex items-center justify-between', {
            'px-0 pt-[25px]': isDesktop,
            'px-4 pt-4': !isDesktop,
          })}
        >
          {history ? (
            <>
              {isDesktop ? (
                <div className="flex items-center" onClick={onFavorite}>
                  <StarIcon
                    className={cn('fill-primary', {
                      '!stroke-primary': !favourite,
                    })}
                  />
                  <p
                    className={cn(
                      'text-sm font-semibold mx-[15px] text-blue-2',
                      { '!text-primary': favourite }
                    )}
                  >
                    Add to Favourites
                  </p>
                </div>
              ) : (
                <StarIcon
                  className={cn('stroke-primary', {
                    '!fill-primary': favourite,
                  })}
                  onClick={onFavorite}
                  type="button"
                />
              )}
              <Button
                className={cn('ml-1 w-40 rounded-[5px]', {
                  'w-[247px]': history,
                  'w-[214px] h-11 text-base px-0': isDesktop,
                  '!text-sm h-10': !isDesktop,
                })}
                mode={ButtonMode.SMALL}
                onClick={onBook}
                type="button"
              >
                Book This Spot Again
              </Button>
            </>
          ) : (
            <>
              <Button
                className={cn(
                  'w-40 h-10 whitespace-nowrap flex justify-center text-center rounded-[5px]',
                  {
                    'w-[214px] h-11 text-base bg-[#F0F3FF]': isDesktop,
                    '!text-xs': !isDesktop,
                  }
                )}
                mode={ButtonMode.SMALL_SECONDARY}
                onClick={() => onExtend?.()}
                type="button"
                disabled={submitDisabled}
              >
                Extend Time
              </Button>
              <Button
                className={cn(
                  'h-10 ml-[10px] w-40 whitespace-nowrap rounded-[5px]',
                  {
                    'w-64': history,
                    'w-[214px] h-11 text-base': isDesktop,
                    '!text-xs': !isDesktop,
                  }
                )}
                mode={ButtonMode.SMALL}
                onClick={() => onEnd()}
                type="button"
                disabled={submitDisabled}
              >
                End Parking
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyBookingsCard
