import { rest } from 'msw'
import {
  bookingAvailability,
  bookingUpcomingForVisitors,
  bookingAvailabilityCalendarForVisitors,
  bookingPreBookVisitor,
  bookingBook,
  bookingGuestInvite,
} from './fixtures'

export const bookingMockApiEndpoints = [
  rest.get(/\/Booking\/availability-from-date/, (req, res, ctx) => {
    return res(ctx.json(bookingAvailability))
  }),
  rest.get(/\/Booking\/upcoming-for-visitors/, (req, res, ctx) => {
    return res(ctx.json(bookingUpcomingForVisitors))
  }),
  rest.get(/\/Booking\/availability-calendar-for-visitors/, (req, res, ctx) => {
    return res(ctx.json(bookingAvailabilityCalendarForVisitors))
  }),
  rest.get(/\/Booking\/pre-book-visitor/, (req, res, ctx) => {
    return res(ctx.json(bookingPreBookVisitor))
  }),
  rest.get(/\/Booking\/book/, (req, res, ctx) => {
    return res(ctx.json(bookingBook))
  }),
  rest.get(/\/Booking\/guest\/invite-guest/, (req, res, ctx) => {
    return res(ctx.json(bookingGuestInvite))
  }),
]
