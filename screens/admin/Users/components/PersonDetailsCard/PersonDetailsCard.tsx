import UserCard from '@screens/admin/Users/components/UserCard/UserCard'
import React, { FC } from 'react'
import { PersonDetailsCardProps } from '@screens/admin/Users/components/PersonDetailsCard/PersonDetailsCard.model'
import { UserCardDefaultAvatar } from '@screens/admin/Users/components/UserCard/UserCard.model'

const PersonDetailsCard: FC<PersonDetailsCardProps> = ({
  group,
  setDeleteGroupVisible,
  setGroupId,
  onTab,
  onDetail,
}) => {
  return (
    <>
      <UserCard
        key={group.id}
        name={group.name}
        thumbKey={group.avatarUrl}
        onDelete={() => {
          setDeleteGroupVisible(true)
          setGroupId(String(group.id))
        }}
        classNameHeader="!p-[10px_20px]"
        onDetail={() => {
          onDetail(group.id)
          onTab()
        }}
        defaultAvatar={UserCardDefaultAvatar.PERSON_DETAILS}
      />
    </>
  )
}

export default PersonDetailsCard
