import * as React from 'react'
import { useRouter } from 'next/router'
import Set from '@screens/admin/Sets/Set'
import { SetProps } from '@screens/admin/Sets/Set/Set.model'

const Sets = () => {
  const router = useRouter()
  const { setId } = router.query as SetProps

  return <Set setId={setId} />
}

export default Sets
