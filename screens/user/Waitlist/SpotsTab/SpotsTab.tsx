import ScrollbarContainer from '@components/ScrollbarContainer/ScrollbarContainer'
import React from 'react'
import cn from 'classnames'
import Link from 'next/link'
import SpotsTabCard from '@screens/user/Waitlist/SpotsTab/SpotsTabCard'
import { TSpotsTab } from '@screens/user/Waitlist/WaitList.model'
import { useGroupedWaitList } from '@screens/user/Waitlist/SpotsTab/hooks'
import { Button } from '@components/index'
import { ButtonMode } from '@components/Button/Button.model'
import { useDateUtil } from '@hooks/useDateUtil'
import { ROUTES } from '@constants/routes'
import Loader from '@components/Loader/Loader'

const SpotsTab: React.FC<TSpotsTab> = (props) => {
  const { spots, onDelete, isDesktop, isLoading } = props
  const dateUtil = useDateUtil()

  const groupedUpcomingSpots = useGroupedWaitList(spots, (a, b) =>
    a.isAfter(b) ? 1 : -1
  )

  return (
    <Loader loading={isLoading}>
      {spots?.length ? (
        <ScrollbarContainer
          className={cn('overflow-y-auto', {
            'px-[16px] mt-[16px]': !isDesktop,
            'py-[15px]': isDesktop,
          })}
        >
          {groupedUpcomingSpots?.map(([date, spoto]) => {
            const isToday = dateUtil(date).isToday()
            return (
              <div key={date}>
                <div
                  className={cn(
                    'w-full mb-[16px] font-semibold text-center text-blue-1 text-s-sm',
                    { '!text-lg': isDesktop }
                  )}
                >
                  {isToday ? 'Today' : date}
                </div>
                <div className={cn({ 'flex flex-wrap': isDesktop })}>
                  {spoto.map((spot) => (
                    <SpotsTabCard
                      key={spot.id}
                      location={spot.placeName}
                      starts={spot.time.start}
                      ends={spot.time.end}
                      isAvailable={spot.isAvailable}
                      perHour={spot.placePricePerHour}
                      onDelete={() => onDelete(spot.id)}
                      isDesktop={isDesktop}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </ScrollbarContainer>
      ) : (
        <div
          className={cn('text-center', {
            'mt-[123px]': isDesktop,
            'p-[16px] flex flex-col h-screen': !isDesktop,
          })}
        >
          <div
            className={cn('font-semibold text-blue-3 text-s-xl', {
              'mb-[25px]': isDesktop,
              'flex flex-col items-center justify-center h-full': !isDesktop,
            })}
          >
            Add to your waitlist any unavailable parking spot to be notified
            when it becomes available
          </div>
          <Link href={{ pathname: ROUTES.HOME }}>
            <a>
              <Button
                className={cn({
                  'w-[270px] h-[50px] text-lg': isDesktop,
                  'mt-auto': !isDesktop,
                })}
                mode={ButtonMode.FULL_PRIMARY}
              >
                Find a Spot
              </Button>
            </a>
          </Link>
        </div>
      )}
    </Loader>
  )
}

export default SpotsTab
