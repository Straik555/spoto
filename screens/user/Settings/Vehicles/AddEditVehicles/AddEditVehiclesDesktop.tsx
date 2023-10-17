import { vehicleApi } from '@api/vehicle'
import { BrandsModel } from '@api/vehicle/types'
import ImgDefaultIcon from '@assets/icons/large-icons/spoto-default-image.svg'
import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import Input from '@components/Form/Input/Input'
import Image from '@components/Image/Image'
import Select, { Option } from '@components/Select/Select'
import { VEHICLE_VALIDATION_SCHEMA } from './validation'
import { useFileReader } from '@hooks/useFileReader'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import router from 'next/router'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import ProfileSettingsWrapperDesktop from '../../ProfileSettings/components/ProfileSettingsWrapper'
import {
  AddEditVehiclesFormValues,
  AddEditVehiclesProps,
} from './AddEditVehicles.model'

const AddEditVehiclesDesktop: React.FC<AddEditVehiclesProps> = ({
  vehicleId = '',
}) => {
  const [carPhoto, setCarPhoto] = useState<string>('')
  const [uploadedCarPhotoFile, setUploadedCarPhotoFile] =
    useState<File | null>()
  const uploadedCarPhotoUrl = useFileReader(uploadedCarPhotoFile)
  const [disableButton, setDisableButton] = useState<boolean>(false)
  const [brandLogo, setBrandLogo] = useState<string>('')
  const inputFileRef = useRef(null)
  const [
    addVehicle,
    {
      isLoading: loadingAddVehicle,
      isSuccess: isSuccessAdd,
      isError: isErrorAdd,
    },
  ] = vehicleApi.endpoints.addVehicle.useMutation()
  const [
    updateVehicle,
    {
      isLoading: loadingEditVehicle,
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
    },
  ] = vehicleApi.endpoints.updateVehicle.useMutation()

  const { data: brands } = vehicleApi.endpoints.getBrands.useQuery(null)
  const { data: vehicle } = vehicleApi.endpoints.getVehicle.useQuery(
    vehicleId,
    { skip: !vehicleId }
  )

  const [initialFormData, setInitialFormData] =
    useState<AddEditVehiclesFormValues>({
      brandId: undefined,
      licensePlate: '',
      electricCarType: undefined,
    })

  const getBrandId = (vehicle, brandsArray): number => {
    return brandsArray.filter((brand) => brand.name === vehicle.brand)[0].id
  }

  const getBrandLogo = (event): string =>
    brands?.filter((item) => item.id === event)[0].logo || ''

  useEffect(() => {
    setCarPhoto(uploadedCarPhotoUrl)
  }, [uploadedCarPhotoUrl])

  useEffect(() => {
    if (loadingAddVehicle || loadingEditVehicle) {
      setDisableButton(true)
    }
  }, [loadingAddVehicle, loadingEditVehicle])

  useEffect(() => {
    if (vehicle && brands) {
      setInitialFormData({
        brandId: getBrandId(vehicle, brands),
        licensePlate: vehicle?.licensePlate,
        electricCarType: vehicle?.electricCarType,
      })
      setCarPhoto(vehicle.carPhoto)
      setBrandLogo(vehicle.brandLogo)
    }
  }, [vehicleId, vehicle, brands])

  useEffect(() => {
    if (isSuccessAdd || isSuccessUpdate) router.back()
  }, [isSuccessAdd, isSuccessUpdate])

  useEffect(() => {
    if (isErrorAdd) {
      toast.error('Failed creating a vehicle')
    }
  }, [isErrorAdd])

  useEffect(() => {
    if (isErrorUpdate) {
      toast.error('Failed updating a vehicle')
    }
  }, [isErrorUpdate])

  const onFileChange = (e): void => {
    const files = e.target.files
    if (files.length > 0) {
      setUploadedCarPhotoFile(files[0])
    }
  }

  const onBtnClick = (): void => {
    if (inputFileRef !== null) {
      const ref = inputFileRef.current as any
      ref.click()
    }
  }

  const CustomInputComponent = ({ value, onChange }): ReactElement => {
    return (
      <Select
        value={value}
        placeholder="Select brand"
        className="!text-primary"
        titleClassName="!text-primary"
        onSelect={onChange}
        label={brands?.filter((item) => item.id === value)?.[0]?.name}
      >
        {brands?.map((item: BrandsModel) => {
          return (
            <Option
              key={item.id}
              value={item.id}
              text={item.name}
              active={value === item.id}
            />
          )
        })}
      </Select>
    )
  }

  const renderDefaultImagePreview = (
    values: AddEditVehiclesFormValues
  ): ReactElement => {
    return (
      <div
        className="flex flex-col items-center justify-center"
        onClick={onBtnClick}
      >
        {brandLogo ? (
          <Image srcKey={brandLogo} className="max-w-[212px]" />
        ) : (
          <div className="mb-4">
            <ImgDefaultIcon />
          </div>
        )}
        <input type="file" ref={inputFileRef} onChange={onFileChange} hidden />
        <div className="px-5 text-sm font-semibold text-center text-primary max-w-[314px]">
          {brandLogo
            ? 'Click Here To Change Brand Logo To Your Favourite Car Image'
            : !values.brandId
            ? 'Click here to pick car image'
            : 'Download Preview Vehicle Image Here'}
        </div>
      </div>
    )
  }

  const renderUsersImagePreview = (): ReactElement => {
    return (
      <>
        <div
          className="flex justify-center items-center w-full h-full overflow-hidden cursor-pointer"
          onClick={onBtnClick}
        >
          <Image
            src={carPhoto}
            srcKey={uploadedCarPhotoUrl ? '' : carPhoto}
            alt=""
            className="max-h-full max-w-full"
          />
          <input
            type="file"
            ref={inputFileRef}
            onChange={onFileChange}
            hidden
          />
        </div>
      </>
    )
  }

  const renderImagePreview = (
    values: AddEditVehiclesFormValues
  ): ReactElement => {
    return (
      <>
        <div className="flex items-center border-2 border-dashed rounded-lg sm:mx-0 border-primary h-[300px]">
          {carPhoto
            ? renderUsersImagePreview()
            : renderDefaultImagePreview(values)}
        </div>
        {carPhoto && (
          <div className="flex justify-center mt-2 text-sm font-normal text-blue-1">
            Click on photo to change
          </div>
        )}
      </>
    )
  }

  const handleSubmit = (values, { setSubmitting }): void => {
    if (vehicle) {
      updateVehicle({
        ...values,
        carPhoto,
        name: '',
        id: vehicle.id,
        licensePlate: values.licensePlate.toUpperCase(),
      })
    } else {
      addVehicle({
        ...values,
        carPhoto,
        name: '',
        licensePlate: values.licensePlate.toUpperCase(),
      })
    }
    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={initialFormData}
      onSubmit={handleSubmit}
      validationSchema={VEHICLE_VALIDATION_SCHEMA}
      enableReinitialize
      isInitialValid={!!vehicleId}
    >
      {(props) => {
        const { isSubmitting, isValid, setFieldValue, values } = props
        const handleChange = (value, name): void => {
          setFieldValue(name, value)
        }

        const hasChanges = () => {
          if (vehicle) {
            return (
              values.brandId === initialFormData.brandId &&
              values.licensePlate === vehicle.licensePlate &&
              vehicle.carPhoto === carPhoto
            )
          }
          return false
        }

        const disabled = !isValid || isSubmitting || hasChanges()

        return (
          <Form className="h-full">
            <ProfileSettingsWrapperDesktop
              headerTitle={vehicleId ? 'Edit Vehicle' : 'Add New Vehicle'}
              headerRightContent={
                <div className="flex">
                  <div
                    className="text-base font-medium cursor-pointer text-blue-1 mr-[50px] py-[13px]"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </div>
                  <Button
                    className="text-base font-medium whitespace-nowrap !font-semibold"
                    type="submit"
                    disabled={disabled || disableButton}
                    mode={ButtonMode.FULL_PRIMARY}
                  >
                    {vehicle ? 'Edit Vehicle' : 'Add Vehicle'}
                  </Button>
                </div>
              }
            >
              <div className="flex flex-col h-full">
                <section>
                  <div>
                    <div className="flex flex-col w-full pb-0 pt-[35px] lg:flex-row">
                      <div className="w-full max-w-[821px] px-[75px] basis-1/2">
                        {renderImagePreview(values)}
                      </div>
                      <div className="mt-8 w-[520px] max-w-[520px] basis-1/3 px-[75px] lg:mt-0 lg:px-0">
                        <div className="text-base mb-[10px] text-blue-1">
                          Brand
                        </div>
                        <Field
                          wrapperClassName="w-[520px]"
                          as="select"
                          name="brandId"
                          value={values.brandId}
                          component={CustomInputComponent}
                          placeholder="Select brand"
                          onChange={(event) => {
                            handleChange(event, 'brandId')
                            setBrandLogo(getBrandLogo(event))
                          }}
                        />
                        <ErrorMessage
                          name="brandId"
                          component="div"
                          className="mt-1 text-xs text-red"
                        />
                        <div className="mt-6 text-base mb-[10px] text-blue-1">
                          Rego/Plate number
                        </div>
                        <Input
                          className="mt-4"
                          inputClassName="px-[15px] py-[10px] uppercase placeholder:capitalize"
                          name="licensePlate"
                          placeholder="Enter plate number"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </ProfileSettingsWrapperDesktop>
          </Form>
        )
      }}
    </Formik>
  )
}

export default React.memo(AddEditVehiclesDesktop)
