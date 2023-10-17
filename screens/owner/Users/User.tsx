import { inviteApi } from '@api/invite'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import { Button } from '@components/index'
import { Loader } from '@components/Loader'
import { PageHeaderMobile } from '@components/PageHeader'
import { ROUTES } from '@constants/routes'
import { UserAvatar } from '@screens/admin/Users/components/UserAvatar'
import { SharedSpotsBlock } from '@screens/owner/Users/components/SharedSpotsBlock'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import Title from '@components/Title/Title'

const User: FC<{ id: number }> = ({ id }) => {
  const router = useRouter()
  const { data, isLoading, isFetching } =
    inviteApi.endpoints.getInvitationById.useQuery(id)
  const [
    deleteUserInvitationById,
    {
      isLoading: deleteUserLoading,
      isSuccess: deleteUserSuccess,
      isError: deleteUserError,
    },
  ] = inviteApi.endpoints.deleteInvitationById.useMutation()

  const [confirmDeleteModal, setConfirmDeleteModal] = useState<boolean>(false)

  const fullName = useMemo(() => {
    return `${data?.firstName} ${data?.lastName}`
  }, [data?.firstName, data?.lastName])

  const toggleConfirmDeleteModal = () =>
    setConfirmDeleteModal((prevState) => !prevState)

  useEffect(() => {
    if (deleteUserSuccess) {
      toast.success('User successfully deleted!')
      router.push({ pathname: ROUTES.OWNER_USERS })
    }
  }, [deleteUserSuccess])

  useEffect(() => {
    if (deleteUserError) {
      toast.error('Failed to delete user!')
    }
  }, [deleteUserError])

  return (
    <>
      <PageHeaderMobile
        title={fullName}
        showBackButton
        backButtonLink={{ pathname: ROUTES.OWNER_USERS }}
      />
      <Loader loading={isLoading || isFetching}>
        <div className="flex flex-col justify-between h-full pb-1">
          <div className="px-4">
            <div className="flex items-center py-5 border-b border-blue-4">
              <UserAvatar thumbKey={data?.avatarUrl} />
              <Title
                as="h3"
                noCap
                className="ml-6 font-semibold text-black text-s-xl leading-[27px]"
              >
                {fullName}
              </Title>
            </div>
            <div className="border-b border-blue-4 py-2.5">
              <div className="flex items-center justify-between mb-2.5">
                <Title
                  as="3"
                  noCap
                  className="font-semibold leading-normal text-black text-s-lg"
                >
                  Shared spots
                </Title>
                <Link
                  href={{ pathname: ROUTES.OWNER_USERS_EDIT, query: { id } }}
                >
                  <a>
                    <Button
                      className="h-10 py-2 font-medium capitalize text-s-sm w-36 leading-[18px] px-2.5"
                      mode={ButtonMode.SMALL}
                      icon={ButtonIcon.EDIT_WHITE}
                    >
                      Edit shared spot
                    </Button>
                  </a>
                </Link>
              </div>
              {data?.places.map((spot) => (
                <SharedSpotsBlock key={spot.id} {...spot} />
              ))}
            </div>
          </div>
          <Button onClick={toggleConfirmDeleteModal}>Delete user</Button>
        </div>
      </Loader>

      <DeleteDialog
        open={confirmDeleteModal}
        message="Delete this user?"
        onClose={toggleConfirmDeleteModal}
        onSubmit={() => {
          deleteUserInvitationById(id)
        }}
        disabled={deleteUserLoading}
      />
    </>
  )
}

export default User
