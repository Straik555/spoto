import { UrlObject } from 'url'
import { UserRole } from '@constants/types'

export enum ROUTES {
  /** public routes */
  HOME = '/',
  ERROR = '/404',
  LOGIN = '/login',
  REGISTER = '/register',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password',
  RESET_PASSWORD_SUCCESS = '/reset-password-success',
  VERIFY_PHONE = '/verify-phone',
  HELP = '/help',
  HELP_POLICY = '/help/policy',
  HELP_TERMS = '/help/terms',
  JOIN = '/join',
  PARKING_INVITATION = '/parking-invitation',
  PARKING_INVITATION_EXPIRED = '/parking-invitation/expired',
  /** client routes */
  PROFILE_SETTINGS = '/profile/settings',
  PROFILE_EDIT = '/profile/edit',
  PROFILE_VEHICLES = '/vehicles',
  PROFILE_CHANGE_PASSWORD = '/profile/change-password',
  PROFILE_INVITATIONS = '/profile/invitations',
  PROFILE_NOTIFICATIONS = '/profile/notifications',
  VEHICLES_CREATE = '/vehicles/create/',
  VEHICLES_EDIT = '/vehicles/[vehicleId]/edit',
  FIND_SPOT = '/spot/[id]',
  WAIT_LIST = '/waitlist',
  WAIT_LIST_SPOTS = '/waitlist/spots',
  WAIT_LIST_SEARCHES = '/waitlist/searches',
  BOOKINGS = '/bookings',
  SPOT_CREATE = '/spot/create',
  SPOT_EDIT = '/spot/edit/[spotId]',
  /** owner routes */
  OWNER_DASHBOARD = '/owner/dashboard',
  OWNER_RESERVATIONS = '/owner/reservations',
  OWNER_RESERVATIONS_FIND = '/owner/reservations/[id]',
  OWNER_SPOTS = '/owner/spots',
  OWNER_SPOTS_SETTINGS = '/owner/spots/[id]/booking-settings/[userId]',
  OWNER_SPOTS_CREATE = '/owner/spots/create',
  OWNER_SPOTS_FIND_TAB = '/owner/spots/[id]/[[...type]]',
  OWNER_SPOTS_EDIT = '/owner/spots/edit/[id]/[[...type]]',
  OWNER_USERS = '/owner/users',
  OWNER_USERS_DETAILS = '/owner/users/[id]',
  OWNER_USERS_EDIT = '/owner/users/[id]/edit',
  OWNER_USER_BOOKING_SETTINGS = '/owner/users/[id]/booking-settings',
  /** organization admin routes */
  ADMIN_DASHBOARD = '/admin/dashboard',
  ADMIN_USERS_TYPE = '/admin/users/[[...type]]',
  ADMIN_USERS_PERSON = '/admin/users/person/[userId]',
  ADMIN_USERS_PERSON_SPOT = '/admin/users/person/[userId]/spot',
  ADMIN_USERS_PERSON_SET = '/admin/users/person/[userId]/set',
  ADMIN_USERS_PERSON_GROUP_ADD = '/admin/users/person/[userId]/groups/add',
  ADMIN_USERS_GROUP = '/admin/users/group/[groupId]',
  ADMIN_USERS_GROUP_EDIT = '/admin/users/group/[groupId]/edit',
  ADMIN_USERS_GROUP_TYPE = '/admin/users/group/[groupId]/spot',
  ADMIN_USERS_GROUP_ADD = '/admin/users/group/[groupId]/users/add',
  ADMIN_SPOTS = '/admin/spots',
  ADMIN_SPOT_DETAILS = '/admin/spots/[spotId]',
  ADMIN_SPOTS_TYPE_SET = '/admin/spots/[spotId]/[type]/set/[setId]',
  ADMIN_SPOTS_TYPE = '/admin/spots/[spotId]/[type]',
  ADMIN_SETS_CREATE = '/admin/sets/create',
  ADMIN_SETS_EDIT = '/admin/sets/edit/[setId]',
  ADMIN_SET_DETAILS = '/admin/sets/[setId]',
  ADMIN_SETS = '/admin/sets',
  ADMIN_MANAGE_ACCESS = '/admin/manage-access',
  /** house manager routes */
  HOUSEMANAGER_DASHBOARD = '/house-manager/dashboard',
  HOUSEMANAGER_HOUSES = '/house-manager/houses',
  HOUSEMANAGER_HOUSE = '/house-manager/houses/[houseId]',
  HOUSEMANAGER_HOUSE_TOWER = '/house-manager/houses/[houseId]/[towerId]',
  HOUSEMANAGER_HOUSE_TOWER_APARTMENT = '/house-manager/houses/[houseId]/[towerId]/[apartmentId]',
  HOUSEMANAGER_VISITOR_PARKING = '/house-manager/visitor-parking',
  HOUSEMANAGER_VISITOR_PARKING_SPOTS = '/house-manager/visitor-parking/[houseId]',
  HOUSEMANAGER_VISITOR_PARKING_SPOT = '/house-manager/visitor-parking/[houseId]/[spotId]',
  /** house visitors-parking routes */
  MY_VISITORS = '/my-visitors',
  MY_VISITORS_DETAILS = '/my-visitors/[appartmentId]/[visitorsParkingId]',
  VISITORS_PARKING = '/visitors-parking',
  VISITOR_PARKING_EDIT = '/visitors-parking/[appartmentId]/[visitorsParkingId]',
  /** system admin routes */
  PARKING_PLACES = '/super-admin/parking-places',
  BOOKING_CALENDAR = '/super-admin/booking-calendar',
}

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
  ROUTES.RESET_PASSWORD_SUCCESS,
  ROUTES.VERIFY_PHONE,
  ROUTES.HELP,
  ROUTES.HELP_POLICY,
  ROUTES.HELP_TERMS,
  ROUTES.JOIN,
  ROUTES.PARKING_INVITATION,
]

const PROFILE_ROUTES = [
  ROUTES.PROFILE_SETTINGS,
  ROUTES.PROFILE_EDIT,
  ROUTES.PROFILE_CHANGE_PASSWORD,
  ROUTES.PROFILE_INVITATIONS,
  ROUTES.PROFILE_NOTIFICATIONS,
  ROUTES.PROFILE_VEHICLES,
  ROUTES.VEHICLES_EDIT,
]

export const CLIENT_ROUTES = [
  ...PROFILE_ROUTES,
  ROUTES.OWNER_DASHBOARD,
  ROUTES.OWNER_SPOTS_SETTINGS,
  ROUTES.OWNER_SPOTS_CREATE,
  ROUTES.OWNER_SPOTS_FIND_TAB,
  ROUTES.OWNER_SPOTS_EDIT,
  ROUTES.OWNER_USERS,
  ROUTES.OWNER_USERS_EDIT,
  ROUTES.OWNER_USER_BOOKING_SETTINGS,
  ROUTES.VEHICLES_CREATE,
  ROUTES.FIND_SPOT,
  ROUTES.WAIT_LIST,
  ROUTES.WAIT_LIST_SPOTS,
  ROUTES.WAIT_LIST_SEARCHES,
  ROUTES.BOOKINGS,
  /** owner */
  ROUTES.OWNER_SPOTS,
]

export const CORPORATE_CLIENT_ROUTES = [
  ...PROFILE_ROUTES,
  ROUTES.VEHICLES_CREATE,
  ROUTES.FIND_SPOT,
  ROUTES.WAIT_LIST,
  ROUTES.WAIT_LIST_SPOTS,
  ROUTES.WAIT_LIST_SEARCHES,
  ROUTES.BOOKINGS,
]

export const OWNER_ROUTES = [
  ...PROFILE_ROUTES,
  ROUTES.OWNER_DASHBOARD,
  ROUTES.OWNER_RESERVATIONS,
  ROUTES.OWNER_RESERVATIONS_FIND,
  ROUTES.OWNER_SPOTS,
  ROUTES.OWNER_SPOTS_SETTINGS,
  ROUTES.OWNER_SPOTS_CREATE,
  ROUTES.OWNER_SPOTS_FIND_TAB,
  ROUTES.OWNER_SPOTS_EDIT,
  ROUTES.OWNER_USERS,
  ROUTES.OWNER_USERS_EDIT,
  ROUTES.OWNER_USER_BOOKING_SETTINGS,
]

export const HOUSE_MANAGER_ROUTES = [
  ...PROFILE_ROUTES,
  ROUTES.HOUSEMANAGER_DASHBOARD,
  ROUTES.HOUSEMANAGER_HOUSES,
  ROUTES.HOUSEMANAGER_HOUSE,
  ROUTES.HOUSEMANAGER_HOUSE_TOWER,
  ROUTES.HOUSEMANAGER_HOUSE_TOWER_APARTMENT,
  ROUTES.HOUSEMANAGER_VISITOR_PARKING,
  ROUTES.HOUSEMANAGER_VISITOR_PARKING_SPOTS,
  ROUTES.VISITORS_PARKING,
  ROUTES.SPOT_CREATE,
  ROUTES.SPOT_EDIT,
]

export const HOUSE_VISITORS_PARKING_ROUTES = [
  ROUTES.MY_VISITORS,
  ROUTES.MY_VISITORS_DETAILS,
  ROUTES.VISITORS_PARKING,
  ROUTES.VISITOR_PARKING_EDIT,
]

export const CORPORATE_ADMIN_ROUTES = [
  ...PROFILE_ROUTES,
  ROUTES.ADMIN_DASHBOARD,
  ROUTES.ADMIN_USERS_TYPE,
  ROUTES.ADMIN_USERS_PERSON,
  ROUTES.ADMIN_USERS_PERSON_SET,
  ROUTES.ADMIN_USERS_PERSON_SPOT,
  ROUTES.ADMIN_USERS_PERSON_GROUP_ADD,
  ROUTES.ADMIN_USERS_GROUP,
  ROUTES.ADMIN_USERS_GROUP_EDIT,
  ROUTES.ADMIN_USERS_GROUP_TYPE,
  ROUTES.ADMIN_USERS_GROUP_ADD,
  ROUTES.ADMIN_SPOTS,
  ROUTES.SPOT_CREATE,
  ROUTES.SPOT_EDIT,
  ROUTES.ADMIN_SETS_CREATE,
  ROUTES.ADMIN_SPOT_DETAILS,
  ROUTES.ADMIN_SPOTS_TYPE_SET,
  ROUTES.ADMIN_SPOTS_TYPE,
  ROUTES.ADMIN_SETS_EDIT,
  ROUTES.ADMIN_SET_DETAILS,
  ROUTES.ADMIN_SETS,
  ROUTES.ADMIN_MANAGE_ACCESS,
]

export const SYSTEM_ADMIN_ROUTES = [
  ...PROFILE_ROUTES,
  ROUTES.PARKING_PLACES,
  ROUTES.BOOKING_CALENDAR,
]

export const USER_LEVELS_ROUTES = {
  [UserRole.PersonalOwner]: OWNER_ROUTES,
  [UserRole.Client]: CLIENT_ROUTES,
  [UserRole.CorporateClient]: CORPORATE_CLIENT_ROUTES,
  [UserRole.HouseManager]: HOUSE_MANAGER_ROUTES,
  [UserRole.HouseResident]: HOUSE_VISITORS_PARKING_ROUTES,
  [UserRole.CorporateAdmin]: CORPORATE_ADMIN_ROUTES,
  [UserRole.SystemAdmin]: SYSTEM_ADMIN_ROUTES,
}

export const ROUTES_USER_LEVELS = Object.entries(USER_LEVELS_ROUTES).reduce(
  (acc, [key, value]) => ({
    ...acc,
    ...value.reduce((routes, name) => {
      const roles = acc[name]
      return { ...routes, [name]: roles ? roles.concat(key) : [key] }
    }, {}),
  }),
  {}
)

export type Url = ROUTES | UrlObject | string
