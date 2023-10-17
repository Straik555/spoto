import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

import ChevronDownIcon from '@assets/icons/arrows/arrow-down-small-bold.svg'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

const ProfileSettingsItem = ({ count = 0, href, label, Icon }) => {
  const { isDesktop } = useDeviceInfo()
  return (
    <Link href={href}>
      <a>
        <div
          className={cn(
            'flex items-center justify-between pl-4 text-lg border-b h-[59px] border-b-blue-4',
            { 'pr-5': !isDesktop }
          )}
        >
          <div
            className={cn('flex py-4 items-center', {
              'justify-between w-full': isDesktop,
            })}
          >
            <div className="flex items-center">
              <Icon className={cn('mr-5')} />
              <span
                className={cn('text-blue-1 font-medium', {
                  'text-s-lg': isDesktop,
                  'text-s-md': !isDesktop,
                })}
              >
                {label}
              </span>
            </div>
            {!!count && (
              <div className="w-5 h-5 font-semibold text-center text-white ml-[5px] bg-primary p-[2px] rounded-[50%] text-s-sm">
                {count}
              </div>
            )}
          </div>
          {!isDesktop && (
            <ChevronDownIcon className="stroke-blue-1 -rotate-90" />
          )}
        </div>
      </a>
    </Link>
  )
}

export default ProfileSettingsItem
