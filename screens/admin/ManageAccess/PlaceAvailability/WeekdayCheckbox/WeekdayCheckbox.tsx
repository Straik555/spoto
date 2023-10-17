import classNames from 'classnames'
import React, { FC } from 'react'
import Checkbox from '@components/Form/Checkbox/Checkbox'
import { CheckboxInputProps } from '@components/Form/Checkbox/Checkbox.model'
import { weekdaysEnumToShortLabel } from '@screens/admin/Users/constants'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

const WeekdayCheckbox: FC<CheckboxInputProps> = ({
  label,
  value,
  ...props
}) => {
  const { isDesktop } = useDeviceInfo()
  return (
    <Checkbox
      {...props}
      value={value}
      renderCheckbox={({ checked }) => {
        return (
          <div
            className={classNames(
              'flex mr-1 cursor-pointer items-center justify-center border rounded-full border-primary font-semibold',
              {
                'bg-white font-normal text-primary': !checked,
                'bg-primary text-white': checked,
                'w-[64px] h-[64px] text-s-xl': isDesktop,
                'w-[40px] h-[40px] text-s-base': !isDesktop,
              }
            )}
          >
            {label || weekdaysEnumToShortLabel[value]}
          </div>
        )
      }}
    />
  )
}

export default WeekdayCheckbox
