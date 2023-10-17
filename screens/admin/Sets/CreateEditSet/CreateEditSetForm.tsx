import React, { FC } from 'react'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import Input, { InputForNumber } from '@components/Form/Input/Input'
import { InputTypes } from '@components/Form/Input/Input.model'
import Textarea from '@components/Form/Input/Textarea'
import WorkingHours from '@screens/admin/Sets/CreateEditSet/WorkingHours/WorkingHours'
import cn from 'classnames'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import { CreateEditSetFormValues } from '@screens/admin/Sets/CreateEditSet/CreateEditSet.model'

const CreateEditSetForm: FC = () => {
  const { isDesktop } = useDeviceInfo()
  const formikCtx = useTypedFormikContext<CreateEditSetFormValues>()
  const { values, setFieldValue } = formikCtx

  return (
    <div className={cn('grow bg-bg', { 'px-[16px]': !isDesktop })}>
      <Input
        name="name"
        label="Set Name"
        placeholder="Set Name"
        inputClassName={cn('uppercase placeholder:capitalize', {
          'max-w-[740px]': isDesktop,
        })}
        className={cn({ '!mt-0 max-w-[740px]': isDesktop })}
      />
      <Textarea
        name="description"
        label="Set Description"
        placeholder="Describe the set here, e.g. disabled set on level 2 near the lift"
        max={250}
        className={'desktop:max-w-[740px]'}
        rows={isDesktop ? 8 : 6}
      />
      <InputForNumber
        name="height"
        label="Maximum Vehicle Height"
        placeholder="0.00 m"
        type={InputTypes.NUMBER}
        inputClassName={cn({
          'w-[135px]': !isDesktop,
          'w-[150px]': isDesktop,
        })}
        containerClassName={cn({
          'w-[135px]': !isDesktop,
          'w-[150px]': isDesktop,
        })}
        suffix=" m"
      />
      <WorkingHours
        className="desktop:max-w-[315px]"
        title={'Working Hours'}
        containerClassName="!gap-[11px]"
        timeFrom={values.workingTimeFrom}
        timeTo={values.workingTimeTo}
        setTimeFrom={(value) => {
          setFieldValue('workingTimeFrom', value)
        }}
        setTimeTo={(value) => {
          setFieldValue('workingTimeTo', value)
        }}
        optionClassName="!mt-0"
      />
      <WorkingHours
        className="relative z-0 desktop:max-w-[315px]"
        title={'Commercial Hours'}
        containerClassName="!gap-[11px]"
        timeFrom={values.commercialTimeFrom}
        timeTo={values.commercialTimeTo}
        setTimeFrom={(value) => {
          setFieldValue('commercialTimeFrom', value)
        }}
        setTimeTo={(value) => {
          setFieldValue('commercialTimeTo', value)
        }}
        optionClassName="!mt-0"
      />
    </div>
  )
}

export default CreateEditSetForm
