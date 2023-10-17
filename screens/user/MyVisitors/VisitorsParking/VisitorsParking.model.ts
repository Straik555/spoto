export type VisitorsParkingFormValues = {
  startTime: string
  endTime: string
  dayFrom: Date | null
  dayTo: Date | null
}

export type VisitorsParkingProps = {
  visitorsParkingId?: string
  appartmentId?: string
}
