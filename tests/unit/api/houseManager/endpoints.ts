import { rest } from 'msw'
import {
  houses,
  houseSpots,
  towers,
  tower,
  statistic,
  housesApartments,
} from './fixtures'

export const houseManagerMockApiEndpoints = [
  rest.get(/\/House\/by-user/, (req, res, ctx) => {
    return res(ctx.json(houses))
  }),
  rest.get(/\/Spot\/by-house/, (req, res, ctx) => {
    return res(ctx.json(houseSpots))
  }),
  rest.get(/\/Spot\/1/, (req, res, ctx) => {
    return res(ctx.json(houseSpots[0]))
  }),
  rest.get(/\/House\/1\/towers/, (req, res, ctx) => {
    return res(ctx.json(towers))
  }),
  rest.get(/\/House\/towers\/1/, (req, res, ctx) => {
    return res(ctx.json(tower))
  }),
  rest.get(/\/Statistic\/visitors-parking\/by-house\/1/, (req, res, ctx) => {
    return res(ctx.json(statistic))
  }),
  rest.get(/\/House\/apartments\/by-user/, (req, res, ctx) => {
    return res(ctx.json(housesApartments))
  }),
]
