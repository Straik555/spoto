import { ReactNode } from 'react'

export type FindSpotGoogleMapProps = {
  findIsLoading: boolean
}

export type WrapperMarkerProps = {
  lat: number
  lng: number
  children: ReactNode
  className?: string
}
