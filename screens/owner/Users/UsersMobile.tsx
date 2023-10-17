import { Loader } from '@components/Loader'
import { PageHeaderMobile } from '@components/PageHeader'
import UsersCard from './components/UsersCard/UsersCard'
import React from 'react'
import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import useUsers from '@screens/owner/Users/useUsers'
import { UserWrapper } from '@screens/owner/Users/components/UserWrapper'
import { AddUserDialog } from '@screens/owner/Users/components/AddUserDialog'
import cn from 'classnames'
import Title from '@components/Title/Title'

const UsersMobile: React.FC = () => {
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
    <>
      <PageHeaderMobile title="Users" />
      <UserWrapper
        search={search}
        onChange={handleSearchChange}
        buttonContent={
          <div className="p-[16px]">
            <Button
              onClick={() => setIsOpenAdd(true)}
              className="w-full h-[44px]"
              mode={ButtonMode.FULL_PRIMARY}
            >
              Add New User
            </Button>
          </div>
        }
        className={cn({ 'h-full': isFetching || !filteredUsers.length })}
      >
        <Loader loading={isFetching} className="mx-auto">
          {filteredUsers?.length ? (
            <div className="flex content-start w-full grid gap-y-[8px] grid-cols-1">
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
              <Title className="font-semibold text-s-base text-blue-2">
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
    </>
  )
}

export default UsersMobile
