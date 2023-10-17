import { SpotInfo } from '@api/spot/types'
import BookingSettingsOptionWeekday from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/BookingSettingsOptionWeekday'
import { UserBookingSettingsOptionProps } from '@screens/owner/Users/BookingSettings/components/BookingSettingsOption/BookingSettingsOption.model'
import SpotAutocomplete from '@screens/owner/Users/BookingSettings/components/SpotAutocomplete/SpotAutocomplete'
import React, { FC, useState } from 'react'

const UserBookingSettingsOptionWeekday: FC<UserBookingSettingsOptionProps> = ({
  onSave,
  ...props
}) => {
  const [selectedSpots, setSelectedSpots] = useState<SpotInfo[]>([])

  return (
    <BookingSettingsOptionWeekday
      {...props}
      onSave={(schedule) => onSave?.(schedule, selectedSpots)}
      disabled={selectedSpots.length === 0}
    >
      <SpotAutocomplete onChange={setSelectedSpots} />
    </BookingSettingsOptionWeekday>
  )
}

export default UserBookingSettingsOptionWeekday
