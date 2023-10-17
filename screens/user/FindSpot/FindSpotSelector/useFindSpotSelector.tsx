import { useMemo, useState } from 'react'
import { useDateUtil } from '@hooks/useDateUtil'
import { dateFormats } from '@constants/global'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import { FindSpotFormValues } from '@screens/user/FindSpot/FindSpot.model'

const useFindSpotSelector = () => {
  const { values } = useTypedFormikContext<FindSpotFormValues>()
  const dateUtil = useDateUtil()
  const [dayFrom, setDayFrom] = useState<Date | null>(
    values.startDate
      ? dateUtil(values.startDate).utc().toDate()
      : dateUtil().toDate()
  )
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const intervals = useMemo(() => {
    let time = dateUtil(dayFrom).startOf('day')
    const array = [`${time.format(dateFormats.iso8601)}Z`]
    while (array.length <= 95) {
      time = time.add(15, 'minutes')
      array.push(`${time.format(dateFormats.iso8601)}Z`)
    }
    return array
  }, [dayFrom])

  return [
    {
      dayFrom,
      isOpen,
      modalIsOpen,
      intervals,
      setDayFrom,
      setIsOpen,
      setModalIsOpen,
    },
  ]
}

export default useFindSpotSelector
