import '@tests/unit/mocks/router'
import '@tests/unit/mocks/places-autocomplete'
import { resetStateAction } from '@redux/actions/resetState'
import '@testing-library/jest-dom'
import { getStore } from '@redux/store'
import { act } from '@testing-library/react'
import { switchToMobile } from '@tests/unit/utils/deviceTypeSwitcher'
import { mockApi } from '@tests/unit/api'
import '@tests/unit/utils/deviceTypeSwitcher'
import '@tests/mocks/redux-persist'
import 'jest-canvas-mock'

import '@tests/unit/mocks/react-slick'

const store = getStore({
  memoized: true,
})

beforeAll(() => {
  mockApi.listen({ onUnhandledRequest: 'warn' })

  const mockIntersectionObserver = jest.fn()
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  })
  window.IntersectionObserver = mockIntersectionObserver
})

beforeEach(async () => {
  switchToMobile()
})

afterEach(async () => {
  mockApi.resetHandlers()
  jest.restoreAllMocks()

  act(() => {
    store.dispatch(resetStateAction())
  })
})

afterAll(() => {
  mockApi.close()
})
