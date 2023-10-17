import React from 'react'

import Loader from '@components/Loader/Loader'

import Login from '../Login/LoginMobile'
import Register from '../Register/RegisterMobile'
import JoinHouse from './JoinHouse/JoinHouse'
import useJoin from './useJoin'

const Join: React.FC = () => {
  const [state, actions] = useJoin()
  const {
    emailsMatch,
    hasAccount,
    loading,
    inviteByTokenData,
    inviteByQrData,
    profile,
    qr,
  } = state
  const { toggleHasAccount } = actions

  if (inviteByQrData) {
    if (profile) {
      return (
        <JoinHouse
          houseName={inviteByQrData.houseName}
          invitationToken={qr as string}
        />
      )
    }

    if (hasAccount) {
      return <Login switchToRegister={toggleHasAccount} />
    }

    return (
      <Register
        houseName={inviteByQrData.houseName}
        switchToLogin={toggleHasAccount}
      />
    )
  }

  if (inviteByTokenData && !emailsMatch) {
    const { apartmentInviteHouseName, inviteeEmail, isInviteeRegistered } =
      inviteByTokenData

    if (isInviteeRegistered || hasAccount) {
      return (
        <Login
          inviteeEmail={inviteeEmail}
          switchToRegister={toggleHasAccount}
        />
      )
    }

    return (
      <Register
        houseName={apartmentInviteHouseName}
        inviteeEmail={inviteeEmail}
        switchToLogin={toggleHasAccount}
      />
    )
  }

  return <Loader loading={loading} />
}

export default Join
