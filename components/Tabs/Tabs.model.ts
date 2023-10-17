export interface Tab {
  title: string
  id: string
  view: JSX.Element
  required?: boolean
}

export interface TabsProps {
  tabs: Tab[]
  defaultTabId?: string
  activeTab: string
  setActiveTab: (value: any) => void
}

export type TabsContextValue<V = string | number> = {
  type: 'header' | 'pills'
  value: V
  setValue: (value: V) => void
  tabsCount: number
}

export type TabsContainerProps<V = string | number> = {
  onChange?: (value: V) => void
} & Pick<TabsContextValue<V>, 'type' | 'value'>

export type TabHeaderProps = {
  className?: string
  classNameNav?: string
}
export type TabProps = {
  className?: string
  selectClassName?: string
} & Pick<TabsContextValue, 'value'>
export type TabPanelProps = Pick<TabsContextValue, 'value'>

export enum TabsValues {
  'tab-1',
  'tab-2',
  'tab-3',
}
