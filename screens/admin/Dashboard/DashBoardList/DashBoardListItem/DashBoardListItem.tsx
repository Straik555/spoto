import { SpotInfo } from '@api/spot/types'
import SpotCard from '@screens/admin/Spots/SpotCard'
import { ROUTES } from '@constants/routes'
import { DashBoardListItemProps } from '@screens/admin/Dashboard/DashBoardList/DashBoardListItem/DashBoardListItem.model'
import cn from 'classnames'
import { useRouter } from 'next/router'
import React from 'react'
import Title from '@components/Title/Title'
import s from './DashBoardListItem.module.css'

const DashBoardListItem: React.FC<DashBoardListItemProps> = ({ set }) => {
  const router = useRouter()

  return (
    <div
      className={cn(
        'bg-white border border-[#edf0fb] px-[20px] py-[15px] w-full rounded-[10px] mb-[15px] shadow-1'
      )}
      onClick={() =>
        router.push({
          pathname: ROUTES.ADMIN_SET_DETAILS,
          query: { setId: set.id },
        })
      }
    >
      <section className="flex justify-between pb-4 border-b border-solid border-blue-4">
        <Title as="h3" noCap className="text-xl font-semibold">
          {set.name}
        </Title>
      </section>
      <section className="border-b border-solid pt-2.5 pb-2.5 border-blue-4">
        <div className="flex justify-between mb-0.5">
          <span className="font-normal text-blue-1 text-[10px] leading-[15px]">
            Working hours
          </span>
          <span className="text-xs font-semibold text-black">
            {`${set.workingTime.start} - ${set.workingTime.end}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-normal text-blue-1 text-[10px] leading-[15px]">
            Commercial hours
          </span>
          <span className="text-xs font-semibold text-black">
            {`${set.commercialTime.start} - ${set.commercialTime.end}`}
          </span>
        </div>
      </section>
      <section>
        <Title as="h4" noCap className="text-xs text-blue-1 mt-2.5">
          Sport
        </Title>
        <div className={cn(s.spotsContainer)}>
          {set.spots?.map((spot: SpotInfo, index: number) => (
            <SpotCard
              key={index}
              id={spot.name}
              status={spot.linked}
              electricCharger={spot.electricCharger}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default React.memo(DashBoardListItem)
