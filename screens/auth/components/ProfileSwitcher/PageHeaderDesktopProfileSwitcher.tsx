import React from 'react'
import useProfileSwitcher from './useProfileSwitcher'
import ProfileSwitcherLabel from './ProfileSwitcherLabel'
import ProfileSwitcherContent from './ProfileSwitcherContent'
import cn from 'classnames'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

const PageHeaderDesktopProfileSwitcher = () => {
  const [state, actions] = useProfileSwitcher()
  const { activeProfile, availableUserProfilesValues, open } = state
  const { toggleOpen } = actions
  const { isDesktop } = useDeviceInfo()

  if (!activeProfile) {
    return null
  }

  return (
    <>
      <ProfileSwitcherLabel {...{ activeProfile, open, toggleOpen }} />
      {open && (
        <div
          className={cn(
            'absolute right-0 z-10 top-[90px] min-w-[318px] bg-primary',
            {
              'rounded-[10px] right-[18px]': isDesktop,
            }
          )}
        >
          <ProfileSwitcherContent
            activeProfileEmail={activeProfile.email}
            {...{ availableUserProfilesValues }}
          />
        </div>
      )}
    </>
  )
}

export default PageHeaderDesktopProfileSwitcher
