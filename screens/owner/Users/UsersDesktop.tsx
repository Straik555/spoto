import React from 'react'
import { PageContent } from '@components/Layout/PageContent'
import { Button } from '@components/index'
import cn from 'classnames'
import { ButtonMode } from '@components/Button/Button.model'
import UserWrapper from '@screens/owner/Users/components/UserWrapper/UserWrapper'
import useUsers from '@screens/owner/Users/useUsers'
import UsersCard from '@screens/owner/Users/components/UsersCard/UsersCard'
import { Loader } from '@components/Loader'
import { AddUserDialog } from '@screens/owner/Users/components/AddUserDialog'
import Title from '@components/Title/Title'

const UsersDesktop = () => {
  const {
    filteredUsers,
    isFetching,
    handleSearchChange,
    search,
    deleteUser,
    setIsOpenAdd,
    isOpenAdd,
    createUser,
  } = useUsers()

  return (
    <PageContent
      title="Users"
      actions={
        <div className="mb-[18px] mt-[18px]">
          <Button
            onClick={() => setIsOpenAdd(true)}
            className="h-[50px] w-[209px]"
            mode={ButtonMode.FULL_PRIMARY}
          >
            Add New User
          </Button>
        </div>
      }
      noCap
    >
      <UserWrapper
        search={search}
        onChange={handleSearchChange}
        className={cn({ 'h-full': isFetching || !filteredUsers.length })}
      >
        <Loader loading={isFetching} className="mx-auto">
          {filteredUsers?.length ? (
            <div className="flex content-start w-full grid gap-y-[8px] grid-cols-2 gap-x-[15px] lg-desktop:grid-cols-3">
              {filteredUsers.map((user) => (
                <UsersCard
                  key={user.invitedUserId}
                  user={user}
                  onDelete={() => deleteUser(user.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center w-full my-auto">
              <Title className="font-semibold text-s-xl text-blue-2">
                no users
              </Title>
            </div>
          )}
        </Loader>
      </UserWrapper>
      <AddUserDialog
        onCreate={(email) => createUser({ email })}
        open={isOpenAdd}
        onClose={() => setIsOpenAdd(false)}
      />
    </PageContent>
  )
}

export default UsersDesktop
