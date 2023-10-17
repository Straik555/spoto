import React, { FC } from 'react'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import PropertySection from '@components/PropertySection'
import { TextStyleProps } from '@components/PropertySection/PropertySection.model'
import { SpotInfo } from '@api/spot/types'
import cn from 'classnames'

const SpollardContent: FC<{ spot: SpotInfo | undefined }> = ({ spot }) => {
  const { isDesktop } = useDeviceInfo()

  return (
    <section
      className={cn({
        'p-4': !isDesktop,
      })}
    >
      <PropertySection
        title="Spollard ID"
        text={spot?.hardwareSerial || 'N/A'}
        textStyle={TextStyleProps.SEMIBOLD_BLACK}
      />
    </section>
  )
}

export default SpollardContent
