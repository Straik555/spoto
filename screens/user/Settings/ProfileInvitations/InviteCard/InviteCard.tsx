import React from 'react'
import cn from 'classnames'

import CrossIcon from '@assets/icons/close-10.svg'
import { Button } from '@components/index'
import { ButtonMode } from '@components/Button/Button.model'
import ConfirmationDialog from '@components/ConfirmationDialog'
import ConfirmDeleteIcon from '@assets/icons/large-icons/trash-is-delete-128.svg'
import { dateFormats } from '@constants/global'
import UserAvatar from '@screens/admin/Users/components/UserAvatar/UserAvatar'
import { MyInviteInfo } from '@api/invite/types'

import InviteBookingDetails from './InviteBookingDetails/InviteBookingDetails'
import useInviteCard from './useInviteCard'

const InviteCard: React.FC<MyInviteInfo> = (props) => {
  const [state, actions] = useInviteCard(props)

  const {
    avatarUrl,
    email,
    confirmDeleteModal,
    fullName,
    invitedAt,
    isDesktop,
    isStatusAccepted,
    isStatusPending,
    places,
  } = state

  const {
    acceptInvite,
    dateUtil,
    deleteInvite,
    rejectInvite,
    toggleConfirmDeleteModal,
  } = actions

  return (
    <div
      className={cn('py-4 rounded-[10px] border border-primary relative', {
        ['!bg-white border-blue-3']: isStatusAccepted,
        ['mr-4 mb-4 w-[462px] bg-white']: isDesktop,
        ['mb-[10px] bg-blue-4']: !isDesktop,
      })}
    >
      <div className="flex justify-between pb-4 pl-5 pr-4">
        <div className="flex">
          <UserAvatar
            className="mr-4 !w-[50px] !h-[50px]"
            thumbKey={avatarUrl}
          />
          <div className="flex flex-col justify-center">
            <div
              className={cn('font-semibold', {
                'text-s-xl': isDesktop,
                'text-s-base': !isDesktop,
              })}
            >
              {fullName}
            </div>
            <div
              className={cn('text-blue-1', {
                'text-s-lg': isDesktop,
                'text-s-sm': !isDesktop,
              })}
            >
              {email}
            </div>
          </div>
        </div>
        {isStatusPending && (
          <div
            className={cn('text-s-sm text-blue-1', {
              'font-semibold !text-s-lg': isDesktop,
            })}
          >
            {dateUtil(invitedAt).format(dateFormats.timeDisplay1)}
          </div>
        )}
        {isStatusAccepted && (
          <CrossIcon
            className="absolute cursor-pointer right-[10px] fill-blue-3 top-[10px]"
            onClick={toggleConfirmDeleteModal}
          />
        )}
      </div>
      {isStatusPending && (
        <div className="pb-2 pl-5 pr-4 text-s-sm">
          Personal owner&nbsp;
          <span className="font-semibold">{fullName}</span>
          &nbsp;invited you
        </div>
      )}
      {isStatusPending && (
        <div className="flex px-4 pt-2 border-t border-t-blue-2">
          <Button
            mode={ButtonMode.SMALL_SECONDARY}
            className={cn('mr-4', {
              'text-s-lg w-full': isDesktop,
              'flex-1 text-s-sm bg-blue-4 py-[9px]': !isDesktop,
            })}
            onClick={toggleConfirmDeleteModal}
          >
            Decline
          </Button>
          <Button
            mode={ButtonMode.SMALL}
            className={cn({
              'text-s-lg w-full': isDesktop,
              'flex-1 text-s-sm py-[9px]': !isDesktop,
            })}
            onClick={acceptInvite}
          >
            Accept
          </Button>
        </div>
      )}
      {isStatusAccepted && !!places.length && (
        <InviteBookingDetails {...{ avatarUrl, email, fullName, places }} />
      )}
      <ConfirmationDialog
        open={confirmDeleteModal}
        titleIcon={<ConfirmDeleteIcon className="mx-auto mt-0 mb-[30px]" />}
        title="Delete this invitation?"
        titleContainerClassName="!mt-0"
        cancelText="Cancel"
        applyText="Delete"
        onApply={isStatusAccepted ? deleteInvite : rejectInvite}
        onClose={toggleConfirmDeleteModal}
      />
    </div>
  )
}

export default InviteCard
