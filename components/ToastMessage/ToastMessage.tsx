import React from 'react'
import cn from 'classnames'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

import s from './ToastMessage.module.css'

const ToastMessage: React.FC = () => {
  const { isDesktop } = useDeviceInfo()
  return (
    <ToastContainer
      className={cn(s.toastWrapper, {
        '!w-screen !top-[84px] !p-0': isDesktop,
      })}
      toastClassName="!p-[14px]"
      position="top-center"
      autoClose={2000}
      newestOnTop
      hideProgressBar
      icon={false}
      closeButton={false}
    />
  )
}

export default ToastMessage
