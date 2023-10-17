import React, { FC, useState } from 'react'
import { dateFormats } from '@constants/global'
import { tzOrUtc, useDateUtil } from '@hooks/useDateUtil'
import { TimeDialog } from '@screens/user/components/TimeDialog'
import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'

export default {
  title: 'screens/user/components/TimeDialog',
  component: TimeDialog,
}

export const DefaultTimeDialog: FC = () => {
  const dateUtil = useDateUtil()
  const [isOpen, setIsOpen] = useState(false)

  const [values, setFieldValue] = useState<{
    timeFrom: string
    timeTo: string
  }>({
    timeFrom: '2022-08-06T01:30:00Z',
    timeTo: '',
  })

  return (
    <>
      <TimeDialog
        closeModal={() => setIsOpen(false)}
        onSubmit={(startDate, endDate) => {
          setFieldValue({ ...values, timeFrom: startDate })
          setFieldValue({ ...values, timeTo: endDate })
        }}
        isOpen={isOpen}
        intervals={[
          '2022-08-06T01:30:00Z',
          '2022-08-06T01:45:00Z',
          '2022-08-06T02:00:00Z',
          '2022-08-06T02:15:00Z',
          '2022-08-06T02:30:00Z',
        ]}
        startDate={values.timeFrom}
        endDate={values.timeTo}
      />
      <Button
        onClick={() => setIsOpen(true)}
        mode={ButtonMode.SMALL}
        className="text-sm mb-2"
      >
        Open TimeDialog
      </Button>
      <div>
        timeFrom:
        <span className="text-base text-primary ml-1">
          {tzOrUtc(dateUtil(values.timeFrom)).format(dateFormats.timeDisplay0)}
        </span>
      </div>
      <div>
        timeTo:
        <span className="text-base text-primary ml-1">
          {values.timeTo
            ? tzOrUtc(dateUtil(values.timeTo)).format(dateFormats.timeDisplay0)
            : ''}
        </span>
      </div>
    </>
  )
}

export const TimezoneTimeDialog: FC = () => {
  const dateUtil = useDateUtil()
  const [isOpen, setIsOpen] = useState(false)

  const [values, setFieldValue] = useState<{
    timeFrom: string
    timeTo: string
  }>({
    timeFrom: '2022-08-06T01:30:00Z',
    timeTo: '',
  })

  return (
    <>
      <TimeDialog
        closeModal={() => setIsOpen(false)}
        onSubmit={(startDate, endDate) => {
          setFieldValue({ ...values, timeFrom: startDate })
          setFieldValue({ ...values, timeTo: endDate })
        }}
        isOpen={isOpen}
        intervals={[
          '2022-08-06T01:30:00Z',
          '2022-08-06T01:45:00Z',
          '2022-08-06T02:00:00Z',
          '2022-08-06T02:15:00Z',
          '2022-08-06T02:30:00Z',
        ]}
        startDate={values.timeFrom}
        endDate={values.timeTo}
        timeZone="Asia/Seoul"
      />
      <Button
        onClick={() => setIsOpen(true)}
        mode={ButtonMode.SMALL}
        className="text-sm mb-2"
      >
        Open TimeDialog
      </Button>
      <div>
        timezone:<span className="text-base text-primary ml-1">Asia/Seoul</span>
      </div>
      <div>
        timeFrom:
        <span className="text-base text-primary ml-1">
          {tzOrUtc(dateUtil(values.timeFrom), 'Asia/Seoul').format(
            dateFormats.timeDisplay0
          )}
        </span>
      </div>
      <div>
        timeTo:
        <span className="text-base text-primary ml-1">
          {values.timeTo
            ? tzOrUtc(dateUtil(values.timeTo), 'Asia/Seoul').format(
                dateFormats.timeDisplay0
              )
            : ''}
        </span>
      </div>
    </>
  )
}
