import React from 'react'
import { useLottie } from 'lottie-react'
import cn from 'classnames'
import { LoaderProps } from '@components/Loader/Loader.model'
import groovyWalkAnimation from '@assets/spoto_preloader.json'

const Loader: React.FC<LoaderProps> = ({
  children,
  loading,
  className,
  loaderClassName,
}) => {
  const options = {
    animationData: groovyWalkAnimation,
    loop: true,
    autoplay: true,
    className: loaderClassName,
  }

  const { View } = useLottie(options)

  return (
    <>
      {/*This is not rendered conditionally due to lottie library bug*/}
      <div
        className={cn('justify-center items-center h-full', className, {
          hidden: !loading,
          flex: loading,
        })}
      >
        {View}
      </div>
      {!loading && <>{children}</>}
    </>
  )
}

export default React.memo(Loader)
