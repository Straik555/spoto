import { rest } from 'msw'
import { adminProfileInfo, houseManagerProfileInfo } from './fixtures'

export const VALID_ADMIN_BEARER_TOKEN = 'VALID_ADMIN_BEARER_TOKEN'
export const VALID_HOUSE_MANAGER_BEARER_TOKEN =
  'VALID_HOUSE_MANAGER_BEARER_TOKEN'

export const profileMockApiEndpoints = [
  rest.get(/\/Profile\/current/, (req, res, ctx) => {
    const authorizationHeader = req.headers.get('authorization')

    if (authorizationHeader?.includes(VALID_ADMIN_BEARER_TOKEN)) {
      return res(ctx.json(adminProfileInfo))
    }

    if (authorizationHeader?.includes(VALID_HOUSE_MANAGER_BEARER_TOKEN)) {
      return res(ctx.json(houseManagerProfileInfo))
    }

    return res(ctx.json(null))
  }),
]
