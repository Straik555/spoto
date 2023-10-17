import React, { useMemo, useState } from 'react'
import cn from 'classnames'

import ArrowDownIcon from 'assets/icons/arrows/arrow-down-small.svg'
import ArrowUpIcon from 'assets/icons/arrows/arrow-up-small.svg'
import ArrowRightIcon from '@assets/icons/arrows/arrow-right.svg'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

import InviteBookingPlace from './InviteBookingPlace'
import InviteBookingDetailsModal from './InviteBookingDetailsModal'
import { InviteBookingDetailsProps } from './InviteBookingDetails.model'

const InviteBookingDetails: React.FC<InviteBookingDetailsProps> = (props) => {
  const { places } = props
  const { isDesktop } = useDeviceInfo()
  const [open, setOpen] = useState<boolean>(false)

  const toggleOpen = () => setOpen((prevState) => !prevState)

  const Arrow = useMemo(() => {
    if (isDesktop) {
      return <ArrowRightIcon className="inline stroke-blue-1" />
    }
    return open ? (
      <ArrowUpIcon className="inline stroke-primary" />
    ) : (
      <ArrowDownIcon className="inline stroke-blue-1" />
    )
  }, [isDesktop, open])

  return (
    <>
      <div
        onClick={toggleOpen}
        className="pt-4 border-t cursor-pointer border-t-blue-3"
      >
        <span
          className={cn('mx-3 font-semibold', {
            'text-primary': open,
            'text-blue-1': !open,
            'text-s-xl': isDesktop,
            'text-s-sm': !isDesktop,
          })}
        >
          Booking Settings
        </span>
        {Arrow}
      </div>
      {open &&
        (isDesktop ? (
          <InviteBookingDetailsModal onClose={toggleOpen} {...props} />
        ) : (
          places.map(({ id, placeInfo, schedule }) => (
            <InviteBookingPlace key={id} {...{ placeInfo, schedule }} />
          ))
        ))}
    </>
  )
}

export default InviteBookingDetails
