import { default as SimpleRadio } from '@components/Form/Radio/Radio'
import { BorderRadioInputProps } from '@components/Form/Radio/Radio.model'
import { RadioGroupContext } from '@components/Form/Radio/RadioGroupContext'
import classNames from 'classnames'
import { useFormikContext } from 'formik'
import React, { FC, useContext } from 'react'

const BorderRadio: FC<BorderRadioInputProps> = ({ children, ...props }) => {
  const formikCtx = useFormikContext()
  const radioGroupCtx = useContext(RadioGroupContext)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const fieldValue = formikCtx.values[props.name || radioGroupCtx.name]
  const checked = fieldValue === props.value

  return (
    <div
      className={classNames(
        'relative z-10 flex p-3 bg-white border items-center rounded-md mb-1',
        {
          'border-blue-3': !checked,
          'border-primary': checked,
        }
      )}
    >
      <SimpleRadio
        {...props}
        labelClassName={classNames(
          {
            '!text-primary': checked,
          },
          props.labelClassName
        )}
      />

      {children}
    </div>
  )
}

export default BorderRadio
