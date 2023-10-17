import { spotApi } from '@api/spot'
import { GetSpotsByUserQueryParams, SpotInfo } from '@api/spot/types'
import ElectricChargerIcon from '@assets/icons/circle-icons/charging-green-circle-18.svg'
import SearchIcon from '@assets/icons/search-15.svg'
import { CheckboxAutocomplete } from '@components/Form/Autocomplete/CheckboxAutocomplete'
import { AutocompleteInputProps } from '@screens/admin/ManageAccess/Autocompletes/Autocompletes.model'
import { ManageAccessQueryParams } from '@screens/admin/ManageAccess/ManageAccess.model'
import { hasElectricCharger } from '@screens/owner/Spots/utils'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

const SpotsAutocomplete: FC<AutocompleteInputProps> = ({ disabled }) => {
  const router = useRouter()
  const { groupId, userId } = router.query as ManageAccessQueryParams
  const [getSpotsByOwnerId, { data: spots = [], isFetching, isUninitialized }] =
    spotApi.endpoints.getSpotsByUser.useLazyQuery()

  return (
    <CheckboxAutocomplete<SpotInfo>
      data={spots}
      onSearch={(v, value) => new RegExp(value, 'gi').test(v.name)}
      name="spotName"
      onMouseEnter={() => {
        if (!isUninitialized) return

        getSpotsByOwnerId({
          ...(userId
            ? { UserId: userId, HideAlreadyAccessibleByUserAccess: true }
            : {}),
          ...(groupId
            ? {
                FilterByGroupId: groupId,
                HideAlreadyAccessibleByGroupAccess: true,
              }
            : {}),
        } as GetSpotsByUserQueryParams)
      }}
      label="Spots"
      placeholder="Spot Name"
      savedItemsFieldName="selectedSpots"
      checkedItemsFieldName="checkedSpots"
      comparator={(a, b) => a.id === b.id}
      loading={isFetching}
      prefixIcon={<SearchIcon className="fill-blue-1" />}
      getAutocompleteItemProps={(v) => ({
        label: v.name,
        trailingIcon: hasElectricCharger(v.electricCharger) && (
          <ElectricChargerIcon />
        ),
      })}
      disabled={disabled}
    />
  )
}

export default SpotsAutocomplete
