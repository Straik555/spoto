import React, { FC, useEffect } from 'react'
import Slider from 'rc-slider'
import { Form } from 'formik'
import { Switch } from '@headlessui/react'
import cn from 'classnames'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import { FindSpotFormValues } from '@screens/user/FindSpot/FindSpot.model'
import { TFindSpotFilter } from '@screens/user/FindSpot/FindSpotFilter/FindSpotFilter.model'
import Checkbox from '@components/Form/Checkbox/Checkbox'
import 'rc-slider/assets/index.css'

const FindSpotFilter: FC<TFindSpotFilter> = ({ isDesktop }) => {
  const { values, setFieldValue } = useTypedFormikContext<FindSpotFormValues>()

  return (
    <div
      className={cn(
        'absolute right-4 top-[62px] bg-white w-[262px] p-4 rounded-[5px] shadow-1',
        { '!w-[300px]': isDesktop }
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <Form>
        <div className="flex items-center justify-between cursor-pointer">
          <div
            className={cn(
              'flex items-center justify-between cursor-pointer text-black font-semibold w-full',
              { 'text-base': isDesktop }
            )}
            onClick={() => {
              setFieldValue('charger', !values.charger)
            }}
          >
            Electric Vehicle Charger
          </div>
          <Switch
            checked={values.charger}
            onChange={() => setFieldValue('charger', !values.charger)}
            className="relative flex items-center flex-shrink-0 w-10 border-2 border-transparent rounded-full cursor-pointer h-[25px] bg-blue-4 transition-colors ease-in-out duration-200 focus:outline-none"
          >
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none inline-block h-[19px] w-[19px] rounded-full shadow transform ring-0 transition ease-in-out duration-200',
                values.charger
                  ? 'translate-x-4 bg-primary'
                  : 'translate-x-0 bg-blue-3'
              )}
            />
          </Switch>
        </div>
        {values.charger && (
          <div className="flex items-center justify-start mt-5">
            <div className="mr-[27px]">
              <Checkbox
                name="vehicleType1"
                label="Type 1"
                onChange={() =>
                  setFieldValue('vehicleType1', !values.vehicleType1)
                }
                value="vehicleType1"
                labelClassName="!text-xs !ml-0"
                checkByDefault={values.vehicleType1}
              />
            </div>
            <div className="ml-[13px]">
              <Checkbox
                name="vehicleType2"
                label="Type 2"
                onChange={() =>
                  setFieldValue('vehicleType2', !values.vehicleType2)
                }
                value="vehicleType2"
                labelClassName="!text-xs !ml-3"
                checkByDefault={values.vehicleType2}
              />
            </div>
          </div>
        )}
        <hr className={cn('my-[18px] text-primary')} />
        <div className="flex items-center justify-between">
          <div
            className={cn(
              'flex items-center justify-between cursor-pointer text-black font-semibold w-full',
              { 'text-base': isDesktop }
            )}
            onClick={() => setFieldValue('height', !values.height)}
          >
            Vehicle Height
          </div>
          <Switch
            checked={values.height}
            onChange={() => setFieldValue('height', !values.height)}
            className="relative flex items-center flex-shrink-0 w-10 border-2 border-transparent rounded-full cursor-pointer h-[25px] bg-blue-4 transition-colors ease-in-out duration-200 focus:outline-none"
          >
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none inline-block h-[19px] w-[19px] rounded-full shadow transform ring-0 transition ease-in-out duration-200',
                values.height
                  ? 'translate-x-4 bg-primary'
                  : 'translate-x-0 bg-blue-3'
              )}
            />
          </Switch>
        </div>
        {values.height && (
          <div className="mt-[23px]">
            <Slider
              min={0}
              max={5}
              trackStyle={{
                background: '#EDF0FB',
              }}
              onChange={(value: number) => setFieldValue('sliderHeight', value)}
              value={values.sliderHeight || 1.4}
              step={0.1}
              handleStyle={{
                background: '#4E77F7',
                width: '24px',
                height: '24px',
                padding: '5px',
                marginTop: '-10px',
                border: '5px solid #EDF0FB',
                boxShadow: '#EDF0FB',
              }}
            />
            <p className="mb-0 text-xs text-center text-black mt-[5px]">
              {values.sliderHeight || 1.4} m
            </p>
          </div>
        )}
      </Form>
    </div>
  )
}

export default FindSpotFilter
