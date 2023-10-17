import React from 'react'
import GoogleMapReact from 'google-map-react'

import { config } from '@config/index'

import { GoogleMapProps } from './GoogleMap.model'

const GoogleMap: React.FC<GoogleMapProps> = (props) => {
  const { center, children } = props
  return (
    <GoogleMapReact
      defaultCenter={config.DEFAULT_COORDS}
      defaultZoom={12}
      options={{ fullscreenControl: false, zoomControl: false }}
      center={center}
    >
      {children}
    </GoogleMapReact>
  )
}

export default GoogleMap
