import { BuildingModel } from '@api/building/types'
import { SpotInfo } from '@api/spot/types'
import { Time } from '@api/types'

export type SetModel = {
  id: number
  name: string
  description: string
  height: number
  spots: SpotInfo[]
  building: BuildingModel
  workingTime: Time
  commercialTime: Time
  buildingId: number
  spotCount: number
}

export type DeleteSet = {
  setId: number
  includeSpots: boolean
}

export type AddSpots = {
  setId: number
  spotIds: number[]
}
