import React, { FC } from 'react'
import cn from 'classnames'
import { Loader } from '@components/Loader'
import InvitePersonDialog from '@screens/admin/Users/Persons/components/InvitePersonDialog/InvitePersonDialog'
import usePersons from '@screens/admin/Users/Persons/usePersons'
import PersonsWrapper from '@screens/admin/Users/components/PersonsWrapper/PersonsWrapper'
import AddButton from '@screens/admin/Users/components/AddButton/AddButton'
import { PersonCard } from '@screens/admin/Users/Persons/components/PersonCard'
import Title from '@components/Title/Title'

const Persons: FC = () => {
  const {
    inviteUserDialogOpen,
    setInviteUserDialogOpen,
    deleteUser,
    isFetchingUser,
    filteredUsers,
    searchString,
    setSearchString,
  } = usePersons()
  return (
    <PersonsWrapper
      search={searchString}
      onChangeSearch={(name) => setSearchString(name)}
      buttonContent={
        <AddButton
          title="Add New User"
          onOpen={() => setInviteUserDialogOpen(true)}
        />
      }
      className={cn({ 'h-full': isFetchingUser || !filteredUsers.length })}
    >
      <Loader loading={isFetchingUser} className="mx-auto">
        {filteredUsers.length ? (
          <div className="flex content-start w-full grid grid-cols-1 gap-y-[8px] lg-desktop:grid-cols-3 desktop:grid-cols-2 desktop:gap-[15px]">
            {filteredUsers?.map((user) => {
              return (
                <PersonCard
                  onDelete={() => deleteUser(user.id)}
                  user={user}
                  key={user.id}
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
        <InvitePersonDialog
          open={inviteUserDialogOpen}
          onClose={() => setInviteUserDialogOpen(false)}
        />
      </Loader>
    </PersonsWrapper>
  )
}

export default Persons
