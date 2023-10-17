import React, { FC } from 'react'
import cn from 'classnames'
import { TFindSpotSelectCar } from '@screens/user/FindSpot/FindSpotSelectCar/FindSpotSelectCar.model'
import Title from '@components/Title/Title'
import Car from '@assets/icons/map-car.svg'
import Charging from '@assets/icons/charging-16.svg'
import ArrowDownSolid from '@assets/icons/arrows/arrow-down-solid.svg'

const FindSpotSelectCar: FC<TFindSpotSelectCar> = ({
  active,
  charging,
  price,
  onClick,
  isEmpty,
  availableSpotCount,
}) => {
  return (
    <div
      className={cn(
        'relative mx-2 bg-white rounded cursor-pointer w-[85px] -mt-[71px] shadow-3',
        { '!bg-primary': active }
      )}
      onClick={onClick}
    >
      {charging && (
        <div className="absolute flex items-center justify-center rounded-full -top-2 -left-2 p-[2px] bg-light-green w-[22px] h-[22px]">
          <Charging className="fill-green" />
        </div>
      )}
      {!!availableSpotCount && (
        <div className="absolute flex items-center justify-center font-semibold rounded-full -top-2 -right-2 w-[22px] h-[22px] bg-yellow text-orange-text text-s-xs">
          {availableSpotCount}
        </div>
      )}
      <div className="right-0 flex flex-col items-center pt-1 text-xs text-black rounded pb-[5px] bottom-full">
        <div
          className={cn(
            'flex justify-center items-center w-full px-2.5 mb-[7px]',
            {
              '!text-blue-3 !opacity-80': isEmpty,
            }
          )}
        >
          <Car
            className={cn('fill-blue-1 mt-[6px]', {
              '!fill-white': active && !isEmpty,
              '!fill-blue-3': isEmpty,
            })}
          />
        </div>
        <Title
          noCap
          className={cn('text-base font-semibold text-black', {
            '!text-white': active,
            '!text-blue-3 !opacity-80': isEmpty,
          })}
        >
          {price && Math.min(...price) > 0 ? `$${Math.min(...price)}` : 'FREE'}
          {price &&
            Math.max(...price) > Math.min(...price) &&
            `- $${Math.max(...price)}`}
        </Title>
        <ArrowDownSolid
          className={cn(
            'absolute text-white h-2 w-full left-0 top-full fill-current',
            { '!fill-[#4e77f7]': active }
          )}
        />
      </div>
    </div>
  )
}

export default FindSpotSelectCar
