import React, { FC, useEffect, useMemo, useState } from 'react'
import { FormikValues, useFormikContext } from 'formik'
import cn from 'classnames'
import {
  Option,
  TimeAutocompleteProps,
} from '@components/TimeAutocomplete/TimeAutocomplete.module'
import Autocomplete, {
  AutocompleteData,
  AutocompleteItem,
  AutocompleteNoDataItem,
} from '@components/Form/Autocomplete/Autocomplete'
import { tzOrUtc, useDateUtil } from '@hooks/useDateUtil'
import { dateFormats } from '@constants/global'
import { initializeDateUtil } from '@hooks/useDateUtil'

initializeDateUtil()

enum AutoCompleteState {
  opened = 'opened',
  closed = 'closed',
  closedWithValue = 'closedWithValue',
}

const TimeAutocomplete: FC<TimeAutocompleteProps> = ({
  name,
  intervals,
  timeZone,
  startTime,
  endTime,
}) => {
  const { values, setFieldValue } = useFormikContext<FormikValues>()
  const dateUtil = useDateUtil()
  const [filterValue, setFilterValue] = useState<string>('')
  const [isFiltering, setIsFiltering] = useState<boolean>(false)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [autoCompleteState, setAutoCompleteState] = useState<{
    previousValue?: AutoCompleteState
    currentValue?: AutoCompleteState
  }>({ previousValue: AutoCompleteState.closed })

  useEffect(() => {
    if (filterValue.length === 5) {
      return
    }
    if (
      autoCompleteState.previousValue === AutoCompleteState.opened &&
      autoCompleteState.currentValue === AutoCompleteState.closed
    ) {
      setFieldValue(
        name,
        filteredIntervals.length ? filteredIntervals[0].value : ''
      )
      setFilterValue('')
    }
  }, [autoCompleteState])

  const formattedIntervals: Option[] = useMemo(() => {
    setFilterValue('')
    const filteredIntervals =
      startTime || endTime
        ? intervals.filter((interval) => {
            const isAfterStartTime = startTime
              ? dateUtil(startTime).isBefore(dateUtil(interval))
              : true
            const isBeforeEndTime = endTime
              ? dateUtil(endTime).isAfter(dateUtil(interval))
              : true
            return isAfterStartTime && isBeforeEndTime
          })
        : intervals
    return filteredIntervals.map((interval) => ({
      value: interval,
      label: tzOrUtc(dateUtil(interval), timeZone).format(
        dateFormats.timeDisplay0
      ),
    }))
  }, [intervals, timeZone, startTime, endTime])

  const filteredIntervals: Option[] = useMemo(() => {
    return filterValue && !isFiltering
      ? formattedIntervals.filter((interval) => {
          const arrayInterval = interval.label.split(':')
          const arrayValue = filterValue.split(':')
          return (
            (arrayInterval[0].indexOf(arrayValue[0]) >= 0 &&
              arrayInterval[1].indexOf(arrayValue[1]) >= 0) ||
            interval.label.indexOf(filterValue) >= 0
          )
        })
      : formattedIntervals
  }, [formattedIntervals, filterValue, isFiltering])

  return (
    <Autocomplete
      name={name}
      value={
        filterValue ||
        (values[name]
          ? tzOrUtc(dateUtil(values[name]), timeZone).format(
              dateFormats.timeDisplay0
            )
          : '')
      }
      onBlur={() => {
        setTimeout(() => {
          setAutoCompleteState((previousState) => {
            if (
              previousState.currentValue ===
                AutoCompleteState.closedWithValue ||
              (previousState.currentValue === AutoCompleteState.opened &&
                !filterValue.length)
            ) {
              return previousState
            } else {
              return {
                currentValue: AutoCompleteState.closed,
                previousValue: AutoCompleteState.opened,
              }
            }
          })
          setIsFocused(false)
        }, 500)
      }}
      onFocus={() => {
        setIsFocused(true)
        setAutoCompleteState({ currentValue: AutoCompleteState.opened })
      }}
      onChange={(e) => {
        setFilterValue(e.target.value)
        setIsFiltering(false)
      }}
      isFocused={isFocused}
      placeholder="00:00"
    >
      <AutocompleteData>
        {filteredIntervals.length ? (
          filteredIntervals.map((interval) => (
            <AutocompleteItem
              key={interval.label}
              onSelect={() => {
                setFilterValue(interval.label)
                setFieldValue(name, interval.value)
                setIsFiltering(false)
                setAutoCompleteState({
                  previousValue: AutoCompleteState.opened,
                  currentValue: AutoCompleteState.closedWithValue,
                })
              }}
              className={cn({
                'text-primary bg-blue-4':
                  interval.label ===
                  dateUtil(values[name])
                    .tz(timeZone)
                    .format(dateFormats.timeDisplay0),
              })}
            >
              {interval.label}
            </AutocompleteItem>
          ))
        ) : (
          <AutocompleteNoDataItem>No time available</AutocompleteNoDataItem>
        )}
      </AutocompleteData>
    </Autocomplete>
  )
}

export default TimeAutocomplete
