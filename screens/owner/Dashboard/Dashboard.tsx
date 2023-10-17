import React, { ReactElement, useEffect, useState } from 'react'
import { Cell, Pie, PieChart } from 'recharts'
import Link from 'next/link'
import Slider from 'react-slick'
import { Loader } from '@components/Loader'
import bookingApi from '@api/booking'
import { profileApi } from '@api/profile'
import { spotApi } from '@api/spot'
import HouseIcon from '@assets/icons/large-icons/house-icon-183.svg'
import { useIsClient } from '@screens/owner/Spots/hooks/useIsClient'
import SpotsSpot from '@screens/owner/Spots/SpotsSpot'
import { PageHeaderMobile } from '@components/PageHeader'
import ReservationCard from '../Reservations/ReservationCard'
import { ROUTES, Url } from '@constants/routes'
import { SpotAvailabilityState } from '@api/spot/types'
import Button from '@components/Button/Button'
import { ButtonMode } from '@components/Button/Button.model'

type LegendProps = {
  color: string
  label: string
  value: number
}

const Legend: React.FC<LegendProps> = (props) => {
  const { color, value = 0, label = '' } = props
  return (
    <div className="px-4 py-3 font-semibold text-white bg-blue-5 rounded-xl w-[116px]">
      <div className="flex item-center leading-[30px] text-[24px]">
        <div
          className="my-auto rounded-full w-[10px] h-[10px] mr-[10px]"
          style={{ backgroundColor: color }}
        />
        {value}
      </div>
      <div className="text-lg uppercase ml-[20px]">{label}</div>
    </div>
  )
}

type InfoContainerProps = {
  children: ReactElement | null
  href: Url
  title: string
}

const InfoContainer: React.FC<InfoContainerProps> = ({
  children,
  href,
  title,
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between pr-4 mb-3 font-semibold">
        <div className="text-s-xl">{title}</div>
        <Link href={href}>
          <a className="text-s-lg">See all</a>
        </Link>
      </div>
      <div>{children}</div>
    </div>
  )
}

const Dashboard: React.FC = () => {
  const {
    data: reservationsList = [],
    isLoading,
    isFetching,
  } = bookingApi.endpoints.getUpcomingBookingsByOwner.useQuery({})
  const isClient = useIsClient()

  const [becomePersonalOwner] =
    profileApi.endpoints.becomePersonalOwner.useMutation()

  const { data: spotsList = [] } = spotApi.endpoints.getSpotsByUser.useQuery({
    /** need to implement pagination for spots endpoint */
    // PerPage: 4,
  })
  const [privateBookings, setPrivateBookings] = useState<number>(0)
  const [publicBookings, setPublicBookings] = useState<number>(0)

  useEffect(() => {
    if (reservationsList.length) {
      const privateList = reservationsList.filter(
        (item) => item.placeAvailability === SpotAvailabilityState.PRIVATE
      )
      const publicList = reservationsList.filter(
        (item) => item.placeAvailability === SpotAvailabilityState.PUBLIC
      )
      setPrivateBookings(privateList.length)
      setPublicBookings(publicList.length)
    }
  }, [reservationsList])

  const data = [
    {
      name: '',
      value: privateBookings,
    },
    {
      name: '',
      value: publicBookings,
    },
  ]

  return (
    <div className="flex flex-col h-full">
      <PageHeaderMobile title="Dashboard" />

      {isClient && (
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center text-center px-7">
            <HouseIcon />
            <p className="mb-5 mt-[30px] text-center text-base font-semibold">
              Become a personal owner?
            </p>
            <Button
              mode={ButtonMode.FULL_PRIMARY}
              className="inline-block w-auto px-[37px] py-[10px] m-auto text-base !font-semibold"
              onClick={() => becomePersonalOwner()}
            >
              Submit
            </Button>
          </div>
        </div>
      )}

      <div className="grow">
        {!isClient && (
          <Loader loading={isLoading || isFetching}>
            <div className="flex justify-between p-6 bg-primary">
              <div className="relative w-[175px] h-[175px]">
                <PieChart width={175} height={175}>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={87}
                    fill="black"
                    dataKey="value"
                    stroke="none"
                  >
                    <Cell fill="#2AD99A" />
                    <Cell fill="#F3F94E" />
                  </Pie>
                </PieChart>
                <div className="absolute top-0 flex flex-col justify-center item-center w-[175px] h-[175px]">
                  <div className="font-semibold text-center text-white text-[32px]">
                    {privateBookings + publicBookings}
                  </div>
                  <div className="flex-col text-center uppercase text-blue-1">
                    Reservations
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <Legend
                  color="#2AD99A"
                  label="Private"
                  value={privateBookings}
                />
                <Legend color="#F3F94E" label="Public" value={publicBookings} />
              </div>
            </div>

            <div className="py-4 pl-4">
              <InfoContainer
                href={{ pathname: ROUTES.OWNER_RESERVATIONS }}
                title="Reservations"
              >
                {reservationsList.length ? (
                  <Slider
                    {...{
                      className: 'ml-[-4px] h-[175px]',
                      centerMode: true,
                      infinite: true,
                      slidesToShow: 1,
                      variableWidth: true,
                      speed: 500,
                      docs: false,
                      arrows: false,
                      centerPadding: '35px',
                    }}
                  >
                    {reservationsList.slice(0, 4).map((item) => (
                      <ReservationCard
                        key={item.id}
                        {...item}
                        className="mr-2 w-[calc(100vw-35px)]"
                      />
                    ))}
                  </Slider>
                ) : null}
              </InfoContainer>
              <InfoContainer
                href={{ pathname: ROUTES.OWNER_SPOTS }}
                title="My Spots"
              >
                {spotsList.length ? (
                  <div className="pr-4 grid grid-cols-2 gap-2">
                    {spotsList.slice(0, 4).map((spot) => {
                      return (
                        <SpotsSpot
                          key={spot.id}
                          id={spot.id}
                          linked={spot.linked}
                          name={spot.name}
                          availabilityState={spot.availabilityState}
                          price={spot.price}
                        />
                      )
                    })}
                  </div>
                ) : null}
              </InfoContainer>
            </div>
          </Loader>
        )}
      </div>
    </div>
  )
}

export default Dashboard
