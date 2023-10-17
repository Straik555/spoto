import { groupApi } from '@api/group'
import { userApi } from '@api/user'
import SearchIcon from '@assets/icons/search-15.svg'
import { CheckboxAutocomplete } from '@components/Form/Autocomplete/CheckboxAutocomplete'
import {
  AutocompleteInputProps,
  UserOrGroupInfo,
} from '@screens/admin/ManageAccess/Autocompletes/Autocompletes.model'
import { getPersonFullName } from '@screens/admin/Users/utils/getPersonFullName'
import React, { FC, useMemo } from 'react'

const UsersAndGroupsAutocomplete: FC<AutocompleteInputProps> = ({
  disabled,
}) => {
  const [
    getUsers,
    {
      data: users = [],
      isFetching: isFetchingGetUsers,
      isUninitialized: isUninitializedGetUsers,
    },
  ] = userApi.endpoints.getUsers.useLazyQuery()
  const [
    getGroups,
    {
      data: groups = [],
      isFetching: isFetchingGetGroups,
      isUninitialized: isUninitializedGetGroups,
    },
  ] = groupApi.endpoints.getGroups.useLazyQuery()
  const loading = isFetchingGetUsers || isFetchingGetGroups
  const isUninitialized = isUninitializedGetUsers || isUninitializedGetGroups
  const usersAndGroups: UserOrGroupInfo[] = useMemo(() => {
    return [
      ...users.map((u) => ({
        ...u,
        uniqueId: u.userId,
        label: getPersonFullName(u),
      })),
      ...groups.map((g) => ({ ...g, uniqueId: g.id, label: g.name })),
    ]
  }, [users, groups])

  return (
    <CheckboxAutocomplete<UserOrGroupInfo>
      data={usersAndGroups}
      onSearch={(v, value) => new RegExp(value, 'gi').test(v.label)}
      name="userOrGroupName"
      onMouseEnter={() => {
        if (!isUninitialized) return

        getUsers({})
        getGroups({})
      }}
      label="Select User/Group"
      placeholder="Select User/Group"
      savedItemsFieldName="selectedUserGroups"
      checkedItemsFieldName="checkedUserGroups"
      comparator={(a, b) => a.uniqueId === b.uniqueId}
      loading={loading}
      prefixIcon={<SearchIcon className="fill-blue-1" />}
      getAutocompleteItemProps={(v) => ({
        label: v.label,
      })}
      disabled={disabled}
    />
  )
}

export default React.memo(UsersAndGroupsAutocomplete)
