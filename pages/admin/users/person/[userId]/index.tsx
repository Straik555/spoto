import PersonsDetails from '@screens/admin/Users/PersonsDetails/PersonsDetails'
import { PersonsDetailsRouteParams } from '@screens/admin/Users/PersonsDetails/PersonsDetails.model'
import { useRouter } from 'next/router'
import React from 'react'

const PersonRoute: React.FC = () => {
  const router = useRouter()
  const { userId } = router.query as PersonsDetailsRouteParams

  return <PersonsDetails userId={userId} />
}

export default PersonRoute
