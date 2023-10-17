import { screen } from '@testing-library/react'

export const elementUtils = {
  get deleteConfirmationBtn() {
    return screen.findByRole('button', { name: 'Delete' })
  },
}
