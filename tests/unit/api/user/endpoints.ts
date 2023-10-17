import { rest } from 'msw'
import { adminUsersList } from './fixtures'

export const userMockApiEndpoints = [
  rest.get(/\/User\/list/, (req, res, ctx) => {
    return res(ctx.json(adminUsersList))
  }),
]
