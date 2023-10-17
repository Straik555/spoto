import React from 'react'
import ProfileSwitcherContent from './ProfileSwitcherContent'
import ProfileSwitcherLabel from './ProfileSwitcherLabel'

import useProfileSwitcher from './useProfileSwitcher'

const SideMenuProfileSwitcher: React.FC = () => {
  const [state, actions] = useProfileSwitcher()
  const { activeProfile, availableUserProfilesValues, open } = state
  const { toggleOpen } = actions

  if (!availableUserProfilesValues.length) return null

  return (
    <>
      <ProfileSwitcherLabel {...{ activeProfile, open, toggleOpen }} />
      {open && (
        <ProfileSwitcherContent
          activeProfileEmail={activeProfile?.email}
          {...{ availableUserProfilesValues }}
        />
      )}
    </>
  )
}

export default SideMenuProfileSwitcher
