import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import React, { FC } from 'react'
import cn from 'classnames'
import { PersonDetailsWrapperProps } from '@screens/admin/Users/components/PersonDetailsWrapper/PersonDetailsWrapper.model'

const PersonDetailsWrapper: FC<PersonDetailsWrapperProps> = ({
  children,
  deleteButton,
  addButton,
  className,
}) => {
  const { isDesktop } = useDeviceInfo()

  return (
    <div className="relative flex flex-col h-max grow justify-between overflow-y-auto">
      <div className="w-full h-full flex flex-col items-center flex-grow p-[16px] desktop:p-0">
        {isDesktop && addButton}
        <div
          className={cn(
            'flex w-full flex-col pb-[120px] desktop:flex-wrap desktop:pb-0',
            className
          )}
        >
          {children}
        </div>
      </div>
      {!isDesktop && (
        <div className="flex flex-col justify-end fixed bg-white !bottom-0 pb-[16px] w-full h-[120px]">
          {addButton}
          {deleteButton}
        </div>
      )}
    </div>
  )
}

export default PersonDetailsWrapper
