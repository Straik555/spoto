import { HouseApiTagTypes } from '@api/house'
import { baseApiSlice } from '@api/index'
import {
  CreateInviteData,
  InvitationInfo,
  InvitationStatus,
  InviteByQrData,
  InviteByTokenData,
  MyInviteInfo,
} from '@api/invite/types'

export enum InviteApiTagTypes {
  InvitesList = 'InvitesList',
  MyInvitesList = 'MyInvitesList',
}

export const inviteApiTagTypes = [
  InviteApiTagTypes.InvitesList,
  InviteApiTagTypes.MyInvitesList,
  HouseApiTagTypes.Apartments,
]

const enhancedBaseApiSlice = baseApiSlice.enhanceEndpoints({
  addTagTypes: [...inviteApiTagTypes, HouseApiTagTypes.Apartments],
})

export const inviteApi = enhancedBaseApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getInvitations: builder.query<InvitationInfo[], null>({
      query: (queryParams) => ({
        url: `/api/Invite/list`,
        params: queryParams,
      }),
      providesTags: [InviteApiTagTypes.InvitesList],
      transformResponse: (response: InvitationInfo[]) => {
        return response?.filter(
          (item: InvitationInfo) => item.status !== InvitationStatus.Revoked
        )
      },
    }),
    getInvitationById: builder.query<InvitationInfo, number>({
      query: (id) => ({
        url: `/api/Invite/${id}`,
      }),
    }),
    deleteInvitationById: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/Invite/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        InviteApiTagTypes.InvitesList,
        HouseApiTagTypes.Apartments,
      ],
    }),
    inviteUserByEmail: builder.mutation<void, CreateInviteData>({
      query: (data) => ({
        url: `/api/Invite/create`,
        method: 'POST',
        data,
      }),
      invalidatesTags: [
        InviteApiTagTypes.InvitesList,
        HouseApiTagTypes.Apartments,
      ],
    }),
    acceptInviteByToken: builder.mutation<void, { token: string }>({
      query: ({ token }) => ({
        url: `/api/Invite/accept/by-token/${token}`,
        method: 'PUT',
      }),
    }),
    acceptInviteById: builder.mutation<void, { id: number; accept: boolean }>({
      query: ({ id, accept }) => ({
        url: `/api/Invite/accept/${id}?accept=${accept}`,
        method: 'PUT',
      }),
      invalidatesTags: [InviteApiTagTypes.InvitesList],
    }),
    getInviteByToken: builder.query<InviteByTokenData, string>({
      query: (token) => ({
        url: `/api/Invite/by-token/${token}`,
      }),
    }),
    getInviteByQr: builder.query<InviteByQrData, string>({
      query: (qrToken) => ({
        url: `/api/Invite/by-qr/${qrToken}`,
      }),
    }),
    getMyInvites: builder.query<MyInviteInfo[], null>({
      query: () => ({
        url: `/api/Invite/my`,
      }),
      providesTags: [InviteApiTagTypes.MyInvitesList],
    }),
  }),
})
