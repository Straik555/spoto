import { MapFindNearbyProps } from '@api/find/types'
import { MarkerEntity } from '@screens/admin/Sets/ServerEntities.model'

export type FindSpotFormValues = {
  address: string
  prevAddress: string
  vehicleHeight: null
  searchHistory: null
  lat: number
  lng: number
  markers: null | MapFindNearbyProps
  selectedMarker: null | MarkerEntity[]
  modalIsOpen: boolean
  selectIsOpen: boolean
  startDate: string | null
  endDate: string | null
  isNotEmpty: boolean
  showJoinDialog: boolean
  isWaitList: boolean
  isOpenFilter: boolean
  vehicleType2: boolean
  vehicleType1: boolean
  searchMode: number
  markerIndex: number
  selectType: 'nearest' | 'selectTime' | null
  prevSelectType: 'nearest' | 'selectTime' | 'specificDay' | null
  isOpenTimeDialog: boolean
  isOpenFrom: boolean
  isOpenTo: boolean
  timeFrom: string
  timeTo: string
  prevStartDate: string
  prevEndDate: string
  charger: boolean
  sliderHeight: number
  height: boolean
  isSelectToday: boolean
  isSelectSpecificDay: boolean
  isClient: boolean
}
