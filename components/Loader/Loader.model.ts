import { ReactNode } from 'react'

export type LoaderProps = {
  children?: ReactNode
  loading?: boolean
  className?: string
  loaderClassName?: string
  isLoadingFailed?: boolean
}
