import { sharedPlacesApi } from '@api/sharedPlaces'
import Loader from '@components/Loader/Loader'
import { SpotUsersProps } from '@screens/owner/Spots/Spot/Spot.model'
import classNames from 'classnames'
import React, { FC } from 'react'
import SpotUser from './SpotUser'

const SpotUsers: FC<SpotUsersProps> = ({ id }) => {
  const {
    data: spotUsers = [],
    isLoading,
    isFetching,
  } = sharedPlacesApi.endpoints.getUsersByPlace.useQuery({ placeId: id })

  return (
    <Loader loading={isLoading || isFetching}>
      {spotUsers.length ? (
        spotUsers.map((spotUser, i) => {
          return (
            <SpotUser
              key={spotUser.id}
              placeUser={spotUser}
              className={classNames({
                'pb-4 border-b border-b-blue-3': i !== spotUsers.length - 1,
              })}
              spotId={id}
            />
          )
        })
      ) : (
        <p className="mt-10 text-center text-s-base text-blue-2">No Users</p>
      )}
    </Loader>
  )
}

export default SpotUsers
