import React from 'react'
import Image from '@components/Image/Image'

export default {
  title: 'Reusable Components/Image',
  component: Image,
}

export const ImageWithSrc = () => {
  return (
    <Image src="https://developers.google.com/fonts/images/github-dev-image.png" />
  )
}

export const ImageWithSrcKey = () => {
  return <Image srcKey="VehicleBrandLogo/dodge-logo.png" />
}

export const NoSrcImage = () => {
  return <Image src="" className="w-10 h-10" />
}

export const ImageStyled = () => {
  return (
    <Image
      srcKey="VehicleBrandLogo/dodge-logo.png"
      className="border-2 border-primary w-[200px] h-[200px]"
    />
  )
}
