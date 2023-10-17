import { WaitListSearches, WaitListSpots } from '@api/waitlist/types'

export interface TSpotsTab {
  spots: WaitListSpots[] | undefined
  onDelete: (id: number) => void
  isDesktop?: boolean
  isLoading: boolean
}

export interface TSearchTab {
  searches: WaitListSearches[] | undefined
  onDelete: (id: number) => void
  isDesktop?: boolean
}

export interface TSpotsTabCard {
  location: string
  starts: string
  ends: string
  isAvailable: boolean
  perHour: number
  onDelete: () => void
  isDesktop?: boolean
}

export interface TSearchTabCard {
  location: string
  starts: string
  ends: string
  from: string
  spoto: boolean
  onDelete: () => void
  isDesktop?: boolean
}
