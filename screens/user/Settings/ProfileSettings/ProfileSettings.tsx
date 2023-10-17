import React from 'react'

import { LayoutDesktop, LayoutMobile } from '@components/Layout'

import ProfileSettingsDesktop from './ProfileSettingsDesktop'
import ProfileSettingsMobile from './ProfileSettingsMobile'

const ProfileSettings: React.FC = () => (
  <>
    <LayoutDesktop>
      <ProfileSettingsDesktop />
    </LayoutDesktop>
    <LayoutMobile>
      <ProfileSettingsMobile />
    </LayoutMobile>
  </>
)

export default ProfileSettings
