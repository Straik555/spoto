import { useMemo } from 'react'

import { inviteApi } from '@api/invite'
import { InvitationStatus, MyInviteInfo } from '@api/invite/types'

const useProfileInvitations = () => {
  const {
    data: invites = [],
    isFetching,
    isLoading,
  } = inviteApi.endpoints.getMyInvites.useQuery(null)

  const {
    activeInvites,
    [InvitationStatus.Accepted]: acceptedInvites,
    [InvitationStatus.Sent]: sentInvites,
  } = useMemo(() => {
    return invites.reduceRight(
      (acc, item) => {
        const { isExpired, status } = item
        if (isExpired) {
          return acc
        }
        return {
          ...acc,
          activeInvites: acc.activeInvites.concat(item),
          [status]: acc[status].concat(item),
        }
      },
      {
        activeInvites: [] as MyInviteInfo[],
        [InvitationStatus.Accepted]: [] as MyInviteInfo[],
        [InvitationStatus.Sent]: [] as MyInviteInfo[],
      }
    )
  }, [invites])

  const loading = useMemo(
    () => isFetching || isLoading,
    [isFetching, isLoading]
  )

  return { acceptedInvites, activeInvites, loading, sentInvites }
}

export default useProfileInvitations
