export type CreateEditSetProps = {
  setId?: string
  buildingId?: string
}

export type CreateEditSetFormValues = {
  id: number | null
  name: string
  description: string
  height: string
  workingTimeFrom: string
  workingTimeTo: string
  commercialTimeFrom: string
  commercialTimeTo: string
  buildingId: number | null
}
