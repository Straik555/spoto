import { TabsContextValue } from '@components/Tabs/Tabs.model'
import { createContext } from 'react'

export const TabsContext = createContext<TabsContextValue<unknown>>({
  type: 'header',
  value: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setValue: () => {},
  tabsCount: 1,
})
