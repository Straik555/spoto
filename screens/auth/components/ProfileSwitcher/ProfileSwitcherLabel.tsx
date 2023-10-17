import cn from 'classnames'
import React from 'react'

import ChevronDownIcon from '@assets/icons/arrows/arrow-down-bold.svg'
import ChevronDownSmallIcon from '@assets/icons/arrows/arrow-down-small-bold.svg'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import Title from '@components/Title/Title'
import UserAvatar from '@screens/admin/Users/components/UserAvatar/UserAvatar'
import { getPersonFullName } from '@screens/admin/Users/utils/getPersonFullName'

import { ProfileSwitcherLabelProps } from './ProfileSwitcher.model'

const ProfileSwitcherLabel: React.FC<ProfileSwitcherLabelProps> = (props) => {
  const { activeProfile, open, toggleOpen } = props
  const { isDesktop } = useDeviceInfo()

  const { photo, email } = activeProfile || {}

  const fullName = getPersonFullName(activeProfile)

  return (
    <div
      className={cn(
        'flex items-center justify-between text-white cursor-pointer',
        {
          'bg-primary px-4 pb-[10px]': !isDesktop,
        }
      )}
      onClick={toggleOpen}
    >
      <div className={cn('flex', { 'mr-[25px]': isDesktop })}>
        <UserAvatar
          className={cn('', {
            '!h-[50px] !w-[50px] mr-[20px]': isDesktop,
            '!h-[44px] !w-[44px] mr-[6px] mt-[3px]': !isDesktop,
          })}
          thumbKey={photo}
        />
        <div className="flex flex-col justify-center">
          <div className="font-semibold truncate text-s-lg max-w-[140px]">
            {fullName || 'Guest'}
          </div>
          <div className="text-s-sm text-blue-3">{email}</div>
        </div>
      </div>

      {!isDesktop && (
        <ChevronDownIcon
          className={cn({
            'rotate-180': open,
            'rotate-0': !open,
          })}
        />
      )}
      {isDesktop && (
        <ChevronDownSmallIcon
          className={cn('stroke-yellow', {
            'rotate-180': open,
            'rotate-0': !open,
          })}
        />
      )}
    </div>
  )
}

export default ProfileSwitcherLabel
