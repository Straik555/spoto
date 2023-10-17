import ScrollbarContainer from '@components/ScrollbarContainer/ScrollbarContainer'
import cn from 'classnames'
import React, { FC } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import FindSpotGoogleMap from '@screens/user/FindSpot/FindSpotGoogleMap'
import { ButtonMode } from '@components/Button/Button.model'
import { Button } from '@components/index'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import {
  FindSpotControlsDesktop,
  FindSpotSearchSelector,
  FindSpotSelectorDesktop,
} from '@screens/user/FindSpot'
import FindSpotJoinSpoto from '@screens/user/FindSpot/FindSpotJoinSpoto'
import FindSpotLastVisits from '@screens/user/FindSpot/FindSpotLastVisits'
import { FindSpotFormValues } from '@screens/user/FindSpot/FindSpot.model'
import useFindSpot from '@screens/user/FindSpot/useFindSpot'
import FindSpotNothingFound from '@screens/user/FindSpot/FindSpotNothingFound'
import { MarkerEntity } from '@screens/admin/Sets/ServerEntities.model'
import FindSpotSetsCarouselDesktop from '@screens/user/FindSpot/FindSpotSetsCarousel/FindSpotSetCarouselDesktop'
import SearchIcon from '@assets/icons/search-15.svg'
import ArrowLeft from '@assets/icons/arrows/arrow-left-small.svg'

const FindSpotDesktop: FC = () => {
  const { values, setFieldValue } = useTypedFormikContext<FindSpotFormValues>()
  const {
    getLocation,
    clearHistory,
    handleSearch,
    goToSpot,
    goToJoin,
    addSpotToWaitList,
    findIsLoading,
  } = useFindSpot()

  return (
    <div className="flex w-full h-full">
      <div className="relative z-20 w-full h-full overflow-hidden">
        <div className="absolute z-20 w-full text-white h-max">
          <FindSpotControlsDesktop
            openModal={() => setFieldValue('modalIsOpen', true)}
          />
        </div>
        <FindSpotGoogleMap findIsLoading={findIsLoading} />
      </div>
      <ScrollbarContainer className="flex flex-col overflow-hidden overflow-y-auto min-w-[400px] w-[400px]">
        {values.modalIsOpen ? (
          <div className="flex flex-col justify-between h-full p-[20px]">
            <ScrollbarContainer className="w-full overflow-y-auto h-[calc(100%-50px)]">
              <header>
                <a
                  href="#"
                  onClick={() => {
                    setFieldValue('selectIsOpen', false)
                    setFieldValue('modalIsOpen', false)
                    setFieldValue('searchMode', 0)
                    setFieldValue('markers', null)
                    setFieldValue('address', '')
                    setFieldValue('endDate', null)
                    setFieldValue('startDate', null)
                    setFieldValue('timeFrom', null)
                    setFieldValue('timeTo', null)
                    setFieldValue('selectType', '')
                    setFieldValue('isSelectSpecificDay', false)
                    setFieldValue('isSelectToday', false)
                  }}
                  className="flex items-center no-underline cursor-pointer text-blue-1"
                >
                  <ArrowLeft className="stroke-blue-1" />
                  <span className="ml-[8px] text-s-base">Back</span>
                </a>
              </header>
              <div>
                <PlacesAutocomplete
                  value={values.address}
                  onChange={(address: string): void => {
                    setFieldValue('address', address)
                  }}
                  onSelect={(address: string): void => {
                    setFieldValue('address', address)
                  }}
                >
                  {(props) => (
                    <div className="relative mt-[16px]">
                      <input
                        {...props.getInputProps({
                          placeholder: 'Where do you want to park?',
                          className:
                            'relative location-search-input flex-auto pl-[40px] pr-[16px] h-10 rounded-md bg-blue-4 w-full text-s-lg text-blue-1 placeholder-blue-1 outline-none cursor-pointer',
                        })}
                      />
                      <SearchIcon className="absolute top-3 left-4 fill-blue-1" />
                      <div className="mt-[24px] text-s-base autocomplete-dropdown-container">
                        {props.loading && (
                          <div className="mt-[16px] text-s-base">
                            Loading...
                          </div>
                        )}
                        {props.suggestions.map((suggestion) => {
                          const className = suggestion.active
                            ? 'suggestion-item--active mb-[8px] cursor-pointer p-[10px] bg-gray-50'
                            : 'suggestion-item mb-[8px] cursor-pointer p-[10px] bg-white'

                          return (
                            <div
                              {...props.getSuggestionItemProps(suggestion, {
                                className,
                              })}
                              key={suggestion.placeId}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
                <FindSpotLastVisits
                  desktop
                  list={values.searchHistory || []}
                  onClear={clearHistory}
                  onChoose={(address) => setFieldValue('address', address)}
                />
              </div>
            </ScrollbarContainer>
            <Button
              className={cn('text-s-lg w-full h-11 mt-[12px]', {
                'bg-blue-3': !values.address,
              })}
              mode={ButtonMode.SMALL}
              onClick={() => {
                setFieldValue('modalIsOpen', false)
                setFieldValue('selectIsOpen', true)
                setFieldValue('isClient', false)
                setFieldValue('searchMode', 1)
              }}
              disabled={!values.address}
            >
              Apply
            </Button>
          </div>
        ) : (
          <div className="w-full px-[20px] text-white top-11 h-[calc(100vh-96px)] z-[9]">
            {!values.modalIsOpen &&
              (values.showJoinDialog ? (
                <FindSpotJoinSpoto
                  closeModal={() => setFieldValue('showJoinDialog', false)}
                  onSubmit={goToJoin}
                />
              ) : values.selectIsOpen ? (
                <FindSpotSelectorDesktop
                  handleSearch={handleSearch}
                  getLocation={getLocation}
                />
              ) : values.markers ? (
                values.isNotEmpty && values.markers?.items?.length ? (
                  <FindSpotSetsCarouselDesktop
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
                ) : (
                  <>
                    {!values.isWaitList && (
                      <FindSpotNothingFound
                        desktop
                        onClose={() => {
                          setFieldValue('markers', null)
                          setFieldValue('modalIsOpen', false)
                          setFieldValue('selectIsOpen', false)
                          setFieldValue('isNotEmpty', true)
                          setFieldValue('searchMode', 0)
                          setFieldValue('address', '')
                          setFieldValue('endDate', null)
                          setFieldValue('startDate', null)
                          setFieldValue('timeFrom', null)
                          setFieldValue('timeTo', null)
                          setFieldValue('selectType', '')
                          setFieldValue('isSelectSpecificDay', false)
                          setFieldValue('isSelectToday', false)
                        }}
                        isNotAvailable={
                          !(
                            values.markers?.items?.length &&
                            values.markers?.items.some(
                              (item) => item.availableSpotCount
                            )
                          )
                        }
                      />
                    )}
                  </>
                )
              ) : (
                !findIsLoading && (
                  <FindSpotSearchSelector
                    desktop
                    findSpots={(location: 'manual' | 'auto'): void => {
                      location === 'auto'
                        ? setFieldValue('selectIsOpen', true)
                        : setFieldValue('modalIsOpen', true)
                    }}
                    searchMode={values.searchMode}
                    setSearchMode={(value: number) =>
                      setFieldValue('searchMode', value)
                    }
                  />
                )
              ))}
          </div>
        )}
      </ScrollbarContainer>
    </div>
  )
}

export default FindSpotDesktop
