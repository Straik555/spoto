type TList = {
  id: number
  searchQuery: string
}

export interface TFindSpotLastVisits {
  list: TList[]
  onClear: (id: number) => void
  onChoose: (address: string) => void
  desktop?: boolean
}
