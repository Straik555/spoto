import {
  TabHeaderProps,
  TabPanelProps,
  TabProps,
  TabsContainerProps,
} from '@components/Tabs/Tabs.model'
import classNames from 'classnames'
import React, {
  FC,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import Title from '../Title/Title'
import { TabsContext } from './TabsContext'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

export const TabsContainer = function TC<Value = string | number>({
  children,
  value,
  type,
  onChange,
}: PropsWithChildren<TabsContainerProps<Value>>): ReactElement | null {
  const [stateValue, setStateValue] = useState<Value>(value)

  const setValue = useCallback(
    (v) => {
      setStateValue(v)
      onChange?.(v)
    },
    [onChange]
  )

  useEffect(() => {
    if (value === stateValue) return

    setStateValue(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <TabsContext.Provider
      value={{
        value: stateValue,
        type,
        setValue,
        tabsCount: (children as React.ReactNode[])?.length,
      }}
    >
      {children}
    </TabsContext.Provider>
  )
}

export const TabsHeader: FC<TabHeaderProps> = ({
  children,
  className = '',
  classNameNav = '',
}) => {
  const tabsContext = useContext(TabsContext)
  return (
    <div className={classNames('sm:block', className)}>
      <nav
        className={classNames(
          'flex justify-center bg-primary',
          {
            'space-x-2': tabsContext.type === 'pills',
          },
          classNameNav
        )}
        aria-label="Tabs"
      >
        {children}
      </nav>
    </div>
  )
}

export const Tab: FC<TabProps> = ({
  children,
  value,
  className,
  selectClassName = '',
}) => {
  const tabsContext = useContext(TabsContext)
  const isSelected = tabsContext.value === value
  const { isDesktop } = useDeviceInfo()

  return (
    <Title
      as="span"
      className={classNames(
        `flex justify-center items-end basis-1/${tabsContext.tabsCount}`,
        {
          'whitespace-nowrap h-[39px] pb-[6px] px-0 flex-grow font-poppins text-s-base text-center font-normal bg-primary cursor-pointer transition-colors':
            tabsContext.type === 'header',
          'whitespace-nowrap py-[8px] px-0 flex-grow font-poppins text-s-base text-center font-normal cursor-pointer transition-colors rounded-[5px]':
            tabsContext.type === 'pills',
          ' text-blue-2 hover:text-primary pb-[3px] text-s-base font-normal shadow-[inset_0px_-2px_0px_0px_#CBD4EE]':
            !isSelected,
          'text-white hover:text-white shadow-[inset_0px_-5px_0px_0px_#F3F94E] pb-[5px] font-semibold':
            isSelected && tabsContext.type === 'header',
          'bg-primary shadow-none text-white hover:text-white text-s-base font-semibold':
            isSelected && tabsContext.type === 'pills',
          '!max-w-[301px] text-s-xl !font-normal !h-[45px] pb-[19px] !font-medium':
            isDesktop,
          '!shadow-none': isDesktop && !isSelected,
          [selectClassName]: tabsContext.value === value,
        },
        className
      )}
      onClick={() => tabsContext.setValue(value)}
      role="tab"
      aria-selected={isSelected}
    >
      {children}
    </Title>
  )
}

export const TabPanel: FC<TabPanelProps> = ({ children, value }) => {
  const tabsContext = useContext(TabsContext)

  return <>{tabsContext.value === value ? children : null}</>
}
