import { downloadBlobFile } from '@screens/houseManager/Houses/House/Tower/utils/downloadBlobFile'
import { useCallback, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'

import { houseApi } from '@api/house'

import { UseInviteByQrForm } from './InviteByQrForm.model'

const useInviteByQrForm: UseInviteByQrForm = () => {
  const router = useRouter()
  const { apartmentId, towerId } = router.query

  const { data: qrCode, isLoading: getQrCodeLoading } =
    houseApi.endpoints.getQrCode.useQuery(Number(apartmentId))
  const { data: apartment } =
    houseApi.endpoints.getApartmentsById.useQueryState(+apartmentId!, {
      skip: !apartmentId,
    })
  const [
    performQrCode,
    {
      data: performQrCodeData,
      isSuccess: performQrCodeSuccess,
      isLoading: performQrCodeLoading,
    },
  ] = houseApi.endpoints.performQrCode.useMutation()
  const [renewQrCode, { data: newQrCode, isLoading: renewQrCodeLoading }] =
    houseApi.endpoints.renewQrCode.useMutation()
  const { expires = '', link: qrCodeLink = '' } = newQrCode || qrCode || {}

  const isExpired = useMemo(() => {
    return expires < new Date().toISOString()
  }, [expires])

  const handlePerformQrCode = useCallback(() => {
    performQrCode({
      towerId: Number(towerId),
      apartmentIds: [Number(apartmentId)],
    })
  }, [apartmentId, performQrCode, towerId])

  const handleRenewQrCode = useCallback(() => {
    renewQrCode(Number(apartmentId))
  }, [apartmentId, renewQrCode])

  useEffect(() => {
    if (performQrCodeSuccess && performQrCodeData) {
      downloadBlobFile(performQrCodeData, 'Apartment ' + apartment?.name)
    }
  }, [performQrCodeSuccess, performQrCodeData, apartment?.name])

  const loading = useMemo(
    () => getQrCodeLoading || performQrCodeLoading || renewQrCodeLoading,
    [getQrCodeLoading, performQrCodeLoading, renewQrCodeLoading]
  )

  const state = { expires, loading, isExpired, qrCodeLink }
  const actions = { handlePerformQrCode, handleRenewQrCode }
  return [state, actions]
}

export default useInviteByQrForm
