import { SpotInfo } from '@api/spot/types'
import BookingSettingsOptionPermanent from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/BookingSettingsOptionPermanent'
import { UserBookingSettingsOptionProps } from '@screens/owner/Users/BookingSettings/components/BookingSettingsOption/BookingSettingsOption.model'
import SpotAutocomplete from '@screens/owner/Users/BookingSettings/components/SpotAutocomplete/SpotAutocomplete'
import React, { FC, useState } from 'react'

const UserBookingSettingsOptionPermanent: FC<
  UserBookingSettingsOptionProps
> = ({ onSave, ...props }) => {
  const [selectedSpots, setSelectedSpots] = useState<SpotInfo[]>([])

  return (
    <BookingSettingsOptionPermanent
      {...props}
      onSave={(schedule) => onSave?.(schedule, selectedSpots)}
      disabled={selectedSpots.length === 0}
    >
      <SpotAutocomplete onChange={setSelectedSpots} />
    </BookingSettingsOptionPermanent>
  )
}

export default UserBookingSettingsOptionPermanent
