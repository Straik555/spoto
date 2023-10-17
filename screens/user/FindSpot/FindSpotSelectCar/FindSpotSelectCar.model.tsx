export interface TFindSpotSelectCar {
  price: number[] | undefined
  active: boolean
  availableSpotCount: number
  onClick: () => void
  charging?: boolean
  car?: boolean
  isEmpty?: boolean
}
