import { SpotInfo, SpotAvailabilityState } from '@api/spot/types'

export type SpotsSpotProps = Pick<
  SpotInfo,
  'name' | 'linked' | 'id' | 'availabilityState' | 'price'
>

export type SpotsSpotFormValues = {
  type: SpotAvailabilityState
}
