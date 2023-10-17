import React, { Fragment, useMemo } from 'react'

import Loader from '@components/Loader/Loader'
import { useDateUtil } from '@hooks/useDateUtil'
import { dateFormats } from '@constants/global'
import { PageHeaderMobile } from '@components/PageHeader'
import { MyInviteInfo } from '@api/invite/types'

import InviteCard from './InviteCard/InviteCard'
import useProfileInvitations from './useProfileInvitations'

const ProfileInvitationsMobile: React.FC = (): React.ReactElement => {
  const { activeInvites, loading } = useProfileInvitations()
  const dateUtil = useDateUtil()

  const groupedInvites = useMemo(() => {
    if (activeInvites.length) {
      return activeInvites.reduce((acc, item) => {
        const invitedAt = dateUtil(item.invitedAt)
        const isToday = invitedAt.isToday()
        const key = isToday ? 'Today' : invitedAt.format(dateFormats.display5)

        return {
          ...acc,
          [key]: (acc[key] || []).concat(item),
        }
      }, {} as { [key: string]: MyInviteInfo[] })
    }
    return {}
  }, [activeInvites, dateUtil])

  return (
    <div className="flex flex-col h-full">
      <PageHeaderMobile title="Invited Spots" />
      <Loader loading={loading}>
        {activeInvites.length ? (
          <div className="p-4">
            {Object.entries(groupedInvites).map(([key, invites]) => (
              <Fragment key={key}>
                <div className="mb-4 font-semibold text-center text-blue-1 text-s-sm">
                  {key}
                </div>
                {invites.map((item) => (
                  <InviteCard key={item.id} {...item} />
                ))}
              </Fragment>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full font-semibold text-[20px] leading-[30px] text-blue-2">
            No Invitations
          </div>
        )}
      </Loader>
    </div>
  )
}

export default ProfileInvitationsMobile
