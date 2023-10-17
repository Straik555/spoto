import { hardwareApi } from '@api/hardware'
import { HardwareInfo } from '@api/hardware/types'
import { CreateSpotParams, SpotAvailabilityState } from '@api/spot/types'
import Button from '@components/Button/Button'
import { ButtonMode } from '@components/Button/Button.model'
import Loader from '@components/Loader/Loader'
import { TabPanel, TabsContainer } from '@components/Tabs/Tabs'
import { CheckboxInputCheckmark } from '@components/Form/Checkbox/Checkbox'
import cn from 'classnames'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { spotApi } from '@api/spot'
import Textarea from '@components/Form/Input/Textarea'
import { Form, Formik } from 'formik'
import Input from '@components/Form/Input/Input'
import { InputTypes } from '@components/Form/Input/Input.model'
import SearchIcon from '@assets/icons/search-15.svg'
import { spotValidationSchema } from '@screens/Spot/AddSpot/validations'
import { InputForNumber } from '@components/Form/Input/Input'
import { buildingApi } from '@api/building'
import { setApi } from '@api/set'
import { PageContent } from '@components/Layout/PageContent'
import { useSpotoMediaQuery } from '@hooks/useMediaQuery'
import { ROUTES } from '@constants/routes'

const AddSpotDesktop: React.FC<{
  spotId: string
  setId: string
  houseId?: string
  buildingId: string
  spotUrlBack?: string
}> = ({ spotId, houseId, setId, buildingId, spotUrlBack }) => {
  const { maxWidth1366, maxWidth1920 } = useSpotoMediaQuery()
  const { data: dataSpot, isLoading: isLoadingSpot } =
    spotApi.endpoints.getSpotById.useQuery(+spotId, {
      skip: !spotId,
    })
  const { data: dataHardWare, isLoading: isLoadingHardWare } =
    hardwareApi.endpoints.getUnlinkedByUser.useQuery()
  const { data: dataBuilding, isLoading: isLoadingBuilding } =
    buildingApi.endpoints.getBuildingsByBuildingId.useQuery(buildingId, {
      skip: !buildingId,
    })
  const isLoading = isLoadingSpot || isLoadingHardWare || isLoadingBuilding
  const [createSpot] = spotApi.endpoints.createSpot.useMutation()
  const [updateSpot] = spotApi.endpoints.updateSpot.useMutation()
  const [addSpots] = setApi.endpoints.addSpots.useMutation()
  const [spollardList, setSpollardList] = useState<HardwareInfo[]>([])
  const [linkSpotHardware] = hardwareApi.endpoints.link.useMutation()
  const [unlinkSpotHardware] = hardwareApi.endpoints.unlink.useMutation()
  const [filteredSpollardList, setFilteredSpollardList] = useState<
    HardwareInfo[]
  >([])
  const [hardware, setHardware] = useState<HardwareInfo | null>(null)
  const [activeTab, setActiveTab] = useState('Main')
  const [showCheckboxValidation, setShowCheckboxValidation] = useState(false)
  const [payloadBody, setPayloadBody] = useState<CreateSpotParams>({
    name: '',
    description: '',
    buildingId: +buildingId,
    hardwareId: null,
    height: '',
    scheduleInheritance: false,
    electricCharger: {
      type1: false,
      type2: false,
    },
    availabilityState: SpotAvailabilityState.PRIVATE,
  })
  const router = useRouter()

  useEffect(() => {
    if (spotId && dataSpot) {
      setHardware({
        id: dataSpot.hardwareId,
        hardwareSerial: dataSpot.hardwareSerial,
      })
      setPayloadBody({
        ...dataSpot,
        availabilityState: dataSpot.availabilityState ?? undefined,
      })
    }
    if (!spotId && dataBuilding) {
      setPayloadBody({
        ...payloadBody,
        height: +dataBuilding.height,
      })
    }
  }, [spotId, dataSpot, dataBuilding])

  useEffect(() => {
    filterSpollardList('')
    if (dataHardWare) {
      setSpollardList(dataHardWare)
      if (dataSpot && dataSpot.hardwareId) {
        setFilteredSpollardList([
          { id: dataSpot.hardwareId, hardwareSerial: dataSpot.hardwareSerial },
          ...dataHardWare,
        ])
      } else {
        setFilteredSpollardList(dataHardWare)
      }
    }
  }, [dataHardWare, dataSpot])

  const linkSpot = (result): void => {
    if (result.data) {
      addSpots({
        setId: +setId!,
        spotIds: [result.data.id],
      })
    }
  }

  const saveSpot = (values): void => {
    const body = {
      ...values,
      name: values.name.toUpperCase(),
      id: +spotId,
      height: values.height || null,
      hardwareId: hardware?.id || 0,
    }
    if (spotId) {
      const hardwareUpdatePromise =
        body.hardwareId && dataSpot!.hardwareId !== body.hardwareId
          ? unlinkSpotHardware({
              id: dataSpot!.hardwareId,
            }).then(() =>
              linkSpotHardware({
                id: body.hardwareId,
                spotId: Number(spotId),
              })
            )
          : Promise.resolve()
      hardwareUpdatePromise.then(() => {
        updateSpot(body).then((result) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (result.error) {
            toast.error('Failed updating spot')
            return
          }
          houseId
            ? router.push({
                pathname: ROUTES.HOUSEMANAGER_VISITOR_PARKING_SPOTS,
                query: { houseId },
              })
            : router.push({
                pathname: ROUTES.ADMIN_SPOT_DETAILS,
                query: { spotId, spotUrlBack },
              })
        })
      })
    } else {
      createSpot({
        ...values,
        name: values.name.toUpperCase(),
        height: values.height || null,
        hardwareId: hardware?.id,
      }).then((result: any) => {
        if (result && body.hardwareId) {
          linkSpotHardware({
            id: hardware?.id || 0,
            spotId: Number(result.data.id),
          })
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (result.error) {
          toast.error('Failed creating spot')
          return
        }
        if (setId) linkSpot(result)
        houseId
          ? router.push({
              pathname: ROUTES.HOUSEMANAGER_VISITOR_PARKING_SPOTS,
              query: { houseId },
            })
          : router.push({
              pathname: ROUTES.ADMIN_SET_DETAILS,
              query: { setId, spotUrlBack },
            })
      })
    }
  }

  const filterSpollardList = (searchText: string): void => {
    const list = searchText
      ? spollardList.filter((el) =>
          el.hardwareSerial
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase())
        )
      : spollardList

    if (list) {
      setFilteredSpollardList(list)
    }
  }

  const getSpollardContent = (): ReactElement => {
    return (
      <div className="flex flex-col h-full">
        <Loader loading={isLoading}>
          <section className="placeholder-blue-3">
            <Input
              name="search"
              onChange={(e) => filterSpollardList(e.target.value)}
              prefixIcon={<SearchIcon className="fill-blue-1" />}
              inputClassName="pl-[44px] placeholder-blue-3"
              placeholder="Select Spollard"
              className="!mt-0"
            />
          </section>
          <section className="mt-[25px] placeholder-blue-3 max-h-[calc(100vh-283px)]">
            <div
              className={cn('py-[8px] pt-0 h-full overflow-y-auto grid', {
                'gap-x-[6px] grid-cols-3': maxWidth1366,
                'gap-x-[8px] grid-cols-4': !maxWidth1366 && maxWidth1920,
                'gap-x-[10px] grid-cols-5': !maxWidth1920,
              })}
            >
              {[...filteredSpollardList]
                .sort((a, b) =>
                  a.hardwareSerial.localeCompare(b.hardwareSerial)
                )
                .map((item1) => {
                  return (
                    <div
                      className="flex items-center w-full font-semibold cursor-pointer text-s-lg text-blue-1 mb-[25px]"
                      key={item1.id}
                      onClick={() => setHardware(item1)}
                    >
                      <input
                        type="radio"
                        checked={hardware?.id === item1.id}
                        onChange={() => setHardware(item1)}
                        value={item1.id}
                        className="grow-0"
                      />
                      <label className="cursor-pointer ml-[16px] grow-1">
                        {item1.hardwareSerial}
                      </label>
                    </div>
                  )
                })}
            </div>
          </section>
        </Loader>
      </div>
    )
  }

  const getMainContent = (values, setFieldValue): ReactElement => {
    return (
      <div className="flex flex-col h-full">
        <Loader loading={isLoading}>
          <div className="grow">
            <section className="mb-[25px]">
              <Input
                name="name"
                label="Spot ID"
                placeholder="Spot ID"
                inputClassName="uppercase placeholder:capitalize max-w-[520px]"
                labelClassName="!text-s-base mb-[12px]"
                containerClassName="!shadow-none"
                className="!mt-0"
              />
            </section>
            <section className="mb-[25px]">
              <Textarea
                name="description"
                label="Spot Description"
                placeholder="Describe the spot here, e.g. disabled spot on level 2 near the lift"
                max={250}
                className="mb-[16px] max-w-[520px]"
                labelClassName="!text-s-base mb-[12px]"
                rows={8}
              />
            </section>
            <section className="mb-[25px]">
              <InputForNumber
                name="height"
                label="Maximum Vehicle Height"
                placeholder="0.00 m"
                type={InputTypes.NUMBER}
                inputClassName="w-[150px]"
                containerClassName="!shadow-none"
                labelClassName="!text-s-base mb-[12px]"
                suffix=" m"
                onValueChange={(value) => setFieldValue('height', value)}
                value={values.height}
              />
            </section>
            <section>
              <span className="mb-[4px] text-s-base text-blue-1">
                Electric Vehicle Charger
              </span>
              <div className="flex justify-start mt-[8px] mb-[16px] text-s-sm leading-[16px]">
                <div className="relative flex items-center">
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowCheckboxValidation(false)
                      setFieldValue(
                        'electricCharger.type1',
                        !values.electricCharger.type1
                      )
                    }}
                  >
                    <CheckboxInputCheckmark
                      checked={values.electricCharger.type1}
                    />
                  </div>
                  <span
                    className={cn(
                      'ml-[10px]',
                      `${
                        values.electricCharger.type1
                          ? 'text-primary font-semibold'
                          : 'text-blue-1'
                      } `
                    )}
                  >
                    Type 1
                  </span>
                  {showCheckboxValidation && (
                    <div className="absolute top-[28px] text-red whitespace-nowrap">
                      At least one checkbox must be selected
                    </div>
                  )}
                </div>
                <div className="flex items-center ml-[25px]">
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowCheckboxValidation(false)
                      setFieldValue(
                        'electricCharger.type2',
                        !values.electricCharger.type2
                      )
                    }}
                  >
                    <CheckboxInputCheckmark
                      checked={values.electricCharger.type2}
                    />
                  </div>
                  <span
                    className={cn(
                      'ml-[10px]',
                      `${
                        values.electricCharger.type2
                          ? 'text-primary font-semibold'
                          : 'text-blue-1'
                      } `
                    )}
                  >
                    Type 2
                  </span>
                </div>
              </div>
            </section>
          </div>
        </Loader>
      </div>
    )
  }

  return (
    <Formik
      initialValues={payloadBody}
      onSubmit={(values) => saveSpot(values)}
      enableReinitialize={true}
      validationSchema={spotValidationSchema(
        dataBuilding?.height ? +dataBuilding?.height : dataSpot?.parentHeight
      )}
    >
      {(props) => {
        const { values, setFieldValue } = props

        return (
          <Form className="flex flex-col h-full">
            <PageContent
              title={spotId ? `${dataSpot?.name}` : 'New Spot'}
              tabs={['Main', 'Spollard']}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
              actions={
                <div className="flex">
                  <Button
                    type="submit"
                    mode={ButtonMode.FULL_PRIMARY}
                    className="text-s-lg !font-semibold p-[10px] w-[169px] h-[50px]"
                  >
                    Save
                  </Button>
                </div>
              }
            >
              <Loader loading={isLoading}>
                <TabsContainer
                  value={activeTab}
                  type="header"
                  onChange={setActiveTab}
                >
                  <div className="grow bg-bg">
                    <TabPanel value="Main">
                      {getMainContent(values, setFieldValue)}
                    </TabPanel>
                    <TabPanel value="Spollard">{getSpollardContent()}</TabPanel>
                  </div>
                </TabsContainer>
              </Loader>
            </PageContent>
          </Form>
        )
      }}
    </Formik>
  )
}

export default React.memo(AddSpotDesktop)
