import React from 'react'
import DashBoardSpot from '@screens/admin/Dashboard/DashboardSpot/DashBoardSpot'
import Loader from '@components/Loader/Loader'
import Car from '@assets/icons/car-45.svg'
import { PageHeaderMobile } from '@components/PageHeader'
import { statisticApi } from '@api/statistic'
import Title from '@components/Title/Title'

const DashBoardMobile = () => {
  const { data: statistic, isLoading: isLoading } =
    statisticApi.endpoints.getStatistics.useQuery()

  return (
    <div className="flex flex-col w-full h-full">
      <PageHeaderMobile title="Dashboard" />
      <Loader loading={isLoading}>
        <main className="pb-[20px] overflow-hidden bg-bg grow">
          <div className="flex flex-col items-center w-full h-[128px] bg-primary">
            <Title
              as="h3"
              className="text-base not-italic font-semibold tracking-normal text-center text-white mt-[25px]"
            >
              Currently occupied spots
            </Title>
            <div>
              <Title
                className="flex items-center mt-[12px] text-4xl not-italic font-semibold tracking-normal text-center text-white"
                as="h1"
              >
                {statistic?.occupiedSpots}
              </Title>
            </div>
          </div>
          <div className="flex justify-center px-[16px] pt-[16px]">
            <div className="flex flex-col items-center w-full pt-[24px] pb-[16px] bg-white shadow-6 h-[183px] rounded-[10px]">
              <Car />
              <Title
                as="h1"
                className="m-0 mt-[16px] text-4xl not-italic font-semibold tracking-normal text-center leading-[51px] text-primary"
              >
                {statistic?.totalSpots}
              </Title>
              <Title
                as="h3"
                className="m-0 text-s-xl not-italic font-medium tracking-normal text-center text-blue-1"
              >
                All Spots
              </Title>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between w-full px-[16px] mx-auto">
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
          </div>
          <div className="flex flex-wrap items-center justify-between w-full px-[16px] mx-auto">
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
    </div>
  )
}

export default React.memo(DashBoardMobile)
