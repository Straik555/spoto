import { CreateSpotParams, SpotInfo } from '@api/spot/types'
import { Url } from '@constants/routes'
import { SpotDetailType } from '@screens/owner/Spots/Spot/Spot.model'
import { ReactElement } from 'react'

export type ManageSpotProps = {
  onSubmit: (formValues: CreateSpotParams) => void
  title: string
  backLink: Url | ((tab: string) => Url)
  disabled?: boolean
  tabs?: ReactElement
  tabPanels?: ReactElement
  initialActiveTab?: SpotDetailType
  onTabChange?: (tab: SpotDetailType) => void
}

export type ManageSpotFormValues = {
  spotName: string
  location: string
  locationPlaceId: string
  latitude: number | null
  longitude: number | null
  spotDescription: string
  availableForPublic: boolean
  hasHourlyRate: boolean
  hourlyRate: number | null
  hasDailyRate: boolean
  dailyRate: number | null
  hasWeeklyRate: boolean
  weeklyRate: number | null
  maximumVehicleHeight: number | null
  hasElectricCharger: boolean
  electricCharger: Omit<SpotInfo['electricCharger'], 'any'>
  spollardId: number | null
}
