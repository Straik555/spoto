import React, { FC } from 'react'

import { MobileView } from '@components/DeviceDetect/DeviceDetect'

const LayoutMobile: FC = ({ children }) => {
  return (
    <MobileView className="flex flex-col w-full h-full justify-items-start">
      {children}
    </MobileView>
  )
}

export default LayoutMobile
