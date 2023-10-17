export interface TimeDialogProps {
  isOpen?: boolean
  closeModal: () => void
  onSubmit: (startDate: string, endDate: string) => void
  intervals: string[]
  startDate: string
  endDate: string
  timeZone?: string
  inline?: boolean
}
