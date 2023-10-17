import { GroupsDetailsRouteParams } from '@screens/admin/Users/GroupsDetails/GroupsDetails.model'
import { useRouter } from 'next/router'
import React from 'react'
import GroupsDetails from '@screens/admin/Users/GroupsDetails/GroupsDetails'

const GroupRoute: React.FC = () => {
  const router = useRouter()
  const { groupId } = router.query as GroupsDetailsRouteParams

  return <GroupsDetails groupId={groupId} />
}

export default GroupRoute
