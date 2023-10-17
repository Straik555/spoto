import { profileApi } from '@api/profile'
import React, { FC, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { spotApi } from '@api/spot'
import { PageHeaderMobile } from '@components/PageHeader'
import Button from '@components/Button'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import { Loader } from '@components/Loader'
import HouseIcon from '@assets/icons/large-icons/house-icon-183.svg'
import { useIsClient } from '@screens/owner/Spots/hooks/useIsClient'
import SpotsOrderHardware from '@screens/owner/Spots/SpotsOrderHardware'
import SpotsSpot from '@screens/owner/Spots/SpotsSpot'
import { ROUTES } from '@constants/routes'

const Spots: FC = () => {
  const {
    data: spots = [],
    isLoading,
    isFetching,
  } = spotApi.endpoints.getSpotsByUser.useQuery({})
  const router = useRouter()
  const isClient = useIsClient()
  const [becomePersonalOwner, { isSuccess, isError }] =
    profileApi.endpoints.becomePersonalOwner.useMutation()

  useEffect(() => {
    if (isError) {
      toast.error('Failed to turn on personal spots')
    }

    if (isSuccess) {
      toast.success('Turned on personal spots configuration successfully')
    }
  }, [isSuccess, isError])

  return (
    <div className="flex flex-col h-full">
      <PageHeaderMobile
        title="my spots"
        rightContent={
          !isClient ? (
            <Button
              mode={ButtonMode.BASE}
              className="w-auto px-4 py-2 bg-white text-primary px rounded-md text-s-sm"
              icon={ButtonIcon.ADD}
              onClick={() =>
                router.push({ pathname: ROUTES.OWNER_SPOTS_CREATE })
              }
            >
              Create New Spot
            </Button>
          ) : null
        }
      />

      {isClient && (
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center text-center px-7">
            <HouseIcon />
            <p className="mb-5 text-base font-semibold text-center mt-[30px]">
              Become a personal owner?
            </p>
            <Button
              mode={ButtonMode.FULL_PRIMARY}
              className="inline-block w-auto m-auto text-base px-[37px] py-[10px] !font-semibold"
              onClick={() => becomePersonalOwner()}
            >
              Submit
            </Button>
          </div>
        </div>
      )}

      {!isClient && (
        <>
          <Loader loading={isLoading || isFetching}>
            {spots.length ? (
              <div className="p-3 pb-[80px] grid grid-cols-2 gap-2">
                {spots.map((spot) => {
                  return (
                    <SpotsSpot
                      key={spot.id}
                      id={spot.id}
                      linked={spot.linked}
                      name={spot.name}
                      availabilityState={spot.availabilityState}
                      price={spot.price}
                    />
                  )
                })}
              </div>
            ) : (
              <p className="flex items-center justify-center grow text-s-base text-blue-2">
                No Spots
              </p>
            )}
          </Loader>

          <SpotsOrderHardware />
        </>
      )}
    </div>
  )
}

export default Spots
