import { PlaceType } from '@api/types'
import { default as SpotBookingSettingsScheduleCard } from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/BookingSettingsScheduleCard'
import { BookingSettingsScheduleCardProps } from '@screens/owner/Users/BookingSettings/components/BookingSettingsOption/BookingSettingsOption.model'
import React, { FC } from 'react'

const BookingSettingsScheduleCard: FC<BookingSettingsScheduleCardProps> = ({
  placeName,
  placeType,
  ...restProps
}) => {
  const placeTitle = placeType === PlaceType.SET ? 'Set' : 'Spot'

  return (
    <SpotBookingSettingsScheduleCard {...restProps}>
      <p className="mb-1 font-semibold text-blue-1 text-s-base">
        {placeTitle}: {placeName}
      </p>
    </SpotBookingSettingsScheduleCard>
  )
}

export default BookingSettingsScheduleCard
