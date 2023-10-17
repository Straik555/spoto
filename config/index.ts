import { Coords } from 'google-map-react'

export type Config = {
  API_URL: string
  DEFAULT_COORDS: Coords
  GOOGLE_MAP_KEY: string
  DEV_SERVER_BASE_URL: string
  DEFAULT_TIMEZONE: string
}

export const config: Config = {
  API_URL: process.env.NEXT_PUBLIC_API!,
  DEFAULT_COORDS: {
    lat: -33.865143,
    lng: 151.2099,
  },
  GOOGLE_MAP_KEY: 'AIzaSyAUO7-TomE2oZTLf7f2bJd749DEvnn4w0o',
  DEV_SERVER_BASE_URL: 'http://localhost:3000',
  DEFAULT_TIMEZONE: 'Australia/Sydney',
}

// TODO: Handle missing configs
