import { useCurrentProfile } from '@hooks/useCurrentProfile'
import { useTypedSelector } from '@redux/hooks'
import { useSelectActiveProfile } from '@screens/auth/hooks/useSelectors'
import { useState } from 'react'
import { UseProfileSwitcher } from './ProfileSwitcher.model'

const useProfileSwitcher: UseProfileSwitcher = () => {
  const [open, setOpen] = useState(false)
  const { isFetching } = useCurrentProfile()
  const activeProfile = useSelectActiveProfile()
  const profiles = useTypedSelector(
    (state) => state.authSlice.availableUserProfiles
  )
  const availablePersistedProfileValues = Object.values(profiles)

  const toggleOpen = () => setOpen((prevState) => !prevState)

  const state = {
    activeProfile: isFetching ? undefined : activeProfile,
    availableUserProfilesValues: availablePersistedProfileValues,
    open,
  }
  const actions = { toggleOpen }

  return [state, actions]
}

export default useProfileSwitcher
