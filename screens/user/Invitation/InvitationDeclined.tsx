import React from 'react'
import Link from 'next/link'

import BrokenRobotIcon from '@assets/icons/broken-robot.svg'
import Button from '@components/Button/Button'
import { ROUTES } from '@constants/routes'
import { ButtonMode } from '@components/Button/Button.model'

const InvitationDeclined = () => (
  <div className="flex flex-col h-screen p-[16px]">
    <div className="flex flex-col items-center justify-center h-full">
      <BrokenRobotIcon className="-mt-[20px]" />
      <div className="font-semibold text-center text-s-xl mt-[20px]">
        You have declined the invite
      </div>
    </div>
    <Link href={{ pathname: ROUTES.HOME }}>
      <a className="mt-auto">
        <Button mode={ButtonMode.FULL_PRIMARY}>Go To Home</Button>
      </a>
    </Link>
  </div>
)

export default InvitationDeclined
