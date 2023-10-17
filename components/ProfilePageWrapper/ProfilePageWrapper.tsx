import React from 'react'
import { PageHeaderMobile } from '@components/PageHeader'
import { ROUTES } from '@constants/routes'

const ProfilePageWrapper: React.FC<{ title: string | React.ReactElement }> = (
  props
): React.ReactElement => {
  const { children, title } = props
  return (
    <div className="flex flex-col h-full">
      <PageHeaderMobile
        title={title}
        backButtonLink={{ pathname: ROUTES.PROFILE_SETTINGS }}
        showBackButton
      />
      {children}
    </div>
  )
}

export default ProfilePageWrapper
