import { GroupPlaceInfo } from '@api/group/types'
import { PlaceAccessSchedule } from '@api/sharedPlaces/types'
import { SpotInfo } from '@api/spot/types'
import {
  BookingSettingsOptionProps,
  BookingSettingsScheduleCardProps as SpotBookingSettingsScheduleCardProps,
} from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/BookingSettingsOption.model'

export type BookingSettingsScheduleCardProps =
  SpotBookingSettingsScheduleCardProps &
    Pick<GroupPlaceInfo, 'placeName' | 'placeType'>

export type UserBookingSettingsOptionProps = {
  onSave?: (
    schedule: Omit<PlaceAccessSchedule, 'scheduleId'>,
    selectedSpots: SpotInfo[]
  ) => void
} & Omit<BookingSettingsOptionProps, 'onSave'>
