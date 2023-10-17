import { UserRole } from '@constants/types'
import React from 'react'
import { PageHeaderItemType } from '@components/PageHeader/PageHeader.model'
import OccupantIcon from '@assets/icons/leftMenuIcons/occupant.svg'
import NewBooking from '@assets/icons/leftMenuIcons/new-booking.svg'
import MyBookings from '@assets/icons/leftMenuIcons/my-bookings.svg'
import MyVisitorsIcon from '@assets/icons/leftMenuIcons/my-visitors.svg'
import UsersGroups from '@assets/icons/leftMenuIcons/users-groups.svg'
import Dashboard from '@assets/icons/leftMenuIcons/dashboard.svg'
import Spots from '@assets/icons/leftMenuIcons/spots.svg'
import Sets from '@assets/icons/filter.svg'
import Guest from '@assets/icons/leftMenuIcons/guest.svg'
import Settings from '@assets/icons/leftMenuIcons/settings.svg'
import ReservationsIcon from '@assets/icons/leftMenuIcons/reservations.svg'
import ClockIcon from '@assets/icons/leftMenuIcons/clock.svg'
import CalendarIcon from '@assets/icons/calendar.svg'
import ListIcon from '@assets/icons/list.svg'
import { ROUTES, ROUTES_USER_LEVELS } from '@constants/routes'

const pageHeaderItems: PageHeaderItemType[] = [
  {
    title: 'New Booking',
    icon: <NewBooking className="fill-blue-3" />,
    pageRoute: ROUTES.HOME,
    allowedRole: null,
    forbiddenRole: [UserRole.SystemAdmin, UserRole.HouseManager],
  },
  {
    title: 'My Bookings',
    icon: <MyBookings className="fill-blue-3" />,
    pageRoute: ROUTES.BOOKINGS,
    allowedRole: ROUTES_USER_LEVELS[ROUTES.BOOKINGS],
  },
  {
    title: 'Dashboard',
    icon: <Dashboard className="fill-blue-3" />,
    pageRoute: ROUTES.HOUSEMANAGER_DASHBOARD,
    allowedRole: ROUTES_USER_LEVELS[ROUTES.HOUSEMANAGER_DASHBOARD],
  },
  {
    title: 'Dashboard',
    icon: <Dashboard className="fill-blue-3" />,
    pageRoute: ROUTES.ADMIN_DASHBOARD,
    allowedRole: ROUTES_USER_LEVELS[ROUTES.ADMIN_DASHBOARD],
  },
  {
    title: 'Dashboard',
    icon: <Dashboard className="fill-blue-3" />,
    pageRoute: ROUTES.OWNER_DASHBOARD,
    allowedRole: ROUTES_USER_LEVELS[ROUTES.OWNER_DASHBOARD],
  },
  {
    title: 'My Visitors',
    icon: <MyVisitorsIcon className="fill-blue-3" />,
    pageRoute: ROUTES.MY_VISITORS,
    allowedRole: ROUTES_USER_LEVELS[ROUTES.MY_VISITORS],
  },
  {
    title: 'Occupants',
    icon: <OccupantIcon className="fill-blue-3" />,
    pageRoute: ROUTES.HOUSEMANAGER_HOUSES,
    allowedRole: ROUTES_USER_LEVELS[ROUTES.HOUSEMANAGER_HOUSES],
  },
  {
    title: 'Spots',
    icon: <Spots className="fill-blue-3" />,
    pageRoute: ROUTES.HOUSEMANAGER_VISITOR_PARKING,
    allowedRole: ROUTES_USER_LEVELS[ROUTES.HOUSEMANAGER_VISITOR_PARKING],
  },
  {
    title: 'Spots',
    icon: <Spots className="fill-blue-3" />,
    pageRoute: ROUTES.ADMIN_SPOTS,
    allowedRole: ROUTES_USER_LEVELS[ROUTES.ADMIN_SPOTS],
  },
  {
    title: 'My Guests',
    icon: <Guest className="fill-blue-3" />,
    pageRoute: ROUTES.OWNER_USERS,
    allowedRole: ROUTES_USER_LEVELS[ROUTES.OWNER_USERS],
  },
  {
    title: 'Spots',
    icon: <Spots className="fill-blue-3" />,
    pageRoute: ROUTES.OWNER_SPOTS,
    allowedRole: ROUTES_USER_LEVELS[ROUTES.OWNER_SPOTS],
  },
  {
    title: 'Reservations',
    icon: <ReservationsIcon className="fill-blue-3" />,
    pageRoute: ROUTES.OWNER_RESERVATIONS,
    allowedRole: ROUTES_USER_LEVELS[ROUTES.OWNER_RESERVATIONS],
  },
  {
    title: 'Sets',
    icon: <Sets className="fill-blue-3" />,
    pageRoute: ROUTES.ADMIN_SETS,
    allowedRole: ROUTES_USER_LEVELS[ROUTES.ADMIN_SETS],
  },
  {
    title: 'Users & Groups',
    icon: <UsersGroups className="fill-blue-3" />,
    pageRoute: ROUTES.ADMIN_USERS_TYPE,
    allowedRole: ROUTES_USER_LEVELS[ROUTES.ADMIN_USERS_TYPE],
  },
  {
    title: 'Waitlist',
    icon: <ClockIcon className="fill-blue-3" />,
    pageRoute: ROUTES.WAIT_LIST_SPOTS,
    allowedRole: ROUTES_USER_LEVELS[ROUTES.WAIT_LIST_SPOTS],
  },
  {
    title: 'Settings',
    icon: <Settings className="fill-blue-3" />,
    pageRoute: ROUTES.PROFILE_SETTINGS,
    allowedRole: ROUTES_USER_LEVELS[ROUTES.PROFILE_SETTINGS],
  },
  {
    title: 'Virtual Parking',
    icon: <ListIcon className="fill-blue-3" />,
    pageRoute: ROUTES.PARKING_PLACES,
    allowedRole: ROUTES_USER_LEVELS[ROUTES.PARKING_PLACES],
  },
  {
    title: 'Booking Calendar',
    icon: <CalendarIcon className="fill-blue-3" />,
    pageRoute: ROUTES.BOOKING_CALENDAR,
    allowedRole: ROUTES_USER_LEVELS[ROUTES.BOOKING_CALENDAR],
  },
]

export default pageHeaderItems
