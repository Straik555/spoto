import React from 'react'
import Link from 'next/link'

import SpotoLogoIcon from '@assets/icons/logos/spoto-logo-blue.svg'
import { Button } from '@components/index'
import { ButtonMode } from '@components/Button/Button.model'
import { ROUTES } from '@constants/routes'
import ProfileSwitcherSelect from '@screens/auth/components/ProfileSwitcher/ProfileSwitcherSelect'

import useJoinHouse from './useJoinHouse'
import { JoinHouseProps } from './JoinHouse.model'

const JoinHouse: React.FC<JoinHouseProps> = (props) => {
  const { houseName, invitationToken } = props
  const [state, actions] = useJoinHouse(invitationToken)
  const { profile } = state
  const { handleJoinHouse, setProfile } = actions

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center w-full py-[20px] bg-blue-4">
        <SpotoLogoIcon />
        <div className="text-center mt-[22px] text-s-xl mb-[15px]">
          <span className="font-semibold">You</span> have been invited to park
          in&nbsp;
          <span className="font-semibold text-primary">{houseName}</span>
        </div>
        <div className="text-s-sm">
          Please accept the invitation to park in the building
        </div>
      </div>
      <div className="flex flex-col items-center w-full px-4">
        <ProfileSwitcherSelect selectProfile={setProfile} value={profile} />
      </div>
      <div className="flex flex-col items-center w-full px-4 pb-4 mt-auto">
        <Button
          className="my-4 text-s-lg"
          mode={ButtonMode.FULL_PRIMARY}
          onClick={handleJoinHouse}
        >
          Accept
        </Button>
        <Link href={{ pathname: ROUTES.HOME }}>
          <a className="font-semibold text-primary pb-[11px]">Go To Home</a>
        </Link>
      </div>
    </div>
  )
}

export default JoinHouse
