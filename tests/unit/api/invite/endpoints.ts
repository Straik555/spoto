import { rest } from 'msw'
import { getInviteByTokenResponse } from './fixtures'

export const inviteMockApiEndpoints = [
  rest.get(/\/Invite\/by-token\/1/, (req, res, ctx) => {
    return res(ctx.json(getInviteByTokenResponse))
  }),
]
