import React, { FC } from 'react'
import classNames from 'classnames'
import Dropdown, {
  DropdownButton,
  DropdownItem,
  DropdownItems,
} from '@components/Dropdown/Dropdown'
import {
  UserCardSpotActionProps,
  UserCardSpotInfoRowProps,
  UserCardSpotProps,
} from '@screens/admin/Users/components/UserCard/UserCard.model'
import { weekdaysEnumToShortLabel } from '@screens/admin/Users/constants'
import ThreeDotMenuIcon from '@assets/icons/three-dot-menu.svg'
import { dateFormats } from '@constants/global'
import { useDateUtil } from '@hooks/useDateUtil'

const UserCardSpot: FC<UserCardSpotProps> = ({
  className,
  action,
  schedule,
  name,
}) => {
  const dateUtil = useDateUtil()
  if (!schedule) return null

  const weekdays =
    schedule.weekDays
      ?.map((wd) => {
        return weekdaysEnumToShortLabel[wd]
      })
      .join(' | ') || ''
  const startDate = dateUtil(schedule.from).format(dateFormats.display0)
  const endDate = schedule.to
    ? dateUtil(schedule.to).format(dateFormats.display0)
    : 'Ongoing'
  const availableHours = schedule.dayTime
    ? `${schedule.dayTime.start} - ${schedule.dayTime.end}`
    : ''

  return (
    <div
      className={classNames(
        'grid grid-cols-1 px-[16px] mt-[16px] desktop:m-0 desktop:p-[25px]',
        className
      )}
    >
      <div className="border-solid bg-blue-4 border-[1px] border-blue-3 rounded-[5px]">
        {name && (
          <div className="font-semibold text-center capitalize border-solid py-[8px] col-span-2 text-s-base border-b-[1px] border-blue-3 text-blue-1 desktop:py-[10px]">
            {name}
          </div>
        )}
        <UserCardSpotInfoRow
          name="Available Day(S)"
          data={weekdays}
          className="border-b-[1px]"
        />
        <UserCardSpotInfoRow
          name="Start"
          data={startDate}
          className="border-b-[1px]"
        />
        <UserCardSpotInfoRow
          name="End"
          data={endDate}
          className="border-b-[1px]"
        />
        <UserCardSpotInfoRow name="Available Hours" data={availableHours} />
        {action}
      </div>
    </div>
  )
}

export const UserCardSpotAction: FC<UserCardSpotActionProps> = ({
  onDelete,
  onEdit,
  onDetails,
  disabled,
}) => {
  const dropdownItemClassName =
    'flex items-center justify-start !p-[0_0_0_13px] h-[44px] text-s-lg !font-semibold !text-blue-1'
  return (
    <div className="absolute top-0 right-0 left-auto flex justify-self-end">
      <Dropdown
        action={
          <DropdownButton className="p-[16px]">
            <ThreeDotMenuIcon className="fill-blue-1" />
          </DropdownButton>
        }
      >
        <DropdownItems className="py-0 mt-0 border border-blue-4 rounded-[5px] shadow-5 w-[141px] top-[16px] right-[14px]">
          {onEdit && (
            <DropdownItem
              onClick={() => onEdit?.()}
              disabled={disabled}
              className={dropdownItemClassName}
            >
              Edit
            </DropdownItem>
          )}
          <DropdownItem
            onClick={() => onDetails?.()}
            disabled={disabled}
            className={dropdownItemClassName}
          >
            Details
          </DropdownItem>
          <DropdownItem
            onClick={() => onDelete?.()}
            disabled={disabled}
            className={dropdownItemClassName}
          >
            Delete
          </DropdownItem>
        </DropdownItems>
      </Dropdown>
    </div>
  )
}

export const UserCardSpotInfoRow: FC<UserCardSpotInfoRowProps> = ({
  name,
  data,
  className,
}) => {
  return (
    <div
      className={classNames(
        'flex items-center justify-between py-[10px] px-[16px] border-solid border-blue-3 last:!border-none desktop:px-[20px] lg-desktop:px-[25px]',
        className
      )}
    >
      <div className="text-left col-span-1 text-s-base text-blue-1">{name}</div>
      <div className="font-semibold text-right text-blue-1 col-span-1 text-s-base">
        {data}
      </div>
    </div>
  )
}

export default UserCardSpot
