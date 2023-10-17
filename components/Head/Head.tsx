import { config } from '@config/index'
import NextHead from 'next/head'
import { FC } from 'react'

const Head: FC = () => {
  return (
    <>
      <NextHead>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${config.GOOGLE_MAP_KEY}&libraries=places`}
        />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </NextHead>
    </>
  )
}

export default Head
