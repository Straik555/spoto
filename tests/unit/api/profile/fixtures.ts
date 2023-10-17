import { UserRole } from '@constants/types'

export const adminProfileInfo = {
  userId: 'b3cddfd2-49f4-4d4b-8369-3cdd10b821b5',
  email: 'one@admin.com',
  firstName: 'One',
  lastName: 'Admin',
  phone: '+1234',
  isEmailConfirmed: true,
  isPhoneConfirmed: false,
  ownerId: null,
  roles: [UserRole.CorporateAdmin],
  avatarUrl: 'UserAvatar/a068092f-ae4c-4c05-8664-435f1c0f3f91.jpeg',
  ownerCompanyName: '',
}

export const houseManagerProfileInfo = {
  userId: 'b3cddfd2-49f4-4d4b-8369-3cdd10b821b5',
  email: 'one@hm.com',
  firstName: 'One',
  lastName: 'Manager',
  phone: '+1234',
  isEmailConfirmed: true,
  isPhoneConfirmed: false,
  ownerId: null,
  roles: [UserRole.HouseManager],
  avatarUrl: 'UserAvatar/a068092f-ae4c-4c05-8664-435f1c0f3f91.jpeg',
  ownerCompanyName: '',
}
