import React, { FC } from 'react'
import FindSpotFilter from '@screens/user/FindSpot/FindSpotFilter'
import { TFindSpotControls } from '@screens/user/FindSpot/FindSpotControls/FindSpotControls.model'
import { FindSpotFormValues } from '@screens/user/FindSpot/FindSpot.model'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import FilterImg from '@assets/icons/filter.svg'
import SearchIcon from '@assets/icons/search-15.svg'
import CloseImg from '@assets/icons/close-10.svg'
import PlacesAutocomplete from 'react-places-autocomplete'
import { useSpotoMediaQuery } from '@hooks/useMediaQuery'
import cn from 'classnames'
import useDetectClickOutside from '@hooks/useDetectClickOutside/useDetectClickOutside'

const FindSpotControlsDesktop: FC<TFindSpotControls> = ({ openModal }) => {
  const { values, setFieldValue } = useTypedFormikContext<FindSpotFormValues>()
  const { isFocused: isOpenFilter, setIsFocused: setIsOpenFilter } =
    useDetectClickOutside({
      Component: FindSpotFilter,
    })
  const { maxWidth1366 } = useSpotoMediaQuery()

  return (
    <>
      <div
        className={cn(
          'flex justify-between px-[20px] mt-[8px] mb-[8px] item-center',
          {
            'pl-[84px]': maxWidth1366,
          }
        )}
      >
        <div className="relative w-full mr-2" onClick={openModal}>
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
              <div className="relative">
                <div className="absolute left-4 top-3.5">
                  <SearchIcon className="fill-blue-1" />
                </div>
                <input
                  {...props.getInputProps({
                    placeholder: 'Where do you want to park?',
                    className:
                      'flex-auto w-full pl-10 text-base rounded-md text-blue-1 placeholder-blue-1 h-11 cursor-pointer outline-none',
                  })}
                />
                <div className="overflow-hidden text-sm text-black bg-white autocomplete-dropdown-container rounded-b-md h-max">
                  {props.loading && (
                    <div className="px-4 py-[10px]">Loading...</div>
                  )}
                  {props.suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active mb-2 cursor-pointer py-[10px] px-4 bg-gray-50'
                      : 'suggestion-item mb-2 cursor-pointer py-[10px] px-4 bg-white'

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
        </div>
        <button
          className="flex flex-col items-center justify-center bg-white border-0 shadow-lg w-11 h-11 group rounded-md"
          onClick={(e) => {
            e.stopPropagation()
            if (isOpenFilter) {
              setFieldValue('vehicleHeight', null)
              setFieldValue('vehicleType1', false)
              setFieldValue('vehicleType2', false)
              setFieldValue('charger', false)
              setFieldValue('sliderHeight', 1.4)
              setFieldValue('height', false)
            }
            setIsOpenFilter(!isOpenFilter)
          }}
        >
          {isOpenFilter ? (
            <CloseImg className="fill-blue-1" />
          ) : (
            <FilterImg className="fill-blue-1" />
          )}
        </button>
      </div>
      {isOpenFilter && <FindSpotFilter isDesktop />}
    </>
  )
}

export default FindSpotControlsDesktop
