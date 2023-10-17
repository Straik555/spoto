export interface SpotCardProps {
  id: string
  status: boolean
  isActive?: boolean
  electricCharger: { type1: boolean; type2: boolean }
  onClick?: () => void
  onDeleteSpot?: () => void
}
