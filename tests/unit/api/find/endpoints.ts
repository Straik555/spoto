import { rest } from 'msw'
import { findHistory, findPlaceNearBy } from './fixtures'

export const findMockApiEndpoints = [
  rest.get(/\/Find\/find-place-nearby/, (req, res, ctx) => {
    return res(ctx.json(findPlaceNearBy))
  }),
  rest.get(/\/Find\/history\/get/, (req, res, ctx) => {
    return res(ctx.json(findHistory))
  }),
]
