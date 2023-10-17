export interface AddEditVehiclesProps {
  vehicleId?: string | undefined
}

export type AddEditVehiclesFormValues = {
  brandId: number | undefined
  licensePlate: string
  electricCarType: string | null | undefined
}
