import {
  AutocompleteDataProps,
  AutoCompleteFn,
  AutocompleteItemProps,
  AutocompleteNoDataProps,
} from '@components/Form/Autocomplete/Autocomplete.model'
import { useFieldError } from '@components/Form/hooks'
import { Loader } from '@components/Loader'
import ScrollbarContainer from '@components/ScrollbarContainer/ScrollbarContainer'
import useDetectClickOutside from '@hooks/useDetectClickOutside/useDetectClickOutside'
import classNames from 'classnames'
import React, { FC, RefObject, useContext, useEffect, useRef } from 'react'

import Input from '../Input/Input'
import { AutocompleteContext } from './AutocompleteContext'

const Autocomplete: AutoCompleteFn = ({
  loading,
  children,
  onFocus,
  dataAlwaysVisible,
  wrapperClassName,
  isFocused: isFocusedProp,
  inputClassName,
  onClose,
  onClick,
  ...inputProps
}) => {
  const inputRef = useRef<HTMLInputElement>() as RefObject<HTMLInputElement>
  const { isFocused, setIsFocused } = useDetectClickOutside({
    Component: Autocomplete,
  })
  const fieldError = useFieldError(inputProps.name)
  const errorVisible = Boolean(fieldError)

  useEffect(() => {
    if (typeof isFocusedProp === 'undefined') return

    setIsFocused(isFocusedProp)
  }, [isFocusedProp])

  useEffect(() => {
    if (isFocused || dataAlwaysVisible) return

    onClose?.()
  }, [isFocused, dataAlwaysVisible])

  return (
    <AutocompleteContext.Provider value={{ loading, errorVisible }}>
      <div
        className={classNames(
          'relative',
          {
            'z-20': isFocused,
          },
          wrapperClassName
        )}
      >
        <Input
          {...inputProps}
          inputRef={inputRef}
          onFocus={(e) => {
            onFocus?.(e)
            setIsFocused(true)
          }}
          className={classNames(inputProps.className, 'relative')}
          containerClassName={classNames(inputProps.containerClassName, 'z-10')}
          inputClassName={classNames(
            {
              'text-primary border-[#4e77f7] shadow-2': isFocused,
            },
            inputClassName
          )}
          onClick={(e) => {
            e.stopPropagation()
            onClick?.(e)
          }}
        />
        {(isFocused || dataAlwaysVisible) && children}
      </div>
    </AutocompleteContext.Provider>
  )
}

export const AutocompleteData: FC<AutocompleteDataProps> = ({
  className,
  hidden,
  children,
  ...restProps
}) => {
  const context = useContext(AutocompleteContext)

  return (
    <ScrollbarContainer
      className={classNames(
        'absolute block w-full overflow-y-auto bg-white border border-t-0 border-primary rounded-md top-[100%] pt-[10px] max-h-[320px]',
        {
          '-mt-[5px]': !context.errorVisible,
          '-mt-[35px]': context.errorVisible,
          '!p-0 !border-0': hidden,
        },
        className
      )}
      {...restProps}
    >
      <Loader
        loading={context.loading}
        className="p-1 m-auto !h-[60px] !w-[60px]"
      >
        {children}
      </Loader>
    </ScrollbarContainer>
  )
}

export const AutocompleteNoDataItem: FC<AutocompleteNoDataProps> = ({
  hidden,
  className,
  children,
}) => (
  <>
    {!hidden && (
      <p className={classNames('px-3 py-1 text-s-sm text-blue-3', className)}>
        {children}
      </p>
    )}
  </>
)

export const AutocompleteItem: FC<AutocompleteItemProps> = ({
  onSelect,
  trailingIcon,
  className,
  children,
  noHover,
  label,
  ...restProps
}) => (
  <div
    className={classNames(
      'relative cursor-pointer text-blue-1 font-medium text-base py-[10px] px-[15px] transition-all',
      className,
      {
        'hover:bg-blue-4 hover:text-primary ': !noHover,
      }
    )}
    {...restProps}
    onClick={(e) => {
      onSelect?.(e)
      restProps.onClick?.(e)
    }}
  >
    {label || children}
    {trailingIcon && (
      <div className="absolute inset-y-0 flex items-center right-[15px]">
        {trailingIcon}
      </div>
    )}
  </div>
)

export default Autocomplete
