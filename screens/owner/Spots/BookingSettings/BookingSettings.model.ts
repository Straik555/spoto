export type BookingSettingsRouteParams = {
  id: string
  userId: string
}

export type BookingSettingsProps = {
  id: number
} & Pick<BookingSettingsRouteParams, 'userId'>
