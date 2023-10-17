import React from 'react'

import { LayoutDesktop, LayoutMobile } from '@components/Layout'

import ProfileInvitationsDesktop from './ProfileInvitationsDesktop'
import ProfileInvitationsMobile from './ProfileInvitationsMobile'

const ProfileInvitations: React.FC = () => (
  <>
    <LayoutDesktop>
      <ProfileInvitationsDesktop />
    </LayoutDesktop>
    <LayoutMobile>
      <ProfileInvitationsMobile />
    </LayoutMobile>
  </>
)

export default ProfileInvitations
