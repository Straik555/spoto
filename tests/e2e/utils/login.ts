import { baseApiSlice } from '@api/index'
import { profileApi, ProfileApiTagTypes } from '@api/profile'
import { AppStateManager } from '@redux/store'
import { authSlice } from '@screens/auth/slice'
import { config } from '@tests/e2e/config/runtime'

export const login = (usernameOrEmail: string, password: string) => {
  return cy
    .request({
      method: 'POST',
      url: config.API_URL + '/api/Authentication/login',
      body: {
        usernameOrEmail,
        password,
      },
    })
    .then((res) => {
      return cy
        .window()
        .its('store')
        .then((store: AppStateManager) => {
          store.dispatch(authSlice.actions.addProfile(res.body))
          store.dispatch(authSlice.actions.setToken(res.body.token))
          store.dispatch(
            profileApi.util.invalidateTags([ProfileApiTagTypes.ProfileInfo])
          )
          store.dispatch(baseApiSlice.util.resetApiState())
        })
    })
}
