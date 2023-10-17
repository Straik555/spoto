import { profileApi } from '@api/profile'
import { getStore } from '@redux/store'
import { authSlice } from '@screens/auth/slice'
import {
  VALID_ADMIN_BEARER_TOKEN,
  VALID_HOUSE_MANAGER_BEARER_TOKEN,
} from '@tests/unit/api/profile/endpoints'

const store = getStore({ memoized: true })

export const authenticateAsAdmin = async () => {
  store.dispatch(authSlice.actions.setToken(VALID_ADMIN_BEARER_TOKEN))
  await store.dispatch(
    await profileApi.endpoints.getCurrentProfile.initiate(null)
  )
}

export const authenticateAsHouseManager = async () => {
  store.dispatch(authSlice.actions.setToken(VALID_HOUSE_MANAGER_BEARER_TOKEN))

  await store.dispatch(
    await profileApi.endpoints.getCurrentProfile.initiate(null)
  )
}

export const deauthenticate = () => {
  store.dispatch(authSlice.actions.removeToken())
  store.dispatch(profileApi.util.resetApiState())
}
