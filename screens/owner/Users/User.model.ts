export type UserRouteParams = {
  id: string
}

export type BookingInfoParams = {
  id: number
  starts: string
  ends: string
  spots: [
    {
      id: number
      name: string
    }
  ]
}
