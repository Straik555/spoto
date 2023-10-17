import { sharedPlacesApi } from '@api/sharedPlaces'
import { useEffect, useState } from 'react'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import { UserCardItemPlace } from '@screens/admin/Users/components/UserCardItem/UserCardItem.model'

const useGroupCard = (groupId: number) => {
  const { isDesktop } = useDeviceInfo()
  const [deleteGroupVisible, setDeleteGroupVisible] = useState(false)
  const [places, setPlaces] = useState<UserCardItemPlace[] | []>([])
  const prefetchGroupPlaces = sharedPlacesApi.usePrefetch(
    'getSharedPlacesByGroup'
  )

  const { data: groupPlaces = [], isFetching: isFetchingSharedPlacesByGroup } =
    sharedPlacesApi.endpoints.getSharedPlacesByGroup.useQueryState(
      Number(groupId),
      {
        skip: !groupId,
      }
    )

  const onVisibilityChange = (id: number) => prefetchGroupPlaces(id)

  useEffect(() => {
    if (isDesktop && groupId) {
      prefetchGroupPlaces(groupId)
    }
  }, [groupId, isDesktop])

  useEffect(() => {
    if (groupPlaces?.length) {
      setPlaces(groupPlaces)
    }
  }, [groupPlaces])
  return {
    places,
    isFetchingSharedPlacesByGroup,
    onVisibilityChange,
    deleteGroupVisible,
    setDeleteGroupVisible,
  }
}

export default useGroupCard
