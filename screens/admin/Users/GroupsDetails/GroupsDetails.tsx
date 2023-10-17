import React, { FC } from 'react'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'
import GroupsDetailsDesktop from '@screens/admin/Users/GroupsDetails/GroupsDetailsDesktop'
import GroupsDetailsMobile from '@screens/admin/Users/GroupsDetails/GroupsDetailsMobile'
import { GroupsDetailsRouteParams } from '@screens/admin/Users/GroupsDetails/GroupsDetails.model'

const GroupsDetails: FC<GroupsDetailsRouteParams> = ({ groupId }) => {
  return (
    <>
      <LayoutDesktop>
        <GroupsDetailsDesktop groupId={groupId} />
      </LayoutDesktop>
      <LayoutMobile>
        <GroupsDetailsMobile groupId={groupId} />
      </LayoutMobile>
    </>
  )
}

export default GroupsDetails
