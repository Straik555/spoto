import { RadioGroupContextValue } from '@components/Form/Radio/Radio.model'
import _noop from 'lodash/noop'
import { createContext } from 'react'

export const RadioGroupContext = createContext<RadioGroupContextValue>({
  name: '',
  handleChange: _noop,
})
