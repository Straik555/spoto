import React from 'react'

import Loader from '@components/Loader/Loader'

import ProfileSettingsWrapperDesktop from '../ProfileSettings/components/ProfileSettingsWrapper'
import InviteCard from './InviteCard/InviteCard'
import useProfileInvitations from './useProfileInvitations'

const ProfileInvitationsDesktop = () => {
  const { acceptedInvites, loading, sentInvites } = useProfileInvitations()

  return (
    <ProfileSettingsWrapperDesktop headerTitle="Invitations">
      <Loader loading={loading}>
        {!!sentInvites.length && (
          <div className="flex flex-wrap border-b bg-blue-4 border-b-blue-1 px-[75px] py-[25px]">
            {sentInvites.map((item) => (
              <InviteCard key={item.id} {...item} />
            ))}
          </div>
        )}
        {!!acceptedInvites.length && (
          <div className="flex flex-wrap px-[75px] py-[25px]">
            {acceptedInvites.map((item) => (
              <InviteCard key={item.id} {...item} />
            ))}
          </div>
        )}
      </Loader>
    </ProfileSettingsWrapperDesktop>
  )
}

export default ProfileInvitationsDesktop
