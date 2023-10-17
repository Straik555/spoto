import cn from 'classnames'
import React, { FC } from 'react'
import { useRouter } from 'next/router'
import PlacesAutocomplete from 'react-places-autocomplete'
import FindSpotGoogleMap from '@screens/user/FindSpot/FindSpotGoogleMap'
import { ButtonMode } from '@components/Button/Button.model'
import { Button } from '@components/index'
import ScrollbarContainer from '@components/ScrollbarContainer/ScrollbarContainer'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import { MarkerEntity } from '@screens/admin/Sets/ServerEntities.model'
import {
  FindSpotControls,
  FindSpotSearchSelector,
  FindSpotSetsCarousel,
} from '@screens/user/FindSpot'
import FindSpotJoinSpoto from '@screens/user/FindSpot/FindSpotJoinSpoto'
import FindSpotLastVisits from '@screens/user/FindSpot/FindSpotLastVisits'
import { FindSpotFormValues } from '@screens/user/FindSpot/FindSpot.model'
import useFindSpot from '@screens/user/FindSpot/useFindSpot'
import { ROUTES } from '@constants/routes'
import FindSpotSelector from '@screens/user/FindSpot/FindSpotSelector'
import FindSpotNothingFound from '@screens/user/FindSpot/FindSpotNothingFound'
import ArrowLeft from '@assets/icons/arrows/arrow-left-small.svg'
import SearchIcon from '@assets/icons/search-15.svg'
import MapMan from '@assets/icons/man-27.svg'

const FindSpotMobile: FC = () => {
  const { values, setFieldValue } = useTypedFormikContext<FindSpotFormValues>()
  const router = useRouter()

  const {
    getLocation,
    clearHistory,
    handleSearch,
    goToSpot,
    goToJoin,
    addSpotToWaitList,
    goToChangeSearch,
    findIsLoading,
    searchQueryParams,
  } = useFindSpot()

  return (
    <div className="relative w-full h-full  overflow-hidden">
      <div className="absolute left-0 z-10 w-full text-white px-[16px]">
        {!values.modalIsOpen && (
          <FindSpotControls
            openModal={() => {
              setFieldValue('modalIsOpen', true)
            }}
          />
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full text-white z-[9] safe-area-p-b">
        {values.selectIsOpen ? (
          <div className="px-4">
            <FindSpotSelector
              getLocation={getLocation}
              handleSearch={handleSearch}
              openModal={() => setFieldValue('modalIsOpen', true)}
            />
          </div>
        ) : findIsLoading ? null : values.markers ? (
          values.isNotEmpty && values.markers?.items?.length ? (
            <>
              <div className="flex justify-end w-full">
                <div className="flex items-center justify-center bg-black rounded-full mr-[16px] mb-[13px] w-[41px] h-[41px] shadow-[2px_2px_6px_rgba(42,43,46,0.15)]">
                  <MapMan className="fill-white" />
                </div>
              </div>
              <FindSpotSetsCarousel
                markers={values.selectedMarker || []}
                goToSpot={(marker: MarkerEntity) =>
                  goToSpot(
                    marker,
                    values.address,
                    values.sliderHeight,
                    values.vehicleType1,
                    values.vehicleType2,
                    values.timeFrom,
                    values.timeTo
                  )
                }
                onAdded={addSpotToWaitList}
              />
            </>
          ) : (
            <div className="px-[16px]">
              <div className="flex justify-end w-full">
                <div className="flex items-center justify-center bg-black rounded-full mb-[10px] mr-[10px] w-[41px] h-[41px] shadow-[2px_2px_6px_rgba(42,43,46,0.15)]">
                  <MapMan className="fill-white" />
                </div>
              </div>
              <FindSpotNothingFound
                onClose={goToChangeSearch}
                isNotAvailable={
                  !(
                    values.markers?.items?.length &&
                    values.markers?.items.some(
                      (item) => item.availableSpotCount
                    )
                  )
                }
              />
            </div>
          )
        ) : (
          <div className="px-[16px]">
            <FindSpotSearchSelector
              findSpots={(location: 'manual' | 'auto'): void => {
                setFieldValue('isClient', false)
                location === 'auto'
                  ? setFieldValue('selectIsOpen', true)
                  : setFieldValue('modalIsOpen', true)
              }}
              searchMode={values.searchMode}
              setSearchMode={(value: number) =>
                setFieldValue('searchMode', value)
              }
            />
          </div>
        )}
      </div>
      <FindSpotGoogleMap findIsLoading={findIsLoading} />
      {values.modalIsOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-white z-[11]">
          <div className="top-0 left-0 flex flex-col justify-between w-full h-full mx-auto my-0 max-w-[420px] p-[16px]">
            <header>
              <a
                href="#"
                onClick={() => {
                  setFieldValue('modalIsOpen', false)
                  setFieldValue('address', values.prevAddress)
                }}
                className="flex items-center no-underline text-blue-1"
              >
                <ArrowLeft className="stroke-blue-1" />
                <span className="text-s-base ml-[23px]">Back</span>
              </a>
            </header>
            <ScrollbarContainer
              className={cn('w-full overflow-y-auto h-[calc(100%-50px)]')}
            >
              <div>
                <PlacesAutocomplete
                  value={values.address}
                  onChange={(address: string): void =>
                    setFieldValue('address', address.trim())
                  }
                  onSelect={(address: string): void =>
                    setFieldValue('address', address)
                  }
                >
                  {(props) => (
                    <div className="relative mt-[16px]">
                      <input
                        autoFocus
                        {...props.getInputProps({
                          placeholder: 'Where do you want to park?',
                          className:
                            'relative location-search-input flex-auto pl-[40px] pr-[16px] h-[40px] rounded-md bg-blue-4 w-full text-blue-1 text-s-sm placeholder-blue-1 outline-none font-semibold ',
                        })}
                        data-testid="findPlacesAutocomplete"
                      />
                      <SearchIcon className="absolute top-3 left-[11px] fill-blue-1" />
                      <div className="w-full overflow-hidden autocomplete-dropdown-container">
                        {props.loading && (
                          <div className="mt-[20px] text-s-lg">Loading...</div>
                        )}
                        {props.suggestions.map((suggestion) => {
                          const className = suggestion.active
                            ? 'mt-[20px] suggestion-item--active mb-[8px] cursor-pointer bg-gray-50'
                            : 'mt-[20px] suggestion-item mb-[8px] cursor-pointer bg-white'

                          return (
                            <div
                              {...props.getSuggestionItemProps(suggestion, {
                                className,
                              })}
                              key={suggestion.placeId}
                            >
                              <span className="w-full text-s-lg overflow-ellipsis whitespace-nowrap">
                                {suggestion.description}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
                <FindSpotLastVisits
                  list={values.searchHistory || []}
                  onClear={clearHistory}
                  onChoose={(address) => setFieldValue('address', address)}
                />
              </div>
            </ScrollbarContainer>
            <Button
              className={cn('text-s-lg !h-11 !py-[10px]', {
                'bg-blue-3': !values.address,
              })}
              mode={ButtonMode.SMALL}
              onClick={() => {
                setFieldValue('modalIsOpen', false)
                setFieldValue('selectIsOpen', true)
                setFieldValue('isClient', false)
                setFieldValue('searchMode', 1)
                if (Object.keys(router.query).length) {
                  searchQueryParams({
                    vehicleType1: router.query?.vehicleType1,
                    vehicleType2: router.query?.vehicleType2,
                    sliderHeight: router.query?.vehicleHeight,
                    isToday: router.query?.isToday,
                    timeFrom: router.query?.startDate,
                    timeTo: router.query?.endDate,
                    address: values.address,
                  })
                  handleSearch(
                    {
                      dayFrom: router.query?.startDate,
                      timeFrom: router.query?.startDate,
                      timeTo: router.query?.endDate,
                      nearestTime: !router.query?.startDate,
                    },
                    values.address
                  )
                } else {
                  router.push(
                    {
                      pathname: ROUTES.HOME,
                      query: {
                        address: values.address,
                        vehicleType1: values.vehicleType1 || false,
                        vehicleType2: values.vehicleType2 || false,
                        vehicleHeight: values.sliderHeight || 1.4,
                      },
                    },
                    undefined,
                    { shallow: true }
                  )
                }
              }}
              disabled={!values.address}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
      <FindSpotJoinSpoto
        isOpen={values.showJoinDialog}
        closeModal={() => setFieldValue('showJoinDialog', false)}
        onSubmit={goToJoin}
      />
    </div>
  )
}

export default FindSpotMobile
