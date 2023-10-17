import { Time } from '@api/types'
import { SetModel } from '@api/set/types'

export type BuildingModel = {
  address: string
  cityId: number
  commercialTime: Time
  workingTime: Time
  id: number
  lat: number
  lon: number
  height: number
  ownerId: number
  sets: SetModel[]
}
