import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import Eye from '@assets/icons/eye.svg'
import EyeCrossed from '@assets/icons/eye-crossed.svg'
import Input from './Input'
import { InputTypes, PasswordInputProps } from './Input.model'

const PasswordInput: FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const inputValueLength = inputRef?.current?.value?.length
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (inputRef.current?.setSelectionRange && inputValueLength) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        inputRef.current.focus()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        inputRef.current.setSelectionRange(inputValueLength, inputValueLength)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } else if (inputRef.current.createTextRange) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const textRange = inputRef.current.createTextRange()
        textRange.collapse(true)
        textRange.moveEnd('character', inputValueLength)
        textRange.moveStart('character', inputValueLength)
        textRange.select()
      }
    }
  }, [showPassword])

  const toggleShowPassword = (): void => {
    setShowPassword((prevState) => !prevState)
  }

  const trailingIcon = useMemo(
    () =>
      showPassword ? (
        <Eye
          onClick={toggleShowPassword}
          className="fill-primary"
          aria-label="hide-password"
        />
      ) : (
        <EyeCrossed
          onClick={toggleShowPassword}
          className="fill-blue-3"
          aria-label="show-password"
        />
      ),
    [showPassword]
  )

  const type = useMemo(
    () => (showPassword ? InputTypes.TEXT : InputTypes.PASSWORD),
    [showPassword]
  )

  return <Input trim {...{ ...props, inputRef, trailingIcon, type }} />
}

export default PasswordInput
