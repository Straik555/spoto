import { setApi } from '@api/set'
import { SetModel } from '@api/set/types'
import { GetSpotsByUserQueryParams } from '@api/spot/types'
import SearchIcon from '@assets/icons/search-15.svg'
import { CheckboxAutocomplete } from '@components/Form/Autocomplete/CheckboxAutocomplete'
import { AutocompleteInputProps } from '@screens/admin/ManageAccess/Autocompletes/Autocompletes.model'
import { ManageAccessQueryParams } from '@screens/admin/ManageAccess/ManageAccess.model'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

const SetsAutocomplete: FC<AutocompleteInputProps> = ({ disabled }) => {
  const router = useRouter()
  const { groupId, userId } = router.query as ManageAccessQueryParams
  const [getUserSetsByUser, { data: sets = [], isFetching, isUninitialized }] =
    setApi.endpoints.getUserSetsByUser.useLazyQuery()

  return (
    <CheckboxAutocomplete<SetModel>
      data={sets}
      onSearch={(v, value) => new RegExp(value, 'gi').test(v.name)}
      name="setName"
      onMouseEnter={() => {
        if (!isUninitialized) return

        getUserSetsByUser({
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
      label="Sets"
      placeholder="Set Name"
      savedItemsFieldName="selectedSets"
      checkedItemsFieldName="checkedSets"
      comparator={(a, b) => a.id === b.id}
      loading={isFetching}
      prefixIcon={<SearchIcon className="fill-blue-1" />}
      getAutocompleteItemProps={(v) => ({
        label: v.name,
      })}
      disabled={disabled}
    />
  )
}

export default SetsAutocomplete
