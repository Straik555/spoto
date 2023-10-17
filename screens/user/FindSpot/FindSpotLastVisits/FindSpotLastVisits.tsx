import React, { FC, MouseEvent } from 'react'
import cn from 'classnames'
import { TFindSpotLastVisits } from '@screens/user/FindSpot/FindSpotLastVisits/FindSpotLastVisits.model'
import CloseImg from '@assets/icons/close-24.svg'

const FindSpotLastVisits: FC<TFindSpotLastVisits> = ({
  list,
  onClear,
  onChoose,
  desktop = false,
}) => {
  return list.length ? (
    <div className="flex-col mt-4">
      <p
        className={cn('text-blue-2 font-normal mb-0 text-sm', {
          '!text-xs': desktop,
        })}
      >
        Previous Searches
      </p>
      {list.map((last, idx) => {
        return idx < 10 ? (
          <div
            className="flex justify-between items-center cursor-pointer mt-5"
            key={last.id}
            onClick={() => onChoose(last.searchQuery)}
          >
            <p
              className={cn(
                'mb-0 text-base w-full overflow-ellipsis overflow-hidden whitespace-nowrap',
                {
                  'text-sm': desktop,
                }
              )}
            >
              {last.searchQuery}
            </p>
            <button
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                onClear(last.id)
              }}
              className="ml-[5px]"
            >
              <CloseImg className="fill-blue-3" />
            </button>
          </div>
        ) : null
      })}
    </div>
  ) : null
}

export default FindSpotLastVisits
