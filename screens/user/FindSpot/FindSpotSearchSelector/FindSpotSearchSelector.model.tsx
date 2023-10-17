export interface TFindSpotSearchSelector {
  searchMode: number
  setSearchMode: (v: number) => void
  findSpots: (type: 'manual' | 'auto') => void
  desktop?: boolean
}
