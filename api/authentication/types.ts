import { UserRole } from '@constants/types'

export type AuthenticateUserParams = {
  usernameOrEmail: string
  password: string
}

export type AuthenticateUserPayload = {
  token: string
  email: string
  expiration: string
  firstName: string
  lastName: string
  phone: string
  photo: string
  company: string
  roles: UserRole[]
  title: string
}

export type RegisterUserParams = {
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
  invitationToken?: string
}

export type ConfirmEmailParams = {
  confirmationCode: string
}

export type ConfirmPhoneParams = {
  confirmationCode: string
}

export type UpdatePhoneParams = {
  newPhone: string
}
