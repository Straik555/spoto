import { FC } from 'react'
import { useRouter } from 'next/router'
import User from '@screens/owner/Users/User'
import { UserRouteParams } from '@screens/owner/Users/User.model'

const UserRoute: FC = () => {
  const router = useRouter()
  const { id } = router.query as UserRouteParams

  return <User id={Number(id)} />
}

export default UserRoute
