import { rest } from 'msw'
import { houseStatistic } from './fixtures'

export const statisticMockApiEndpoints = [
  rest.get(/\/visitors-parking\/by-house/, (req, res, ctx) => {
    return res(ctx.json(houseStatistic))
  }),
]
