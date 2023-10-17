import { SpotInfo } from '@api/spot/types'
import BookingSettingsOptionSingle from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/BookingSettingsOptionSingle'
import { UserBookingSettingsOptionProps } from '@screens/owner/Users/BookingSettings/components/BookingSettingsOption/BookingSettingsOption.model'
import SpotAutocomplete from '@screens/owner/Users/BookingSettings/components/SpotAutocomplete/SpotAutocomplete'
import React, { FC, useState } from 'react'

const UserBookingSettingsOptionSingle: FC<UserBookingSettingsOptionProps> = ({
  onSave,
  ...props
}) => {
  const [selectedSpots, setSelectedSpots] = useState<SpotInfo[]>([])

  return (
    <BookingSettingsOptionSingle
      {...props}
      onSave={(schedule) => onSave?.(schedule, selectedSpots)}
      disabled={selectedSpots.length === 0}
    >
      <SpotAutocomplete onChange={setSelectedSpots} />
    </BookingSettingsOptionSingle>
  )
}

export default UserBookingSettingsOptionSingle
