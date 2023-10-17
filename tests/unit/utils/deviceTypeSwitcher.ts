import { serverSideSlice } from '@redux/slices/serverSideSlice'
import { getStore } from '@redux/store'

const store = getStore({
  memoized: true,
})

export const switchToMobile = () => {
  store.dispatch(
    serverSideSlice.actions.updateUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
    )
  )
}

export const switchToBrowser = () => {
  store.dispatch(
    serverSideSlice.actions.updateUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36'
    )
  )
}
