import React, { FC, useMemo, useState } from 'react'
import cn from 'classnames'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

import { PageHeaderMobile } from '@components/PageHeader'
import Select from '@components/Select'
import { Option } from '@components/Select/Select'
import Available from '@assets/icons/large-icons/car-available.svg'
import Occupied from '@assets/icons/large-icons/car-occupied.svg'
import { statisticApi } from '@api/statistic'
import { houseApi } from '@api/house'
import Loader from '@components/Loader/Loader'
import Title from '@components/Title/Title'

const Dashboard: FC = () => {
  const [selectedHouseId, setSelectedHouseId] = useState<number>(0)

  const { data: houses } = houseApi.endpoints.getHousesByUser.useQuery()

  const { data: statistic, isLoading } =
    statisticApi.endpoints.getStatisticsByHouse.useQuery({
      houseId: selectedHouseId,
    })

  const selectedHouse = useMemo(
    () => houses?.find((b) => b.id === selectedHouseId),
    [houses, selectedHouseId]
  )

  const { data, defaultData } = useMemo(() => {
    const { availableSpots = 0, occupiedSpots = 0 } = statistic || {}
    return {
      data: [
        {
          name: 'occupiedSpots',
          value: occupiedSpots,
        },
        {
          name: 'availableSpots',
          value: availableSpots,
        },
      ],
      defaultData: [
        {
          id: 1,
          count: statistic?.availableSpots || 0,
          subTitle: 'Available',
          icon: <Available />,
        },
        {
          id: 2,
          count: statistic?.occupiedSpots || 0,
          subTitle: 'Occupied',
          icon: <Occupied />,
        },
      ],
    }
  }, [statistic])

  return (
    <>
      <PageHeaderMobile title="Dashboard" />
      <Loader loading={isLoading}>
        <div className="flex flex-col w-full px-[16px] pt-[10px] bg-primary">
          <p className="text-blue-2 mb-[5px]">Building</p>
          <Select
            className="mb-[63px] !mt-0"
            placeholderClassName="pr-[25px]"
            value={selectedHouse?.address}
            label={selectedHouse?.address}
            placeholder="All"
            onSelect={(selectedId) => {
              setSelectedHouseId(selectedId)
            }}
          >
            {houses?.map((item) => (
              <Option
                value={item.id}
                key={item.id}
                text={item.address}
                active={selectedHouseId === item.id}
              />
            ))}
          </Select>
          <div className="relative w-full h-[203px] mb-[60px]">
            <ResponsiveContainer width="100%" height="100%" className="mx-auto">
              <PieChart width={203} height={203}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  startAngle={90}
                  endAngle={-270}
                  innerRadius={80}
                  outerRadius={100}
                  fill="black"
                  dataKey="value"
                >
                  <Cell fill="#F74E4E" />
                  <Cell fill="#2AD99A" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute left-0 flex flex-col items-center w-full top-[66px]">
              <Title noCap className="text-4xl font-semibold text-white">
                {statistic?.totalSpots || 0}
              </Title>
              <p className="font-semibold text-s-lg text-blue-2">Total Spots</p>
            </div>
          </div>
        </div>
        <div className="w-full p-4 h-hull">
          {defaultData.map((item) => (
            <div
              className={cn(
                'flex items-center justify-between p-[20px_56px_21px_35px] shadow-[0px_-3px_28px_rgba(42,43,46,0.1)] rounded-[10px]',
                { 'mb-[5px]': defaultData.length !== item.id }
              )}
              key={item.id}
            >
              {item.icon}
              <div>
                <div className="flex items-center">
                  <div
                    className={cn(
                      'w-[10px] h-[10px] bg-[#2AD99A] rounded-full mr-[12px]',
                      { '!bg-[#F74E4E]': item.subTitle === 'Occupied' }
                    )}
                  />
                  <p className="text-4xl font-semibold text-primary">
                    {item.count}
                  </p>
                </div>
                <p className="text-lg font-medium text-blue-1">
                  {item.subTitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Loader>
    </>
  )
}

export default Dashboard
