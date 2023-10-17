import * as React from 'react'
import { useRouter } from 'next/router'
import CreateEditSet from '@screens/admin/Sets/CreateEditSet'
import { CreateEditSetProps } from '@screens/admin/Sets/CreateEditSet/CreateEditSet.model'

const EditSetRoute = () => {
  const router = useRouter()
  const { setId } = router.query as CreateEditSetProps

  return <CreateEditSet setId={setId} />
}

export default EditSetRoute
