import { sharedPlacesApi } from '@api/sharedPlaces'
import { useEffect, useState } from 'react'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import { UserCardItemPlace } from '@screens/admin/Users/components/UserCardItem/UserCardItem.model'

const usePersonCard = (userId: string) => {
  const { isDesktop } = useDeviceInfo()
  const [deleteUserVisible, setDeleteUserVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [places, setPlaces] = useState<UserCardItemPlace[] | []>([])
  const prefetchUserPlaces = sharedPlacesApi.usePrefetch(
    'getSharedPlacesByUser'
  )

  const {
    data: sharedPlacesUser = [],
    isFetching: isFetchingSharedPlacesByUser,
  } = sharedPlacesApi.endpoints.getSharedPlacesByUser.useQuery(String(userId), {
    skip: !(userId && open),
  })

  const onVisibilityChange = (id: string) => {
    prefetchUserPlaces(id)
    setOpen(true)
  }

  useEffect(() => {
    if (isDesktop && userId) {
      setOpen(true)
      prefetchUserPlaces(userId)
    }
  }, [userId, isDesktop])

  useEffect(() => {
    if (sharedPlacesUser.length) {
      setPlaces(
        sharedPlacesUser?.map((user) => ({ ...user, id: String(user?.id) }))
      )
      setOpen(false)
    }
  }, [sharedPlacesUser])

  return {
    places,
    isFetchingSharedPlacesByUser,
    onVisibilityChange,
    setDeleteUserVisible,
    deleteUserVisible,
  }
}

export default usePersonCard
