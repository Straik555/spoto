import React, { useCallback, useMemo } from 'react'

import UserIcon from '@assets/icons/user.svg'
import Select, { Option } from '@components/Select/Select'
import UserAvatar from '@screens/admin/Users/components/UserAvatar/UserAvatar'
import { AvailableUserProfile } from '@screens/auth/types'

import useProfileSwitcher from './useProfileSwitcher'
import { ProfileSwitcherSelectProps } from './ProfileSwitcher.model'

const ProfileSwitcherSelectOption: React.FC<AvailableUserProfile> = ({
  email,
  firstName,
  lastName,
  photo,
}) => (
  <div className="flex items-center justify-between cursor-pointer">
    <div className="flex">
      <UserAvatar
        defaultAvatar={
          <div className="flex rounded-[50%] bg-blue-4 w-[35px] h-[35px]">
            <UserIcon className="m-auto" />
          </div>
        }
        thumbKey={photo}
        className="!h-[35px] !w-[35px]"
      />

      <div className="font-semibold ml-[15px]">
        <div className="font-semibold text-left text-black text-s-base">
          {`${firstName} ${lastName}`}
        </div>
        <div className="font-normal text-left text-blue-2 text-s-xs">
          {email}
        </div>
      </div>
    </div>
  </div>
)

const ProfileSwitcherSelect: React.FC<ProfileSwitcherSelectProps> = (props) => {
  const { selectProfile, value } = props
  const [state] = useProfileSwitcher()
  const { availableUserProfilesValues } = state

  const handleSelect = useCallback(
    (email) => {
      const profile = availableUserProfilesValues.find(
        (profile) => profile.email === email
      )
      if (profile) {
        selectProfile(profile)
      }
    },
    [availableUserProfilesValues, selectProfile]
  )

  const ActiveProfileLabel = useMemo(() => {
    if (value) {
      return <ProfileSwitcherSelectOption {...value} />
    }
    return null
  }, [value])

  return (
    <Select
      selectClassName="max-h-[181px]"
      buttonClassName="h-[55px]"
      className="w-full"
      onSelect={handleSelect}
      label={ActiveProfileLabel}
    >
      {availableUserProfilesValues.map((item) => {
        const { email } = item

        const active = value?.email === email

        return (
          <Option
            active={active}
            className="py-[10px]"
            key={email}
            value={email}
          >
            <ProfileSwitcherSelectOption {...item} />
          </Option>
        )
      })}
    </Select>
  )
}

export default ProfileSwitcherSelect
