import React from 'react'
import CloseIcon from '@assets/icons/close-14.svg'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { SetModel } from '@api/set/types'
import { ROUTES } from '@constants/routes'
import Title from '@components/Title/Title'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import Dropdown, {
  DropdownButton,
  DropdownItems,
  DropdownItem,
} from '@components/Dropdown/Dropdown'
import ThreeDotMenuIcon from '@assets/icons/three-dot-menu.svg'

const SetItem: React.FC<{ set: SetModel; onDeleteSpot: () => void }> = ({
  set,
  onDeleteSpot,
}) => {
  const { isDesktop } = useDeviceInfo()
  const router = useRouter()

  const handleRouting = () => {
    router.push({
      pathname: ROUTES.ADMIN_SET_DETAILS,
      query: {
        setId: set.id,
      },
    })
  }

  return (
    <div
      className={cn('relative border border-blue-3 overflow-hidden', {
        'rounded-[10px]': isDesktop,
        'rounded-[5px] mb-[8px]': !isDesktop,
      })}
      onClick={!isDesktop ? handleRouting : undefined}
    >
      <section
        className={cn(
          'flex flex-col justify-between border-b border-solid border-blue-4',
          {
            'p-[25px] pb-[15px]': isDesktop,
            'p-[16px]': !isDesktop,
          }
        )}
      >
        {isDesktop ? (
          <Dropdown
            action={
              <DropdownButton className="absolute -top-[11px] right-[0]">
                <ThreeDotMenuIcon className="fill-blue-1" />
              </DropdownButton>
            }
          >
            <DropdownItems className="border-blue-4 shadow-5 w-[141px]">
              <DropdownItem onClick={handleRouting} className="font-semibold">
                Details
              </DropdownItem>
              <DropdownItem onClick={onDeleteSpot} className="font-semibold">
                Delete
              </DropdownItem>
            </DropdownItems>
          </Dropdown>
        ) : (
          <CloseIcon
            className="absolute m-3 cursor-pointer -top-[3px] -right-[3px] fill-blue-2"
            onClick={(e) => {
              e.stopPropagation()
              onDeleteSpot()
            }}
          />
        )}
        <Title
          as="h3"
          noCap
          className={cn('mb-1 font-semibold text-primary', {
            'text-s-xl': isDesktop,
            'text-s-lg': !isDesktop,
          })}
        >
          {set.name
            ? `${set.name.slice(0, 1).toUpperCase()}${set.name.slice(1)}`
            : ''}
        </Title>
        <div className="flex justify-between text-sm text-black font-semibold">
          <span>Total Spots - {set.spots.length}</span>
        </div>
      </section>

      <section
        className={cn('overflow-hidden', {
          'p-[25px] pt-[11px] h-[105px] max-h-[105px]': isDesktop,
          'p-[16px] h-[88px] max-h-[88px]': !isDesktop,
        })}
      >
        <span
          className={cn('text-blue-1', {
            '!text-s-xs': isDesktop,
            '!text-s-sm': !isDesktop,
          })}
        >
          Set Description
        </span>
        <div
          className={cn('text-blue-1', {
            '!text-s-base mt-[6px]': isDesktop,
            '!text-s-sm mt-[2px]': !isDesktop,
          })}
        >
          {set.description}
        </div>
      </section>
    </div>
  )
}

export default React.memo(SetItem)
