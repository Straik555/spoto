import findMapApi from '@api/find'
import { MapFindNearbyArgs } from '@api/find/types'
import { ApiError, TimeApi } from '@api/types'
import { waitListApi } from '@api/waitlist'
import { dateFormats } from '@constants/global'
import { ROUTES } from '@constants/routes'
import { useCurrentProfile } from '@hooks/useCurrentProfile'
import { useDateUtil } from '@hooks/useDateUtil'
import { MarkerEntity } from '@screens/admin/Sets/ServerEntities.model'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { toast } from 'react-toastify'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import { FindSpotFormValues } from '@screens/user/FindSpot/FindSpot.model'

const useFindSpot = () => {
  const [paramsFindNearby, setParamsFindNearby] = useState<string>('')
  const { values, setFieldValue } = useTypedFormikContext<FindSpotFormValues>()
  const { profile } = useCurrentProfile()
  const dateUtil = useDateUtil()
  const router = useRouter()
  const [
    addToSpotsWaitList,
    { isSuccess: isAddSpotSuccess, isError: isAddSpotError, error },
  ] = waitListApi.endpoints.createSpotWaitList.useMutation()
  const { data: history } = findMapApi.endpoints.getHistory.useQuery(null, {
    skip: !values.modalIsOpen || values.searchHistory || !profile,
  })
  const { data: markers, isFetching: findIsLoading } =
    findMapApi.endpoints.getFindNearby.useQuery(paramsFindNearby, {
      skip: !paramsFindNearby.length,
      refetchOnMountOrArgChange: true,
    })

  const [clearHistoryTrigger] = findMapApi.endpoints.clearHistory.useMutation()
  useEffect(() => {
    if (isAddSpotSuccess) {
      setFieldValue('isWaitList', true)
      toast.success('Spot added')
    }
    if (isAddSpotError && error) {
      const errorMessage = error as ApiError
      toast.error(errorMessage?.data?.message || 'Internal server error.')
    }
  }, [isAddSpotSuccess, isAddSpotError])
  useEffect(() => {
    const localStorageData = window.localStorage.getItem('lastSearch')
    if (localStorageData) {
      const {
        startDate,
        endDate,
        sliderHeight,
        address,
        vehicleType2,
        vehicleType1,
        isToday,
      } = JSON.parse(localStorageData)
      searchQueryParams({
        vehicleType1: vehicleType1,
        vehicleType2: vehicleType2,
        sliderHeight: sliderHeight,
        isToday: isToday,
        address: address,
        timeFrom: startDate,
        timeTo: endDate,
      })
      setTimeout(() => {
        handleSearch(
          {
            dayFrom: startDate,
            timeFrom: startDate,
            timeTo: endDate,
            nearestTime: !startDate,
          },
          address
        )
      }, 0)
      window.localStorage.removeItem('lastSearch')
    }
  }, [])

  useEffect(() => {
    if (values.modalIsOpen && !values.searchHistory && profile) {
      if (history) {
        setFieldValue('searchHistory', history.items)
      }
    }
  }, [history, values.modalIsOpen])

  useEffect(() => {
    if (markers) {
      if (markers?.items.length) {
        setFieldValue(
          'selectedMarker',
          filterSelectedMarker(
            markers?.items,
            markers?.items[0].buildingLatitude,
            markers?.items[0].buildingLongitude
          )
        )
      }
      setFieldValue('markers', markers)
      setFieldValue(
        'isNotEmpty',
        markers && markers?.items.some((item) => item.availableSpotCount)
      )
    }
  }, [markers])

  useEffect(() => {
    if (!values.markers?.items || !values.isOpenFilter) return
    searchQueryParams({
      vehicleType1: values.vehicleType1,
      vehicleType2: values.vehicleType2,
      sliderHeight: values.sliderHeight,
      isToday: values.isSelectToday,
      timeFrom: values.timeFrom,
      timeTo: values.timeTo,
      address: values.address,
    })
    getSpots({
      dayFrom: values.startDate,
      timeFrom: values.timeFrom,
      timeTo: values.timeTo,
      nearestTime: values.selectType === 'nearest',
      latitude: values.lat,
      longitude: values.lng,
      address: values.address,
    })
  }, [values.sliderHeight, values.vehicleType1, values.vehicleType2])

  useEffect(() => {
    if (!values.charger) {
      setFieldValue('vehicleType1', false)
      setFieldValue('vehicleType2', false)
    }
  }, [values.charger])

  useEffect(() => {
    if (!values.isClient || !router.query?.address || !router.query?.isToday)
      return
    if (
      window.location.search &&
      router.query &&
      Object.keys(router.query).length > 0
    ) {
      if (JSON.parse(String(router.query?.isToday))) {
        setFieldValue('isSelectToday', true)
        setFieldValue('isSelectSpecificDay', false)
        setFieldValue('startDate', null)
        if (router.query?.startDate && router.query?.endDate) {
          setFieldValue('selectType', 'selectTime')
        } else {
          setFieldValue('selectType', 'nearest')
        }
      } else {
        setFieldValue('isSelectToday', false)
        setFieldValue('isSelectSpecificDay', true)
        setFieldValue(
          'startDate',
          dateUtil(String(router.query?.startDate))
            .utc()
            .format(dateFormats.iso8601)
        )
      }
      if (router.query?.startDate && router.query?.endDate) {
        setFieldValue('timeFrom', router.query?.startDate)
        setFieldValue('timeTo', router.query?.endDate)
      }
      setFieldValue('address', router.query?.address)
      setFieldValue('sliderHeight', router.query?.vehicleHeight)
      if (
        JSON.parse(String(router.query?.vehicleType1)) ||
        JSON.parse(String(router.query?.vehicleType2))
      ) {
        setFieldValue('charger', true)
      }
      setFieldValue(
        'vehicleType1',
        JSON.parse(String(router.query?.vehicleType1))
      )
      setFieldValue(
        'vehicleType2',
        JSON.parse(String(router.query?.vehicleType2))
      )
      if (
        JSON.parse(String(Number(router.query?.vehicleHeight))) > 1.4 ||
        JSON.parse(String(Number(router.query?.vehicleHeight))) < 1.4
      ) {
        setFieldValue('height', true)
      }
    }
  }, [router.query])

  useEffect(() => {
    if (values.markers || values.searchMode > 0) return
    if (values.address.length && window.location.search) {
      setFieldValue('isClient', false)
      setFieldValue('searchMode', 1)
      handleSearch(
        {
          dayFrom: values.startDate,
          timeFrom: values.timeFrom,
          timeTo: values.timeTo,
          nearestTime: !values.startDate,
        },
        router.query?.address
      )
    }
  }, [values.address])

  useEffect(() => {
    if (!values.height) {
      setFieldValue('sliderHeight', 1.4)
    }
  }, [values.height])

  const filterSelectedMarker = (
    markers: MarkerEntity[] | undefined,
    lat: number | undefined,
    lon: number | undefined
  ) =>
    markers?.filter(
      (marker: MarkerEntity) =>
        marker.buildingLatitude === lat && marker.buildingLongitude === lon
    )

  const filteredMarkers =
    values.markers &&
    values.markers?.items?.reduce((acc, obj: MarkerEntity) => {
      const present = acc.find(
        ({ buildingLatitude, buildingLongitude }) =>
          obj.buildingLatitude === buildingLatitude &&
          obj.buildingLongitude === buildingLongitude
      )
      if (!present) {
        acc.push(obj as never)
      }
      return acc
    }, [])

  const searchQueryParams = ({
    vehicleType1,
    vehicleType2,
    sliderHeight,
    isToday,
    timeFrom,
    timeTo,
    address,
  }) => {
    const params = {
      vehicleType1,
      vehicleType2,
      vehicleHeight: sliderHeight || 1.4,
      isToday,
    }
    if (address) {
      params['address'] = address
    }
    if (timeFrom) {
      params['startDate'] = timeFrom
    }
    if (timeTo) {
      params['endDate'] = timeTo
    }

    router.push(
      {
        pathname: ROUTES.HOME,
        query: params,
      },
      undefined,
      { shallow: true }
    )
  }

  const getSpots = ({
    timeFrom,
    timeTo,
    dayFrom,
    nearestTime,
    latitude,
    longitude,
    address,
  }) => {
    const params: MapFindNearbyArgs = {
      Latitude: latitude,
      Longitude: longitude,
      LocationSearchQuery: address,
      Distance: 20,
      'Time.Start': !nearestTime
        ? (dateUtil(timeFrom).utc().format(dateFormats.timeDisplay0) as TimeApi)
        : null,
      'Time.End': !nearestTime
        ? (dateUtil(timeTo).utc().format(dateFormats.timeDisplay0) as TimeApi)
        : null,
      Height: values.sliderHeight || 1.4,
      From:
        dayFrom && !nearestTime
          ? (dateUtil(dayFrom).format(dateFormats.api) as TimeApi)
          : null,
      NearestTime: nearestTime,
      Page: 1,
      PerPage: 20,
      ShouldReturnNonAvailableSpots: values.selectType !== 'nearest',
      'ElectricCharger.Type1': values.vehicleType1,
      'ElectricCharger.Type2': values.vehicleType2,
    }

    if (
      window.location.search &&
      router.query &&
      Object.keys(router.query).length > 0
    ) {
      searchQueryParams({
        vehicleType1: values.vehicleType1,
        vehicleType2: values.vehicleType2,
        sliderHeight: values.sliderHeight,
        isToday: values.isSelectToday,
        timeFrom: timeFrom,
        timeTo: timeTo,
        address,
      })
    }

    if (!values.markers) {
      setFieldValue('markers', markers)
      setFieldValue(
        'selectedMarker',
        filterSelectedMarker(
          markers?.items,
          markers?.items[0]?.buildingLatitude,
          markers?.items[0]?.buildingLongitude
        )
      )
      setFieldValue(
        'isNotEmpty',
        markers && markers?.items.some((item) => item.availableSpotCount)
      )
    }
    setParamsFindNearby(
      Object.keys(params)
        .map((key) => (params[key] !== null ? `${key}=${params[key]}` : null))
        .filter((item) => item)
        .join('&')
    )
  }

  const getLocation = (data): void => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser')
    } else {
      console.log('getLocation')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFieldValue('lat', position.coords.latitude)
          setFieldValue('lng', position.coords.longitude)
          setFieldValue('selectIsOpen', false)
          setFieldValue('modalIsOpen', false)
          setFieldValue('startDate', data.dayFrom)
          setFieldValue('endDate', !data.nearestTime ? data.timeTo : null)
          const geocoder = new google.maps.Geocoder()
          const location = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          )
          geocoder.geocode({ location }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results?.length) {
              if (results[0]) {
                setFieldValue('address', results[0].formatted_address)
                const values = results[0].formatted_address.split(',')
                getSpots({
                  ...data,
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  address: `${values[values.length - 2]}, ${
                    values[values.length - (values.length > 4 ? 4 : 3)]
                  }`,
                })
              }
            }
          })
        },
        () => {
          console.log('Unable to retrieve your location')
        }
      )
    }
  }

  const handleSearch = (data, currentAddress) => {
    geocodeByAddress(currentAddress || values?.address)
      .then(async (results: google.maps.GeocoderResult[]) => {
        // Do something with results[0]
        return getLatLng(results[0])
      })
      .then((latLng: google.maps.LatLngLiteral) => {
        // Do something with latLng
        setFieldValue('lat', latLng.lat)
        setFieldValue('lng', latLng.lng)
        setFieldValue('modalIsOpen', false)
        setFieldValue('selectIsOpen', false)
        setFieldValue('startDate', data.dayFrom)
        setFieldValue('endDate', !data.nearestTime ? data.timeTo : null)
        getSpots({
          ...data,
          latitude: latLng.lat,
          longitude: latLng.lng,
          address: currentAddress || values?.address,
        })
      })
      .catch((error) => {
        console.error('Error', error)
      })
  }

  const clearHistory = async (id) => {
    await clearHistoryTrigger(id)
    setFieldValue('searchHistory', null)
  }

  const goToChangeSearch = () => {
    setFieldValue('selectIsOpen', true)
    setFieldValue('prevStartDate', router.query?.startDate)
    setFieldValue('prevEndDate', router.query?.endDate)
    if (JSON.parse(String(router.query?.isToday))) {
      setFieldValue('isSelectToday', true)
      setFieldValue('isSelectSpecificDay', false)
      if (router.query?.startDate && router.query?.startDate) {
        setFieldValue('selectType', 'selectTime')
        setFieldValue('prevSelectType', 'selectTime')
      } else {
        setFieldValue('selectType', 'nearest')
        setFieldValue('prevSelectType', 'nearest')
      }
    } else {
      setFieldValue('isSelectToday', false)
      setFieldValue('isSelectSpecificDay', true)
      setFieldValue('prevSelectType', 'specificDay')
    }
  }

  const goToSpot = (
    marker: MarkerEntity,
    address: string,
    vehicleHeight: number | null,
    vehicleType1: boolean,
    vehicleType2: boolean,
    start: string | null,
    end?: string | null
  ) => {
    if (profile) {
      if (start && end) {
        router.push({
          pathname: ROUTES.FIND_SPOT,
          query: {
            id: marker.id,
            startDate: dateUtil(
              `${dateUtil(values.timeFrom)
                .utc()
                .format(dateFormats.iso8601)}${dateUtil(values.startDate)
                .tz(marker.timeZone)
                .format('Z')}`
            )
              .utc()
              .format(dateFormats.iso8601Z),
            endDate: dateUtil(
              `${dateUtil(values.timeTo)
                .utc()
                .format(dateFormats.iso8601)}${dateUtil(values.endDate)
                .tz(marker.timeZone)
                .format('Z')}`
            )
              .utc()
              .format(dateFormats.iso8601Z),
            address,
            vehicleType1: vehicleType1,
            vehicleType2: vehicleType2,
            vehicleHeight: vehicleHeight ? vehicleHeight : '1.4',
          },
        })
      } else {
        router.push({
          pathname: ROUTES.FIND_SPOT,
          query: {
            id: marker.id,
            address,
            vehicleType1: vehicleType1,
            vehicleType2: vehicleType2,
            vehicleHeight: vehicleHeight ? vehicleHeight : '1.4',
          },
        })
      }
    } else {
      setFieldValue('showJoinDialog', true)
    }
  }

  const goToJoin = () => {
    window.localStorage.setItem(
      'lastSearch',
      JSON.stringify({
        vehicleType1: values.vehicleType1,
        vehicleType2: values.vehicleType2,
        startDate: values.timeFrom,
        endDate: values.timeTo,
        sliderHeight: values.sliderHeight,
        address: values.address,
        isToday: values.isSelectToday,
      })
    )
    router.push({ pathname: ROUTES.LOGIN })
  }

  const addSpotToWaitList = (placeId) => {
    if (profile) {
      const place = markers?.items.find(({ id }) => id === placeId)
      const { requestedIntervalUtc, timeZone } = place || {}
      const { end, start } = requestedIntervalUtc || {}

      const getFormattedTime = (formValue, placeValue, format) =>
        formValue
          ? dateUtil(
              `${dateUtil(formValue)
                .utc()
                .format(dateFormats.iso8601)}${dateUtil(formValue)
                .tz(timeZone)
                .format('Z')}`
            )
              .utc()
              .format(format)
          : dateUtil(`${placeValue}Z`).tz(timeZone).format(format)
      const fromDate = getFormattedTime(
        dateUtil(values.timeFrom).utc().toDate(),
        start,
        dateFormats.iso8601
      )
      const toDate = getFormattedTime(
        dateUtil(values.timeTo).utc().toDate(),
        end,
        dateFormats.iso8601
      )
      addToSpotsWaitList({
        placeIds: [placeId],
        startInUtc: fromDate,
        endInUtc: toDate,
      })
    } else {
      setFieldValue('showJoinDialog', true)
    }
  }

  return {
    getLocation,
    clearHistory,
    handleSearch,
    goToSpot,
    goToJoin,
    addSpotToWaitList,
    getSpots,
    searchQueryParams,
    goToChangeSearch,
    filterSelectedMarker,
    findIsLoading,
    filteredMarkers,
  }
}

export default useFindSpot
