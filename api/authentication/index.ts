import { authBaseApiSlice } from '@api/index'
import {
  AuthenticateUserParams,
  AuthenticateUserPayload,
  ConfirmEmailParams,
  ConfirmPhoneParams,
  RegisterUserParams,
  UpdatePhoneParams,
} from './types'

const AUTHENTICATION_BASE_URL = '/api/Authentication/'
export const AUTH_PROFILE_BASE_URL = `${AUTHENTICATION_BASE_URL}profile/`

const authenticationApi = authBaseApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    authenticateUser: builder.mutation<
      AuthenticateUserPayload,
      AuthenticateUserParams
    >({
      query: (data) => ({
        url: `${AUTHENTICATION_BASE_URL}login`,
        method: 'POST',
        data,
      }),
    }),
    registerUser: builder.mutation<string, RegisterUserParams>({
      query: (data) => ({
        url: `${AUTHENTICATION_BASE_URL}register`,
        method: 'POST',
        data,
      }),
    }),
    reSendConfirmationEmail: builder.mutation<void, { email: string }>({
      query: (data) => ({
        url: `${AUTHENTICATION_BASE_URL}re-send-confirmation-email`,
        method: 'POST',
        data,
      }),
    }),
    confirmEmail: builder.mutation<AuthenticateUserPayload, ConfirmEmailParams>(
      {
        query: (data) => ({
          url: `${AUTH_PROFILE_BASE_URL}email/confirm`,
          method: 'POST',
          data,
        }),
      }
    ),
    updatePhone: builder.mutation<void, UpdatePhoneParams>({
      query: (data) => ({
        url: `${AUTH_PROFILE_BASE_URL}phone/update`,
        method: 'POST',
        data,
      }),
    }),
    confirmPhone: builder.mutation<void, ConfirmPhoneParams>({
      query: (data) => ({
        url: `${AUTH_PROFILE_BASE_URL}phone/confirm`,
        method: 'POST',
        data,
      }),
    }),
  }),
})

export default authenticationApi
