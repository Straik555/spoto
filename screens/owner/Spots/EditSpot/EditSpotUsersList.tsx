import { sharedPlacesApi } from '@api/sharedPlaces'
import CheckboxGroup from '@components/Form/Checkbox/CheckboxGroup'
import { withForm } from '@components/Form/withForm'
import {
  EditSpotUsersListFormValues,
  EditSpotUsersListProps,
} from '@screens/owner/Spots/EditSpot/EditSpotUsers.model'
import SpotUser from '@screens/owner/Spots/EditSpot/SpotUser'
import React, { FC } from 'react'

const EditSpotUsersList: FC<EditSpotUsersListProps> = ({
  spotUsers,
  spotId,
}) => {
  return (
    <CheckboxGroup name="userIds">
      {spotUsers.map((spotUser) => {
        return (
          <SpotUser
            key={spotUser.id}
            user={spotUser}
            spotId={spotId}
            className="mt-2"
          />
        )
      })}
    </CheckboxGroup>
  )
}

export default withForm<EditSpotUsersListProps>(
  {
    initialValues: {
      userIds: [],
    } as EditSpotUsersListFormValues,
  },
  EditSpotUsersList
)
