import React, { useMemo } from 'react'
import Link from 'next/link'
import cn from 'classnames'

import { ROUTES } from '@constants/routes'
import CarIcon from '@assets/icons/settingsIcons/car.svg'
import LockIcon from '@assets/icons/settingsIcons/lock.svg'
import PencilIcon from '@assets/icons/pencil-16.svg'
import SpeakerIcon from '@assets/icons/settingsIcons/speaker.svg'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import UserAvatar from '@screens/admin/Users/components/UserAvatar/UserAvatar'
import { useCurrentProfile } from '@hooks/useCurrentProfile'
import { getPersonFullName } from '@screens/admin/Users/utils/getPersonFullName'
import { inviteApi } from '@api/invite'
import { InvitationStatus } from '@api/invite/types'

import ProfileSettingsItem from './ProfileSettingsItem'

const FullName: React.FC<{ isDesktop?: boolean; value: string }> = ({
  isDesktop,
  value,
}) => (
  <div>
    <div className="text-blue-menu text-base">Hello,</div>
    <div
      className={cn('font-semibold text-white truncate text-s-xl', {
        'w-[170px]': isDesktop,
        'w-[calc(100vw-180px)]': !isDesktop,
      })}
    >
      {value}
    </div>
  </div>
)

const EditLink: React.FC<{ pathname: ROUTES }> = ({ pathname }) => (
  <Link
    href={{
      pathname,
    }}
  >
    <a>
      <div className="flex items-center justify-center w-10 h-10 bg-white rounded-[50%]">
        <PencilIcon className="fill-primary" />
      </div>
    </a>
  </Link>
)

const ProfileSettingsSideMenu: React.FC = () => {
  const { isDesktop } = useDeviceInfo()
  const { profile } = useCurrentProfile()

  const { data: invites = [] } = inviteApi.endpoints.getMyInvites.useQuery(null)
  const { avatarUrl } = profile || {}

  const fullName = getPersonFullName(profile)

  const sentInvitesCount = useMemo(
    () =>
      invites.filter(
        ({ isExpired, status }) =>
          !isExpired && status === InvitationStatus.Sent
      ).length,
    [invites]
  )

  return (
    <div
      className={cn({
        'h-full p-5 bg-white min-w-[290px] drop-shadow-xl ml-[64px]': isDesktop,
        'mt-[-1px]': !isDesktop,
      })}
    >
      <div
        className={cn('flex p-4 bg-primary', {
          'flex-col rounded-[10px]': isDesktop,
          'items-center justify-between': !isDesktop,
        })}
      >
        <div className="flex items-center">
          <UserAvatar
            className={cn('!w-[75px] !h-[75px]', {
              'mb-4': isDesktop,
              'mr-[6px]': !isDesktop,
            })}
            thumbKey={avatarUrl}
          />
          {!isDesktop && <FullName value={fullName} />}
        </div>
        {isDesktop ? (
          <div className="flex justify-between">
            <FullName isDesktop value={fullName} />
            <EditLink pathname={ROUTES.PROFILE_SETTINGS} />
          </div>
        ) : (
          <EditLink pathname={ROUTES.PROFILE_EDIT} />
        )}
      </div>
      <div className="mt-7">
        <div className={cn('ml-4 mb-1 text-blue-1')}>Settings</div>
        <ProfileSettingsItem
          href={{ pathname: ROUTES.PROFILE_VEHICLES }}
          label="My Vehicles"
          Icon={CarIcon}
        />
        <ProfileSettingsItem
          href={{ pathname: ROUTES.PROFILE_INVITATIONS }}
          label="Invited Spots"
          Icon={SpeakerIcon}
          count={sentInvitesCount}
        />
        {/*<ProfileSettingsItem*/}
        {/*  href={ROUTES.PROFILE_NOTIFICATIONS}*/}
        {/*  label="Notifications"*/}
        {/*  count={notificationsCount}*/}
        {/*  Icon={BellIcon}*/}
        {/*/>*/}
      </div>
      <div className="mt-4">
        <div className={cn('ml-4 mb-1 text-blue-1')}>Security</div>
        <ProfileSettingsItem
          href={{ pathname: ROUTES.PROFILE_CHANGE_PASSWORD }}
          label="Change Password"
          Icon={LockIcon}
        />
      </div>
    </div>
  )
}

export default ProfileSettingsSideMenu
