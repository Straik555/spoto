import { withForm } from '@components/Form/withForm'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'
import { ROUTES } from '@constants/routes'
import { Nullable } from '@constants/types'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import { FindSpotFormValues } from '@screens/user/FindSpot/FindSpot.model'
import FindSpotDesktop from '@screens/user/FindSpot/FindSpotDesktop'
import FindSpotMobile from '@screens/user/FindSpot/FindSpotMobile'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { EVType, VehicleModel } from '@api/vehicle/types'
import { vehicleApi } from '@api/vehicle'
import { useCurrentProfile } from '@hooks/useCurrentProfile'

const FindSpot: FC<any> = () => {
  const router = useRouter()
  const { profile } = useCurrentProfile()
  const { data: vehicle = [] } = vehicleApi.endpoints.getVehicles.useQuery(
    null,
    {
      skip: !profile,
    }
  )
  const { resetForm, setFieldValue } =
    useTypedFormikContext<FindSpotFormValues>()
  useEffect(() => {
    if (
      window.location.search.length < 1 &&
      Object.keys(router.query).length === 0 &&
      router.asPath === ROUTES.HOME
    ) {
      resetForm()
    }
  }, [window.location.search, router])

  useEffect(() => {
    if (vehicle.length) {
      if (
        vehicle.some((v: VehicleModel) => v.electricCarType === EVType.Type1)
      ) {
        setFieldValue('charger', true)
        setFieldValue('vehicleType1', true)
      }
      if (
        vehicle.some((v: VehicleModel) => v.electricCarType === EVType.Type2)
      ) {
        setFieldValue('charger', true)
        setFieldValue('vehicleType2', true)
      }
    }
  }, [vehicle])

  return (
    <>
      <LayoutDesktop>
        <FindSpotDesktop />
      </LayoutDesktop>
      <LayoutMobile>
        <FindSpotMobile />
      </LayoutMobile>
    </>
  )
}

export default withForm(
  {
    initialValues: {
      address: '',
      prevAddress: '',
      vehicleHeight: null,
      searchHistory: null,
      lat: -33.865143,
      lng: 151.2099,
      markers: null,
      modalIsOpen: false,
      selectIsOpen: false,
      startDate: null,
      endDate: null,
      isNotEmpty: false,
      showJoinDialog: false,
      isWaitList: false,
      searchMode: 0,
      markerIndex: 0,
      selectType: null,
      prevSelectType: null,
      isOpenTimeDialog: false,
      isOpenFrom: false,
      isOpenTo: false,
      timeFrom: null,
      timeTo: null,
      prevStartDate: null,
      prevEndDate: null,
      sliderHeight: 1.4,
      height: false,
      isSelectToday: false,
      isSelectSpecificDay: false,
      vehicleType1: false,
      vehicleType2: false,
      isOpenFilter: false,
      charger: false,
      isClient: true,
    } as Nullable<FindSpotFormValues>,
    className: 'w-full h-full',
  },
  FindSpot
)
