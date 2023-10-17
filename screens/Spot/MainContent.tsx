import React, { FC, useEffect, useState } from 'react'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import PropertySection from '@components/PropertySection'
import { TextStyleProps } from '@components/PropertySection/PropertySection.model'
import { SpotInfo } from '@api/spot/types'
import cn from 'classnames'

const MainContent: FC<{ spot: SpotInfo | undefined }> = ({ spot }) => {
  const { isDesktop } = useDeviceInfo()
  const [chargerTypes, setChargerTypes] = useState('')

  useEffect(() => {
    const spotChargerTypes = Object.keys(spot?.electricCharger || {}).reduce(
      (p, c) => {
        if (spot?.electricCharger[c]) p[c] = spot?.electricCharger[c]
        return p
      },
      {}
    )
    setChargerTypes(
      Object.keys(spotChargerTypes || {})
        .map((item) => {
          if (item === 'type1') return 'Type 1'
          if (item === 'type2') return 'Type 2'
        })
        .join(', ') || ''
    )
  }, [spot])

  return (
    <div className={cn({ 'p-[16px]': !isDesktop })}>
      <PropertySection
        title="Spot Description"
        text={spot?.description || 'No description'}
        textStyle={TextStyleProps.NORMAl}
        textClassName={cn('break-all !text-s-base ', {
          'mb-[25px]': isDesktop,
          'mb-[16px]': !isDesktop,
        })}
      />
      <PropertySection
        title="Maximum Vehicle Height"
        text={spot?.height || 0}
        textStyle={TextStyleProps.SEMIBOLD_BLACK}
        suffix=" m"
        textClassName={cn({
          'mb-[25px]': isDesktop,
          'mb-[16px]': !isDesktop,
        })}
      />
      {chargerTypes && (
        <PropertySection
          title="Electric Vehicle Charger"
          text={chargerTypes}
          textStyle={TextStyleProps.SEMIBOLD_BLACK}
          textClassName={cn({
            'mb-[25px]': isDesktop,
            'mb-[16px]': !isDesktop,
          })}
        />
      )}
      <PropertySection
        title="Spot Status"
        text={spot?.linked ? 'Linked' : 'Unlinked'}
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
