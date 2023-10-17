import { setApi } from '@api/set'
import { SetTabs } from '@screens/admin/Sets/Set/Set.model'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from '@constants/routes'

const useSetHook = ({ setId }) => {
  const router = useRouter()
  const { data: dataSet, isLoading: isLoadingSet } =
    setApi.endpoints.getSetById.useQuery(+setId!)
  const [deleteSetById] = setApi.endpoints.deleteSetById.useMutation()
  const [activeTab, setActiveTab] = useState<SetTabs>(SetTabs.Main)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const removeSet = () => {
    deleteSetById(+setId).then(() => {
      router.push({
        pathname: ROUTES.ADMIN_SETS,
      })
    })
  }

  return {
    dataSet,
    isLoadingSet,
    activeTab,
    setActiveTab,
    deleteModalOpen,
    setDeleteModalOpen,
    removeSet,
  }
}

export default useSetHook
