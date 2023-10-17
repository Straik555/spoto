import { CheckboxGroupContextValue } from '@components/Form/Checkbox/Checkbox.model'
import { createContext } from 'react'

export const CheckboxGroupContext = createContext<CheckboxGroupContextValue>({
  name: '',
})
