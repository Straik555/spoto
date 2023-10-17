import { baseApiSlice } from '@api/index'
import {
  AddGroupsToUserPayload,
  GetUserInfosQueryParams,
  InviteUserPayload,
  UserGroupInfo,
  UserInfo,
} from '@api/user/types'

export const userApiTagTypes = ['Users', 'UserGroups', 'UserInfo']

const enhancedBaseApiSlice = baseApiSlice.enhanceEndpoints({
  addTagTypes: userApiTagTypes,
})

export const userApi = enhancedBaseApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUsers: builder.query<UserInfo[], GetUserInfosQueryParams>({
      query: (queryParams) => ({
        url: `/api/User/list`,
        params: queryParams,
      }),
      providesTags: ['Users'],
    }),
    getUser: builder.query<UserInfo, string>({
      query: (userId) => ({
        url: `/api/User/${userId}`,
      }),
      providesTags: ['UserInfo'],
    }),
    getUserGroups: builder.query<UserGroupInfo[], string>({
      query: (userId: string) => ({
        url: `/api/User/${userId}/groups`,
      }),
      providesTags: ['UserGroups'],
    }),
    deleteUser: builder.mutation<UserInfo, string>({
      query: (userId) => ({
        url: `/api/User/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
    inviteUser: builder.mutation<void, InviteUserPayload>({
      query: (data) => {
        return {
          url: `/api/User/register`,
          method: 'POST',
          data,
        }
      },
      invalidatesTags: ['Users'],
    }),
    addGroupsToUser: builder.mutation<void, AddGroupsToUserPayload>({
      query: ({ userId, ...data }) => ({
        url: `/api/User/${userId}/groups/add`,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['UserGroups'],
    }),
    deleteGroupsToUser: builder.mutation<void, AddGroupsToUserPayload>({
      query: ({ userId, ...data }) => ({
        url: `/api/User/${userId}/groups/delete`,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['UserGroups'],
    }),
  }),
})
