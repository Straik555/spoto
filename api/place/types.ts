import { BuildingModel } from '@api/building/types'
import { SetModel } from '@api/set/types'
import { ElectricChargerInfo, SpotInfo } from '@api/spot/types'
import { Time } from '@api/types'

export type PlaceInfo = {
  id: number
  name: string
  description: string
  price: {
    perHour: number
    perDay: number
    perWeek: number
    perMonth: number
  }
  height: number
  electricCharger: ElectricChargerInfo
  building: BuildingModel
  workingTime: Time
  commercialTime: Time
  scheduleInheritance: boolean
  working24h: boolean
  commercial24h: boolean
  isFavoritePlace: boolean
  spotData: Partial<Pick<SpotInfo, 'linked' | 'availabilityState'>>
  setData: Pick<SetModel, 'spotCount'>
}
