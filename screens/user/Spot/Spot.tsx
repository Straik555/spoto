import { withForm } from '@components/Form/withForm'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'
import { useDateUtil } from '@hooks/useDateUtil'
import {
  SpotFormValues,
  SpotProps,
  SpotQueryParams,
} from '@screens/user/Spot/Spot.model'
import SpotDesktop from '@screens/user/Spot/SpotDesktop'
import SpotMobile from '@screens/user/Spot/SpotMobile'
import useSpot from '@screens/user/Spot/useSpot'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { toast } from 'react-toastify'

const Spot: FC<SpotProps> = ({ placeId }) => {
  const router = useRouter()
  const dateUtil = useDateUtil()
  const { startDate: startDateTimeUtc, endDate: endDateTimeUtc } =
    router.query as SpotQueryParams
  const { preBook, preBookOrBookErrorMsg } = useSpot(placeId)

  useEffect(() => {
    preBook(
      startDateTimeUtc && endDateTimeUtc
        ? {
            startDateTimeUtc: dateUtil.utc(startDateTimeUtc),
            endDateTimeUtc: dateUtil.utc(endDateTimeUtc),
          }
        : {}
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!preBookOrBookErrorMsg) return

    toast.error(preBookOrBookErrorMsg)
  }, [preBookOrBookErrorMsg])

  return (
    <>
      <LayoutDesktop>
        <SpotDesktop placeId={placeId} />
      </LayoutDesktop>
      <LayoutMobile>
        <SpotMobile placeId={placeId} />
      </LayoutMobile>
    </>
  )
}

export default withForm<SpotProps>(
  {
    initialValues: {
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
    } as SpotFormValues,
    className: 'h-full w-full',
  },
  Spot
)
