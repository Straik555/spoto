import { useMediaQuery } from 'react-responsive'

export const useSpotoMediaQuery = () => {
  const maxWidth1366 = useMediaQuery({
    query: '(max-width: 1366px)',
  })
  const minWidth1366 = useMediaQuery({
    query: '(min-width: 1366px)',
  })
  const maxWidth1920 = useMediaQuery({
    query: '(max-width: 1920px)',
  })
  const minWidth1920 = useMediaQuery({
    query: '(min-width: 1920px)',
  })

  return {
    maxWidth1366,
    minWidth1366,
    maxWidth1920,
    minWidth1920,
  }
}
