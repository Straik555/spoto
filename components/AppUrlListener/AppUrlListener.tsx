import { App, URLOpenListenerEvent } from '@capacitor/app'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

const AppUrlListener: FC = () => {
  const router = useRouter()

  useEffect(() => {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      // Example url: https://[subdomain].spoto.co/[path]
      // path = /bookings
      const path = event.url.split('.co').pop()
      if (path) {
        router.push(path)
      }
      // If no match, do nothing - let regular routing
      // logic take over
    })

    return () => {
      App.removeAllListeners()
    }
  }, [router])

  return null
}

export default AppUrlListener
