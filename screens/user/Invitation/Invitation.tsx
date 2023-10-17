import React, { FC } from 'react'
import Link from 'next/link'

import { Button } from '@components/index'
import Input from '@components/Form/Input/Input'
import { ButtonMode } from '@components/Button/Button.model'
import { dateFormats } from '@constants/global'
import { Loader } from '@components/Loader'
import { withForm } from '@components/Form/withForm'
import { Nullable } from '@constants/types'
import { ROUTES } from '@constants/routes'
import SpotoLogoIconBig from '@assets/icons/logos/spoto-logo-blue-big.svg'

import { BookingDetailsItem } from './BookingDetailsItem'
import { InvitationFormValues } from './Invitation.model'
import { INVITATION_VALIDATION_SHEMA } from './validation'
import useInvitation from './useInvitation'
import InvitationDeclined from './InvitationDeclined'
import InvitationCanceled from './InvitationCanceled'

const Invitation: FC = () => {
  const [state, actions] = useInvitation()
  const {
    address,
    endDate,
    isInvitationCanceled,
    isInvitationDeclined,
    isValid,
    loading,
    plateNumber,
    residentUserEmail,
    residentUserName,
    spotName,
    startDate,
    isBookingFinished,
    isBookingUpcoming,
    pageTitle,
  } = state
  const { handleCancelGuest, handleSubmit } = actions

  if (isInvitationCanceled) {
    return <InvitationCanceled />
  }

  if (isInvitationDeclined) {
    return <InvitationDeclined />
  }

  return (
    <Loader loading={loading}>
      <div className="flex flex-col items-center justify-between w-full h-screen p-[16px]">
        <div className="mt-[28px] mb-[35px]">
          <SpotoLogoIconBig className="fill-primary" />
        </div>
        <div className="font-semibold text-s-2xl mb-[15px]">{pageTitle}</div>
        {isBookingFinished && (
          <div className="text-blue-1 mb-[20px]">Thanks for using Spoto</div>
        )}
        {isBookingUpcoming && (
          <>
            <div className="text-blue-1">You have been invited by</div>
            <div className="text-blue-1 mb-[15px]">{residentUserName}</div>
            <div className="font-semibold text-primary text-s-lg mb-[15px]">
              {residentUserEmail}
            </div>
            <div className="text-blue-1 mb-[20px]">
              to park in their building
            </div>
          </>
        )}
        <div className="w-full font-semibold text-left mb-[12px]">
          Booking Details:
        </div>
        <div className="w-full border border-solid bg-blue-4 border-blue-3 rounded-[5px] mb-[9px]">
          <BookingDetailsItem title="Location" subTitle={address} />
          <BookingDetailsItem title="Spot" subTitle={spotName} />
          <BookingDetailsItem
            title="Date"
            subTitle={`${startDate.format(dateFormats.display0)}${
              startDate.isSame(endDate, 'day')
                ? ''
                : ` - ${endDate.format(dateFormats.display0)}`
            }`}
          />
          <BookingDetailsItem
            title="Time"
            subTitle={`${startDate.format(
              dateFormats.timeDisplay0
            )} - ${endDate.format(dateFormats.timeDisplay0)}`}
          />
        </div>
        {isBookingUpcoming ? (
          <>
            <Input<InvitationFormValues>
              name="plateNumber"
              placeholder="Please enter your plate number"
              value={plateNumber?.toUpperCase()}
              className="w-full mb-[9px] !mt-0"
              label="Please enter your plate number:"
              labelClassName="normal-case"
            />
            <Button
              mode={ButtonMode.FULL_PRIMARY}
              type="button"
              disabled={!isValid}
              onClick={handleSubmit}
            >
              Save
            </Button>

            <div className="text-blue-1 mb-[10px]">
              You will need to enter your plate number at least 15 minutes
              before the booking time
            </div>
            <div className="text-blue-1 mb-[20px]">OR</div>
            <div
              className="font-semibold border-none cursor-pointer text-primary"
              onClick={handleCancelGuest}
            >
              Decline
            </div>
          </>
        ) : (
          <Link href={{ pathname: ROUTES.HOME }}>
            <a className="w-full mt-auto">
              <Button mode={ButtonMode.FULL_PRIMARY}>Go To Home</Button>
            </a>
          </Link>
        )}
      </div>
    </Loader>
  )
}

export default withForm(
  {
    initialValues: {
      plateNumber: '',
    } as Nullable<InvitationFormValues>,
    isInitialValid: false,
    validationSchema: INVITATION_VALIDATION_SHEMA,
    className: 'h-screen',
  },
  Invitation
)
