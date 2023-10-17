import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { PageHeaderMobile } from '@components/PageHeader'
import { ROUTES } from '@constants/routes'
import { houseApi } from '@api/house'
import { Loader } from '@components/Loader'
import { HouseModel } from '@api/house/types'
import Input from '@components/Form/Input/Input'
import SearchIcon from '@assets/icons/search-15.svg'
import Form from '@components/Form/Form'

const VisitorParking: React.FC = () => {
  const router = useRouter()
  const [filteredHousesList, setFilteredHousesList] = useState<HouseModel[]>([])

  const { data: dataHouses, isLoading: isLoadingHouses } =
    houseApi.endpoints.getHousesByUser.useQuery()

  useEffect(() => {
    filterHousesList('')
    if (dataHouses) {
      if (dataHouses.length > 1) setFilteredHousesList(dataHouses)
    }
  }, [dataHouses])

  const filterHousesList = (searchText: string): void => {
    const list = searchText
      ? dataHouses?.filter((el) => {
          return (
            el.name
              .toLocaleLowerCase()
              .includes(searchText.toLocaleLowerCase()) ||
            el.address
              .toLocaleLowerCase()
              .includes(searchText.toLocaleLowerCase())
          )
        })
      : dataHouses
    if (list) {
      setFilteredHousesList(list)
    }
  }

  const residentCard = (item) => {
    return (
      <div
        key={item.id}
        className="text-s-sm bg-white border cursor-pointer px-[16px] pt-[10px] pb-[6px] border-blue-2 rounded-[5px] mb-[8px]"
        onClick={() =>
          item.id &&
          router.push({
            pathname: ROUTES.HOUSEMANAGER_VISITOR_PARKING_SPOTS,
            query: {
              houseId: item.id,
            },
          })
        }
      >
        <div className=" text-blue-1 mb-[3px]">Building Name</div>
        <div className="mb-[4px] text-s-base">{item.name}</div>
        <div className="text-blue-1 mb-[3px]">Building Address</div>
        <div className="text-s-base">{item.address}</div>
      </div>
    )
  }

  const renderHouses = () => {
    return filteredHousesList.map((item) => residentCard(item))
  }

  return (
    <div className="flex flex-col h-full bg-bg">
      <PageHeaderMobile title="Spots" />
      <Form initialValues={{ search: '' }} className="p-4">
        <Input
          name="search"
          onChange={(e) => filterHousesList(e.target.value)}
          prefixIcon={<SearchIcon className="fill-blue-1" />}
          inputClassName="pl-[36px] border-blue-4 !text-s-sm !font-medium bg-blue-4 !py-[11px] h-[40px] placeholder:text-blue-1"
          placeholder="Search by building name or address"
          className="!mt-0"
        />
      </Form>
      <Loader loading={isLoadingHouses}>
        <section className="px-[16px]">{renderHouses()}</section>
      </Loader>
    </div>
  )
}

export default React.memo(VisitorParking)
