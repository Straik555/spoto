import { SpotInfo } from '@api/spot/types'
import { FC } from 'react'

const ElectricChargerDisplayValue: FC<{
  info: SpotInfo['electricCharger']
}> = ({ info }) => {
  const types = [] as string[]

  if (info.type1) {
    types.push('Type 1')
  }

  if (info.type2) {
    types.push('Type 2')
  }

  return <>{types.length ? types.join(', ') : 'None'}</>
}

export default ElectricChargerDisplayValue
