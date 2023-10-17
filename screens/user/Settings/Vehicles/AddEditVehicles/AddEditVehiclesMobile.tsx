import { useFileReader } from '@hooks/useFileReader'
import React, { useEffect, useState, useRef, ReactElement } from 'react'
import { toast } from 'react-toastify'
import {
  AddEditVehiclesFormValues,
  AddEditVehiclesProps,
} from './AddEditVehicles.model'
import Select, { Option } from '@components/Select/Select'
import { Field, Formik, Form, ErrorMessage } from 'formik'
import { VEHICLE_VALIDATION_SCHEMA } from './validation'
import { vehicleApi } from '@api/vehicle'
import { BrandsModel } from '@api/vehicle/types'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import Loader from '@components/Loader/Loader'
import Image from '@components/Image/Image'
import Button from '@components/Button'
import router from 'next/router'
import { PageHeaderMobile } from '@components/PageHeader'
import Input from '@components/Form/Input/Input'
import Radio from '@components/Form/Radio/Radio'
import RadioGroup from '@components/Form/Radio/RadioGroup'
import { ROUTES } from '@constants/routes'
import s from './AddEditVehicles.module.css'
import cn from 'classnames'

const AddEditVehicles: React.FC<AddEditVehiclesProps> = ({
  vehicleId = '',
}) => {
  const [carPhoto, setCarPhoto] = useState<string>('')
  const [uploadedCarPhotoFile, setUploadedCarPhotoFile] =
    useState<File | null>()
  const uploadedCarPhotoUrl = useFileReader(uploadedCarPhotoFile)
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
  const { data: vehicle, isLoading: loadingGetVehicle } =
    vehicleApi.endpoints.getVehicle.useQuery(vehicleId, {
      refetchOnMountOrArgChange: true,
      skip: !vehicleId,
    })

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
    if (isSuccessAdd || isSuccessUpdate)
      router.push({
        pathname: ROUTES.PROFILE_VEHICLES,
      })
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
        title="Brand"
        placeholder="Select Brand"
        className="w-full"
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

  const renderImagePreview = () => {
    return (
      <div>
        <div
          className={cn(
            s.dashedBorder,
            'mt-4 sm:mx-0 rounded-lg h-[252px] w-full'
          )}
        >
          <div
            className="flex items-center justify-center w-full h-full overflow-hidden cursor-pointer p-[2px]"
            onClick={onBtnClick}
          >
            {carPhoto ? (
              <Image
                src={carPhoto}
                srcKey={uploadedCarPhotoUrl ? '' : carPhoto}
                alt=""
                className="max-w-full max-h-full"
              />
            ) : (
              <Image srcKey={brandLogo} />
            )}
            <input
              type="file"
              ref={inputFileRef}
              onChange={onFileChange}
              hidden
            />
          </div>
        </div>
        <div className="flex justify-center w-full mt-4 text-base font-normal text-blue-1">
          Click on image to change
        </div>
      </div>
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
    <div className="flex flex-col h-full">
      <PageHeaderMobile
        title={vehicleId ? 'Edit Vehicle' : 'Add New Vehicle'}
        backButtonLink={{ pathname: ROUTES.PROFILE_VEHICLES }}
        showBackButton
      />
      <Loader loading={loadingGetVehicle}>
        <section className="flex h-full pb-0 px-[16px] bg-bg">
          <Formik
            initialValues={initialFormData}
            onSubmit={handleSubmit}
            validationSchema={VEHICLE_VALIDATION_SCHEMA}
            enableReinitialize
            isInitialValid={!!vehicleId}
          >
            {(props) => {
              const { setFieldValue, values } = props
              const handleChange = (value, name): void => {
                setFieldValue(name, value)
              }
              return (
                <Form className="flex flex-col justify-between flex-grow">
                  <div>
                    <Field
                      wrapperClassName="w-full"
                      as="select"
                      name="brandId"
                      value={values.brandId}
                      component={CustomInputComponent}
                      placeholder="Select Brand"
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
                    <Input
                      name="licensePlate"
                      label="Plate Number"
                      placeholder="Enter Plate Number"
                      inputClassName="uppercase placeholder:capitalize"
                    />
                    {values.brandId && (
                      <>
                        {renderImagePreview()}
                        <RadioGroup
                          value={values.electricCarType}
                          name="electricCarType"
                          label="Is this an Electric Vehicle?"
                          radiosClassname="flex"
                          onChange={(value) =>
                            setFieldValue('electricCarType', value)
                          }
                          noCap
                        >
                          <Radio
                            label="Type 1"
                            value="Type1"
                            className="mr-[25px]"
                            labelClassName="!ml-[10px] !text-blue-1 !text-xs"
                          />
                          <Radio
                            label="Type 2"
                            value="Type2"
                            className="mr-[25px]"
                            labelClassName="!ml-[10px] !text-blue-1 !text-xs"
                          />
                          <Radio
                            label="No"
                            value={null}
                            labelClassName="!ml-[10px] !text-blue-1 !text-xs"
                          />
                        </RadioGroup>
                      </>
                    )}
                  </div>
                  <div className="left-0 flex flex-col items-center justify-center w-full">
                    <Button
                      className="my-4 text-base !font-semibold p-[10px]"
                      type="submit"
                      disabled={loadingAddVehicle || loadingEditVehicle}
                      mode={ButtonMode.FULL_PRIMARY}
                      icon={vehicle ? ButtonIcon.NO_ICON : ButtonIcon.ADD_WHITE}
                    >
                      {vehicle ? 'Save' : 'Add Vehicle'}
                    </Button>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </section>
      </Loader>
    </div>
  )
}

export default React.memo(AddEditVehicles)
