import { useSpotoMediaQuery } from '@hooks/useMediaQuery'
import React, { useEffect, useState } from 'react'
import { Cell, Pie, PieChart } from 'recharts'
import { DashBoardSpotProps } from '@screens/admin/Dashboard/DashboardSpot/DashBoardSpot.model'
import Title from '@components/Title/Title'
import cn from 'classnames'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

const DashBoardSpot: React.FC<DashBoardSpotProps> = ({
  classNameTitle,
  title,
  value = 0,
  total = 1,
}) => {
  const data = [
    { name: '', value },
    { name: '', value: total - value },
  ]
  const { isDesktop } = useDeviceInfo()
  const { maxWidth1366 } = useSpotoMediaQuery()

  const [chartDimensions, setChartDimensions] = useState({
    width: 44,
    innerRadius: 10,
    outerRadius: 22,
  })

  useEffect(() => {
    if (!maxWidth1366 && isDesktop)
      setChartDimensions({
        width: 75,
        innerRadius: 20,
        outerRadius: 37,
      })
    if (maxWidth1366 && isDesktop)
      setChartDimensions({
        width: 64,
        innerRadius: 15,
        outerRadius: 32,
      })
    if (!isDesktop)
      setChartDimensions({
        width: 44,
        innerRadius: 10,
        outerRadius: 22,
      })
  }, [isDesktop, maxWidth1366])

  return (
    <div
      className={cn(
        'flex flex-col items-center px-7 pb-4 h-full rounded-[10px] shadow-6 bg-white',
        {
          'min-w-[234px] w-[234px] h-[310px] pt-[49px] mr-[15px] mb-[15px]':
            !maxWidth1366 && isDesktop,
          'min-w-[195px] w-[195px] h-[240px] pt-[30px] mr-[8px] mb-[15px]':
            maxWidth1366 && isDesktop,
          'min-w-[169px] w-[calc(50%-3px)] h-[179px] mt-1 pt-[20px]':
            !isDesktop,
        }
      )}
    >
      <PieChart width={chartDimensions.width} height={chartDimensions.width}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          startAngle={-90}
          endAngle={270}
          innerRadius={chartDimensions.innerRadius}
          outerRadius={chartDimensions.outerRadius}
          fill="black"
          dataKey="value"
        >
          <Cell fill="#4E77F7" />
          <Cell fill="#B9CAFF" />
        </Pie>
      </PieChart>
      <Title
        noCap
        as="h1"
        className={cn(
          'm-0 not-italic font-semibold text-center text-primary ',
          {
            'mt-[50px] text-4xl leading-[54px]': !maxWidth1366 && isDesktop,
            'mt-[30px] text-3xl leading-[45px]': maxWidth1366 && isDesktop,
            'mt-[15px] text-[28px] leading-[42px]': !isDesktop,
          }
        )}
      >
        {value}
      </Title>
      <Title
        noCap
        as="h3"
        className={cn(
          'not-italic text-center  text-blue-1',
          {
            'text-s-lg mt-[9px] !w-full font-normal':
              !maxWidth1366 && isDesktop,
            'text-s-sm mt-[5px] !w-full font-normal': maxWidth1366 && isDesktop,
            'text-s-base mt-0 max-w-[114px] font-normal': !isDesktop,
          },
          classNameTitle
        )}
      >
        {title}
      </Title>
    </div>
  )
}

export default React.memo(DashBoardSpot)
