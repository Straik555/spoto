import { baseApiSlice } from '@api/index'
import {
  AddGroupsToPlaceParams,
  AddUsersAndGroupsToPlaceParams,
  AddPlacesToUserParams,
  DeleteSpotGroupAccess,
  DeleteSpotPersonAccess,
  EditSpotGroupAccess,
  EditSpotPersonAccess,
  GetGroupSpotAccessInfo,
  GetPersonSpotAccessInfo,
  PlaceGroup,
  PlaceUser,
  SharedPlace,
  AddPlacesToGroupParams,
  GetUsersByPlaceParams,
  GetGroupsByPlaceParams,
} from '@api/sharedPlaces/types'

export const sharedPlacesApiTagTypes = [
  'SharedPlacesByUser',
  'SharedPlacesByGroup',
  'UserPlaceAccessInfo',
  'UsersByPlace',
  'UserByPlace',
  'GroupsByPlace',
  'GroupByPlace',
]

const enhancedBaseApiSlice = baseApiSlice.enhanceEndpoints({
  addTagTypes: sharedPlacesApiTagTypes,
})

export const sharedPlacesApi = enhancedBaseApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSharedPlacesByUser: builder.query<SharedPlace[], string>({
      query: (userId) => ({
        url: `/api/SharedPlaces/by-user/${userId}`,
      }),
      providesTags: ['SharedPlacesByUser'],
    }),
    addPlacesToUser: builder.mutation<void, AddPlacesToUserParams>({
      query: ({ userId, data }) => ({
        url: `/api/SharedPlaces/by-user/${userId}/add-places`,
        data,
        method: 'POST',
      }),
      invalidatesTags: ['UsersByPlace', 'UserByPlace', 'SharedPlacesByUser'],
    }),
    getSharedPlacesByGroup: builder.query<PlaceGroup[], number>({
      query: (groupId) => ({
        url: `/api/SharedPlaces/by-group/${groupId}`,
      }),
      providesTags: ['SharedPlacesByGroup'],
    }),
    getUsersByPlace: builder.query<PlaceUser[], GetUsersByPlaceParams>({
      query: ({ placeId, userId }) => ({
        url: `/api/SharedPlaces/by-place/${placeId}/users`,
        params: { filterByUserId: userId },
      }),
      providesTags: ['UsersByPlace'],
    }),
    getUserByPlace: builder.query<PlaceUser, GetPersonSpotAccessInfo>({
      query: ({ spotId, userId }) => ({
        url: `/api/SharedPlaces/by-place/${spotId}/users?filterByUserId=${userId}`,
      }),
      providesTags: ['UserByPlace'],
      transformResponse: (response: PlaceUser[]) => response[0],
    }),
    getGroupByPlace: builder.query<PlaceGroup, GetGroupSpotAccessInfo>({
      query: ({ spotId, groupId }) => ({
        url: `/api/SharedPlaces/by-place/${spotId}/groups?filterByGroupId=${groupId}`,
      }),
      providesTags: ['GroupByPlace'],
      transformResponse: (response: PlaceGroup[]) => response[0],
    }),
    getGroupsByPlace: builder.query<PlaceGroup[], GetGroupsByPlaceParams>({
      query: ({ placeId, groupId }) => ({
        url: `/api/SharedPlaces/by-place/${placeId}/groups`,
        params: { filterByGroupId: groupId },
      }),
      providesTags: ['GroupsByPlace'],
    }),
    deleteUserFromPlace: builder.mutation<void, DeleteSpotPersonAccess>({
      query: ({ spotId, userId }) => ({
        url: `/api/SharedPlaces/by-place/${spotId}/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['UsersByPlace', 'SharedPlacesByUser'],
    }),
    deleteGroupFromPlace: builder.mutation<void, DeleteSpotGroupAccess>({
      query: ({ spotId, groupId }) => ({
        url: `/api/SharedPlaces/by-place/${spotId}/groups/${groupId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['GroupsByPlace', 'SharedPlacesByGroup'],
    }),
    addUsersAndGroupsToPlace: builder.mutation<
      void,
      AddUsersAndGroupsToPlaceParams
    >({
      query: ({ placeId, data }) => ({
        url: `/api/SharedPlaces/by-place/${placeId}/add-users-and-groups`,
        data,
        method: 'POST',
      }),
      invalidatesTags: ['UsersByPlace', 'UserByPlace', 'SharedPlacesByUser'],
    }),
    addGroupsToPlace: builder.mutation<void, AddGroupsToPlaceParams>({
      query: ({ placeId, data }) => ({
        url: `/api/SharedPlaces/by-place/${placeId}/add-groups`,
        data,
        method: 'POST',
      }),
      invalidatesTags: ['GroupsByPlace', 'GroupByPlace', 'SharedPlacesByGroup'],
    }),
    addPlacesToGroup: builder.mutation<void, AddPlacesToGroupParams>({
      query: ({ groupId, data }) => ({
        url: `/api/SharedPlaces/by-group/${groupId}/add-places`,
        data,
        method: 'POST',
      }),
      invalidatesTags: ['PlacesByGroup', 'PlaceByGroup', 'GroupsByPlace'],
    }),
    updateUsersForPlace: builder.mutation<void, EditSpotPersonAccess>({
      query: ({ spotId, userId, data }) => ({
        url: `/api/SharedPlaces/by-place/${spotId}/users/${userId}`,
        data,
        method: 'PUT',
      }),
      invalidatesTags: ['UsersByPlace', 'UserByPlace', 'SharedPlacesByUser'],
    }),
    updateGroupsForPlace: builder.mutation<void, EditSpotGroupAccess>({
      query: ({ spotId, groupId, data }) => ({
        url: `/api/SharedPlaces/by-place/${spotId}/groups/${groupId}`,
        data,
        method: 'PUT',
      }),
      invalidatesTags: ['GroupsByPlace', 'GroupByPlace', 'SharedPlacesByGroup'],
    }),
  }),
})
