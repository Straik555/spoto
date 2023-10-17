import { sharedPlacesApi } from '@api/sharedPlaces'
import { PlaceAccessSchedule } from '@api/sharedPlaces/types'
import { PageHeaderMobile } from '@components/PageHeader'
import Title from '@components/Title/Title'
import { ROUTES } from '@constants/routes'
import { BookingSettingsProps } from '@screens/owner/Spots/BookingSettings/BookingSettings.model'
import BookingSettingsOptionRange from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/BookingSettingsOptionRange'
import BookingSettingsOptionWeekday from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/BookingSettingsOptionWeekday'
import BookingSettingsScheduleCard from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/BookingSettingsScheduleCard'
import { SpotDetailType } from '@screens/owner/Spots/Spot/Spot.model'
import React, { FC, useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import BookingSettingsOptionPermanent from './components/BookingSettingsOption/BookingSettingsOptionPermanent'
import BookingSettingsOptionSingle from './components/BookingSettingsOption/BookingSettingsOptionSingle'

const BookingSettings: FC<BookingSettingsProps> = ({ id, userId }) => {
  const { data: existingAccessInfo, ...getAccessInfoRes } =
    sharedPlacesApi.endpoints.getUserByPlace.useQuery({
      spotId: id,
      userId,
    })
  const [createUserSpotAccessTrigger, createAccessRes] =
    sharedPlacesApi.endpoints.addUsersAndGroupsToPlace.useMutation()
  const [updateUserSpotAccessTrigger, updateAccessRes] =
    sharedPlacesApi.endpoints.updateUsersForPlace.useMutation()
  const createUpdateSchedule = (
    schedule: Omit<PlaceAccessSchedule, 'scheduleId'>
  ): void => {
    if (existingAccessInfo?.schedule.length) {
      updateUserSpotAccessTrigger({
        spotId: String(id),
        userId,
        data: {
          schedule: [
            ...existingAccessInfo.schedule,
            {
              ...schedule,
            } as PlaceAccessSchedule,
          ],
        },
      })
    } else {
      createUserSpotAccessTrigger({
        placeId: id,
        data: {
          userIds: [userId],
          schedule: [schedule],
        },
      })
    }
  }
  const deleteSchedule = (
    scheduleId: PlaceAccessSchedule['scheduleId']
  ): void => {
    if (!existingAccessInfo?.schedule.length) return

    const schedules = existingAccessInfo.schedule.filter(
      (s) => s.scheduleId !== scheduleId
    )

    updateUserSpotAccessTrigger({
      spotId: String(id),
      userId,
      data: {
        schedule: schedules,
      },
    })
  }
  const isSuccess = createAccessRes.isSuccess || updateAccessRes.isSuccess
  const isError = createAccessRes.isError || updateAccessRes.isError
  const existingSchedules = useMemo(
    () => existingAccessInfo?.schedule || [],
    [existingAccessInfo?.schedule]
  )

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
        backButtonLink={{
          pathname: ROUTES.OWNER_SPOTS_FIND_TAB,
          query: {
            id,
            type: [SpotDetailType.Main],
          },
        }}
        showBackButton
      />

      <div className="p-5">
        <Title as="p" className="mb-3 text-blue-1 text-s-lg">
          Select A Booking Option
        </Title>

        <div className="block mb-3">
          {existingSchedules.map((schedule, i) => {
            return (
              <BookingSettingsScheduleCard
                key={schedule.scheduleId}
                schedule={schedule}
                onDelete={() => deleteSchedule(schedule.scheduleId)}
                className="m-1"
                disabled={
                  updateAccessRes.isLoading || getAccessInfoRes.isLoading
                }
              />
            )
          })}
        </div>

        <BookingSettingsOptionPermanent
          className="mb-2"
          onSave={createUpdateSchedule}
        />

        <BookingSettingsOptionSingle
          className="mb-2"
          onSave={createUpdateSchedule}
        />

        <BookingSettingsOptionWeekday
          className="mb-2"
          onSave={createUpdateSchedule}
        />

        <BookingSettingsOptionRange
          className="mb-6"
          onSave={createUpdateSchedule}
        />
      </div>
    </>
  )
}

export default BookingSettings
