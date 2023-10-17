import { rest } from 'msw'
import { adminGroupList } from './fixtures'

export const groupMockApiEndpoints = [
  rest.get(/\/Group/, (req, res, ctx) => {
    return res(ctx.json(adminGroupList))
  }),
]
