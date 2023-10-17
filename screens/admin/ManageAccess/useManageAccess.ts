import { useCallback, useEffect, useMemo, useState } from 'react'
import { FormikContextType } from 'formik'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { groupApi } from '@api/group'
import { AllGroupInfo } from '@api/group/types'
import { setApi } from '@api/set'
import { sharedPlacesApi } from '@api/sharedPlaces'
import { spotApi } from '@api/spot'
import { userApi } from '@api/user'
import { UserInfo } from '@api/user/types'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import { getPersonFullName } from '@screens/admin/Users/utils/getPersonFullName'

import { PlaceAvailabilityFormValues } from './PlaceAvailability/PlaceAvailability.model'
import {
  ManageAccessValues,
  ManageAccessQueryParams,
} from './ManageAccess.model'
import {
  mapScheduleFormValuesToPayload,
  mapUserOrGroupToSharedModel,
} from './util'

const useManageAccess = () => {
  const [
    addPlacesToUser,
    {
      isSuccess: isSuccessAddPlacesToUser,
      isError: isErrorAddPlacesToUser,
      isLoading: isLoadingAddPlacesToUser,
      error: errorAddPlacesToUser,
    },
  ] = sharedPlacesApi.endpoints.addPlacesToUser.useMutation()
  const [
    addPlacesToGroup,
    {
      isSuccess: isSuccessAddPlacesToGroup,
      isError: isErrorAddPlacesToGroup,
      isLoading: isLoadingAddPlacesToGroup,
      error: errorAddPlacesToGroup,
    },
  ] = sharedPlacesApi.endpoints.addPlacesToGroup.useMutation()
  const [
    addUsersAndGroupsToPlace,
    {
      isSuccess: isSuccessAddUsersAndGroupsToPlace,
      isError: isErrorAddUsersAndGroupsToPlace,
      isLoading: isLoadingAddUsersAndGroupsToPlace,
      error: errorAddUsersAndGroupsToPlace,
    },
  ] = sharedPlacesApi.endpoints.addUsersAndGroupsToPlace.useMutation()

  const [
    updateUsersForPlace,
    {
      isSuccess: isSuccessUpdateUsersForPlace,
      isError: isErrorUpdateUsersForPlace,
      isLoading: isLoadingUpdateUsersForPlace,
      error: errorUpdateUsersForPlace,
    },
  ] = sharedPlacesApi.endpoints.updateUsersForPlace.useMutation()
  const [
    updateGroupsForPlace,
    {
      isSuccess: isSuccessUpdateGroupsForPlace,
      isError: isErrorUpdateGroupsForPlace,
      isLoading: isLoadingUpdateGroupsForPlace,
      error: errorUpdateGroupsForPlace,
    },
  ] = sharedPlacesApi.endpoints.updateGroupsForPlace.useMutation()

  const [getUser, { data: user }] = userApi.endpoints.getUser.useLazyQuery()
  const [getGroup, { data: group }] = groupApi.endpoints.getGroup.useLazyQuery()
  const [getSpotById, { data: spot }] =
    spotApi.endpoints.getSpotById.useLazyQuery()
  const [getSetById, { data: set }] = setApi.endpoints.getSetById.useLazyQuery()
  const manageAccessFormikCtx = useTypedFormikContext<ManageAccessValues>()

  const [availabilityForm, setAvailabilityForm] =
    useState<FormikContextType<PlaceAvailabilityFormValues>>()
  const { values: availabilityFormValues = {} as PlaceAvailabilityFormValues } =
    availabilityForm || {}
  const router = useRouter()
  const { groupId, spotId, setId, userId } =
    router.query as ManageAccessQueryParams

  const error =
    errorAddPlacesToUser ||
    errorAddPlacesToGroup ||
    errorAddUsersAndGroupsToPlace ||
    errorUpdateUsersForPlace ||
    errorUpdateGroupsForPlace

  const isError = useMemo(
    () =>
      isErrorUpdateGroupsForPlace ||
      isErrorUpdateUsersForPlace ||
      isErrorAddPlacesToUser ||
      isErrorAddPlacesToGroup ||
      isErrorAddUsersAndGroupsToPlace,
    [
      isErrorAddPlacesToGroup,
      isErrorAddPlacesToUser,
      isErrorAddUsersAndGroupsToPlace,
      isErrorUpdateGroupsForPlace,
      isErrorUpdateUsersForPlace,
    ]
  )

  const successfullyCreated =
    isSuccessAddPlacesToUser ||
    isSuccessAddPlacesToGroup ||
    isSuccessAddUsersAndGroupsToPlace
  const successfullyEdited =
    isSuccessUpdateGroupsForPlace || isSuccessUpdateUsersForPlace

  const isLoading = useMemo(
    () =>
      isLoadingUpdateUsersForPlace ||
      isLoadingUpdateGroupsForPlace ||
      isLoadingAddPlacesToUser ||
      isLoadingAddPlacesToGroup ||
      isLoadingAddUsersAndGroupsToPlace,
    [
      isLoadingAddPlacesToGroup,
      isLoadingAddPlacesToUser,
      isLoadingAddUsersAndGroupsToPlace,
      isLoadingUpdateGroupsForPlace,
      isLoadingUpdateUsersForPlace,
    ]
  )

  useEffect(() => {
    if (isError) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toast.error(error?.data?.message)
    }
  }, [isError, error])

  useEffect(() => {
    if (successfullyCreated) {
      toast.success('Successfully created!')
    }
  }, [successfullyCreated])

  useEffect(() => {
    if (successfullyEdited) {
      toast.success('Successfully edited!')
    }
  }, [successfullyEdited])

  useEffect(() => {
    if (userId) {
      getUser(userId)
    }
  }, [getUser, userId])

  useEffect(() => {
    if (!user && !group) return

    manageAccessFormikCtx.setFieldValue('selectedUserGroups', [
      mapUserOrGroupToSharedModel((user || group) as UserInfo | AllGroupInfo),
    ])
  }, [user, group])

  useEffect(() => {
    if (spot) {
      manageAccessFormikCtx.setFieldValue('selectedSpots', [spot])
    }
  }, [spot])

  useEffect(() => {
    if (set) {
      manageAccessFormikCtx.setFieldValue('selectedSets', [set])
    }
  }, [set])

  useEffect(() => {
    if (groupId) {
      getGroup(Number(groupId))
    }
  }, [getGroup, groupId])

  useEffect(() => {
    if (spotId) {
      getSpotById(Number(spotId))
    }
  }, [getSpotById, spotId])

  useEffect(() => {
    if (setId) {
      getSetById(Number(setId))
    }
  }, [getSetById, setId])

  const placeId = useMemo(() => setId || spotId, [setId, spotId])
  const userOrGroupId = useMemo(() => userId || groupId, [groupId, userId])

  const isEditMode = useMemo(
    () => !!(placeId && userOrGroupId),
    [placeId, userOrGroupId]
  )

  const { data: usersByPlaces = [] } =
    sharedPlacesApi.endpoints.getUsersByPlace.useQuery(
      { placeId: Number(placeId), userId },
      {
        skip: !userId || !placeId || !isEditMode,
      }
    )

  const { data: groupsByPlace = [] } =
    sharedPlacesApi.endpoints.getGroupsByPlace.useQuery(
      { placeId: Number(placeId), groupId: Number(groupId) },
      {
        skip: !groupId || !placeId || !isEditMode,
      }
    )

  const schedule = useMemo(() => {
    if (usersByPlaces.length) {
      return usersByPlaces[0].schedule[0]
    }
    if (groupsByPlace.length) {
      return groupsByPlace[0].schedule[0]
    }
    return null
  }, [groupsByPlace, usersByPlaces])

  const handleSubmitCreate = useCallback(
    ({ placeIds, schedule, userIds, groupIds }) => {
      if (groupId) {
        addPlacesToGroup({
          groupId,
          data: {
            schedule,
            placeIds,
          },
        })
      }
      if (placeId) {
        addUsersAndGroupsToPlace({
          placeId: Number(placeId),
          data: {
            schedule,
            userIds,
            groupIds,
          },
        })
      }
      if (userId) {
        addPlacesToUser({
          userId,
          data: {
            schedule,
            placeIds,
          },
        })
      }
    },
    [
      addPlacesToGroup,
      addPlacesToUser,
      addUsersAndGroupsToPlace,
      groupId,
      placeId,
      userId,
    ]
  )

  const handleSubmitUpdate = useCallback(
    ({ schedule }) => {
      if (placeId && userId) {
        updateUsersForPlace({ userId, spotId: placeId, data: { schedule } })
      }
      if (placeId && groupId) {
        updateGroupsForPlace({
          groupId: Number(groupId),
          spotId: placeId,
          data: { schedule },
        })
      }
    },
    [groupId, placeId, updateGroupsForPlace, updateUsersForPlace, userId]
  )

  const submitDisabled =
    isLoading || !manageAccessFormikCtx.isValid || availabilityForm?.isValid

  const handleSubmit = useCallback(() => {
    if (!submitDisabled) {
      const formValues = {
        ...availabilityFormValues,
        ...manageAccessFormikCtx.values,
      }
      const userIds = formValues.selectedUserGroups
        .map((ug) => ug.userId)
        .filter((v) => v)
      const groupIds = formValues.selectedUserGroups
        .map((ug) => ug.id)
        .filter((v) => v)
      const spotIds = formValues.selectedSpots.map((s) => s.id)
      const setIds = formValues.selectedSets.map((s) => s.id)
      const schedule = [mapScheduleFormValuesToPayload(availabilityFormValues)]
      const placeIds = [...spotIds, ...setIds]

      if (isEditMode) {
        handleSubmitUpdate({ schedule })
      } else {
        handleSubmitCreate({ placeIds, schedule, userIds, groupIds })
      }
    } else {
      availabilityForm?.submitForm()
    }
  }, [
    availabilityFormValues,
    submitDisabled,
    handleSubmitCreate,
    handleSubmitUpdate,
    isEditMode,
    manageAccessFormikCtx.values,
  ])

  const usersAndGroupsSelectedItem = useMemo(() => {
    if (user) {
      return [user]
    }
    if (group) {
      return [group]
    }
    return []
  }, [group, user])

  const title = useMemo(() => {
    if (isEditMode) {
      return 'Edit access'
    }
    if (user) {
      return getPersonFullName(user)
    }
    if (group) {
      return group.name
    }
    if (spot) {
      return spot.name
    }
    if (set) {
      return set.name
    }
    return ''
  }, [group, isEditMode, set, spot, user])

  const state = {
    isEditMode,
    placeId,
    set,
    spot,
    title,
    usersAndGroupsSelectedItem,
    schedule,
  }
  const actions = { setAvailabilityForm, handleSubmit }
  return { state, actions }
}

export default useManageAccess
