import { waitListApi } from '@api/waitlist'
import { ROUTES } from '@constants/routes'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

const useWaitList = () => {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<number>(0)

  const { data: spots, isLoading } =
    waitListApi.endpoints.getSpotWaitList.useQuery(null, {
      skip: router.route !== ROUTES.WAIT_LIST_SPOTS,
    })
  const [deleteSpotWaitList] =
    waitListApi.endpoints.deleteSpotWaitList.useMutation()
  const [deleteSearchWaitList] =
    waitListApi.endpoints.deleteSearchesWaitList.useMutation()

  const closeConfirmationDialog = () => setDeleteId(0)

  const deleteWaitList = useCallback(() => {
    try {
      if (router.route === ROUTES.WAIT_LIST_SPOTS) {
        deleteSpotWaitList({ spotId: deleteId })
      } else {
        deleteSearchWaitList({ spotId: deleteId })
      }
      closeConfirmationDialog()
    } catch (e) {
      toast.error('Internal server error.')
    }
  }, [deleteId, deleteSearchWaitList, deleteSpotWaitList, router.route])

  return [
    {
      spots,
      deleteId,
      setDeleteId,
      deleteWaitList,
      isLoading,
      closeConfirmationDialog,
    },
  ]
}

export default useWaitList
