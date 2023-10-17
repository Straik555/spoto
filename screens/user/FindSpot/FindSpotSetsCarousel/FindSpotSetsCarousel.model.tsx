import { MarkerEntity } from '@screens/admin/Sets/ServerEntities.model'

export type FindSpotSearchSelectorProps = {
  markers: MarkerEntity[]
  goToSpot: (n: MarkerEntity) => void
  onAdded: (n: number) => void
}

export type SetsCarouselDesktopItemProps = {
  marker: MarkerEntity
  markerIndex: number
  activeMarkerIndex: number
  onChange: (n: number) => void
} & Pick<FindSpotSearchSelectorProps, 'onAdded' | 'goToSpot'>
