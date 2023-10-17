import { AutocompleteContextValue } from '@components/Form/Autocomplete/Autocomplete.model'
import { createContext } from 'react'

export const AutocompleteContext = createContext<AutocompleteContextValue>({
  loading: false,
  errorVisible: false,
})
