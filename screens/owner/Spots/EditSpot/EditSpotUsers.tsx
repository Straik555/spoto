import { inviteApi } from '@api/invite'
import { InvitationInfo } from '@api/invite/types'
import { sharedPlacesApi } from '@api/sharedPlaces'
import SearchIcon from '@assets/icons/search-15.svg'
import { ButtonMode } from '@components/Button/Button.model'
import Autocomplete, {
  AutocompleteData,
  AutocompleteItem,
  AutocompleteNoDataItem,
} from '@components/Form/Autocomplete/Autocomplete'
import Checkbox from '@components/Form/Checkbox/Checkbox'
import CheckboxGroup from '@components/Form/Checkbox/CheckboxGroup'
import { withForm } from '@components/Form/withForm'
import { Button } from '@components/index'
import UserAvatar from '@screens/admin/Users/components/UserAvatar/UserAvatar'
import { getPersonFullName } from '@screens/admin/Users/utils/getPersonFullName'
import {
  EditSpotUsersFormValues,
  EditSpotUsersProps,
} from '@screens/owner/Spots/EditSpot/EditSpotUsers.model'
import EditSpotUsersList from '@screens/owner/Spots/EditSpot/EditSpotUsersList'
import classNames from 'classnames'
import { useFormikContext } from 'formik'
import _differenceWith from 'lodash/differenceWith'
import React, { FC, useEffect, useState } from 'react'

const EditSpotUsers: FC<EditSpotUsersProps> = ({ spotId }) => {
  const form = useFormikContext<EditSpotUsersFormValues>()
  const { data: spotUsers = [] } =
    sharedPlacesApi.endpoints.getUsersByPlace.useQuery({ placeId: spotId })
  const { data, isUninitialized } =
    inviteApi.endpoints.getInvitations.useQuery(null)
  const [createUserSpotAccess, createUserSpotAccessRes] =
    sharedPlacesApi.endpoints.addUsersAndGroupsToPlace.useMutation()
  const [users, setUsers] = useState<InvitationInfo[]>([])
  const [isFocused, setIsFocused] = useState(false)

  const updateUsers = (search = ''): void => {
    const searchRegExp = new RegExp(search, 'gi')
    setUsers(
      _differenceWith(
        data || [],
        spotUsers,
        (left, right) => left.invitedUserId === right.userId
      ).filter((user) =>
        searchRegExp.test(`${user.firstName} ${user.lastName}`)
      )
    )
  }
  const saveUsers = (): void => {
    createUserSpotAccess({
      placeId: spotId,
      data: {
        userIds: form.values.userIds,
        schedule: [],
      },
    })
    form.resetForm()
  }

  useEffect(() => {
    if (!spotUsers || !data) return

    updateUsers()
  }, [spotUsers, data])

  useEffect(() => {
    if (!createUserSpotAccessRes.isSuccess) return

    setIsFocused(false)
  }, [createUserSpotAccessRes.isSuccess])

  return (
    <div className="block">
      <p className="text-base font-semibold text-black">Users</p>

      <Autocomplete
        name="search"
        label="Add existing user"
        placeholder="Search"
        onChange={(e) => {
          updateUsers(e.target.value)
        }}
        prefixIcon={<SearchIcon className="fill-blue-1" />}
        inputClassName="pl-9 placeholder:text-blue-1"
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
      >
        <AutocompleteData
          className="max-h-[300px] !overflow-hidden !p-0 !m-0 !rounded-t-none"
          onClick={(e) => e.stopPropagation()}
        >
          <CheckboxGroup name="userIds">
            {users.length ? (
              <div className="flex flex-col max-h-[300px]">
                <div className="h-auto overflow-auto">
                  {users.map((user) => {
                    const checked = form.values.userIds.includes(
                      user.invitedUserId
                    )

                    return (
                      <AutocompleteItem
                        key={user.invitedUserId}
                        className={classNames('flex items-center', {
                          'bg-blue-4': checked,
                        })}
                      >
                        <Checkbox value={user.invitedUserId} />
                        <UserAvatar
                          thumbKey={user.avatarUrl}
                          className="ml-4 !w-[35px] !h-[35px]"
                        />
                        <p
                          className={classNames('font-s-base ml-6 mb-0', {
                            'text-primary': checked,
                            'text-blue-1': !checked,
                          })}
                        >
                          {getPersonFullName(user)}
                        </p>
                      </AutocompleteItem>
                    )
                  })}
                </div>

                <div className="p-3 bg-white">
                  <Button
                    mode={ButtonMode.FULL_PRIMARY}
                    onClick={() => saveUsers()}
                    className="py-3 text-s-base"
                    disabled={
                      createUserSpotAccessRes.isLoading ||
                      form.values.userIds.length === 0
                    }
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
                No users
              </AutocompleteNoDataItem>
            )}
          </CheckboxGroup>
        </AutocompleteData>
      </Autocomplete>

      <EditSpotUsersList spotId={spotId} spotUsers={spotUsers} />
    </div>
  )
}
export default withForm<EditSpotUsersProps>(
  {
    initialValues: {
      search: '',
      userIds: [],
    } as EditSpotUsersFormValues,
  },
  EditSpotUsers
)
