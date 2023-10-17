import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { useDateUtil } from '@hooks/useDateUtil'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import { inviteApi } from '@api/invite'
import { getPersonFullName } from '@screens/admin/Users/utils/getPersonFullName'
import { InvitationStatus } from '@api/invite/types'
import { profileApi, ProfileApiTagTypes } from '@api/profile'
import { useTypedDispatch } from '@redux/hooks'

import { UseInviteCard } from './InviteCard.model'

const useInviteCard: UseInviteCard = (props) => {
  const { avatarUrl, email, id, invitedAt, places, status } = props
  const dateUtil = useDateUtil()
  const { isDesktop } = useDeviceInfo()
  const dispatch = useTypedDispatch()
  const [acceptInviteById] = inviteApi.endpoints.acceptInviteById.useMutation()
  const [deleteInvitationById, { isSuccess: deletedSuccessfully }] =
    inviteApi.endpoints.deleteInvitationById.useMutation()
  const [getMyInvites] = inviteApi.endpoints.getMyInvites.useLazyQuery()

  const [confirmDeleteModal, setConfirmDeleteModal] = useState<boolean>(false)

  const fullName = useMemo(() => getPersonFullName(props), [props])

  const { isStatusPending, isStatusAccepted } = useMemo(
    () => ({
      isStatusPending: status === InvitationStatus.Sent,
      isStatusAccepted: status === InvitationStatus.Accepted,
    }),
    [status]
  )

  useEffect(() => {
    if (deletedSuccessfully) {
      toast.success('You successfully deleted invite.')
    }
  }, [deletedSuccessfully])

  const deleteInvite = useCallback(async () => {
    await deleteInvitationById(id)
    getMyInvites(null)
  }, [deleteInvitationById, getMyInvites, id])

  const rejectInvite = useCallback(async () => {
    await acceptInviteById({ id, accept: false })
    getMyInvites(null)
    toast.error('You have rejected invite')
  }, [acceptInviteById, getMyInvites, id])

  const acceptInvite = useCallback(async () => {
    await acceptInviteById({ id, accept: true })
    getMyInvites(null)
    dispatch(profileApi.util.invalidateTags([ProfileApiTagTypes.ProfileInfo]))
    toast.success('You successfully accept invite')
  }, [acceptInviteById, dispatch, getMyInvites, id])

  const toggleConfirmDeleteModal = () =>
    setConfirmDeleteModal((prevState) => !prevState)

  const state = {
    avatarUrl,
    email,
    confirmDeleteModal,
    fullName,
    invitedAt,
    isDesktop,
    isStatusAccepted,
    isStatusPending,
    places,
  }
  const actions = {
    acceptInvite,
    dateUtil,
    deleteInvite,
    rejectInvite,
    toggleConfirmDeleteModal,
  }
  return [state, actions]
}

export default useInviteCard
