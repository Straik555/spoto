export const isServerSide = () => {
  if (typeof process !== 'undefined') {
    return !process.browser
  }
  return typeof window === 'undefined'
}
