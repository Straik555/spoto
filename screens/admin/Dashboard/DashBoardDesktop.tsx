import React from 'react'
import { PageContent } from '@components/Layout/PageContent'
import { useSpotoMediaQuery } from '@hooks/useMediaQuery'
import DashBoardSpot from '@screens/admin/Dashboard/DashboardSpot/DashBoardSpot'
import Loader from '@components/Loader/Loader'
import Car74 from '@assets/icons/car-74.svg'
import Car100 from '@assets/icons/car-100.svg'
import { statisticApi } from '@api/statistic'
import Title from '@components/Title/Title'
import cn from 'classnames'

const SpotsDesktop = () => {
  const { data: statistic, isLoading: isLoading } =
    statisticApi.endpoints.getStatistics.useQuery()
  const { maxWidth1366 } = useSpotoMediaQuery()

  return (
    <PageContent title="Dashboard">
      <Loader loading={isLoading}>
        <main className={cn('overflow-hidden w-full h-auto')}>
          <div className="flex flex-col items-center w-full h-[200px] bg-primary rounded-[10px]">
            <Title
              as="h3"
              className="not-italic font-semibold tracking-normal text-center text-white text-s-2xl mt-[35px]"
            >
              Currently occupied spots
            </Title>
            <div>
              <Title
                className="flex items-center not-italic font-semibold tracking-normal text-center text-white mt-[12px] text-[56px] leading-[86px]"
                as="h1"
              >
                {statistic?.occupiedSpots}
              </Title>
            </div>
          </div>
          <div className={cn('flex mt-[15px] justify-start flex-wrap')}>
            <div
              className={cn(
                'flex flex-col items-center w-[343px] pb-[16px] bg-white shadow-6 р-[183px] rounded-[10px] mb-[15px]',
                {
                  'w-[483px] mr-[15px] pt-[35px] ': !maxWidth1366,
                  'w-[250px] mr-[10px] pt-[30px] ': maxWidth1366,
                }
              )}
            >
              {!maxWidth1366 && <Car100 />}
              {maxWidth1366 && <Car74 />}
              <Title
                as="h1"
                className={cn(
                  'm-0 text-4xl not-italic font-semibold tracking-normal text-center leading-[51px] text-primary',
                  {
                    '!text-[56px] !leading-[86px] !mt-[15px]': !maxWidth1366,
                    '!text-[34px] !leading-[51px] !mt-[30px]': maxWidth1366,
                  }
                )}
              >
                {statistic?.totalSpots}
              </Title>
              <Title
                as="h3"
                className={cn(
                  'm-0 not-italic font-normal tracking-normal text-center text-blue-1',
                  {
                    'text-s-2xl mt-[5px]': !maxWidth1366,
                    'text-s-lg mt-[5px]': maxWidth1366,
                  }
                )}
              >
                All spots
              </Title>
            </div>
            <DashBoardSpot
              title="Unlinked Spots"
              value={statistic?.unlinkedSpots}
              total={statistic?.totalSpots}
            />
            <DashBoardSpot
              title="Booked In Next 24hrs "
              value={statistic?.bookingsIn24Hours}
              total={statistic?.totalSpots}
            />
            <DashBoardSpot
              classNameTitle="w-10"
              title="Total Users"
              value={statistic?.totalUsers}
              total={statistic?.totalUsers}
            />
            <DashBoardSpot
              title="Unconfirmed Users"
              value={statistic?.unlinkedUsers}
              total={statistic?.totalUsers}
            />
          </div>
        </main>
      </Loader>
    </PageContent>
  )
}

export default React.memo(SpotsDesktop)
