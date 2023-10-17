import React, { FC } from 'react'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import PropertySection from '@components/PropertySection'
import { TextStyleProps } from '@components/PropertySection/PropertySection.model'
import { SetModel } from '@api/set/types'
import cn from 'classnames'

const MainContent: FC<{ set: SetModel | undefined }> = ({ set }) => {
  const { isDesktop } = useDeviceInfo()

  return (
    <div className={cn({ 'p-[16px]': !isDesktop })}>
      <PropertySection
        title="Spot Description"
        text={set?.description || 'No description'}
        textStyle={TextStyleProps.NORMAl}
        textClassName={cn('break-all !text-s-base ', {
          'mb-[25px]': isDesktop,
          'mb-[16px]': !isDesktop,
        })}
      />
      <PropertySection
        title="Maximum Vehicle Height"
        text={set?.height || 0}
        textStyle={TextStyleProps.SEMIBOLD_BLACK}
        suffix=" m"
        textClassName={cn({
          'mb-[25px]': isDesktop,
          'mb-[16px]': !isDesktop,
        })}
      />
      <PropertySection
        title="Working Hours"
        text={`${set?.workingTime.start} - ${set?.workingTime.end}`}
        textStyle={TextStyleProps.SEMIBOLD_BLACK}
        textClassName={cn({
          'mb-[25px]': isDesktop,
          'mb-[16px]': !isDesktop,
        })}
      />
      <PropertySection
        title="Commercial Hours"
        text={`${set?.commercialTime.start} - ${set?.commercialTime.end}`}
        textStyle={TextStyleProps.SEMIBOLD_BLACK}
        textClassName={cn({
          'mb-[25px]': isDesktop,
          'mb-[16px]': !isDesktop,
        })}
      />
    </div>
  )
}

export default MainContent
