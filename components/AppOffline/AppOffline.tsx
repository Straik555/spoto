import React, { useEffect, useState } from 'react'
import offlineAnimation from '@assets/offline.json'
import Lottie from 'lottie-react'

const AppOffline = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(true)
  const options = {
    animationData: offlineAnimation,
    loop: true,
    autoplay: true,
    className: 'mt-[37px] w-[100px] h-[100px]',
  }

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <>
      {isOnline ? (
        children
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <Lottie {...options} />
          <p className="font-normal text-blue-1 text-s-xl pt-[20px]">
            No internet connection
          </p>
        </div>
      )}
    </>
  )
}

export default AppOffline
