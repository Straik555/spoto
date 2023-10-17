import { rest } from 'msw'
import { userVehicles } from './fixtures'

export const vehicleMockApiEndpoints = [
  rest.get(/\/Vehicle\/by-user/, (req, res, ctx) => {
    return res(ctx.json(userVehicles))
  }),
]
