export enum ModalElectricVehicleVariant {
  NonEV = 1,
  EVTypeMismatch = 2,
}

export type TModalElectricVehicle = {
  isOpen?: boolean
  closeModal: () => void
  onSubmit: () => void
  variant: ModalElectricVehicleVariant
}
