import React from 'react'
import ProfileSettingsSideMenu from './ProfileSettingsSideMenu'
import ProfileSettingsHeader from './ProfileSettingsHeader'

type ProfileSettingsWrapperDesktopProps = {
  headerTitle: string
  headerRightContent?: React.ReactElement
}

const ProfileSettingsWrapperDesktop: React.FC<
  ProfileSettingsWrapperDesktopProps
> = (props) => {
  const { children, headerTitle, headerRightContent } = props

  return (
    <div className="flex h-full">
      <ProfileSettingsSideMenu />
      <div className="w-full h-full">
        <div className="h-full max-h-full overflow-auto">
          <ProfileSettingsHeader
            title={headerTitle}
            rightContent={headerRightContent}
          />
          {children}
        </div>
      </div>
    </div>
  )
}

export default ProfileSettingsWrapperDesktop
