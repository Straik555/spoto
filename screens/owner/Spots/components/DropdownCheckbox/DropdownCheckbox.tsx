import ArrowDownIcon from 'assets/icons/arrows/arrow-down-small.svg'
import Checkbox from '@components/Form/Checkbox/Checkbox'
import { RadioGroupContext } from '@components/Form/Radio/RadioGroupContext'
import { DropdownCheckboxProps } from '@screens/owner/Spots/components/DropdownCheckbox/DropdownCheckbox.model'
import classNames from 'classnames'
import { useFormikContext } from 'formik'
import React, { FC, useContext } from 'react'

const DropdownCheckbox: FC<DropdownCheckboxProps> = ({
  containerClassName,
  contentClassName,
  children,
  ...props
}) => {
  const formikCtx = useFormikContext()
  const radioGroupCtx = useContext(RadioGroupContext)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const fieldValue = formikCtx.values[props.name || radioGroupCtx.name]
  const checked = fieldValue === props.value

  return (
    <div
      className={classNames(
        'p-3 border border-blue-3 rounded-md',
        containerClassName
      )}
    >
      <div
        className={classNames('flex justify-between', {
          'mb-3': checked,
        })}
      >
        <Checkbox {...props} />

        <ArrowDownIcon
          className={classNames(
            'ml-auto transition-all self-center stroke-blue-3 ',
            {
              'rotate-0': !checked,
              'rotate-180': checked,
            }
          )}
        />
      </div>

      {checked && (
        <div className={classNames('flex justify-between', contentClassName)}>
          {children}
        </div>
      )}
    </div>
  )
}

export default DropdownCheckbox
