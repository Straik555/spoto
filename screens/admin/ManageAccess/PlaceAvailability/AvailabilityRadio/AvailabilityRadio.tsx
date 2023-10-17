import ArrowDownIconSmall from '@assets/icons/arrows/arrow-down-small.svg'
import Radio from '@components/Form/Radio/Radio'
import { RadioInputProps } from '@components/Form/Radio/Radio.model'
import { RadioGroupContext } from '@components/Form/Radio/RadioGroupContext'
import classNames from 'classnames'
import { useFormikContext } from 'formik'
import React, { FC, useContext } from 'react'
import cn from 'classnames'

const AvailabilityRadio: FC<RadioInputProps> = ({ children, ...props }) => {
  const formikCtx = useFormikContext()
  const radioGroupCtx = useContext(RadioGroupContext)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const fieldValue = formikCtx.values[props.name || radioGroupCtx.name]
  const checked = fieldValue === props.value

  return (
    <div className="mb-[4px]">
      <div
        className={classNames(
          'relative z-10 flex p-[12px] bg-white border rounded-t-md',
          {
            'rounded-b-md border-blue-3': !checked,
            'border-primary': checked,
          }
        )}
      >
        <Radio
          {...props}
          labelClassName={cn({
            '!text-primary': checked,
            '!text-blue-3': !checked,
          })}
        />

        <ArrowDownIconSmall
          className={classNames('ml-auto transition-all self-center', {
            'stroke-blue-3 rotate-0': !checked,
            'stroke-primary rotate-180': checked,
          })}
        />
      </div>

      {checked && (
        <div className="block border p-[16px] border-primary rounded-b-md -mt-[1px]">
          {children}
        </div>
      )}
    </div>
  )
}

export default AvailabilityRadio
