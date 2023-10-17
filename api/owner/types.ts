export type OwnersInfo = {
  id: number
  name: string
  avatarUrl: string
  spots: Array<{
    id: number
    name: string
    electricCharger: boolean
    bookingOptions: Array<{ id: number; starts: string; ends: string }>
  }>
}

export type GetOwnersByUserQueryParams = {
  UserId?: string
}
