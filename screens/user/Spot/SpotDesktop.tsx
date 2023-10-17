import ArrowLeft from '@assets/icons/arrows/arrow-left.svg'
import Charging from '@assets/icons/charging.svg'
import SpotoDefault from '@assets/icons/logos/spoto-logo-grey.svg'
import Parking from '@assets/icons/parking-35.svg'
import Share from '@assets/icons/share.svg'
import Star from '@assets/icons/star.svg'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import Image from '@components/Image/Image'
import { Button } from '@components/index'
import Loader from '@components/Loader/Loader'
import Text from '@components/Text'
import { TextVariant } from '@components/Text/Text.model'
import SuccessDialog from '@components/Dialog/SuccessDialog'
import { ROUTES } from '@constants/routes'
import { useShareLink } from '@hooks/useShareLink'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import BookingPeriod from '@screens/user/Spot/BookingPeriod'
import ModalElectricVehicle from '@screens/user/Spot/ModalElectricVehicle'
import { ModalElectricVehicleVariant } from '@screens/user/Spot/ModalElectricVehicle/ModalElectricVehicle.model'
import { SpotFormValues, SpotProps } from '@screens/user/Spot/Spot.model'
import useSpot from '@screens/user/Spot/useSpot'
import PaymentDialog from '@screens/user/Spot/PaymentDialog'
import cn from 'classnames'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import Title from '@components/Title/Title'

const SpotDesktop: FC<SpotProps> = ({ placeId }) => {
  const { values } = useTypedFormikContext<SpotFormValues>()
  const {
    place,
    vehicles,
    handleFavorite,
    book,
    placeIsLoading,
    parsedPreBookInfo,
    setBookingPeriodDialogVisible,
    selectVehicle,
    preBookError,
    bookingPeriodDialogVisible,
    setFormDateTimeToPrebook,
    updatePreBookWithFormValues,
    showBookSuccess,
    setShowBookSuccess,
    evMismatchVariant,
    setEvMismatchVariant,
    detailsForPayment,
    isOpenPaymentDialog,
    setIsOpenPaymentDialog,
  } = useSpot(placeId)
  const { share } = useShareLink()

  const router = useRouter()

  return (
    <>
      <Loader loading={placeIsLoading}>
        <div className="h-full py-4 overflow-auto px-7">
          <div className="w-full">
            <div
              className="flex items-center cursor-pointer text-blue-1 mt-[15px] w-max"
              onClick={() =>
                router.push({
                  pathname: ROUTES.HOME,
                  query: {
                    address: router.query?.address,
                    startDate: router.query?.startDate,
                    endDate: router.query?.endDate,
                    vehicleType1: router.query?.vehicleType1,
                    vehicleType2: router.query?.vehicleType2,
                    vehicleHeight: router.query?.vehicleHeight,
                  },
                })
              }
            >
              <ArrowLeft className="stroke-blue-1" />
              <p className="mb-0 ml-[15px]">Search spot</p>
            </div>
            <div className="flex items-center text-base text-white capitalize bg-primary h-11 p-[10px_20px] w-[203px] mt-[35px] rounded-[5px_5px_0_0]">
              {place?.name}
            </div>
            <div className="w-full h-[2px] bg-blue-2" />
            <div className="relative flex items-center justify-center w-full overflow-hidden h-[268px] mb-[25px] bg-blue-4">
              <SpotoDefault className="fill-blue-3" />
            </div>
          </div>
          <div className="flex w-full">
            <div className="pr-[50px] grow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Title as="h1" className="mb-0 text-2xl mr-[10px]">
                    {place?.name}
                  </Title>
                  {(place?.electricCharger?.type1 ||
                    place?.electricCharger?.type2) && (
                    <div className="rounded-full p-[6px] bg-light-green">
                      <Charging className="fill-green" />
                    </div>
                  )}
                </div>
                <div className="flex items-center pl-4">
                  <button type="button" onClick={() => share()}>
                    <Share className="fill-blue-2" />
                  </button>
                  <button
                    type="button"
                    className="ml-4"
                    onClick={handleFavorite}
                  >
                    <Star
                      className={cn('fill-blue-2', {
                        '!fill-primary': place?.isFavoritePlace,
                      })}
                    />
                  </button>
                </div>
              </div>
              {parsedPreBookInfo && (
                <p className="mb-0 text-lg text-blue-1">
                  {parsedPreBookInfo.openTimeStart?.slice(0, 5)} -{' '}
                  {parsedPreBookInfo.openTimeEnd?.slice(0, 5)}
                </p>
              )}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <Parking className="last:fill-white fill-primary" />
                  <p className="mb-0 ml-2 text-lg text-black">Single spot</p>
                </div>
                <div>
                  <p className="mb-0">
                    <span className="text-2xl font-bold text-black">
                      <Text variant={TextVariant.Money}>
                        {place?.price?.perHour}
                      </Text>
                    </span>
                    <span className="text-lg text-blue-1">/hour</span>
                  </p>
                </div>
              </div>
              <hr className="mt-[15px] mb-[25px]" />
              {place?.description && (
                <>
                  <div>
                    <Title className="mb-2 text-lg">Info</Title>
                    <p>{place?.description}</p>
                  </div>
                  <hr className="mt-[15px] mb-[25px]" />
                </>
              )}
              {(place?.electricCharger?.type1 ||
                place?.electricCharger?.type2) && (
                <>
                  <div>
                    <Title className="mb-2 text-lg">Extra Options</Title>
                    <div className="flex items-center">
                      <div className="rounded w-[9px] h-[9px] bg-primary mr-[10px]" />
                      <p className="mb-0 text-sm text-primary">
                        Electric vehicle charger
                      </p>
                    </div>
                  </div>
                  <hr className="mb-[25px] mt-[15px]" />
                </>
              )}
              <div>
                <Title className="mb-4 text-lg" noCap>
                  Booking period
                </Title>
                <div className="flex items-center justify-between py-3 border mt-[10px] px-[15px] rounded-[5px] border-primary">
                  {parsedPreBookInfo && (
                    <div>
                      <p className="font-semibold mb-[3px] text-primary">
                        {parsedPreBookInfo.startDate}
                      </p>
                      <p className="font-semibold text-primary">
                        From {parsedPreBookInfo.startTime}
                        <span> - </span>
                        {parsedPreBookInfo.endTime}
                      </p>
                    </div>
                  )}
                  <Button
                    onClick={() => {
                      setBookingPeriodDialogVisible(true)
                    }}
                    mode={ButtonMode.SMALL}
                    className="h-10 text-sm"
                  >
                    Change
                  </Button>
                </div>
              </div>
              <hr className="my-[25px]" />
              <div className="relative w-full">
                <div className="flex items-center justify-between pr-4">
                  <Title className="mb-2 text-lg" noCap>
                    Parking vehicle
                  </Title>
                  {vehicles && values.selectedVehicleId && (
                    <p className="mb-2 text-base text-blue-1">
                      {vehicles.findIndex(
                        (vehicle) => vehicle.id === values.selectedVehicleId
                      ) + 1}
                      /{vehicles.length}
                    </p>
                  )}
                </div>
                <div className="grid 2xl:grid-cols-3 grid-cols-2 gap-2">
                  {vehicles && vehicles.length !== 0
                    ? vehicles.map((vehicle) => (
                        <div
                          className={cn(
                            'flex border overflow-hidden rounded-lg h-[90px]',
                            {
                              'border-primary bg-blue-4':
                                vehicle.id === values.selectedVehicleId,
                            }
                          )}
                          key={vehicle.id}
                          onClick={() => selectVehicle(vehicle)}
                        >
                          <div className="relative flex items-center h-full w-[108px]">
                            <Image
                              srcKey={
                                vehicle.carPhoto.includes('data:')
                                  ? ''
                                  : vehicle.carPhoto || vehicle.brandLogo
                              }
                              src={
                                vehicle.carPhoto.includes('data:')
                                  ? vehicle.carPhoto
                                  : ''
                              }
                              className="object-fill rounded-l-lg w-[108px]"
                            />
                          </div>
                          <div className="pl-5 pr-1 py-[10px] grow">
                            <div className="flex flex-col mb-1">
                              <p className="mb-0 text-blue-1 text-[10px]">
                                Vehicle Brand
                              </p>
                              <p className="mb-0 text-xs font-bold">
                                {vehicle.name} - {vehicle.brand}
                              </p>
                            </div>
                            <div className="flex flex-col">
                              <p className="mb-0 text-blue-1 text-[10px]">
                                Rego/Plate number
                              </p>
                              <p className="mb-0 text-xs font-bold">
                                {vehicle.licensePlate}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
                <p className="flex items-center justify-start mt-6 cursor-pointer">
                  <Button
                    className="text-sm font-semibold capitalize text-primary"
                    onClick={() =>
                      router.push({ pathname: ROUTES.VEHICLES_CREATE })
                    }
                    icon={ButtonIcon.ADD}
                    mode={ButtonMode.BASE}
                  >
                    Add new vehicle
                  </Button>
                </p>
              </div>
            </div>
            <div className="bg-white w-[400px] rounded-[10px] shadow-[0px_-3px_28px_rgba(141,157,207,0.15)] h-max py-[25px]">
              <div className="mb-8 text-lg px-[35px]">
                <div className="flex justify-between text-base font-semibold mb-[2px] text-blue-1">
                  <div className="flex items-center">
                    <p className="mb-0">Parking</p>
                    <p className="mb-0 text-sm font-normal ml-[10px]">
                      ({place?.name})
                    </p>
                  </div>
                  <p className="mb-0">
                    <Text variant={TextVariant.Money}>
                      {parsedPreBookInfo?.preBookResponse?.bill?.totalPrice}
                    </Text>
                  </p>
                </div>
                <div className="flex justify-between mb-2 text-base font-semibold text-blue-1">
                  <p className="text-xs font-normal">
                    {parsedPreBookInfo?.bookingDurationHumanized}
                  </p>
                  <p className="text-xs font-normal">
                    {values.startTime}
                    <span> - </span>
                    {values.endTime}
                  </p>
                </div>
                <div className="flex justify-between mb-2 text-base font-semibold text-blue-1">
                  <div className="flex items-center">
                    <p>Sales Tax</p>
                    <p className="text-sm font-normal ml-[10px]">
                      (
                      {parsedPreBookInfo?.preBookResponse?.bill?.taxPercent ||
                        '0'}
                      %)
                    </p>
                  </div>
                  <p>
                    <Text variant={TextVariant.Money}>
                      {parsedPreBookInfo?.preBookResponse?.bill?.totalTaxes}
                    </Text>
                  </p>
                </div>
                <hr className="-mx-[35px]" />
                <div className="flex justify-between mt-2 font-bold text-black">
                  <p>Total</p>
                  <p>Free</p>
                </div>
              </div>
              <div className="px-[35px]">
                <Button
                  className={cn('bg-blue-3', {
                    '!bg-primary': !(
                      !values.selectedVehicleId || Boolean(preBookError)
                    ),
                  })}
                  mode={ButtonMode.FULL_PRIMARY}
                  onClick={book}
                  disabled={!values.selectedVehicleId || Boolean(preBookError)}
                >
                  Book Spot
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Loader>
      <BookingPeriod
        open={bookingPeriodDialogVisible}
        spotId={placeId}
        closeModal={() => {
          setBookingPeriodDialogVisible(false)
          setFormDateTimeToPrebook()
        }}
        onSubmit={() => {
          updatePreBookWithFormValues()
          setBookingPeriodDialogVisible(false)
        }}
        takenTime={[]}
      />
      <SuccessDialog
        title="Success!"
        buttonTitle="My Bookings"
        isOpen={showBookSuccess}
        closeModal={() => {
          router.push({ pathname: ROUTES.BOOKINGS })
          setShowBookSuccess(false)
        }}
        onSubmit={() => {
          router.push({ pathname: ROUTES.BOOKINGS })
          setShowBookSuccess(false)
        }}
        subTitle="Spot booked successfully"
      />
      <ModalElectricVehicle
        isOpen={Boolean(evMismatchVariant)}
        closeModal={() => setEvMismatchVariant()}
        variant={evMismatchVariant as ModalElectricVehicleVariant}
        onSubmit={() =>
          router.push({
            pathname: ROUTES.HOME,
          })
        }
      />
      {detailsForPayment?.operationSecret && (
        <PaymentDialog
          clientSecret={detailsForPayment?.operationSecret}
          closeModal={() => setIsOpenPaymentDialog(false)}
          isOpen={isOpenPaymentDialog}
        />
      )}
    </>
  )
}

export default SpotDesktop
