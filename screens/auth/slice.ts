import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  getActiveProfile,
  getProfileByEmail,
  getProfileByToken,
} from '@screens/auth/hooks/useSelectors'
import {
  AvailableUserProfile,
  AvailableUserProfiles,
} from '@screens/auth/types'
import Cookies from 'js-cookie'

export type AuthSlice = {
  token: string
  availableUserProfiles: AvailableUserProfiles
}

const initialState: AuthSlice = {
  token: '',
  availableUserProfiles: {},
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<AuthSlice['token']>) {
      Cookies.set('token', action.payload, { path: '/' })
      state.token = action.payload
    },
    removeToken(state) {
      Cookies.remove('token', { path: '/' })
      state.token = ''
    },
    addProfile(
      state,
      action: PayloadAction<Omit<AvailableUserProfile, 'active' | 'expired'>>
    ) {
      const profileToAdd = action.payload
      const activeProfile = getActiveProfile(state.availableUserProfiles)

      if (activeProfile) {
        state.availableUserProfiles[activeProfile.email] = {
          ...activeProfile,
          active: false,
        }
      }

      state.availableUserProfiles[profileToAdd.email] = {
        ...profileToAdd,
        active: true,
      }
    },
    markProfileAsActive(state, action: PayloadAction<string>) {
      const email = action.payload
      const profileToMarkActive = getProfileByEmail(
        email,
        state.availableUserProfiles
      )
      const activeProfile = getActiveProfile(state.availableUserProfiles)

      if (!profileToMarkActive) return

      if (activeProfile) {
        state.availableUserProfiles[activeProfile.email] = {
          ...activeProfile,
          active: false,
        }
      }

      state.availableUserProfiles[profileToMarkActive.email] = {
        ...profileToMarkActive,
        active: true,
      }
    },
    changeProfile(
      state,
      action: PayloadAction<{
        email?: string
        token?: string
        newProfileInfo: Partial<AvailableUserProfile>
      }>
    ) {
      const { email, token, newProfileInfo } = action.payload
      const profileToChange = email
        ? getProfileByEmail(email, state.availableUserProfiles)
        : getProfileByToken(token!, state.availableUserProfiles)

      if (!profileToChange) return

      state.availableUserProfiles[profileToChange.email] = {
        ...profileToChange,
        ...newProfileInfo,
      }
    },
  },
})
