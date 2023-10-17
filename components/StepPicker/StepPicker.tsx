import React, { FC, Fragment } from 'react'
import cn from 'classnames'
import { StepPickerProps } from '@components/StepPicker/StepPicker.model'
import CheckIcon from '@assets/icons/check-13.svg'

const StepPicker: FC<StepPickerProps> = ({ steps, activeStep }) => {
  return (
    <>
      <div className="relative flex items-center justify-between w-full mx-auto bg-white h-[76px] px-[65px] pb-[10px] shadow-[inset_0px_0px_12px_rgba(211,211,248,0.5)]">
        {steps.map((step) => (
          <Fragment key={step.id}>
            <div className="relative flex flex-col items-center">
              <p
                className={cn(
                  'flex z-10 items-center text-base font-semibold justify-center bg-primary rounded-full text-white w-[30px] h-[30px]',
                  'flex z-10 items-center text-base font-semibold justify-center bg-primary rounded-full text-white w-[30px] h-[30px]',
                  {
                    '!bg-white border border-solid border-blue-3 !font-normal !text-blue-2':
                      activeStep !== step.id,
                    '!bg-light-green': activeStep > step.id,
                  }
                )}
              >
                {activeStep > step.id ? (
                  <CheckIcon className="fill-green" />
                ) : (
                  step.id
                )}
              </p>
              <p
                className={cn(
                  'absolute w-max top-[27px] text-blue-2 font-normal text-s-xs mt-[7px] mb-0',
                  {
                    '!text-primary': activeStep === step.id,
                  }
                )}
              >
                {step.title}
              </p>
            </div>
            {steps.length > step.id && (
              <hr
                className={cn('w-full h-[1px] bg-blue-4', {
                  '!bg-green': activeStep > step.id,
                })}
              />
            )}
          </Fragment>
        ))}
      </div>
    </>
  )
}

export default StepPicker
