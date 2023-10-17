import {
  AddUsersToGroupArgs,
  AllGroupInfo,
  CreateGroupBody,
  DeleteUserFromGroupBody,
  EditGroupBody,
  GetGroupInfosQueryParams,
  GroupInfo,
  GroupUser,
} from '@api/group/types'
import { baseApiSlice } from '@api/index'
import { userApiTagTypes } from '@api/user'

export const groupApiTagTypes = ['Groups', 'Group', 'GroupPlaces', 'GroupUsers']

const enhancedBaseApiSlice = baseApiSlice.enhanceEndpoints({
  addTagTypes: [...groupApiTagTypes, ...userApiTagTypes],
})

export const groupApi = enhancedBaseApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getGroups: builder.query<AllGroupInfo[], GetGroupInfosQueryParams>({
      query: (queryParams) => ({
        url: `/api/Group`,
        params: queryParams,
      }),
      providesTags: ['Groups'],
    }),
    getGroup: builder.query<GroupInfo, number>({
      query: (groupId) => ({
        url: `/api/Group/${groupId}`,
      }),
      providesTags: (result) =>
        result ? [{ type: 'Group' as const, id: result.id }] : ['Group'],
    }),
    deleteGroup: builder.mutation<void, number>({
      query: (groupId) => ({
        url: `/api/Group/${groupId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Groups'],
    }),
    getGroupUsers: builder.query<GroupUser[], number>({
      query: (groupId) => ({
        url: `/api/Group/${groupId}/users`,
      }),
      providesTags: ['GroupUsers'],
    }),
    createGroup: builder.mutation<void, CreateGroupBody>({
      query: ({ name, formData }) => ({
        url: `/api/Group`,
        method: 'POST',
        headers: {
          name,
        },
        data: formData,
      }),
      invalidatesTags: ['Groups'],
    }),
    editGroup: builder.mutation<void, EditGroupBody>({
      query: ({ id, name, formData }) => ({
        url: `/api/Group`,
        method: 'PUT',
        headers: {
          id,
          name,
        },
        data: formData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Group', id: arg.id },
        'Groups',
      ],
    }),
    deleteUsersFromGroup: builder.mutation<void, DeleteUserFromGroupBody>({
      query: ({ groupId, ...data }) => ({
        url: `/api/Group/${groupId}/users/delete`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['UserGroups', 'GroupUsers'],
    }),
    addUsersToGroup: builder.mutation<void, AddUsersToGroupArgs>({
      query: ({ groupId, ...data }) => ({
        url: `/api/Group/${groupId}/users`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['GroupUsers'],
    }),
  }),
})
