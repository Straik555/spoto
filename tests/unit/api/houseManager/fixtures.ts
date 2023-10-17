import {
  HouseModel,
  HousesApartmentsByUserResponse,
  HouseSpot,
  TowerModel,
  TowerModelById,
} from '@api/house/types'
import { StatisticByHouseInfo } from '@api/statistic/types'

export const houses: HouseModel[] = [
  {
    address: 'House 1 Address',
    buildingId: 10,
    id: 1,
    name: 'House 1',
  },
  {
    address: 'House 2 Address',
    buildingId: 20,
    id: 2,
    name: 'House 2',
  },
]

export const houseSpots: HouseSpot[] = [
  {
    id: 1,
    name: 'Spot 1',
    linked: true,
    electricCharger: {
      type1: true,
      type2: false,
    },
  },
]

export const towers: TowerModel[] = [
  { id: 1, name: 'tower1', apartmentsCount: 1 },
  { id: 2, name: 'tower2', apartmentsCount: 2 },
]

export const tower: TowerModelById = {
  id: 1,
  name: 'tower 1',
  apartments: [
    {
      id: 1,
      name: 'apartment 1',
    },
  ],
}

export const statistic: StatisticByHouseInfo = {
  totalSpots: 2,
  occupiedSpots: 1,
  availableSpots: 1,
}

export const housesApartments: HousesApartmentsByUserResponse[] = [
  {
    appartmentId: 1,
    appartmentNumber: 'number 1',
    houseName: 'house 1',
    houseAddress: 'address 1',
    towerName: 'tower 1',
    timezone: 'Australia/Sydney',
  },
]
