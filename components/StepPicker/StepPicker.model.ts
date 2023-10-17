type StepPickerItem = {
  id: number
  title: string
}

export interface StepPickerProps {
  steps: StepPickerItem[]
  activeStep: number
}
