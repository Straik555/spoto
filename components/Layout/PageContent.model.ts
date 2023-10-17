import { Dispatch, ReactElement, SetStateAction } from 'react'

export type PageContentProps = {
  title: string
  actions?: ReactElement
  tabs?: string[]
  activeTab?: string
  setActiveTab?: Dispatch<SetStateAction<any>>
  noCap?: boolean
}
