import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

import { ROUTES } from '@constants/routes'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import Title from '@components/Title/Title'
import PlusWhiteIcon from '@assets/icons/circle-icons/blue-plus-white-circle.svg'

import { ProfileSwitcherContentProps } from './ProfileSwitcher.model'
import ProfileSwitcherItems from './ProfileSwitcherItems'
import s from './ProfileSwitcherContent.module.css'

const ProfileSwitcherContent: React.FC<ProfileSwitcherContentProps> = (
  props
) => {
  const { activeProfileEmail, availableUserProfilesValues } = props
  const { isDesktop } = useDeviceInfo()

  return (
    <>
      <div
        className={cn('text-white bg-primary', {
          'rounded-[10px] pl-[20px] pr-[26px] pt-[15px]': isDesktop,
          'pl-[16px] pr-[22px] pt-[9px]': !isDesktop,
          '!pt-0': !activeProfileEmail,
        })}
      >
        <div>
          <Title
            as="div"
            className={cn('font-semibold mb-[5px]', {
              'text-s-sm': !isDesktop,
              'text-s-lg': isDesktop,
            })}
          >
            Spoto plan:
          </Title>
          <div
            className={cn(' text-blue-3', {
              'mb-[25px] text-s-sm': isDesktop,
              'mb-[4px] text-s-xs': !isDesktop,
            })}
          >
            Switch to
          </div>
        </div>
        <ProfileSwitcherItems
          {...{ availableUserProfilesValues, activeProfileEmail }}
        />
      </div>
      <div
        className={cn('px-[16px] relative', {
          'pb-[20px] pt-[4px]': isDesktop,
          'pb-[16px]': !isDesktop,
        })}
      >
        <Link href={ROUTES.LOGIN}>
          <div
            className={cn(
              s.dashedBorder,
              isDesktop ? s.dashedBorderDeskop : s.dashedBorderMobile,
              'flex items-center justify-center mx-auto top-[20px] rounded-[5px] cursor-pointer',
              {
                'h-[50px]': !isDesktop,
                'h-[60px]': isDesktop,
              }
            )}
          >
            <PlusWhiteIcon className="mr-[15px]" />
            <Title
              as="span"
              className={cn('font-semibold text-white ', {
                'text-s-base': isDesktop,
                'text-s-sm': !isDesktop,
              })}
            >
              Add Account
            </Title>
          </div>
        </Link>
      </div>
    </>
  )
}

export default ProfileSwitcherContent
