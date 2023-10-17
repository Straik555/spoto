import { FC, useState, useEffect } from 'react'
import { TimerProps } from '@screens/user/Bookings/ExtendModal/ExtendModal.model'

const Timer: FC<TimerProps> = ({ time }) => {
  const [timerEnd, setTimerEnd] = useState<number>(0)
  const [minuteEnd, setMinuteEnd] = useState<number>(0)
  const [hourEnd, setHourEnd] = useState<number>(1)
  const [finalTime, setFinalTime] = useState<string>('')
  useEffect(() => {
    if (time * 60 === timerEnd) {
      setFinalTime('00:00')
      return
    }
    const timer = setInterval(() => {
      const timeNow = time > 1 ? Math.floor((time * 60) / 60) - hourEnd : 0
      const minuteNow = 1 > time ? time - timerEnd : 60 - 1 - minuteEnd
      setMinuteEnd(minuteEnd + 1)
      if (minuteNow === 0) {
        setMinuteEnd(0)
        setHourEnd(hourEnd + 1)
      }
      setFinalTime(
        `${timeNow > 9 ? timeNow : '0' + timeNow}:${
          minuteNow > 9 ? minuteNow : '0' + minuteNow
        }`
      )
      setTimerEnd(timerEnd + 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [timerEnd, finalTime])

  return <>{finalTime}</>
}

export default Timer
