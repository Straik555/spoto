import React, { FC } from 'react'
import cn from 'classnames'
import { Button } from '@components/index'
import Title from '@components/Title/Title'
import { ButtonMode } from '@components/Button/Button.model'
import { TFindSpotNothingFound } from '@screens/user/FindSpot/FindSpotNothingFound/FindSpotNothingFound.model'
import NothingFoundImg from '@assets/icons/large-icons/nothing-found.svg'

const FindSpotNothingFound: FC<TFindSpotNothingFound> = ({
  onClose,
  isNotAvailable,
  desktop,
}) => {
  return (
    <div
      className={cn(
        'bg-white flex flex-col justify-center items-center min-w-[343px] h-[300px] w-full m-[0_auto_16px] rounded-[10px] p-[38.6px_0_16px] shadow-1',
        {
          'shadow-none box-border': desktop,
        }
      )}
    >
      <div>
        <NothingFoundImg />
      </div>
      {!isNotAvailable ? (
        <Title
          as="h5"
          noCap
          className="text-sm font-semibold text-black mt-[25.4px] mb-[5px]"
        >
          All parking spots for this location are booked
        </Title>
      ) : (
        <>
          <Title as="h5" className="text-black font-semibold text-sm mt-5 mb-2">
            No available spots
          </Title>
          <p className="mb-0 text-xs font-normal text-blue-1">
            Please change the search date and time
          </p>
        </>
      )}
      <hr className="w-full mt-[18px] mb-4 -mx-4 text-primary" />
      <div className="w-full px-4">
        <Button
          mode={ButtonMode.SMALL}
          className={cn('w-full !text-s-sm h-10 capitalize', {
            'p-0': isNotAvailable,
          })}
          onClick={onClose}
        >
          change Search
        </Button>
      </div>
    </div>
  )
}

export default FindSpotNothingFound
