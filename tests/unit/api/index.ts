import { groupMockApiEndpoints } from '@tests/unit/api/group/endpoints'
import { sharedPlacesMockApiEndpoints } from '@tests/unit/api/sharedPlaces/endpoints'
import { statisticMockApiEndpoints } from '@tests/unit/api/statistic/endpoints'
import { vehicleMockApiEndpoints } from '@tests/unit/api/vehicle/endpoints'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { bookingMockApiEndpoints } from './booking/endpoints'
import { findMockApiEndpoints } from './find/endpoints'
import { houseManagerMockApiEndpoints } from './houseManager/endpoints'
import { inviteMockApiEndpoints } from './invite/endpoints'
import { profileMockApiEndpoints } from './profile/endpoints'
import { userMockApiEndpoints } from './user/endpoints'

export const mockApi = setupServer(
  ...[
    ...profileMockApiEndpoints,
    ...userMockApiEndpoints,
    ...groupMockApiEndpoints,
    ...bookingMockApiEndpoints,
    ...houseManagerMockApiEndpoints,
    ...inviteMockApiEndpoints,
    ...findMockApiEndpoints,
    ...statisticMockApiEndpoints,
    ...sharedPlacesMockApiEndpoints,
    ...vehicleMockApiEndpoints,
    rest.put(/./i, (req, res, ctx) => {
      return res(ctx.json(true))
    }),
    rest.post(/./i, (req, res, ctx) => {
      return res(ctx.json(true))
    }),
    rest.delete(/./i, (req, res, ctx) => {
      return res(ctx.json(true))
    }),
  ]
)
