import React from 'react'
import { PageHeaderMobile } from '@components/PageHeader'
import ProfileSettingsSideMenu from '@screens/user/Settings/ProfileSettings/components/ProfileSettingsSideMenu'

const ProfileSettingsMobile: React.FC = () => {
  return (
    <div className="h-full bg-white pb-[25px]">
      <PageHeaderMobile title="Settings" />
      <ProfileSettingsSideMenu />
    </div>
  )
}

export default ProfileSettingsMobile
