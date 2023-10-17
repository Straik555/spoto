export type HouseModel = {
  id: number
  name: string
  address: string
  buildingId: number
  towerCount?: number
}

export type TowerModel = {
  id: number
  name: string
  apartmentsCount: number
}

export type TowerModelById = {
  id: number
  name: string
  apartments: [
    {
      id: number
      name: string
    }
  ]
}

export type ApartmentModel = {
  id: number
  name: string
  users: [
    {
      userName: string
      isAccepted: true
      avatar: string
      inviteId: number
    }
  ]
  histories: [
    {
      from: string
      to: string
      userName: string
      avatar: string
    }
  ]
}

export type HouseSpot = {
  id: number
  name: string
  linked: boolean
  electricCharger: {
    type1: boolean
    type2: boolean
  }
}

export type HouseParams = {
  houseId: string
}

export type QrCodeModel = {
  expires: string
  link: string
}

export type HousesApartmentsByUserResponse = {
  appartmentId: number
  appartmentNumber: string
  houseName: string
  houseAddress: string
  towerName: string
  timezone: string
}

export type HousesApartmentsByUserQrCode = {
  apartmentId: number
}

export type HousesApartmentsByUserQrCodeResponse = {
  expires: string
  link: string
}

export type PerformQrCodeParams = { towerId: number; apartmentIds: number[] }
