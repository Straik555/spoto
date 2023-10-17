import SearchIcon from '@assets/icons/search-15.svg'
import Autocomplete, {
  AutocompleteData,
  AutocompleteItem,
  AutocompleteNoDataItem,
} from '@components/Form/Autocomplete/Autocomplete'
import Checkbox from '@components/Form/Checkbox/Checkbox'
import Input from '@components/Form/Input/Input'
import { InputTypes } from '@components/Form/Input/Input.model'
import Textarea from '@components/Form/Input/Textarea'
import InputLabel from '@components/Form/InputLabel'
import GoogleMap from '@components/GoogleMap/GoogleMap'
import DropdownCheckbox from '@screens/owner/Spots/components/DropdownCheckbox/DropdownCheckbox'
import { ManageSpotFormValues } from '@screens/owner/Spots/ManageSpot/ManageSpot.model'
import { useFormikContext } from 'formik'
import _noop from 'lodash/noop'
import React, { FC, useEffect } from 'react'
import PlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete'

const ManageSpotMain: FC = () => {
  const form = useFormikContext<ManageSpotFormValues>()
  const locationField = form.getFieldMeta('location')

  useEffect(() => {
    if (!form.values.locationPlaceId) return

    geocodeByPlaceId(form.values.locationPlaceId)
      .then((res) => getLatLng(res[0]))
      .then((res) => {
        form.setFieldValue('latitude', res.lat)
        form.setFieldValue('longitude', res.lng)
      })
  }, [form.values.locationPlaceId])

  return (
    <div className="mb-4">
      <Input
        name="spotName"
        label="Spot ID"
        placeholder="Spot id"
        className="mb-3"
      />

      <PlacesAutocomplete
        value={form.values.location}
        onChange={_noop}
        onSelect={(address: string): void => {
          form.setFieldValue('location', address)
        }}
      >
        {(props) => {
          return (
            <Autocomplete
              label="Location"
              placeholder="Select address"
              loading={props.loading}
              prefixIcon={<SearchIcon className="fill-blue-1" />}
              inputClassName="pl-8"
              className="mb-3"
              {...props.getInputProps()}
              name="location"
            >
              <AutocompleteData hidden={!(form.dirty && locationField.touched)}>
                {props.suggestions.length ? (
                  props.suggestions.map((suggestion) => {
                    const optionProps = props.getSuggestionItemProps(suggestion)

                    return (
                      <AutocompleteItem
                        {...optionProps}
                        onSelect={() => {
                          form.setFieldValue(
                            'locationPlaceId',
                            suggestion.placeId
                          )
                        }}
                        key={suggestion.placeId}
                      >
                        {suggestion.description}
                      </AutocompleteItem>
                    )
                  })
                ) : (
                  <AutocompleteNoDataItem
                    hidden={!(form.dirty && locationField.touched)}
                  >
                    Nothing found
                  </AutocompleteNoDataItem>
                )}
              </AutocompleteData>
            </Autocomplete>
          )
        }}
      </PlacesAutocomplete>

      <div className="relative w-full mb-6 h-[250px]">
        <GoogleMap
          center={
            form.values.latitude && form.values.longitude
              ? {
                  lat: form.values.latitude,
                  lng: form.values.longitude,
                }
              : undefined
          }
        />
      </div>

      <Textarea
        name="spotDescription"
        label="Spot Description"
        placeholder="Type spot description"
        max={250}
        className="mb-3"
      />

      <Input
        name="maximumVehicleHeight"
        label="Maximum Vehicle Height"
        placeholder="0.00 m"
        type={InputTypes.NUMBER}
      />

      <InputLabel className="mt-6 mb-3 !text-s-lg">
        Public spot status
      </InputLabel>

      <Checkbox
        name="availableForPublic"
        label="Available for Public to Book"
        value={true}
        className="mb-4"
      />

      {form.values.availableForPublic && (
        <>
          <DropdownCheckbox
            name="hasHourlyRate"
            label="Hourly Rate"
            value={true}
            containerClassName="mb-1"
          >
            <InputLabel className="mt-3 !mb-0">Enter hourly rate</InputLabel>
            <Input
              name="hourlyRate"
              type={InputTypes.NUMBER}
              placeholder="$0.00"
            />
          </DropdownCheckbox>

          <DropdownCheckbox
            name="hasDailyRate"
            label="Daily Rate"
            value={true}
            containerClassName="mb-1"
          >
            <InputLabel className="mt-3 !mb-0">Enter daily rate</InputLabel>
            <Input
              name="dailyRate"
              type={InputTypes.NUMBER}
              placeholder="$0.00"
            />
          </DropdownCheckbox>

          <DropdownCheckbox
            name="hasWeeklyRate"
            label="Weekly Rate"
            value={true}
          >
            <InputLabel className="mt-3 !mb-0">Enter weekly rate</InputLabel>
            <Input
              name="weeklyRate"
              type={InputTypes.NUMBER}
              placeholder="$0.00"
            />
          </DropdownCheckbox>
        </>
      )}

      <InputLabel className="mt-6 mb-3 !text-s-lg">Extra Options</InputLabel>

      <Checkbox
        name="hasElectricCharger"
        label="Electric vehicle charger"
        value={true}
        className="mb-2"
      />

      {form.values.hasElectricCharger && (
        <>
          <InputLabel className="mb-2 !text-s-sm" noCap>
            Select type of your electric charger:
          </InputLabel>

          <div className="flex">
            <Checkbox
              name="electricCharger.type1"
              label="Type 1"
              value={true}
            />

            <Checkbox
              name="electricCharger.type2"
              label="Type 2"
              value={true}
              className="ml-4"
            />
          </div>
        </>
      )}
    </div>
  )
}

export default ManageSpotMain
