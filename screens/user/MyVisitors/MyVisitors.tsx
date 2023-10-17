import React, { FC, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Loader } from '@components/Loader'
import Button from '@components/Button'
import { ROUTES } from '@constants/routes'
import Select, { Option } from '@components/Select/Select'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import { PageHeaderMobile } from '@components/PageHeader'
import VisitorsParkingItem from '@screens/user/MyVisitors/VisitorsParkingItem'
import ScrollbarContainer from '@components/ScrollbarContainer/ScrollbarContainer'
import { BookingForVisitorsResult } from '@api/booking/types'
import useVisitors from '@screens/user/MyVisitors/useVisitors'
import { HousesApartmentsByUserResponse } from '@api/house/types'
import cn from 'classnames'

const MyVisitors: FC = () => {
  const [apartments, setApartments] =
    useState<null | HousesApartmentsByUserResponse>(null)
  const router = useRouter()
  const {
    dataHousesApartments,
    isFetchingApartments,
    guests,
    isFetchingVisitors,
  } = useVisitors(apartments?.appartmentId)

  const chooseApartments = useCallback(
    (selectedId: number) => {
      setApartments(
        dataHousesApartments?.find(
          (o: HousesApartmentsByUserResponse) => o.appartmentId === selectedId
        ) || null
      )
    },
    [dataHousesApartments]
  )

  useEffect(() => {
    if (router.query?.appartmentId) {
      setApartments(
        dataHousesApartments?.find(
          (o: HousesApartmentsByUserResponse) =>
            o.appartmentId === Number(router.query?.appartmentId)
        ) || null
      )
    }
  }, [router.query, dataHousesApartments])

  useEffect(() => {
    if (dataHousesApartments.length) {
      setApartments(dataHousesApartments[0])
    }
  }, [dataHousesApartments])
  return (
    <div className="h-screen">
      <Loader loading={isFetchingVisitors || isFetchingApartments}>
        <PageHeaderMobile title="My Visitors" />
        <ScrollbarContainer
          className={cn('w-full overflow-y-auto h-[calc(100%-132px)]')}
        >
          <div className="flex flex-col p-[16px] h-full">
            {dataHousesApartments?.length > 1 && (
              <div className="flex flex-col mb-[16px]">
                <p className="text-s-base font-normal capitalize text-blue-1">
                  Apartment
                </p>
                <Select
                  value={apartments?.appartmentId}
                  placeholder="Select Apartment Number"
                  className="!text-primary !w-full !mt-[5px]"
                  titleClassName="!text-primary"
                  onSelect={chooseApartments}
                  label={apartments?.appartmentNumber}
                >
                  {dataHousesApartments?.map(
                    (item: HousesApartmentsByUserResponse) => {
                      return (
                        <Option
                          key={item.appartmentId}
                          value={item.appartmentId}
                          text={item.appartmentNumber}
                          active={
                            apartments?.appartmentId === item.appartmentId
                          }
                        />
                      )
                    }
                  )}
                </Select>
              </div>
            )}
            {guests?.length ? (
              guests?.map((guest: BookingForVisitorsResult) => (
                <VisitorsParkingItem
                  key={guest.bookingId}
                  appartmentId={guest.apartmentId}
                  from={guest.starts}
                  guestId={guest.bookingId}
                  to={guest.ends}
                  status={guest.status}
                  timeZone={guest.timeZone}
                />
              ))
            ) : (
              <p className="text-center m-auto font-semibold text-s-xxl text-blue-3 pt-[17px]">
                No Bookings
              </p>
            )}
          </div>
        </ScrollbarContainer>
        <div className="px-[16px] w-full mt-[16px]">
          <Button
            onClick={() => {
              const params = {
                pathname: ROUTES.VISITORS_PARKING,
              }
              if (apartments) {
                params['query'] = { appartmentId: apartments?.appartmentId }
              }
              router.push(params)
            }}
            mode={ButtonMode.FULL_PRIMARY}
            icon={ButtonIcon.ADD}
            className="!text-s-lg !font-semibold !w-full !h-[44px] !p-[3px_0_0]"
            iconClassName="!mr-[13px]"
          >
            New Booking
          </Button>
        </div>
      </Loader>
    </div>
  )
}

export default MyVisitors
