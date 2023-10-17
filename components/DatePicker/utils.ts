export const compareDay = (dateUtil, day, start, end) => {
  const isSameAsStart = day.isSame(dateUtil(start).startOf('day'))
  const isSameAsEnd = day.isSame(dateUtil(end).startOf('day'))
  const isAfterStart = day.isAfter(dateUtil(start).startOf('day'))
  const isBeforeEnd = day.isBefore(dateUtil(end).startOf('day'))

  return {
    isSameAsStart,
    isSameAsEnd,
    isAfterStart,
    isBeforeEnd,
  }
}
