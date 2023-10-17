export const convertDisplay0TimeToServer = (
  time: string
): { hours: number; minutes: number } => {
  const [hours, minutes] = time.split(':').map(Number)

  return {
    hours,
    minutes,
  }
}
