import React from 'react'

const ProfileSettingsHeader: React.FC<{
  title: string
  rightContent?: React.ReactElement
}> = (props) => {
  const { title, rightContent } = props
  return (
    <div className="flex items-center justify-between w-full  shadow-1 h-[86px] px-[75px]">
      <div className="my-6 font-semibold text-[24px] leading-9">{title}</div>
      {rightContent}
    </div>
  )
}

export default ProfileSettingsHeader
