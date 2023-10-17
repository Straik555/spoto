import React from 'react'
import cn from 'classnames'

import SpotoLogoIcon from '@assets/icons/logos/spoto-logo-blue.svg'
import SpotoLogoSquareIcon from '@assets/icons/logos/spoto-logo-square.svg'
import SpotoLogoSquareBigIcon from '@assets/icons/logos/spoto-logo-square-big.svg'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

const AuthHeader: React.FC<{ houseName?: string }> = ({ houseName }) => {
  const { isDesktop } = useDeviceInfo()

  return houseName ? (
    <div className="flex flex-col items-center w-full text-center px-[16px] py-[20px] bg-blue-4 mb-[30px]">
      <SpotoLogoIcon />
      <div className="font-semibold mt-[24px] text-s-xl">
        Park In&nbsp;
        <span className="text-primary">{houseName}</span>
        &nbsp;With Spoto
      </div>
    </div>
  ) : (
    <div className="flex mx-auto -mt-[12px] mb-[38px]">
      {isDesktop ? <SpotoLogoSquareBigIcon /> : <SpotoLogoSquareIcon />}
    </div>
  )
}

export default AuthHeader
