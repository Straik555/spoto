import dayjs, { Dayjs } from 'dayjs'
import duration from 'dayjs/plugin/duration'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isToday from 'dayjs/plugin/isToday'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useMemo } from 'react'
import pluralize from 'pluralize'

export type DateObject = Dayjs

export const initializeDateUtil = (): void => {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.extend(duration)
  dayjs.extend(isToday)
  dayjs.extend(isSameOrAfter)
  dayjs.extend(relativeTime)
}

export const useDateUtil = (): typeof dayjs => {
  return useMemo(() => getDateUtil(), [])
}

export const getDateUtil = (): typeof dayjs => {
  return dayjs
}

export const tzOrUtc = (date: DateObject, timeZone?: string) => {
  return timeZone ? date.tz(timeZone) : date.utc()
}

export const msToHumanizedDuration = (ms: number) => {
  const minutes = getDateUtil().duration(ms, 'milliseconds').asMinutes()
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const remainderMinutes = minutes % 60
  const humanizedDuration: string[] = []

  if (days > 0) {
    humanizedDuration.push(`${days} ${pluralize('day', days) as string}`)

    const daysHours = hours % 24

    humanizedDuration.push(`${daysHours} hr`)
  }

  if (hours > 0 && !days) {
    humanizedDuration.push(`${hours} hr`)
  }

  if (remainderMinutes > 0) {
    humanizedDuration.push(`${remainderMinutes} min`)
  }

  return humanizedDuration.join(' ')
}

export const isSameDayOfMonth = (
  date1: DateObject | Date | string,
  date2: DateObject | Date | string
): boolean => {
  const dateUtil = getDateUtil()
  const date1Obj = (
    !(date1 instanceof dateUtil) ? dateUtil(date1) : date1
  ) as DateObject
  const date2Obj = (
    !(date2 instanceof dateUtil) ? dateUtil(date2) : date2
  ) as DateObject

  return date1Obj.startOf('day').isSame(date2Obj.startOf('day'))
}
