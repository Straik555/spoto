import React, { useState, useEffect } from 'react'
import ElectricCharger18Icon from '@assets/icons/circle-icons/charging-green-circle-18.svg'
import ElectricCharger30Icon from '@assets/icons/circle-icons/charging-green-circle-30.svg'
import CloseIcon from '@assets/icons/close-14.svg'
import { SpotCardProps } from '@screens/admin/Spots/SpotCard/SpotCard.model'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import cn from 'classnames'
import Dropdown, {
  DropdownButton,
  DropdownItems,
  DropdownItem,
} from '@components/Dropdown/Dropdown'
import ThreeDotMenuIcon from '@assets/icons/three-dot-menu.svg'

const SpotCard: React.FC<SpotCardProps> = ({
  id,
  status,
  isActive,
  onClick,
  electricCharger,
  onDeleteSpot,
}) => {
  const [isElectricCharger, setIsElectricCharger] = useState(false)
  const { isDesktop } = useDeviceInfo()

  useEffect(() => {
    const spotChargerTypes = Object.keys(electricCharger || {}).reduce(
      (p, c) => {
        if (electricCharger[c]) p[c] = electricCharger[c]
        return p
      },
      {}
    )
    setIsElectricCharger(!!Object.keys(spotChargerTypes).length)
  }, [electricCharger])

  return (
    <div
      className={cn('text-blue-1', {
        'bg-blue-4 shadow-[0_0_0_1px_#4E77F7]': isActive,
        'shadow-[0_0_0_1px_#CBD4EE]': !isActive,
        'pl-[20px] pr-[15px] py-[10px] rounded-[10px] h-[90px]': isDesktop,
        'pl-[15px] pr-[10px] py-[10px] rounded-[5px] h-[72px]': !isDesktop,
        'hover:shadow-[0_0_0_3px_#4E77F7]': isDesktop,
      })}
      onClick={() => {
        if (!isDesktop) onClick?.()
      }}
    >
      <div className="flex justify-between">
        <div
          className={cn(
            'flex items-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%)] w-[calc(100%)]',
            {
              'border-primary text-primary bg-blue-4 font-semibold': isActive,
              'text-blue-1': !isActive,
              'text-s-2xl': isDesktop,
              'text-s-lg': !isDesktop,
            }
          )}
        >
          <div
            className={cn(
              'whitespace-nowrap overflow-hidden text-ellipsis font-semibold',
              {
                'max-w-[calc(100%-50px)]': isDesktop,
                'max-w-[calc(100%-30px)]': !isDesktop,
              }
            )}
          >
            {id}
          </div>
          {isElectricCharger && !isDesktop && (
            <ElectricCharger18Icon className="ml-[5px]" />
          )}
          {isElectricCharger && isDesktop && (
            <ElectricCharger30Icon className="ml-[10px]" />
          )}
        </div>

        {isDesktop ? (
          <Dropdown
            action={
              <DropdownButton className="">
                <ThreeDotMenuIcon className="fill-blue-1" />
              </DropdownButton>
            }
          >
            <DropdownItems className="border-blue-4 shadow-5 w-[141px]">
              <DropdownItem onClick={onClick} className="font-semibold">
                Details
              </DropdownItem>
              <DropdownItem onClick={onDeleteSpot} className="font-semibold">
                Delete
              </DropdownItem>
            </DropdownItems>
          </Dropdown>
        ) : (
          <CloseIcon
            onClick={(e) => {
              e.stopPropagation()
              onDeleteSpot?.()
            }}
          />
        )}
      </div>
      <div
        className={cn(`font-semibold`, {
          'text-primary': isActive,
          'text-blue-1': !isActive,
          'mt-[9px] text-s-lg': isDesktop,
          'mt-[10px] text-xs': !isDesktop,
        })}
      >
        {status ? 'Linked' : 'Unlinked'}
      </div>
    </div>
  )
}

export default SpotCard
