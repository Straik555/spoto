import { spotApi } from '@api/spot'
import { SpotAvailabilityState } from '@api/spot/types'
import DollarSign from '@assets/icons/dollar-small-bold.svg'
import BorderRadio from '@components/Form/Radio/BorderRadio'
import RadioGroup from '@components/Form/Radio/RadioGroup'
import { withForm } from '@components/Form/withForm'
import { ROUTES } from '@constants/routes'
import { SpotDetailType } from '@screens/owner/Spots/Spot/Spot.model'
import {
  SpotsSpotFormValues,
  SpotsSpotProps,
} from '@screens/owner/Spots/SpotsSpot.model'
import { spotAvailableForPublic } from '@screens/owner/Spots/utils'
import classNames from 'classnames'
import { useFormikContext } from 'formik'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { toast } from 'react-toastify'

const SpotsSpot: FC<SpotsSpotProps> = ({
  name,
  linked,
  id,
  availabilityState,
  price,
}) => {
  const router = useRouter()
  const [updateSpotAvailabilityTrigger, { isError, error }] =
    spotApi.endpoints.updateSpotAvailability.useMutation()
  const errorMessage = (error as any)?.data?.message
  const form = useFormikContext<SpotsSpotFormValues>()
  const availableForPublic = spotAvailableForPublic(price)

  const updateSpotAvailability = (
    availabilityState: SpotAvailabilityState
  ): void => {
    updateSpotAvailabilityTrigger({
      spotId: id,
      availabilityState,
    })
  }

  useEffect(() => {
    form.setFieldValue(
      'type',
      availabilityState || SpotAvailabilityState.PRIVATE
    )
  }, [availabilityState])

  useEffect(() => {
    if (isError) {
      const message = errorMessage || (
        <>
          You can't choose Public status for this spot. <br /> Change options
          for availability public bookings.
        </>
      )
      toast.error(message)
    }
  }, [isError, errorMessage])

  return (
    <div
      className={classNames('rounded-md p-3 border', {
        'border-blue-3': !linked,
        'border-primary': linked,
      })}
      onClick={() =>
        router.push({
          pathname: ROUTES.OWNER_SPOTS_FIND_TAB,
          query: { id, type: [SpotDetailType.Main] },
        })
      }
    >
      <div className="flex justify-between mb-2 border-b border-b-blue-4">
        <p
          className={classNames(
            'font-semibold font-s-lg mb-2 overflow-ellipsis overflow-hidden whitespace-nowrap pr-1',
            {
              'text-blue-1': !linked,
              'text-primary': linked,
            }
          )}
        >
          {name}
        </p>
        <span
          className={classNames('font-s-sm', {
            'text-blue-1': !linked,
            'text-primary': linked,
          })}
        >
          {linked ? 'Linked' : 'Unlinked'}
        </span>
      </div>

      <RadioGroup name="type">
        <BorderRadio
          label="Private"
          value={SpotAvailabilityState.PRIVATE}
          labelClassName="!font-semibold"
          onClick={(e) => {
            e.stopPropagation()
            updateSpotAvailability(SpotAvailabilityState.PRIVATE)
          }}
        />
        <BorderRadio
          label="Public"
          value={SpotAvailabilityState.PUBLIC}
          labelClassName="!font-semibold"
          onClick={(e) => {
            e.stopPropagation()
            updateSpotAvailability(SpotAvailabilityState.PUBLIC)
          }}
        >
          <DollarSign
            className={classNames('ml-auto', {
              'fill-primary': availableForPublic,
              'fill-blue-3': !availableForPublic,
            })}
          />
        </BorderRadio>
      </RadioGroup>
    </div>
  )
}

export default withForm<SpotsSpotProps>(
  {
    initialValues: {
      type: SpotAvailabilityState.PRIVATE,
    } as SpotsSpotFormValues,
  },
  SpotsSpot
)
