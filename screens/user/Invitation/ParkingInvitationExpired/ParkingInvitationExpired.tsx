import React from 'react'
import Link from 'next/link'

import InvitationIsExpired from '@assets/icons/invitation-is-expired.svg'
import Button from '@components/Button/Button'
import { ROUTES } from '@constants/routes'
import { ButtonMode } from '@components/Button/Button.model'

const ParkingInvitationExpired: React.FC = () => (
  <div className="flex flex-col h-screen">
    <div className="flex flex-col items-center justify-center h-full">
      <InvitationIsExpired />
    </div>
    <Link href={{ pathname: ROUTES.HOME }}>
      <a className="mt-auto mb-[16px] mx-[16px]">
        <Button mode={ButtonMode.FULL_PRIMARY}>Go To Home</Button>
      </a>
    </Link>
  </div>
)

export default ParkingInvitationExpired
