import React, { FC, ReactNode, useRef } from 'react'
import Slider from 'react-slick'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import ArrowLeft from '@assets/icons/arrows/arrow-left-14.svg'
import ArrowRight from '@assets/icons/arrows/arrow-right-14.svg'

const UserCardSpotSlider: FC<{
  children: ReactNode
  hasSlider?: boolean
}> = ({ children, hasSlider }) => {
  const { isDesktop } = useDeviceInfo()
  const customSlider = useRef<Slider>(null)
  const next = () => {
    customSlider?.current?.slickNext()
  }

  const prev = () => {
    customSlider?.current?.slickPrev()
  }
  return isDesktop && hasSlider ? (
    <div className="relative w-full h-full">
      <Slider
        {...{
          className: 'w-full',
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          arrows: false,
          touchMove: false,
          slidesToScroll: 1,
        }}
        ref={customSlider}
      >
        {children}
      </Slider>
      <ArrowLeft
        onClick={next}
        className="absolute cursor-pointer stroke-blue-1 top-[129.5px] left-[24px] lg-desktop:top-[122.5px] lg-desktop:left-[15px]"
      />
      <ArrowRight
        onClick={prev}
        className="absolute cursor-pointer stroke-blue-1 top-[129.5px] right-[24px] lg-desktop:top-[122.5px] lg-desktop:right-[15px]"
      />
    </div>
  ) : (
    <>{children}</>
  )
}

export default UserCardSpotSlider
