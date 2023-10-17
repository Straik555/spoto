import { hardwareApi } from '@api/hardware'
import SearchIcon from '@assets/icons/search-15.svg'
import Autocomplete, {
  AutocompleteData,
  AutocompleteItem,
  AutocompleteNoDataItem,
} from '@components/Form/Autocomplete/Autocomplete'
import Radio from '@components/Form/Radio/Radio'
import RadioGroup from '@components/Form/Radio/RadioGroup'
import { ManageSpotFormValues } from '@screens/owner/Spots/ManageSpot/ManageSpot.model'
import classNames from 'classnames'
import { useFormikContext } from 'formik'
import React, { FC, useEffect, useState } from 'react'

const ManageSpotSpollard: FC = () => {
  const form = useFormikContext<ManageSpotFormValues>()
  const {
    data: hardwares = [],
    isLoading,
    isFetching,
    isUninitialized,
  } = hardwareApi.endpoints.getUnlinkedByUser.useQuery()
  const [filteredHardwares, setFilteredHardwares] = useState(hardwares)

  const filterHardwares = (searchText: string): void => {
    const list = searchText
      ? hardwares.filter((el) =>
          el.hardwareSerial
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase())
        )
      : hardwares

    if (list) {
      setFilteredHardwares(list)
    }
  }

  useEffect(() => {
    setFilteredHardwares(hardwares)
  }, [hardwares])

  return (
    <div className="flex flex-col h-full">
      <div className="min-h-0 overflow-auto">
        <Autocomplete
          name="search"
          label="All Groups"
          labelClassName="!font-semibold text-base text-black"
          placeholder="Search"
          loading={isLoading || isFetching}
          dataAlwaysVisible
          containerClassName="mb-5"
          wrapperClassName="flex flex-col h-full"
          onChange={(e) => filterHardwares(e.target.value)}
          prefixIcon={<SearchIcon className="fill-blue-1" />}
          inputClassName="pl-9 placeholder:text-blue-1"
        >
          <AutocompleteData className="!relative !p-0 !border-0 !mt-0 !top-0 !overflow-y-auto !max-h-unset">
            {!(isLoading || isFetching) && (
              <RadioGroup name="spollardId">
                {filteredHardwares.length ? (
                  filteredHardwares.map((hardware) => {
                    const checked = form.values.spollardId === hardware.id

                    return (
                      <AutocompleteItem
                        key={hardware.id}
                        className={classNames('flex items-center', {
                          'bg-blue-4': checked,
                        })}
                      >
                        <Radio value={hardware.id} />
                        <p
                          className={classNames('font-s-base ml-6 mb-0', {
                            'text-primary': checked,
                            'text-blue-1': !checked,
                          })}
                        >
                          {hardware.hardwareSerial}
                        </p>
                      </AutocompleteItem>
                    )
                  })
                ) : (
                  <AutocompleteNoDataItem
                    hidden={isUninitialized}
                    className="text-center"
                  >
                    No available hardware
                  </AutocompleteNoDataItem>
                )}
              </RadioGroup>
            )}
          </AutocompleteData>
        </Autocomplete>
      </div>
    </div>
  )
}

export default ManageSpotSpollard
