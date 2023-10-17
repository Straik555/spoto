import ChevronUpIcon from '@assets/icons/arrows/arrow-down-small-bold.svg'
import { Listbox } from '@headlessui/react'
import cn from 'classnames'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { OptionProps, SelectPlacement, SelectProps } from './Select.model'

const Select: React.FC<SelectProps> = ({
  buttonClassName,
  title,
  label,
  value,
  className,
  onSelect,
  titleClassName,
  selectClassName,
  placeholderClassName,
  placeholder,
  children,
  disabled,
}) => {
  const ref = useRef<HTMLButtonElement>(null)
  const dropDownHeight = 186
  const [placement, setPlacement] = useState<SelectPlacement>(
    SelectPlacement.BOTTOM
  )

  const autoUpdatePlacement = useCallback(() => {
    const amountOfBottomSpaceLeft =
      window.innerHeight - (ref?.current?.getBoundingClientRect()?.bottom || 0)

    if (amountOfBottomSpaceLeft < dropDownHeight) {
      setPlacement(SelectPlacement.TOP)
    }
  }, [])

  useEffect(() => {
    if (!ref.current) return

    autoUpdatePlacement()
  }, [ref, autoUpdatePlacement])

  useEffect(() => {
    window.addEventListener('resize', autoUpdatePlacement)

    return () => {
      window.removeEventListener('resize', autoUpdatePlacement)
    }
  }, [ref, autoUpdatePlacement])

  return (
    <Listbox value={value} onChange={onSelect}>
      {({ open }) => (
        <section
          className={cn(
            'flex flex-col relative mt-[16px] desktop:mt-25px',
            { 'z-[1]': open },
            className
          )}
        >
          {title && (
            <span
              className={`text-s-base text-blue-1 mb-[5px] ${
                titleClassName ? cn(titleClassName) : ''
              }`}
            >
              {title}
            </span>
          )}
          <div className="relative">
            <Listbox.Button
              className={cn(
                'relative w-full bg-white border h-[44px] rounded-[5px]',
                {
                  'border-blue-2': !open && !disabled,
                  'border-primary': open && !disabled,
                  'z-[1]': open,
                },
                buttonClassName
              )}
              ref={ref}
            >
              <span className="flex items-center">
                <span
                  className={cn(
                    'block truncate text-s-lg px-[15px]',
                    {
                      'text-primary': open && !disabled,
                      'text-blue-2': !value && !open && !disabled,
                      'text-blue-1': value && !open && !disabled,
                    },
                    placeholderClassName
                  )}
                >
                  {label || placeholder}
                </span>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 ml-3 pointer-events-none">
                <ChevronUpIcon
                  className={cn(`stroke-blue-1`, {
                    'rotate-180 !stroke-primary': open && !disabled,
                  })}
                />
              </span>
            </Listbox.Button>
            <Listbox.Options
              className={cn(
                'absolute z-0 text-base text-blue-1 max-h-[186px] left-0 w-full border shadow rounded-[5px] appearance-none bg-white border overflow-y-auto overflow-x-none ml-0 z-10',
                {
                  'border-blue-2': !open && !disabled,
                  'border-primary': open && !disabled,
                  'top-[100%] border-t-0 rounded-t-none pt-[10px] pb-[5px] -mt-[5px]':
                    placement === SelectPlacement.BOTTOM,
                  'bottom-[100%] border-b-0 rounded-b-none pt-[5px] pb-[10px] -mb-[5px]':
                    placement === SelectPlacement.TOP,
                },
                selectClassName
              )}
            >
              {children}
            </Listbox.Options>
          </div>
        </section>
      )}
    </Listbox>
  )
}

export default Select

const Option: React.FC<OptionProps> = ({
  children,
  className,
  text,
  value,
  active,
}) => {
  return (
    <Listbox.Option
      key={text}
      value={value}
      className={cn(
        'text-s-lg px-[15px] py-[10px] truncate cursor-pointer text-left',
        {
          'text-primary': active,
          'text-blue-1': !active,
        },
        className
      )}
    >
      {text || children}
    </Listbox.Option>
  )
}

export { Option }
