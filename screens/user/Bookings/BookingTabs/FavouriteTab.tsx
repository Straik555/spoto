import React, { ChangeEvent, FC, useMemo, useState } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { BookingTabsProps } from '@screens/user/Bookings/BookingTabs/BookingTabs.module'
import { ButtonMode } from '@components/Button/Button.model'
import Button from '@components/Button'
import Loader from '@components/Loader/Loader'
import bookingApi from '@api/booking'
import { ROUTES } from '@constants/routes'
import SearchIconFull from '@assets/icons/search-20.svg'
import SearchIcon from '@assets/icons/search-15.svg'
import StarIcon from '@assets/icons/star.svg'
import LogoSpotoSmall from '@assets/icons/logos/spoto-logo-blue-small.svg'

const FavouriteTab: FC<BookingTabsProps> = ({ isDesktop }) => {
  const router = useRouter()
  const [search, setSearch] = useState<string>('')
  const { data: favourites, isLoading } =
    bookingApi.endpoints.getBookingFavourite.useQuery(null)
  const [addFavourite] = bookingApi.endpoints.favoritesAdd.useMutation()
  const [deleteFavourite] = bookingApi.endpoints.favoritesDelete.useMutation()
  const filteredFavorites = useMemo(() => {
    const searchRegExp = new RegExp(search, 'gi')
    return favourites?.filter((item) => searchRegExp.test(item.address))
  }, [favourites, search])

  return (
    <>
      <div
        className={cn('relative', {
          'px-4 py-[15px]': !isDesktop,
          'mb-[15px]': isDesktop,
        })}
      >
        {isDesktop ? (
          <SearchIconFull className="absolute top-[14px] left-[15px] fill-blue-1" />
        ) : (
          <SearchIcon className="absolute top-7 left-8 fill-blue-1" />
        )}
        <input
          type="text"
          placeholder="Search"
          className={cn(
            'w-full border pl-10 pr-4 text-xs bg-[#edf0fb] rounded-[5px] font-semibold',
            {
              'h-[50px] pl-11 text-sm': isDesktop,
              'h-10': !isDesktop,
            }
          )}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
      </div>
      <Loader loading={isLoading}>
        {filteredFavorites?.length ? (
          <div className={cn('p-4', { 'flex flex-wrap': isDesktop })}>
            {filteredFavorites.map((favourite, idx) => (
              <div
                className={cn('mb-[10px]', {
                  'pt-0': !isDesktop,
                  'w-[483px] h-[369px] border border-blue-3 rounded-[10px] overflow-hidden mb-[15px]':
                    isDesktop,
                  'mr-[15px]': isDesktop && idx < filteredFavorites?.length,
                })}
                key={favourite.id}
              >
                <div
                  className={cn({
                    'flex flex-col overflow-hidden rounded-[10px] border border-blue-2':
                      !isDesktop,
                    'w-[483px] h-[369px]': isDesktop,
                  })}
                >
                  <div
                    className={cn(
                      'w-full object-cover relative h-[154px] bg-blue-3 flex justify-center items-center',
                      {
                        'h-[215px]': isDesktop,
                      }
                    )}
                  >
                    <LogoSpotoSmall className="fill-blue-4" />
                  </div>
                  <div
                    className={cn('flex', {
                      'flex-col px-[25px] pt-[20px]': isDesktop,
                      'items-center justify-between px-4 pt-[12px] pb-[18px]':
                        !isDesktop,
                    })}
                  >
                    <span
                      className={cn('text-xs leading-[15px] text-[#8d9dcf]', {
                        'text-[16px] leading-6 mb-[5px]': isDesktop,
                      })}
                    >
                      Location
                    </span>
                    <p
                      className={cn(
                        'mb-0 text-xs font-semibold text-black overflow-ellipsis overflow-hidden whitespace-nowrap',
                        {
                          'text-base': isDesktop,
                          'max-w-[200px] ml-2 ': !isDesktop,
                        }
                      )}
                    >
                      {favourite.address}
                    </p>
                  </div>
                  {!isDesktop && <hr />}
                  <div
                    className={cn('flex items-center justify-between ', {
                      'p-[25px_25px_20px_25px]': isDesktop,
                      'p-4': !isDesktop,
                    })}
                  >
                    {isDesktop ? (
                      <div
                        className="flex items-center"
                        onClick={() => {
                          filteredFavorites.some(
                            (spot) => spot?.placeId === favourite.placeId
                          )
                            ? deleteFavourite(favourite?.placeId)
                            : addFavourite({ placeId: favourite.spotId })
                        }}
                      >
                        <StarIcon
                          className={cn('fill-primary', {
                            '!fill-blue-2': !favourite,
                          })}
                        />
                        <p
                          className={cn(
                            'text-sm font-semibold ml-[15px] text-blue-2',
                            { '!text-primary': favourite }
                          )}
                        >
                          Delete from Favourites
                        </p>
                      </div>
                    ) : (
                      <StarIcon
                        className={cn(' fill-blue-2', {
                          '!fill-primary': filteredFavorites.some(
                            (spot) => spot?.placeId === favourite.placeId
                          ),
                        })}
                        onClick={() => {
                          filteredFavorites.some(
                            (spot) => spot?.placeId === favourite.placeId
                          )
                            ? deleteFavourite(favourite?.placeId)
                            : addFavourite({ placeId: favourite.spotId })
                        }}
                      />
                    )}
                    <Button
                      className={cn('ml-1 w-40 rounded-[5px]', {
                        'w-64': history,
                        'w-[214px] h-11 text-base px-0': isDesktop,
                        'w-[247px] !text-sm h-10': !isDesktop,
                      })}
                      mode={ButtonMode.SMALL}
                      onClick={() =>
                        router.push({
                          pathname: ROUTES.FIND_SPOT,
                          query: { id: favourite.placeId },
                        })
                      }
                    >
                      Book This Parking Spot
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center grow flex flex-col justify-center items-center px-4">
            <p
              className={cn(
                'flex justify-center items-center text-s-xl font-semibold text-blue-3 grow'
              )}
            >
              No Favourites
            </p>
            <Button
              className={cn('m-[16px] !font-semibold', {
                'w-[270px] h-[50px] text-s-xl': isDesktop,
                'h-10 !h-[44px] text-s-lg': !isDesktop,
              })}
              mode={ButtonMode.FULL_PRIMARY}
              onClick={() => router.push({ pathname: ROUTES.HOME })}
            >
              Find a Spot
            </Button>
          </div>
        )}
      </Loader>
    </>
  )
}

export default FavouriteTab
