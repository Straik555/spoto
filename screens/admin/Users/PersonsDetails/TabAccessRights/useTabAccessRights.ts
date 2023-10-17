import { useEffect, useState } from 'react'
import { SharedPlace } from '@api/sharedPlaces/types'
import { sharedPlacesApi } from '@api/sharedPlaces'
import { toast } from 'react-toastify'

const useTabAccessRights = (userId?: string) => {
  const [sharedPlaces, setSharedPlaces] = useState<
    ({ id: string } & Pick<SharedPlace, 'placeInfo' | 'schedule'>)[] | []
  >([])
  const {
    data: sharedPlacesUser = [],
    isFetching: isFetchingSharedPlacesByUser,
  } = sharedPlacesApi.endpoints.getSharedPlacesByUser.useQuery(String(userId), {
    skip: !userId,
  })
  const [
    deleteGroupAccess,
    { isSuccess: isSetDeleteSuccess, isError: isSetDeleteError },
  ] = sharedPlacesApi.endpoints.deleteUserFromPlace.useMutation()

  useEffect(() => {
    if (sharedPlacesUser?.length) {
      setSharedPlaces(
        sharedPlacesUser?.map((user) => ({ ...user, id: String(user?.id) }))
      )
    }
  }, [sharedPlacesUser])

  useEffect(() => {
    if (isSetDeleteError) {
      toast.error('Access deletion failed')
    }

    if (isSetDeleteSuccess) {
      toast.success('Access deleted successfully')
    }
  }, [isSetDeleteSuccess, isSetDeleteError])

  return {
    isFetchingSharedPlacesByUser,
    sharedPlaces,
    deleteGroupAccess,
  }
}

export default useTabAccessRights
