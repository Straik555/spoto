import { Users } from '@screens/admin/Users'
import { UsersRouteParams } from '@screens/admin/Users/Users.model'
import { useRouter } from 'next/router'
import React from 'react'

const UsersRoute: React.FC = () => {
  const router = useRouter()
  const { type: types } = router.query as UsersRouteParams
  const type = types?.[0]

  return <Users type={type} />
}

export default UsersRoute
