import { authBaseApiSlice, baseApiSlice } from '@api/index'
import {
  ChangeProfilePasswordArgs,
  ProfileInfo,
  ResetProfilePasswordArgs,
  SetNewProfilePasswordArgs,
} from '@api/profile/types'
import { UserInfo } from '@api/user/types'

export enum ProfileApiTagTypes {
  ProfileInfo = 'ProfileInfo',
}

export const profileApiTagTypes = [ProfileApiTagTypes.ProfileInfo]

const enhancedBaseApiSlice = authBaseApiSlice.enhanceEndpoints({
  addTagTypes: profileApiTagTypes,
})

export const profileApi = enhancedBaseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentProfile: builder.query<ProfileInfo, null>({
      query: () => ({
        url: `/api/Profile/current`,
      }),
      providesTags: [ProfileApiTagTypes.ProfileInfo],
    }),
    changeProfilePassword: builder.mutation<void, ChangeProfilePasswordArgs>({
      query: (data) => ({
        url: '/api/Profile/change-password',
        method: 'POST',
        data,
      }),
    }),
    resetProfilePassword: builder.mutation<void, ResetProfilePasswordArgs>({
      query: (data) => ({
        url: '/api/Profile/reset-password',
        method: 'POST',
        data,
      }),
    }),
    setNewProfilePassword: builder.mutation<void, SetNewProfilePasswordArgs>({
      query: (data) => ({
        url: '/api/Profile/set-new-password',
        method: 'POST',
        data,
      }),
    }),
    updateProfilePhoto: builder.mutation<void, FormData>({
      query: (data) => ({
        url: '/api/Profile/update-photo',
        method: 'PUT',
        data,
      }),
      invalidatesTags: [ProfileApiTagTypes.ProfileInfo],
    }),
    updateProfile: builder.mutation<
      void,
      Pick<UserInfo, 'firstName' & 'lastName'>
    >({
      query: (data) => ({
        url: '/api/Profile',
        method: 'PUT',
        data,
      }),
      invalidatesTags: [ProfileApiTagTypes.ProfileInfo],
    }),
    becomePersonalOwner: builder.mutation<void, void>({
      query: () => ({
        url: `/api/Profile/PersonalOwner?isPersonalOwner=true`,
        method: 'PUT',
      }),
      invalidatesTags: [ProfileApiTagTypes.ProfileInfo],
    }),
  }),
})
