import React, { FC, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { toast } from 'react-toastify'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import { Button } from '@components/index'
import { ROUTES } from '@constants/routes'
import { PageHeaderMobile } from '@components/PageHeader'
import Loader from '@components/Loader/Loader'
import { dateFormats } from '@constants/global'
import { useDateUtil } from '@hooks/useDateUtil'
import VisitorsParkingCancel from '@screens/user/MyVisitors/VisitorsParkingCancel'
import bookingApi from '@api/booking'
import {
  VisitorsParkingDetailsProps,
  DetailParkingProps,
} from '@screens/user/MyVisitors/VisitorsParkingDetails/VisitorsParkingDetails.model'
import { useShareLink } from '@hooks/useShareLink'
import { BookingForVisitorsResult } from '@api/booking/types'
import Title from '@components/Title/Title'
import { STATUS_FIELDS } from '@screens/user/MyVisitors/constants'
import Share from '@assets/icons/share.svg'
import useVisitors from '@screens/user/MyVisitors/useVisitors'

const DetailParking: FC<DetailParkingProps> = ({
  title,
  subTitle,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col w-[170px] overflow-ellipsis overflow-hidden whitespace-nowrap items-start justify-start mb-[15px]',
        className
      )}
    >
      <span className="font-normal capitalize text-s-base text-blue-1">
        {title}
      </span>
      <p className="mb-0 font-normal text-s-base">{subTitle}</p>
    </div>
  )
}

const VisitorsParkingDetails: FC<VisitorsParkingDetailsProps> = ({
  guestId,
  appartmentId,
}) => {
  const dateUtil = useDateUtil()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { guests, isFetchingVisitors } = useVisitors(Number(appartmentId))

  const [cancelGuest, { isLoading, isSuccess, isError, error }] =
    bookingApi.endpoints.cancelOrEndBooking.useMutation()

  const guest = useMemo(() => {
    return guests.find(
      (guest: BookingForVisitorsResult) => guest?.bookingId === guestId
    )
  }, [guests])

  const { share } = useShareLink({
    url: `${window.location.origin}${ROUTES.PARKING_INVITATION}?bookingReferenceId=${guest?.bookingReferenceId}`,
  })

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false)
      router.push({ pathname: ROUTES.MY_VISITORS })
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError && error) {
      toast.error((error as any)?.data?.message)
    }
  }, [isError, error])

  return (
    <Loader loading={isFetchingVisitors || isLoading}>
      <PageHeaderMobile
        title="Details"
        backButtonLink={{
          pathname: ROUTES.MY_VISITORS,
          query: { appartmentId },
        }}
        showBackButton
      />
      <div className="flex flex-col justify-between p-[16px] bg-bg h-[calc(100vh_-_56px)]">
        <div className="flex flex-col">
          <div>
            <Title as="p" className="text-s-lg mb-[5px] !font-semibold">
              details
            </Title>
            <span className="text-s-base text-blue-1">Status</span>
            <p
              className={cn(
                'mb-[14px] font-normal text-s-base mt-[2px] capitalize',
                {
                  'text-orange-text': guest?.status === STATUS_FIELDS.PENDING,
                  'text-green': guest?.status === STATUS_FIELDS.ACTIVE,
                  'text-red': guest?.status === STATUS_FIELDS.DECLINE,
                  'text-orange': guest?.status === STATUS_FIELDS.CANCELLED,
                }
              )}
            >
              {guest?.status === STATUS_FIELDS.DECLINE
                ? 'Declined by visitor'
                : guest?.status === STATUS_FIELDS.ACTIVE
                ? 'Active'
                : guest?.status}
            </p>
            <div className="flex items-center justify-between w-full">
              <DetailParking
                title="Building Name"
                subTitle={String(guest?.houseName)}
              />
              <DetailParking
                title="Apartment"
                subTitle={String(appartmentId)}
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <DetailParking
                title="From"
                subTitle={String(
                  guest?.timeZone &&
                    dateUtil(guest?.starts)
                      .tz(guest?.timeZone)
                      .format(dateFormats.display3)
                )}
              />
              <DetailParking
                title="Start"
                subTitle={String(
                  guest?.timeZone &&
                    dateUtil(guest?.starts)
                      .tz(guest?.timeZone)
                      .format(dateFormats.timeDisplay0)
                )}
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <DetailParking
                title="To"
                subTitle={String(
                  guest?.timeZone &&
                    dateUtil(guest?.ends)
                      .tz(guest?.timeZone)
                      .format(dateFormats.display3)
                )}
              />
              <DetailParking
                title="End"
                subTitle={String(
                  guest?.timeZone &&
                    dateUtil(guest?.ends)
                      .tz(guest?.timeZone)
                      .format(dateFormats.timeDisplay0)
                )}
              />
            </div>
            {guest?.invitationEmail && (
              <DetailParking
                title="email"
                subTitle={String(guest?.invitationEmail)}
              />
            )}
            <div className="flex items-center mb-[16px]">
              <div className="flex items-center w-full overflow-hidden font-medium text-center bg-white border border-r-0 border-solid rounded-r-none text-s-lg text-blue-3 px-[13px] border-blue-4 h-[44px] rounded-[5px]">
                <p className="w-full mb-0 overflow-hidden text-left max-w-[188px] overflow-ellipsis whitespace-nowrap">
                  {`${window.location.origin}${ROUTES.PARKING_INVITATION}?bookingReferenceId=${guest?.bookingReferenceId}`}
                </p>
              </div>
              <Button
                mode={ButtonMode.FULL_PRIMARY}
                className="!text-s-lg !font-semibold !p-0 !min-w-[44px] !w-[44px] !rounded-l-none !h-[44px]"
                type="button"
                onClick={share}
              >
                <Share className="fill-white" />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Button
            mode={ButtonMode.FULL_PRIMARY}
            className="!h-[44px] !text-s-lg !p-[2px_0_0] !font-semibold !w-full mb-[5px]"
            iconClassName="!mr-[15px]"
            type="button"
            icon={ButtonIcon.EDIT_WHITE}
            onClick={() =>
              router.push({
                pathname: ROUTES.VISITOR_PARKING_EDIT,
                query: { appartmentId, visitorsParkingId: guestId },
              })
            }
          >
            Edit Booking
          </Button>
          <Button
            mode={ButtonMode.FULL_SECONDARY}
            onClick={() => setIsOpen(true)}
            className="!text-primary !font-semibold text-s-lg !pl-[21px] !h-[44px] !ml-[5px]"
          >
            Cancel Booking
          </Button>
        </div>
      </div>
      <VisitorsParkingCancel
        isOpen={isOpen}
        onBack={() => setIsOpen(false)}
        onCancel={() => guest?.bookingId && cancelGuest(guest?.bookingId)}
      />
    </Loader>
  )
}

export default VisitorsParkingDetails
