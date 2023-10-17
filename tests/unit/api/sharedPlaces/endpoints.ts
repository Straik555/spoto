import { rest } from 'msw'
import { groupSharedPlaces, userSharedPlaces } from './fixtures'

export const sharedPlacesMockApiEndpoints = [
  rest.get(/\/SharedPlaces\/by-user/, (req, res, ctx) => {
    return res(ctx.json(userSharedPlaces))
  }),
  rest.get(/\/SharedPlaces\/by-group/, (req, res, ctx) => {
    return res(ctx.json(groupSharedPlaces))
  }),
]
