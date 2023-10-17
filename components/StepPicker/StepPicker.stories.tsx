import React, { FC, useState } from 'react'
import { Button } from '@components/index'
import StepPicker from '@components/StepPicker/index'
import { ButtonMode } from '@components/Button/Button.model'
import cn from 'classnames'

export default {
  title: 'Reusable Components/StepPicker',
  component: StepPicker,
}

type CustomButtonProps = {
  onClickNext: () => void
  onClickPrev: () => void
  activePrev: boolean
}

const steps = [
  {
    id: 1,
    title: 'Select Time',
  },
  {
    id: 2,
    title: 'Send Email or Link',
  },
]

const CustomButton = ({
  onClickNext,
  onClickPrev,
  activePrev,
}: CustomButtonProps) => (
  <div className="flex w-full item-center justify-start mt-2">
    <Button
      className={cn('!w-28')}
      mode={ButtonMode.FULL_PRIMARY}
      onClick={onClickPrev}
      disabled={activePrev}
    >
      Prev
    </Button>
    <Button
      className="!w-28 ml-2"
      mode={ButtonMode.FULL_PRIMARY}
      onClick={onClickNext}
      disabled={!activePrev}
    >
      Next
    </Button>
  </div>
)

export const StepPickerDefault: FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1)
  return (
    <div>
      <StepPicker steps={steps} activeStep={activeStep} />
      {activeStep === 1 ? (
        <h4 className="text-base mt-3 font-semibold capitalize mb-[5px]">
          Step 1
        </h4>
      ) : (
        <h4 className="text-base mt-3 font-semibold capitalize mb-[5px]">
          Step 2
        </h4>
      )}
      <CustomButton
        onClickNext={() =>
          setActiveStep(
            steps.length !== activeStep ? activeStep + 1 : steps.length
          )
        }
        onClickPrev={() => setActiveStep(activeStep !== 1 ? activeStep - 1 : 1)}
        activePrev={activeStep === 1}
      />
    </div>
  )
}
