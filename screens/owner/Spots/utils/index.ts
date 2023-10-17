import { ElectricChargerInfo, SpotInfo } from '@api/spot/types'

export const spotAvailableForPublic = (price: SpotInfo['price']): boolean => {
  return price.perHour > 0
}

export const hasElectricCharger = (
  info: ElectricChargerInfo | null
): boolean => {
  if (!info) return false

  return Object.values(info).includes(true)
}
