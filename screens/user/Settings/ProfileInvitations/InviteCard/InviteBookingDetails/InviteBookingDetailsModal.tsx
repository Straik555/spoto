import React from 'react'
import cn from 'classnames'

import Dialog from '@components/Dialog/Dialog'
import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import UserAvatar from '@screens/admin/Users/components/UserAvatar/UserAvatar'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import CloseIcon from '@assets/icons/close-20.svg'

import { InviteBookingDetailsModalProps } from './InviteBookingDetails.model'
import InviteBookingPlace from './InviteBookingPlace'

const InviteBookingDetailsModal: React.FC<InviteBookingDetailsModalProps> = (
  props
) => {
  const { avatarUrl, email, fullName, onClose, places } = props
  const { isDesktop } = useDeviceInfo()
  return (
    <Dialog open onClose={onClose}>
      <span className="absolute cursor-pointer top-4 right-4">
        <CloseIcon className="fill-blue-3" onClick={onClose} />
      </span>
      <div className="flex px-6 pb-5 border-b border-b-blue-3 mx-[-24px]">
        <UserAvatar className="mr-4" thumbKey={avatarUrl} />
        <div>
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
      <div className="overflow-scroll max-h-[50vh] mb-[50px]">
        {places.map(({ id, placeInfo, schedule }) => (
          <InviteBookingPlace key={id} {...{ placeInfo, schedule }} />
        ))}
      </div>
      <Button onClick={onClose} mode={ButtonMode.FULL_PRIMARY}>
        Close
      </Button>
    </Dialog>
  )
}

export default InviteBookingDetailsModal
