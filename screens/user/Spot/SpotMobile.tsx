import { VehicleModel } from '@api/vehicle/types'
import Charging from '@assets/icons/charging.svg'
import Parking from '@assets/icons/parking-25.svg'
import Share from '@assets/icons/share.svg'
import CopyIcon from '@assets/icons/copy.svg'
import Star from '@assets/icons/star.svg'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import Image from '@components/Image/Image'
import { Button } from '@components/index'
import Loader from '@components/Loader/Loader'
import Text from '@components/Text'
import { TextVariant } from '@components/Text/Text.model'
import PageHeaderMobile from '@components/PageHeader/PageHeaderMobile'
import SuccessDialog from '@components/Dialog/SuccessDialog'
import Title from '@components/Title/Title'
import { ROUTES } from '@constants/routes'
import { useShareLink } from '@hooks/useShareLink'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import BookingPeriod from '@screens/user/Spot/BookingPeriod'
import ModalElectricVehicle from '@screens/user/Spot/ModalElectricVehicle'
import { ModalElectricVehicleVariant } from '@screens/user/Spot/ModalElectricVehicle/ModalElectricVehicle.model'
import { SpotFormValues, SpotProps } from '@screens/user/Spot/Spot.model'
import PaymentDialog from '@screens/user/Spot/PaymentDialog'
import useSpot from '@screens/user/Spot/useSpot'
import cn from 'classnames'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

const SpotMobile: FC<SpotProps> = ({ placeId }) => {
  const {
    place,
    vehicles,
    handleFavorite,
    book,
    bookingPeriodDialogVisible,
    setBookingPeriodDialogVisible,
    placeIsLoading,
    parsedPreBookInfo,
    preBookError,
    showBookSuccess,
    setShowBookSuccess,
    selectVehicle,
    evMismatchVariant,
    setEvMismatchVariant,
    setFormDateTimeToPrebook,
    updatePreBookWithFormValues,
    detailsForPayment,
    isOpenPaymentDialog,
    setIsOpenPaymentDialog,
  } = useSpot(placeId)
  const router = useRouter()
  const { values } = useTypedFormikContext<SpotFormValues>()
  const { share, canShare } = useShareLink()
  const isFree =
    (parsedPreBookInfo?.preBookResponse?.bill?.totalPrice || 0) === 0

  return (
    <div className="flex flex-col w-full h-full">
      <Loader loading={placeIsLoading}>
        <PageHeaderMobile title="Book spot" showBackButton />
        <div className="container flex flex-col py-4 grow">
          <div className="flex items-center justify-between">
            <Title as="h1" className="font-semibold text-s-xl">
              {place?.name}
            </Title>
            {(place?.electricCharger?.type1 ||
              place?.electricCharger?.type2) && (
              <div className="rounded-full p-[1px] bg-light-green">
                <Charging className="fill-green" />
              </div>
            )}
          </div>
          {parsedPreBookInfo && (
            <Title
              as="p"
              className="flex mb-0 font-semibold text-s-lg mt-[16px]"
            >
              {parsedPreBookInfo.preBookResponse.openTime24h ? (
                'Open 24/7'
              ) : (
                <>
                  <span>Opening hours</span>
                  <span className="ml-auto">
                    {parsedPreBookInfo.openTimeStart}
                    {' - '}
                    {parsedPreBookInfo.openTimeEnd}
                  </span>
                </>
              )}
            </Title>
          )}
          <div className="flex items-center mt-[16px]">
            <Parking />
            <p className="mb-0 text-black ml-[10px] text-s-sm capitalize">
              {place?.setData?.spotCount || 1} available
            </p>
          </div>
          <div className="flex items-center mt-[16px]">
            <button
              className="flex items-center text-s-base text-blue-1"
              type="button"
              onClick={() => share()}
            >
              {canShare ? (
                <Share className="fill-blue-2 mr-[9px]" />
              ) : (
                <CopyIcon className="fill-blue-2 mr-[9px]" />
              )}
              {canShare ? 'Share' : 'Copy'}
            </button>
            <button
              type="button"
              className={cn('flex items-center ml-5 text-blue-1 text-s-base', {
                '!text-primary': place?.isFavoritePlace,
              })}
              onClick={handleFavorite}
            >
              <Star
                className={cn('fill-blue-2 mr-[9px]', {
                  '!fill-primary': place?.isFavoritePlace,
                })}
              />
              Favourite
            </button>
          </div>
          <div className="flex items-center justify-between mt-[20px]">
            <p className="mb-0 font-semibold text-s-lg">Description</p>
            <p className="mb-0 font-semibold text-black text-s-xl">
              {isFree ? (
                'Free'
              ) : (
                <>
                  <span>${place?.price?.perHour}</span>
                  <span className="mr-[6px]">/hr</span>
                  <span>${place?.price?.perDay}</span>
                  <span>/day</span>
                </>
              )}
            </p>
          </div>
          <p className="mt-[18px] text-s-sm text-blue-1">
            {place?.description}
          </p>
          <div>
            <Title as="h2" className="font-semibold text-s-lg mt-[20px]">
              Booking period
            </Title>
            <div className="flex items-center justify-between border mt-[16px] px-[16px] rounded-[5px] py-[10px] border-primary h-[64px]">
              {parsedPreBookInfo && (
                <div>
                  <p className="font-semibold mb-[2px] text-primary text-s-base">
                    {parsedPreBookInfo.dateDisplay}
                  </p>
                  <p className="font-semibold text-primary text-s-base">
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
                className="ml-auto text-s-lg py-[8px] w-[130px]"
              >
                Change
              </Button>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mt-[20px]">
              <Title as="h2" className="font-semibold text-s-lg">
                Select My vehicle
              </Title>
              {vehicles && values.selectedVehicleId && (
                <p className="mb-2 text-s-sm text-blue-1">
                  {vehicles.findIndex(
                    (vehicle) => vehicle.id === values.selectedVehicleId
                  ) + 1}
                  /{vehicles.length}
                </p>
              )}
            </div>
            {vehicles?.length !== 0 && (
              <div className="flex overflow-x-auto mt-[16px]">
                {vehicles?.map((vehicle: VehicleModel, idx) => {
                  return (
                    <div
                      className={cn(
                        'flex border border-blue-3 rounded-[5px] min-w-[250px] h-[90px] overflow-hidden items-center',
                        {
                          'mr-[5px]': vehicles.length > idx + 1,
                          '!border-primary':
                            vehicle.id === values.selectedVehicleId,
                        }
                      )}
                      key={vehicle.id}
                      onClick={() => selectVehicle(vehicle)}
                    >
                      <div className="relative flex items-center h-full w-[90px]">
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
                          className="object-fill w-full"
                        />
                      </div>
                      <div className="grow pl-[25px]">
                        <div className="flex flex-col mb-1">
                          <p className="mb-0 text-blue-1 text-s-xs">
                            Vehicle Brand
                          </p>
                          <p className="mb-0 font-semibold text-s-sm">
                            {vehicle.brand}
                          </p>
                        </div>
                        <div className="flex flex-col mt-[4px]">
                          <p className="mb-0 text-blue-1 text-s-xs">
                            Plate Number
                          </p>
                          <p className="mb-0 font-semibold text-s-sm">
                            {vehicle.licensePlate}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            <p className={cn('flex items-center justify-center mt-[16px]')}>
              <Button
                className="font-semibold text-primary text-s-sm"
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
          {!isFree && (
            <div className="mb-0">
              <div className="flex justify-between font-semibold text-s-lg text-blue-1 mt-[20px]">
                <div className="flex items-center">
                  <p className="mb-0">
                    Price For{' '}
                    <span className="font-normal">
                      {parsedPreBookInfo?.bookingDurationHumanized}
                    </span>
                  </p>
                </div>
                <p className="mb-0 font-semibold">
                  <Text variant={TextVariant.Money}>
                    {parsedPreBookInfo?.preBookResponse?.bill?.totalPrice}
                  </Text>
                </p>
              </div>
              <div className="flex justify-between font-semibold text-s-lg mt-[16px] text-blue-1">
                <div className="flex items-center">
                  <p>
                    GST{' '}
                    {parsedPreBookInfo?.preBookResponse?.bill?.taxPercent ||
                      '0'}
                    %<span className="text-s-xs"> (Included in the price)</span>
                  </p>
                </div>
                <p className="mb-0 font-semibold">
                  <Text variant={TextVariant.Money}>
                    {parsedPreBookInfo?.preBookResponse?.bill?.totalTaxes}
                  </Text>
                </p>
              </div>
              <div className="flex items-center justify-between font-semibold text-black mt-[16px]">
                <p className="m-0 text-s-lg">Total Price</p>
                <p className="m-0 font-semibold text-black text-s-xl">Free</p>
              </div>
            </div>
          )}
          <div className="mt-auto">
            <Button
              className={cn(
                'bg-blue-3 !h-11 !text-s-lg !font-semibold !mt-[16px]',
                {
                  '!bg-primary': !(
                    !values.selectedVehicleId || Boolean(preBookError)
                  ),
                }
              )}
              mode={ButtonMode.FULL_PRIMARY}
              onClick={book}
              disabled={!values.selectedVehicleId || Boolean(preBookError)}
            >
              Book Spot
            </Button>
          </div>
        </div>
      </Loader>
      <BookingPeriod
        open={bookingPeriodDialogVisible}
        spotId={placeId}
        closeModal={() => {
          setBookingPeriodDialogVisible(false)
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
        onSubmit={() => router.back()}
      />
      {detailsForPayment?.operationSecret && (
        <PaymentDialog
          clientSecret={detailsForPayment?.operationSecret}
          closeModal={() => setIsOpenPaymentDialog(false)}
          isOpen={isOpenPaymentDialog}
        />
      )}
    </div>
  )
}

export default SpotMobile
