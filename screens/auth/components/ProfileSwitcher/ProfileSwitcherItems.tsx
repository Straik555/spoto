import { baseApiSlice } from '@api/index'
import { profileApi, ProfileApiTagTypes } from '@api/profile'
import TickIcon from '@assets/icons/check-13.svg'
import { useTypedDispatch } from '@redux/hooks'
import UserAvatar from '@screens/admin/Users/components/UserAvatar/UserAvatar'
import { authSlice } from '@screens/auth/slice'
import cn from 'classnames'
import React from 'react'
import { ProfileSwitcherItemsProps } from './ProfileSwitcher.model'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

const ProfileSwitcherItems: React.FC<ProfileSwitcherItemsProps> = (props) => {
  const { availableUserProfilesValues } = props
  const dispatch = useTypedDispatch()
  const { isDesktop } = useDeviceInfo()

  return (
    <>
      {availableUserProfilesValues.map((item) => {
        const {
          email,
          firstName,
          lastName,
          photo,
          token,
          active: isActive,
        } = item

        const handleCLick = () => {
          dispatch(authSlice.actions.markProfileAsActive(email))
          dispatch(authSlice.actions.setToken(token))
          dispatch(
            profileApi.util.invalidateTags([ProfileApiTagTypes.ProfileInfo])
          )
          dispatch(baseApiSlice.util.resetApiState())
        }

        return (
          <div
            key={email}
            onClick={handleCLick}
            className={cn(
              'flex items-center justify-between cursor-pointer bg-primary',
              {
                'mb-[16px]': !isDesktop,
                'mb-[15px]': isDesktop,
              }
            )}
          >
            <div
              className={cn('flex items-center', { 'opacity-50': !isActive })}
            >
              <UserAvatar
                thumbKey={photo}
                className={cn({
                  '!h-[35px] !w-[35px]': !isDesktop,
                  '!h-[50px] !w-[50px]': isDesktop,
                })}
              />
              <div className="font-semibold ml-[15px] text-s-sm text-blue-1">
                <div
                  className={cn('font-semibold text-white', {
                    'text-s-sm': !isDesktop,
                    'text-s-base': isDesktop,
                  })}
                >
                  {`${firstName} ${lastName}`}
                </div>
                <div
                  className={cn('font-normal text-white text-s-xs', {
                    'text-s-xs': !isDesktop,
                    'text-s-sm': isDesktop,
                  })}
                >
                  {email}
                </div>
              </div>
            </div>
            {isActive && <TickIcon className="fill-yellow stroke-yellow" />}
          </div>
        )
      })}
    </>
  )
}

export default ProfileSwitcherItems
