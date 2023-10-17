import { ROUTES } from '@constants/routes'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

let loadAllRoutePrefetchExecuted = false

export const useLoadAllRoutePrefetch = () => {
  const router = useRouter()

  useEffect(() => {
    if (loadAllRoutePrefetchExecuted) return

    const { HOME, LOGIN, ...REST_ROUTES } = ROUTES
    const routesToLoadByPriorities = [
      HOME,
      LOGIN,
      ...Object.values(REST_ROUTES),
    ]
    const routesToLoad = routesToLoadByPriorities.filter(
      (v) => v !== router.pathname
    )

    routesToLoad.forEach((route) => {
      router.prefetch(route)
    })

    loadAllRoutePrefetchExecuted = true
  }, [])
}
