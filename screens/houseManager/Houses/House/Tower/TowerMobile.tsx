import React, { FC, useEffect, useState } from 'react'
import { houseApi } from '@api/house'
import { HouseModel } from '@api/house/types'
import Button from '@components/Button'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import { CheckboxInputCheckmark } from '@components/Form/Checkbox/Checkbox'
import CheckboxGroup from '@components/Form/Checkbox/CheckboxGroup'
import { withForm } from '@components/Form/withForm'
import { Loader } from '@components/Loader'
import { PageHeaderMobile } from '@components/PageHeader'
import { ROUTES } from '@constants/routes'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import UserAvatar from '@screens/admin/Users/components/UserAvatar/UserAvatar'
import SpotoDefaultLogoBlueIcon from '@assets/icons/large-icons/spoto-default-logo-blue.svg'
import {
  TowerFormValues,
  TowerProps,
} from '@screens/houseManager/Houses/House/Tower/Tower.model'
import { downloadBlobFile } from '@screens/houseManager/Houses/House/Tower/utils/downloadBlobFile'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import s from './Tower.module.css'
import Input from '@components/Form/Input/Input'
import SearchIcon from '@assets/icons/search-15.svg'
import TrashOutlinedBigIcon from '@assets/icons/trash-outlined-20.svg'
import BluePlusWhiteCircleIcon from '@assets/icons/circle-icons/white-plus-blue-circle-24.svg'
import Form from '@components/Form/Form'

const TowerMobile: FC<TowerProps> = ({ towerId, houseId }) => {
  const router = useRouter()
  const { values, setFieldValue } = useTypedFormikContext<TowerFormValues>()
  const [filteredApartmentsList, setFilteredApartmentsList] = useState<
    { id: number; name: string }[]
  >([])
  const [house, setHouse] = useState<HouseModel | null>(null)

  const { data: houses } = houseApi.endpoints.getHousesByUser.useQuery()

  const { data: towers } = houseApi.endpoints.getTowers.useQuery(+houseId, {
    skip: !houseId,
  })
  const [
    performQrCode,
    {
      data: performQrCodeData,
      isSuccess: performQrCodeIsSuccess,
      isError: performQrCodeIsError,
    },
  ] = houseApi.endpoints.performQrCode.useMutation()

  const { data: tower, isLoading: isLoadingTower } =
    houseApi.endpoints.getTowerById.useQuery(+towerId, {
      skip: !towerId,
    })

  useEffect(() => {
    if (houses && houses[0]) {
      const parentHouse = houses.filter((item) => item.id === +houseId)[0]
      if (parentHouse) setHouse(parentHouse)
    }
  }, [houses])

  useEffect(() => {
    filterApartments('')
    if (tower && tower) {
      if (tower.apartments.length > 1)
        setFilteredApartmentsList(tower.apartments)
    }
  }, [tower])

  useEffect(() => {
    if (performQrCodeIsError) {
      toast.error('Failed to download QR codes')
      return
    }

    if (performQrCodeIsSuccess && performQrCodeData) {
      if (performQrCodeData?.size) {
        downloadBlobFile(
          performQrCodeData,
          `${tower?.name}-${values.checked.length} apartments`
        )
      } else {
        toast.success('You will receive QR Codes email soon')
      }
    }
  }, [performQrCodeIsSuccess, performQrCodeIsError, performQrCodeData])

  const getBackButtonLink = () => {
    if (towers?.length === 1 && houses?.length === 1) {
      return {
        pathname: ROUTES.HOME,
      }
    }
    if (towers?.length === 1 && houses?.length !== 1) {
      return {
        pathname: ROUTES.HOUSEMANAGER_HOUSES,
      }
    }
    return {
      pathname: ROUTES.HOUSEMANAGER_HOUSE,
      query: {
        houseId,
      },
    }
  }

  const filterApartments = (searchText: string): void => {
    const list = searchText
      ? tower?.apartments.filter((el) => {
          return el.name
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase())
        })
      : tower?.apartments
    if (list) {
      setFilteredApartmentsList(list)
    }
  }

  const isAllChecked = (checkedValues) => {
    return checkedValues?.length === filteredApartmentsList?.length
  }

  const renderApartments = (values, setFieldValue) => {
    const residentCard = (item) => {
      const isChecked = values.checked.includes(item.id)
      const isEmpty = item.activeOccupantsCount === 0
      let checkedValues = [values.checked]
      const toggleCheckbox = () => {
        if (isChecked) {
          checkedValues = values.checked.filter((id) => id !== item.id)
          setFieldValue('checked', checkedValues)
        }
        if (!isChecked) {
          checkedValues = [...values.checked, item.id]
          setFieldValue('checked', checkedValues)
        }
        setFieldValue('isAllChecked', isAllChecked(checkedValues))
      }

      return (
        <div
          key={item.id}
          className="font-semibold border-b cursor-pointer text-s-xs py-[10px] border-[#EDF0FB]"
          onClick={() =>
            item.id &&
            router.push({
              pathname: ROUTES.HOUSEMANAGER_HOUSE_TOWER_APARTMENT,
              query: {
                houseId,
                towerId,
                apartmentId: item.id,
              },
            })
          }
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  toggleCheckbox()
                }}
              >
                <CheckboxInputCheckmark checked={isChecked} />
              </div>
              <UserAvatar
                thumbKey={''}
                defaultAvatar={
                  <SpotoDefaultLogoBlueIcon
                    className={`inline-block w-[50px] h-[50px] rounded-full ml-[16px] ${
                      isEmpty ? s.disabledLogo : ''
                    }`}
                  />
                }
              />
              <span
                className={cn(`text-s-base font-semibold ml-[20px]`, {
                  'text-blue-3': isEmpty,
                })}
              >
                {item.name}
              </span>
            </div>
            {isEmpty && <BluePlusWhiteCircleIcon />}
          </div>
        </div>
      )
    }
    return (
      <CheckboxGroup name="checked">
        {filteredApartmentsList.map((item) => residentCard(item))}
      </CheckboxGroup>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeaderMobile
        title={`${house?.name || ''}${tower?.name ? `, ${tower?.name}` : ''}`}
        showBackButton
        backButtonLink={getBackButtonLink()}
      />
      <Form initialValues={{ search: '' }} className="p-[16px]">
        <Input
          name="search"
          onChange={(e) => filterApartments(e.target.value)}
          prefixIcon={<SearchIcon className="fill-blue-1" />}
          inputClassName="pl-[36px] border-blue-4 !text-s-sm !font-semibold bg-blue-4 !py-[11px] h-[40px] placeholder:text-blue-1"
          placeholder="Search by number"
          className="!mt-0"
        />
      </Form>
      <div className="flex items-center justify-between px-[16px]">
        <Button
          mode={ButtonMode.FULL_PRIMARY}
          icon={ButtonIcon.QR_PRINT}
          disabled={!values.checked.length}
          onClick={() => {
            performQrCode({
              towerId: +towerId,
              apartmentIds: values.checked,
            })
          }}
          className="!text-s-lg !font-semibold"
        >
          Print QR Codes
        </Button>
      </div>
      <div className="flex justify-between px-[16px] mt-[26px] text-s-lg">
        <div
          className={cn('flex items-center', {
            'text-primary !font-semibold': values.isAllChecked,
            'text-blue-1': !values.isAllChecked,
          })}
          onClick={() => {
            setFieldValue('isAllChecked', true)
            setFieldValue(
              'checked',
              filteredApartmentsList.map((item) => item.id)
            )
          }}
        >
          <CheckboxInputCheckmark checked={values.isAllChecked} size="large" />
          <span className="ml-[10px]">Select All</span>
        </div>
        <div
          onClick={() => {
            setFieldValue('isAllChecked', false)
            setFieldValue('checked', [])
          }}
          className={cn(
            `${
              values.checked.length ? 'text-primary' : 'text-blue-1'
            } w-auto !p-0 !font-normal flex items-center`
          )}
        >
          <TrashOutlinedBigIcon
            className={cn('mr-[5px]', {
              'fill-primary': values.checked.length,
              'fill-blue-1': !values.checked.length,
            })}
          />
          Clear All
        </div>
      </div>
      <Loader loading={isLoadingTower}>
        <section className="px-4 pt-[15px]">
          {renderApartments(values, setFieldValue)}
        </section>
      </Loader>
    </div>
  )
}

export default withForm<TowerProps>(
  {
    initialValues: { isAllChecked: false, checked: [] } as TowerFormValues,
    className: 'h-full',
  },
  TowerMobile
)
