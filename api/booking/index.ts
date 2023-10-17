import {
  AddFavourite,
  AdminBookingInfo,
  AvailabilityCalendarForVisitors,
  AvailabilityForVisitors,
  AvailabilityForVisitorsResult,
  BookingAvailability,
  BookingAvailabilityFromPeriod,
  BookingAvailabilityPeriod,
  BookingAvailabilityRecurrent,
  BookingAvailabilityRecurrentResult,
  AvailabilityCalendar,
  BookingBook,
  BookingEntityContainer,
  BookingForVisitorsResult,
  BookingGuestEditSave,
  BookingGuestResponse,
  BookingInfo,
  BookingInviteGuest,
  BookingInviteGuestResponse,
  BookingPreBook,
  BookingPreBookVisitor,
  BookingPreBookVisitorResponse,
  CancelGuestResponse,
  ExtendData,
  ExtendResponse,
  GetAdminBookingsQueryParams,
  GetUpcomingBookingsByOwnerQueryParams,
  BookingAvailabilityResult,
  BookingForVisitors,
  BookingBookResponse,
} from '@api/booking/types'
import { baseApiSlice } from '@api/index'
import { placeApiTagTypes, PlaceApiTagTypes } from '@api/place'
import { PaginatedResult } from '@api/types'
import { MyBookingEntity } from '@screens/admin/Sets/ServerEntities.model'
import { WaitListApiTagTypes } from '@api/waitlist/types'

export enum BookingApiTagTypes {
  Bookings = 'Bookings',
  BookingsHistory = 'BookingsHistory',
  BookingsUpcoming = 'BookingsUpcoming',
  BookingsFavourites = 'BookingsFavourites',
  BookingAvailabilityExtend = 'BookingAvailabilityExtend',
  BookingAvailability = 'BookingAvailability',
  BookingAvailabilityPeriod = 'BookingAvailabilityPeriod',
  BookingAvailabilityFromPeriod = 'BookingAvailabilityFromPeriod',
  BookingAvailabilityCalendar = 'BookingAvailabilityCalendar',
  BookingPreBook = 'BookingPreBook',
  BookingPreBooking = 'BookingPreBooking',
  BookingInviteGuest = 'BookingInviteGuest',
  BookingPreBookVisitor = 'BookingPreBookVisitor',
  BookingUpcomingForVisitors = 'BookingUpcomingForVisitors',
  BookingGuest = 'BookingGuest',
  BookingAvailabilityCalendarForVisitor = 'BookingAvailabilityCalendarForVisitor',
}

export const bookingApiTagTypes = [
  BookingApiTagTypes.Bookings,
  BookingApiTagTypes.BookingsHistory,
  BookingApiTagTypes.BookingsUpcoming,
  BookingApiTagTypes.BookingsFavourites,
  BookingApiTagTypes.BookingAvailabilityExtend,
  BookingApiTagTypes.BookingAvailability,
  BookingApiTagTypes.BookingAvailabilityPeriod,
  BookingApiTagTypes.BookingAvailabilityFromPeriod,
  BookingApiTagTypes.BookingAvailabilityCalendar,
  BookingApiTagTypes.BookingPreBook,
  BookingApiTagTypes.BookingPreBooking,
  BookingApiTagTypes.BookingInviteGuest,
  BookingApiTagTypes.BookingPreBookVisitor,
  BookingApiTagTypes.BookingUpcomingForVisitors,
  BookingApiTagTypes.BookingGuest,
  WaitListApiTagTypes.SpotWaitList,
]

const enhancedBaseApiSlice = baseApiSlice.enhanceEndpoints({
  addTagTypes: [...bookingApiTagTypes, ...placeApiTagTypes],
})

const bookingApi = enhancedBaseApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUpcomingBookingsByOwner: builder.query<
      BookingInfo[],
      GetUpcomingBookingsByOwnerQueryParams
    >({
      query: (queryParams) => ({
        url: `/api/Booking/upcoming-by-owner`,
        params: queryParams,
      }),
      providesTags: [BookingApiTagTypes.BookingsUpcoming],
    }),
    getUpcomingBookingsByUser: builder.query<BookingEntityContainer, null>({
      query: () => ({
        url: `/api/Booking/upcoming-by-user`,
        method: 'GET',
      }),
      providesTags: [BookingApiTagTypes.BookingsUpcoming],
    }),
    getBookingsByAdmin: builder.query<
      PaginatedResult<AdminBookingInfo>,
      GetAdminBookingsQueryParams
    >({
      query: ({ from, to }) => ({
        url: `/api/Booking/bookings-by-admin?From=${from}&To=${to}`,
        method: 'GET',
      }),
      providesTags: [BookingApiTagTypes.BookingsUpcoming],
    }),
    getBookingPast: builder.query<BookingEntityContainer, null>({
      query: () => ({
        url: `/api/Booking/past-by-user`,
        method: 'GET',
      }),
      providesTags: [BookingApiTagTypes.BookingsHistory],
    }),
    getBookingPastByLocation: builder.query<
      BookingEntityContainer | null,
      string
    >({
      query: (location) => ({
        url: `/api/Booking/past-by-user?Location=${location}`,
        method: 'GET',
      }),
      providesTags: [BookingApiTagTypes.BookingsHistory],
    }),
    deleteBookingPast: builder.mutation<BookingEntityContainer, string>({
      query: (bookingId) => ({
        url: `/api/Booking/past-by-user/${bookingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [BookingApiTagTypes.BookingsHistory],
    }),
    getBookingFavourite: builder.query<MyBookingEntity[], null>({
      query: () => ({
        url: `/api/Favorites`,
        method: 'GET',
      }),
      providesTags: [BookingApiTagTypes.BookingsFavourites],
    }),
    favoritesDelete: builder.mutation<BookingEntityContainer, number>({
      query: (placeId) => ({
        url: `/api/Favorites?PlaceId=${placeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        BookingApiTagTypes.BookingsFavourites,
        PlaceApiTagTypes.PlaceInfo,
      ],
    }),
    favoritesAdd: builder.mutation<BookingEntityContainer, AddFavourite>({
      query: (data) => ({
        url: `/api/Favorites`,
        method: 'POST',
        data,
      }),
      invalidatesTags: [
        BookingApiTagTypes.BookingsFavourites,
        PlaceApiTagTypes.PlaceInfo,
      ],
    }),
    extendBooking: builder.mutation<ExtendResponse, ExtendData>({
      query: (data) => ({
        url: `/api/Booking/extend`,
        method: 'POST',
        data,
      }),
      invalidatesTags: [
        BookingApiTagTypes.BookingsUpcoming,
        BookingApiTagTypes.BookingAvailabilityExtend,
      ],
    }),
    cancelOrEndBooking: builder.mutation<BookingEntityContainer, string>({
      query: (bookingId) => ({
        url: `/api/Booking/cancel-or-end?bookingId=${bookingId}`,
        method: 'POST',
      }),
      invalidatesTags: [
        BookingApiTagTypes.BookingsUpcoming,
        WaitListApiTagTypes.SpotWaitList,
        BookingApiTagTypes.BookingUpcomingForVisitors,
      ],
    }),
    getBookingAvailabilityExtend: builder.query<AvailabilityCalendar[], string>(
      {
        query: (bookingId) => ({
          url: `/api/Booking/availability-for-extend?BookingId=${bookingId}`,
          method: 'GET',
        }),
        providesTags: [BookingApiTagTypes.BookingAvailabilityExtend],
      }
    ),
    getBookingAvailability: builder.query<
      BookingAvailabilityResult,
      BookingAvailability
    >({
      query: ({ date, placeId }) => ({
        url: `/api/Booking/availability-by-date?Date=${date}&PlaceId=${placeId}`,
        method: 'GET',
      }),
      providesTags: [BookingApiTagTypes.BookingAvailability],
    }),
    getBookingAvailabilityPeriod: builder.query<
      AvailabilityCalendar,
      BookingAvailabilityPeriod
    >({
      query: ({ startDate, endDate, placeId }) => ({
        url: `/api/Booking/availability-by-date?BookStartDate=${startDate}&CalendarEndDate=${endDate}&PlaceId=${placeId}`,
        method: 'GET',
      }),
      providesTags: [BookingApiTagTypes.BookingAvailabilityPeriod],
    }),
    getBookingAvailabilityFromPeriod: builder.query<
      AvailabilityCalendar[],
      BookingAvailabilityFromPeriod
    >({
      query: ({ startDateTime, placeId }) => ({
        url: `/api/Booking/availability-from-date?StartDateTime=${startDateTime}&PlaceId=${placeId}`,
        method: 'GET',
      }),
      providesTags: [BookingApiTagTypes.BookingAvailabilityFromPeriod],
    }),
    getBookingAvailabilityCalendar: builder.query<
      AvailabilityCalendar[],
      BookingAvailabilityPeriod
    >({
      query: ({ startDate, endDate, placeId }) => ({
        url: `/api/Booking/availability-calendar?CalendarStartDate=${startDate}&CalendarEndDate=${endDate}&PlaceId=${placeId}`,
        method: 'GET',
      }),
      providesTags: [BookingApiTagTypes.BookingAvailabilityCalendar],
    }),
    getBookingAvailabilityRecurrent: builder.query<
      BookingAvailabilityRecurrentResult[],
      BookingAvailabilityRecurrent
    >({
      query: ({ placeId, from, end, repeat, repeatWeekDays, repeatCount }) => ({
        url: `/api/Booking/availability-for-recurrent?PlaceId=${placeId}&From=${from}&End=${end}&Repeat=${repeat}&RepeatWeekDays=${repeatWeekDays}&RepeatCount=${repeatCount}`,
        method: 'GET',
      }),
      providesTags: [BookingApiTagTypes.BookingAvailability],
    }),
    getUpcomingBookingsByOwnerById: builder.query<BookingInfo, string>({
      query: (id) => ({
        url: `/api/Booking/upcoming-by-owner/${id}`,
      }),
    }),
    cancelBooking: builder.mutation<void, string>({
      query: (bookingId) => ({
        url: `/api/Booking/cancel?bookingId=${bookingId}`,
        method: 'POST',
      }),
    }),
    preBookBooking: builder.mutation<
      BookingPreBookVisitorResponse,
      BookingPreBook
    >({
      query: (data) => ({
        url: '/api/Booking/pre-book',
        method: 'POST',
        data,
      }),
      invalidatesTags: [BookingApiTagTypes.BookingPreBook],
    }),
    preBookVisitorBooking: builder.mutation<
      BookingPreBookVisitorResponse,
      BookingPreBookVisitor
    >({
      query: (data) => ({
        url: '/api/Booking/pre-book-visitor',
        method: 'POST',
        data,
      }),
      invalidatesTags: [BookingApiTagTypes.BookingPreBookVisitor],
    }),
    bookBooking: builder.mutation<BookingBookResponse, BookingBook>({
      query: (data) => ({
        url: '/api/Booking/book',
        method: 'POST',
        data,
      }),
      invalidatesTags: [
        BookingApiTagTypes.BookingPreBook,
        BookingApiTagTypes.BookingsUpcoming,
        WaitListApiTagTypes.SpotWaitList,
        BookingApiTagTypes.BookingUpcomingForVisitors,
        BookingApiTagTypes.BookingAvailabilityCalendarForVisitor,
      ],
    }),
    bookingInviteGuest: builder.mutation<
      BookingInviteGuestResponse,
      BookingInviteGuest
    >({
      query: (data) => ({
        url: `/api/Booking/guest/invite-guest`,
        method: 'POST',
        data,
      }),
      invalidatesTags: [BookingApiTagTypes.BookingInviteGuest],
    }),
    cancelGuest: builder.mutation<CancelGuestResponse, string>({
      query: (id) => ({
        url: `/api/Booking/guest/cancel-or-end?bookingReferenceId=${id}`,
        method: 'POST',
      }),
      invalidatesTags: [
        BookingApiTagTypes.BookingUpcomingForVisitors,
        BookingApiTagTypes.BookingGuest,
      ],
    }),
    availabilityForVisitors: builder.query<
      AvailabilityForVisitorsResult,
      AvailabilityForVisitors
    >({
      query: ({ startDate, apartmentId }) => ({
        url: `/api/Booking/availability-for-visitors?StartUtc=${startDate}&ApartmentId=${apartmentId}`,
        method: 'get',
      }),
    }),
    availabilityCalendarForVisitors: builder.query<
      AvailabilityCalendar[],
      AvailabilityCalendarForVisitors
    >({
      query: ({ startDate, endDate, apartmentId }) => ({
        url: `/api/Booking/availability-calendar-for-visitors?CalendarStartDate=${startDate}&CalendarEndDate=${endDate}&ApartmentId=${apartmentId}`,
        method: 'get',
      }),
      providesTags: [BookingApiTagTypes.BookingAvailabilityCalendarForVisitor],
    }),
    bookingUpcomingForVisitors: builder.query<
      BookingForVisitorsResult[],
      BookingForVisitors
    >({
      query: ({ filterByApartmentId }) => ({
        url: `/api/Booking/upcoming-for-visitors?filterByApartmentId=${filterByApartmentId}`,
        method: 'get',
      }),
      providesTags: [BookingApiTagTypes.BookingUpcomingForVisitors],
    }),
    updateGuest: builder.mutation<void, BookingGuestEditSave>({
      query: ({ bookingReferenceId, vehicleLP }) => ({
        url: `/api/Booking/guest/${bookingReferenceId}?vehicleLP=${vehicleLP}`,
        method: 'PUT',
      }),
      invalidatesTags: [
        BookingApiTagTypes.BookingUpcomingForVisitors,
        BookingApiTagTypes.BookingGuest,
      ],
    }),
    getBookingGuest: builder.query<BookingGuestResponse, string>({
      query: (id) => ({
        url: `/api/Booking/guest/${id}`,
        method: 'GET',
      }),
      providesTags: [BookingApiTagTypes.BookingGuest],
    }),
  }),
})

export default bookingApi
