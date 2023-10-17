import { SpotInfo } from '@api/spot/types'
import BookingSettingsOptionRange from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/BookingSettingsOptionRange'
import { UserBookingSettingsOptionProps } from '@screens/owner/Users/BookingSettings/components/BookingSettingsOption/BookingSettingsOption.model'
import SpotAutocomplete from '@screens/owner/Users/BookingSettings/components/SpotAutocomplete/SpotAutocomplete'
import React, { FC, useState } from 'react'

const UserBookingSettingsOptionRange: FC<UserBookingSettingsOptionProps> = ({
  onSave,
  ...props
}) => {
  const [selectedSpots, setSelectedSpots] = useState<SpotInfo[]>([])

  return (
    <BookingSettingsOptionRange
      {...props}
      onSave={(schedule) => onSave?.(schedule, selectedSpots)}
      disabled={selectedSpots.length === 0}
    >
      <SpotAutocomplete onChange={setSelectedSpots} />
    </BookingSettingsOptionRange>
  )
}

export default UserBookingSettingsOptionRange
