export type FieldValidation = {
  message: string
  regexp: RegExp
}

export type ResetForm = {
  newPassword: string
  confirmNewPassword: string
}

export enum UserRole {
  CorporateAdmin = 'CorporateAdmin',
  Client = 'Client',
  CorporateClient = 'CorporateClient',
  PersonalOwner = 'PersonalOwner',
  SystemAdmin = 'SystemAdmin',
  HouseManager = 'HouseManager',
  HouseResident = 'HouseResident',
}

export type Nullable<T> = { [K in keyof T]: T[K] | null }
