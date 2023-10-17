import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { PageHeaderMobile } from '@components/PageHeader'
import UserAvatar from '@screens/admin/Users/components/UserAvatar/UserAvatar'
import { ROUTES } from '@constants/routes'
import { houseApi } from '@api/house'
import { Loader } from '@components/Loader'
import { HouseModel } from '@api/house/types'
import SpotoDefaultLogoBlueIcon from '@assets/icons/large-icons/spoto-default-logo-blue.svg'

const HouseMobile: React.FC<{ houseId: string }> = ({ houseId }) => {
  const router = useRouter()
  const [house, setHouse] = useState<HouseModel | null>(null)
  const { data: houses } = houseApi.endpoints.getHousesByUser.useQuery()

  const { data: towers, isLoading: isLoadingTowers } =
    houseApi.endpoints.getTowers.useQuery(+houseId, {
      skip: !houseId,
    })

  useEffect(() => {
    if (houses && houses[0]) {
      const parentHouse = houses.filter((item) => item.id === +houseId)[0]
      if (parentHouse) setHouse(parentHouse)
    }
  }, [houses])

  useEffect(() => {
    if (towers) {
      if (towers.length === 1) {
        router.push({
          pathname: ROUTES.HOUSEMANAGER_HOUSE_TOWER,
          query: {
            houseId: houseId,
            towerId: towers[0].id,
          },
        })
      }
    }
  }, [towers])

  const getBackButtonLink = () => {
    if (houses?.length === 1) {
      return {
        pathname: ROUTES.HOME,
      }
    }
    return {
      pathname: ROUTES.HOUSEMANAGER_HOUSES,
    }
  }

  const renderTowers = () => {
    const houseCard = (item) => {
      return (
        <div
          key={item.id}
          className="flex justify-between text-s-sm font-semibold border cursor-pointer px-[19px] py-[15px] border-blue-2 rounded-[5px] mb-[8px]"
          onClick={() =>
            item.id &&
            router.push({
              pathname: ROUTES.HOUSEMANAGER_HOUSE_TOWER,
              query: {
                houseId,
                towerId: item.id,
              },
            })
          }
        >
          <div>
            <UserAvatar
              thumbKey={''}
              defaultAvatar={
                <SpotoDefaultLogoBlueIcon className="inline-block w-[50px] h-[50px] rounded-full fill-white" />
              }
            />
            <span className="text-s-base font-semibold ml-[15px]">
              {item.name}
            </span>
          </div>
          <div className="flex items-center font-semibold text-left text-primary">
            {`${item.apartmentsCount} Apartment${
              item.apartmentsCount !== 1 ? 's' : ''
            }`}
          </div>
        </div>
      )
    }
    return towers?.map((item) => houseCard(item))
  }

  return (
    <div className="flex flex-col h-full bg-bg">
      <PageHeaderMobile
        title={house?.name}
        showBackButton
        backButtonLink={getBackButtonLink()}
      />
      <Loader loading={isLoadingTowers}>
        <section className="px-[16px] pt-[15px]">{renderTowers()}</section>
      </Loader>
    </div>
  )
}

export default React.memo(HouseMobile)
