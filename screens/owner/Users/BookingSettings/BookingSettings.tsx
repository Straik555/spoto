import { sharedPlacesApi } from '@api/sharedPlaces'
import { PlaceAccessSchedule } from '@api/sharedPlaces/types'
import { SpotInfo } from '@api/spot/types'
import { PageHeaderMobile } from '@components/PageHeader'
import Title from '@components/Title/Title'
import { BookingSettingsProps } from '@screens/owner/Users/BookingSettings/BookingSettings.model'
import UserBookingSettingsOptionRange from '@screens/owner/Users/BookingSettings/components/BookingSettingsOption/BookingSettingsOptionRange'
import UserBookingSettingsOptionSingle from '@screens/owner/Users/BookingSettings/components/BookingSettingsOption/BookingSettingsOptionSingle'
import UserBookingSettingsOptionWeekday from '@screens/owner/Users/BookingSettings/components/BookingSettingsOption/BookingSettingsOptionWeekday'
import React, { FC, useEffect } from 'react'
import { toast } from 'react-toastify'
import UserBookingSettingsOptionPermanent from './components/BookingSettingsOption/BookingSettingsOptionPermanent'
import BookingSettingsScheduleCard from './components/BookingSettingsOption/BookingSettingsScheduleCard'

const BookingSettings: FC<BookingSettingsProps> = ({ userId }) => {
  const { data: userPlaces = [] } =
    sharedPlacesApi.endpoints.getSharedPlacesByUser.useQuery(userId)
  const [addSharedPlacesByUserTrigger, addSharedPlacesByUserRes] =
    sharedPlacesApi.endpoints.addPlacesToUser.useMutation()
  const [updateUsersForPlaceTrigger, updateUsersForPlaceRes] =
    sharedPlacesApi.endpoints.updateUsersForPlace.useMutation()
  const createUpdateSchedule = (
    schedule: Omit<PlaceAccessSchedule, 'scheduleId'>,
    selectedSpots: SpotInfo[]
  ): void => {
    addSharedPlacesByUserTrigger({
      userId,
      data: {
        placeIds: selectedSpots?.map((s) => s.id) || [],
        schedule: [schedule],
      },
    })
  }
  const deleteSchedule = (
    scheduleId: PlaceAccessSchedule['scheduleId']
  ): void => {
    const userPlace = userPlaces.find((userPlace) => {
      return userPlace.schedule.find(
        (schedule) => schedule.scheduleId === scheduleId
      )
    })

    if (!userPlace) {
      throw new Error('Schedule not found')
    }

    const schedules = userPlace.schedule.filter(
      (schedule) => schedule.scheduleId !== scheduleId
    )
    updateUsersForPlaceTrigger({
      spotId: String(userPlace.placeInfo.placeId),
      userId,
      data: {
        schedule: schedules,
      },
    })
  }
  const flattenedScheduleUserPlaces = userPlaces.flatMap((userPlace) => {
    return userPlace.schedule.map((schedule) => {
      return {
        ...userPlace,
        schedule: [schedule],
      }
    })
  })
  const isSuccess =
    addSharedPlacesByUserRes.isSuccess || updateUsersForPlaceRes.isSuccess
  const isError =
    addSharedPlacesByUserRes.isError || updateUsersForPlaceRes.isError
  const isLoading =
    addSharedPlacesByUserRes.isLoading || updateUsersForPlaceRes.isLoading

  useEffect(() => {
    if (isSuccess) {
      toast.success('Booking options successfully updated')
    }

    if (isError) {
      toast.error('Failed to update booking options')
    }
  }, [isSuccess, isError])

  return (
    <>
      <PageHeaderMobile
        title="Edit Options"
        backButtonLink={`/owner/users`}
        showBackButton
      />

      <div className="p-5">
        <Title as="p" className="mb-3 text-blue-1 text-s-lg">
          Select A Booking Option
        </Title>

        <div className="flex flex-wrap mb-3">
          {flattenedScheduleUserPlaces.map((userPlace) => {
            return userPlace.schedule.map((schedule) => (
              <BookingSettingsScheduleCard
                key={schedule.scheduleId}
                schedule={schedule}
                onDelete={() => deleteSchedule(schedule.scheduleId)}
                className="m-1"
                disabled={isLoading}
                placeName={userPlace.placeInfo.placeName}
                placeType={userPlace.placeInfo.placeType}
              />
            ))
          })}
        </div>

        <UserBookingSettingsOptionPermanent
          className="mb-2"
          onSave={createUpdateSchedule}
        />

        <UserBookingSettingsOptionSingle
          className="mb-2"
          onSave={createUpdateSchedule}
        />

        <UserBookingSettingsOptionWeekday
          className="mb-2"
          onSave={createUpdateSchedule}
        />

        <UserBookingSettingsOptionRange
          className="mb-6"
          onSave={createUpdateSchedule}
        />
      </div>
    </>
  )
}

export default BookingSettings
