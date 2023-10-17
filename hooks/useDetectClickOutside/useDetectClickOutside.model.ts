import { Dispatch, SetStateAction } from 'react'

export type StaticActiveSetFocusFn = {
  activeSetFocus?: Dispatch<SetStateAction<boolean>>
}

export type UseDetectClickOutsideProps<T> = {
  callback?: () => void
  Component: T & StaticActiveSetFocusFn
  initialValue?: boolean
}
