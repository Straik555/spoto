import React, { FC } from 'react'
import { TFindSpotSearchSelector } from '@screens/user/FindSpot/FindSpotSearchSelector/FindSpotSearchSelector.model'
import cn from 'classnames'
import Title from '@components/Title/Title'
import ManIcon from '@assets/icons/man.svg'
import LocationSearch from '@assets/icons/location-search.svg'

const FindSpotSearchSelector: FC<TFindSpotSearchSelector> = ({
  findSpots,
  searchMode,
  setSearchMode,
  desktop,
}) => {
  return (
    <div
      className={cn('pb-4 bg-white rounded-[10px]', {
        'px-4 !mb-4': !desktop,
      })}
    >
      <Title
        className="pt-4 mb-4 text-lg font-semibold text-center text-black"
        noCap
      >
        Find a Spot:
      </Title>
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'flex justify-start items-center w-full mb-2 flex-1 p-[23px_25px_25px_22.55px] border border-solid rounded-md cursor-pointer shadow-[0px_2px_12px_rgba(203,212,238,0.35)]',
            {
              'border-primary': searchMode === 2,
              'border-blue-3': searchMode !== 2,
            }
          )}
          onClick={() => {
            findSpots('auto')
            setSearchMode(2)
          }}
        >
          <ManIcon
            className={cn('fill-primary', { '!fill-blue-2': searchMode !== 2 })}
          />
          <Title
            className={cn(
              'ml-4 mb-0 text-xs text-center text-primary font-semibold',
              {
                '!text-blue-3': searchMode !== 2,
                'text-sm': !desktop,
              }
            )}
          >
            Near my current location
          </Title>
        </div>
        <div
          className={cn(
            'flex justify-start items-center w-full flex-1 p-[26px_25px_26px_22.55px] border border-solid rounded-md cursor-pointer shadow-[0px_2px_12px_rgba(203,212,238,0.35)]',
            {
              'border-blue-500': searchMode === 1,
              'border-blue-3': searchMode !== 1,
            }
          )}
          onClick={() => {
            findSpots('manual')
            setSearchMode(1)
          }}
        >
          <LocationSearch
            className={cn('fill-primary', { '!fill-blue-2': searchMode !== 1 })}
          />
          <Title
            className={cn(
              'ml-4 mb-0 text-xs text-center text-primary font-semibold',
              {
                'text-sm': !desktop,
                'text-blue-3': searchMode !== 1,
              }
            )}
            noCap
          >
            At a Specific Location
          </Title>
        </div>
      </div>
    </div>
  )
}

export default FindSpotSearchSelector
