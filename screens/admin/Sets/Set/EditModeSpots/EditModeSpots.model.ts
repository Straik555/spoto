import { SpotInfo } from '@api/spot/types'

export interface EditModeSpotsProps {
  spots: SpotInfo[]
  setId?: string
  buildingId?: number | string
}
