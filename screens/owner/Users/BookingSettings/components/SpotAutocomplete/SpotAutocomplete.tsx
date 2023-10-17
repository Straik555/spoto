import { spotApi } from '@api/spot'
import { SpotInfo } from '@api/spot/types'
import CrossIcon from '@assets/icons/close-10.svg'
import ElectricChargerIcon from '@assets/icons/circle-icons/charging-green-circle-18.svg'
import SearchIcon from '@assets/icons/search-15.svg'
import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import Autocomplete, {
  AutocompleteData,
  AutocompleteItem,
  AutocompleteNoDataItem,
} from '@components/Form/Autocomplete/Autocomplete'
import Checkbox from '@components/Form/Checkbox/Checkbox'
import CheckboxGroup from '@components/Form/Checkbox/CheckboxGroup'
import { withForm } from '@components/Form/withForm'
import { hasElectricCharger } from '@screens/owner/Spots/utils'
import {
  SpotAutocompleteFormValues,
  SpotAutocompleteProps,
} from '@screens/owner/Users/BookingSettings/components/SpotAutocomplete/SpotAutocomplete.model'
import { spotAutocompleteValidationSchema } from '@screens/owner/Users/BookingSettings/components/SpotAutocomplete/validations'
import classNames from 'classnames'
import { useFormikContext } from 'formik'
import React, { FC, useEffect, useState } from 'react'

const SpotAutocomplete: FC<SpotAutocompleteProps> = ({ onChange }) => {
  const { data, isUninitialized } = spotApi.endpoints.getSpotsByUser.useQuery(
    {}
  )
  const [selectedSpots, setSelectedSpots] = useState<SpotInfo[]>([])
  const [userSpots, setUserSpots] = useState<SpotInfo[]>([])
  const updateUserSpots = (search = ''): void => {
    const searchRegExp = new RegExp(search, 'gi')

    setUserSpots(
      data
        ?.filter((spot) => !selectedSpots.map((s) => s.id).includes(spot.id))
        .filter((spot) => searchRegExp.test(spot.name)) || []
    )
  }
  const [isFocused, setIsFocused] = useState(false)
  const form = useFormikContext<SpotAutocompleteFormValues>()
  const saveSpotSelections = (): void => {
    setSelectedSpots((spots) => {
      return [...spots, ...form.values.spots]
    })
    form.resetForm()
    setIsFocused(false)
  }
  const deleteSpotSelection = (spotId: number): void => {
    setSelectedSpots((spots) => {
      return spots.filter((spot) => spot.id !== spotId)
    })
  }

  useEffect(() => {
    if (!data) return

    updateUserSpots()
  }, [data, selectedSpots])

  useEffect(() => {
    onChange?.(selectedSpots)
  }, [selectedSpots])

  return (
    <>
      <Autocomplete
        name="search"
        label="Select Existing Spot"
        placeholder="Search"
        onChange={(e) => {
          updateUserSpots(e.target.value)
        }}
        prefixIcon={<SearchIcon className="fill-blue-1" />}
        inputClassName="pl-9 placeholder:text-blue-1"
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
      >
        <AutocompleteData
          className={classNames(
            'max-h-[300px] !overflow-hidden !p-0 !m-0 !rounded-t-none'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <CheckboxGroup name="spots" hideFieldError>
            {userSpots.length ? (
              <div className="flex flex-col max-h-[300px]">
                <div className="h-auto overflow-x-hidden overflow-y-auto">
                  {userSpots.map((spot) => {
                    const checked = form.values.spots
                      .map((s) => s.id)
                      .includes(spot.id)

                    return (
                      <AutocompleteItem
                        key={spot.id}
                        className={classNames('flex items-center', {
                          'bg-blue-4': checked,
                        })}
                      >
                        <Checkbox value={spot} />
                        <p
                          className={classNames('font-s-base ml-6 mb-0', {
                            'text-primary': checked,
                            'text-blue-1': !checked,
                          })}
                        >
                          {spot.name}
                        </p>

                        {hasElectricCharger(spot.electricCharger) && (
                          <ElectricChargerIcon className="ml-1" />
                        )}
                      </AutocompleteItem>
                    )
                  })}
                </div>

                <div className="p-3 bg-white">
                  <Button
                    mode={ButtonMode.FULL_PRIMARY}
                    onClick={() => saveSpotSelections()}
                    className="py-3 text-s-base"
                    disabled={form.values.spots.length === 0}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <AutocompleteNoDataItem
                hidden={isUninitialized}
                className="text-center"
              >
                No spots
              </AutocompleteNoDataItem>
            )}
          </CheckboxGroup>
        </AutocompleteData>
      </Autocomplete>
      <div className="flex flex-wrap mt-1 rounded-md">
        {selectedSpots.map((spot) => {
          return (
            <div
              key={spot.id}
              className="flex items-center px-2 py-1 m-1 bg-blue-4"
            >
              <p className="m-0 font-semibold text-blue-1 text-s-base">
                {spot.name}
              </p>
              <CrossIcon
                className="ml-5 fill-blue-2"
                onClick={() => deleteSpotSelection(spot.id)}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default withForm<SpotAutocompleteProps>(
  {
    initialValues: {
      search: '',
      spots: [],
    } as SpotAutocompleteFormValues,
    validationSchema: spotAutocompleteValidationSchema,
  },
  SpotAutocomplete
)
