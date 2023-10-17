export type BrandsModel = {
  id: number
  name: string
  logo: string
}

export type VehicleModel = {
  id: number
  name: string
  brand: string
  brandLogo: string
  licensePlate: string
  carPhoto: string
  userId: string
  electricCarType: EVType | null
}

export enum EVType {
  Type1 = 'Type1',
  Type2 = 'Type2',
}
