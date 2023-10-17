import PlusWhiteIcon from '@assets/icons/circle-icons/blue-plus-white-circle.svg'
import PlusIcon from '@assets/icons/circle-icons/white-plus-blue-circle-19.svg'
import LogInIcon from '@assets/icons/log-in.svg'
import PencilIcon from '@assets/icons/pencil-16.svg'
import QrPrintIcon from '@assets/icons/qr-print.svg'
import TrashOutlinedIcon from '@assets/icons/trash-filled-14.svg'
import TrashOutlinedBigIcon from '@assets/icons/trash-filled-24.svg'
import {
  ButtonIcon,
  ButtonMode,
  ButtonProps,
} from '@components/Button/Button.model'
import Title from '@components/Title/Title'
import cn from 'classnames'
import React, { FC, HTMLAttributes, ReactElement, useMemo } from 'react'
import s from '@screens/houseManager/VisitorParking/Spots/Spots.module.css'

const Button: FC<ButtonProps> = ({
  children,
  mode,
  onClick,
  disabled,
  className,
  icon,
  type = 'button',
  iconClassName,
}) => {
  const iconClassNames = useMemo(
    () =>
      cn(
        {
          'mr-2.5': icon,
          hidden: !icon,
        },
        iconClassName
      ),
    [iconClassName, icon]
  )
  const getClassNames = ({
    disabled,
    className,
  }: Partial<ButtonProps>): string => {
    switch (mode) {
      case ButtonMode.xSMALL:
        return cn(
          className,
          'inline-flex items-center justify-center px-2.5 py-1.5 text-s-xs font-medium text-white rounded-[5px] bg-primary focus:outline-0'
        )
      case ButtonMode.SMALL:
        return cn(
          className,
          'inline-flex items-center justify-center px-7 py-2 text-s-xs font-semibold text-white rounded-[5px] bg-primary focus:outline-0',
          {
            'opacity-30': disabled,
          }
        )
      case ButtonMode.SMALL_SECONDARY:
        return cn(
          className,
          'inline-flex items-center justify-center px-7 py-2 text-s-xs font-semibold text-primary rounded-[5px] bg-primary bg-bg border-2 border-primary focus:outline-0',
          {
            'opacity-70': disabled,
          }
        )
      case ButtonMode.FULL_PRIMARY:
        return cn(
          className,
          'inline-flex items-center justify-center w-full px-8 py-[10px] text-s-lg font-semibold text-white rounded-[5px] bg-primary focus:outline-0',
          {
            'bg-blue-3 cursor-default': disabled,
          }
        )
      case ButtonMode.FULL_SECONDARY:
        return cn(
          className,
          'inline-flex items-center justify-center w-full px-8 py-[10px] text-blue-1 rounded-[5px] focus:outline-0',
          {
            'bg-indigo-200 cursor-default': disabled,
            'bg-white': !disabled,
          }
        )
      case ButtonMode.BASE:
        return cn(
          className,
          'inline-flex items-center justify-center focus:outline-0'
        )
      case ButtonMode.Dashed:
        return cn(
          className,
          s.dashedBorder,
          'flex justify-center items-center rounded-[5px] focus:outline-0'
        )
      default:
        return cn(
          className,
          'inline-flex items-center justify-center w-full px-8 py-[10px] text-s-lg font-semibold text-blue-1 rounded-[5px] bg-bg focus:outline-0'
        )
    }
  }
  const renderIcon = (): ReactElement => {
    return (
      <>
        {icon === ButtonIcon.ADD &&
          (mode === ButtonMode.FULL_PRIMARY ? (
            <PlusWhiteIcon className={iconClassNames} />
          ) : (
            <PlusIcon className={iconClassNames} />
          ))}

        {icon === ButtonIcon.ADD_WHITE && (
          <PlusWhiteIcon className={iconClassNames} />
        )}

        {icon === ButtonIcon.EDIT && (
          <PencilIcon className={cn(iconClassNames, 'fill-primary')} />
        )}

        {icon === ButtonIcon.EDIT_WHITE && (
          <PencilIcon className={cn(iconClassNames, 'fill-white')} />
        )}

        {icon === ButtonIcon.DELETE_OUTLINED && (
          <TrashOutlinedIcon className={cn(iconClassNames, 'fill-primary')} />
        )}
        {icon === ButtonIcon.DELETE_OUTLINED_BIG && (
          <TrashOutlinedBigIcon className={iconClassNames} />
        )}
        {icon === ButtonIcon.QR_PRINT && (
          <QrPrintIcon className={iconClassNames} />
        )}
        {icon === ButtonIcon.LOG_IN && (
          <LogInIcon className={cn(iconClassNames, 'fill-white')} />
        )}
      </>
    )
  }

  return (
    <Title
      as="button"
      className={getClassNames({ disabled, className })}
      onClick={onClick as HTMLAttributes<HTMLButtonElement>['onClick']}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      disabled={disabled}
      type={type}
      noCap
    >
      {renderIcon()} {children}
    </Title>
  )
}

export default Button
