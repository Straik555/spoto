import React, { FC } from 'react'
import { Loader } from '@components/Loader'
import useGroups from '@screens/admin/Users/Groups/useGroups'
import PersonsWrapper from '@screens/admin/Users/components/PersonsWrapper/PersonsWrapper'
import AddGroupDialog from '@screens/admin/Users/Groups/components/AddGroupDialog/AddGroupDialog'
import AddButton from '@screens/admin/Users/components/AddButton/AddButton'
import cn from 'classnames'
import { GroupCard } from '@screens/admin/Users/Groups/components/GroupCard'
import Title from '@components/Title/Title'

const Groups: FC = () => {
  const {
    isFetchingGroup,
    openAddDialog,
    setOpenAddDialog,
    searchString,
    setSearchString,
    deleteGroup,
    filteredGroups,
    createGroups,
  } = useGroups()
  return (
    <PersonsWrapper
      search={searchString}
      onChangeSearch={(name) => setSearchString(name)}
      buttonContent={
        <AddButton title="Add Group" onOpen={() => setOpenAddDialog(true)} />
      }
      className={cn({ 'h-full': isFetchingGroup || !filteredGroups.length })}
    >
      <Loader loading={isFetchingGroup} className="mx-auto">
        {filteredGroups.length ? (
          <div className="w-full flex content-start grid w-full grid-cols-1 gap-y-[8px] gap-x-[15px] lg-desktop:grid-cols-3 desktop:grid-cols-2">
            {filteredGroups?.map((group) => {
              return (
                <GroupCard
                  onDelete={() => deleteGroup(group.id)}
                  group={group}
                  key={group.id}
                />
              )
            })}
          </div>
        ) : (
          <div className="flex justify-center w-full my-auto">
            <Title className="font-semibold text-s-xl text-blue-3">
              no user groups
            </Title>
          </div>
        )}
        <AddGroupDialog
          onClose={() => setOpenAddDialog(false)}
          open={openAddDialog}
          onCreate={(name) => createGroups({ name, formData: null })}
        />
      </Loader>
    </PersonsWrapper>
  )
}

export default Groups
