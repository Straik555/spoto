import * as React from 'react'
import { useRouter } from 'next/router'
import CreateEditSet from '@screens/admin/Sets/CreateEditSet/CreateEditSet'
import { CreateEditSetProps } from '@screens/admin/Sets/CreateEditSet/CreateEditSet.model'

const CreateSetRoute = () => {
  const router = useRouter()
  const { buildingId } = router.query as CreateEditSetProps

  return <CreateEditSet buildingId={buildingId} />
}

export default CreateSetRoute
