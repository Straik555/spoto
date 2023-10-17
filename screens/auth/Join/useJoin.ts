import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import { useCurrentProfile } from '@hooks/useCurrentProfile'
import { inviteApi } from '@api/invite'
import { ROUTES } from '@constants/routes'

import { UseJoin } from './Join.model'

const useJoin: UseJoin = () => {
  const router = useRouter()
  const { profile } = useCurrentProfile()
  const { token, qr } = router.query
  const [hasAccount, setHasAccount] = useState<boolean>(false)

  const [
    getInviteByToken,
    {
      data: inviteByTokenData,
      isLoading: inviteByTokenLoading,
      isSuccess: inviteByTokenSuccess,
      isError: inviteByTokenIsError,
    },
  ] = inviteApi.endpoints.getInviteByToken.useLazyQuery()
  const [
    getInviteByQr,
    {
      data: inviteByQrData,
      isLoading: inviteByQrLoading,
      isSuccess: inviteByQrSuccess,
      isError: inviteByQrIsError,
    },
  ] = inviteApi.endpoints.getInviteByQr.useLazyQuery()

  useEffect(() => {
    if (token) {
      getInviteByToken(token as string)
    }
    if (qr) {
      getInviteByQr(qr as string)
    }
  }, [token, qr, getInviteByToken, getInviteByQr, profile])

  useEffect(() => {
    const tokenExpired = inviteByTokenSuccess && !inviteByTokenData
    const qrExpired = inviteByQrSuccess && !inviteByQrData
    if (tokenExpired || qrExpired) {
      router.push({ pathname: ROUTES.HOME })
    }
  }, [
    inviteByQrData,
    inviteByQrSuccess,
    inviteByTokenData,
    inviteByTokenSuccess,
    router,
  ])

  const emailsMatch = useMemo(
    () => profile?.email === inviteByTokenData?.inviteeEmail,
    [inviteByTokenData?.inviteeEmail, profile?.email]
  )

  const loading = useMemo(
    () => inviteByTokenLoading || inviteByQrLoading,
    [inviteByQrLoading, inviteByTokenLoading]
  )

  useEffect(() => {
    if (inviteByTokenIsError || inviteByQrIsError) {
      router.push({ pathname: ROUTES.PARKING_INVITATION_EXPIRED })
    }
  }, [inviteByTokenIsError, inviteByQrIsError, router])

  useEffect(() => {
    if (inviteByTokenData?.isInviteeRegistered && emailsMatch) {
      router.push({ pathname: ROUTES.PROFILE_INVITATIONS })
    }
  }, [emailsMatch, inviteByTokenData, router])

  const toggleHasAccount = () => setHasAccount((prevState) => !prevState)

  const state = {
    emailsMatch,
    hasAccount,
    loading,
    inviteByTokenData,
    inviteByQrData,
    profile,
    qr,
  }
  const actions = { toggleHasAccount }
  return [state, actions]
}

export default useJoin
