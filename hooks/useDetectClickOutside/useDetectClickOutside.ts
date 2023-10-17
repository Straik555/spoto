import { useEffect, useState } from 'react'

import { UseDetectClickOutsideProps } from './useDetectClickOutside.model'

const useDetectClickOutside = <T>({
  callback,
  Component,
  initialValue = false,
}: UseDetectClickOutsideProps<T>) => {
  const [isFocused, setIsFocused] = useState<boolean>(initialValue)

  useEffect(() => {
    if (!isFocused) return

    const handleClickOutside = () => {
      setIsFocused(false)
      if (callback) {
        callback()
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isFocused])

  useEffect(() => {
    if (isFocused) {
      if (
        Component.activeSetFocus &&
        Component.activeSetFocus !== setIsFocused
      ) {
        Component.activeSetFocus(false)
      }
      Component.activeSetFocus = setIsFocused
    }
  }, [Component, isFocused])

  return { isFocused, setIsFocused }
}

export default useDetectClickOutside
