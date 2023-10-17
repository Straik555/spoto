import { useEffect, useState } from 'react'
import { SharedPlace } from '@api/sharedPlaces/types'
import { sharedPlacesApi } from '@api/sharedPlaces'
import { toast } from 'react-toastify'

const useTabAccessRights = (groupId: number) => {
  const [sharedPlaces, setSharedPlaces] = useState<
    ({ id: string } & Pick<SharedPlace, 'placeInfo' | 'schedule'>)[] | []
  >([])

  const {
    data: sharedPlacesGroup = [],
    isFetching: isFetchingSharedPlacesByGroup,
  } = sharedPlacesApi.endpoints.getSharedPlacesByGroup.useQuery(groupId, {
    skip: !groupId,
  })

  const [
    deleteGroupAccess,
    { isSuccess: isSetDeleteSuccess, isError: isSetDeleteError },
  ] = sharedPlacesApi.endpoints.deleteGroupFromPlace.useMutation()

  useEffect(() => {
    if (isSetDeleteError) {
      toast.error('Access deletion failed')
    }

    if (isSetDeleteSuccess) {
      toast.success('Access deleted successfully')
    }
  }, [isSetDeleteSuccess, isSetDeleteError])

  useEffect(() => {
    if (sharedPlacesGroup?.length) {
      setSharedPlaces(
        sharedPlacesGroup?.map((group) => ({
          id: group?.id,
          placeInfo: group?.placeInfo,
          schedule: group?.schedule,
        }))
      )
    }
  }, [sharedPlacesGroup])
  return { sharedPlaces, isFetchingSharedPlacesByGroup, deleteGroupAccess }
}

export default useTabAccessRights
