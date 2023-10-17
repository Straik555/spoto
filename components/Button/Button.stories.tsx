import React, { FC, useState } from 'react'
import Button from '@components/Button'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'

export default {
  title: 'Reusable Components/Button',
  component: Button,
}

const Template: FC<{ value: number }> = ({ children, value }) => {
  return (
    <div>
      {children}
      <p className="mt-3">Clicks counter: {value}</p>
    </div>
  )
}

export const AddButtonSmallWhite = () => {
  const [counter, setCounter] = useState(0)
  return (
    <Template value={counter}>
      <Button
        mode={ButtonMode.xSMALL}
        icon={ButtonIcon.ADD_WHITE}
        onClick={() => setCounter(counter + 1)}
      >
        Enabled button
      </Button>
      &nbsp;
      <Button
        mode={ButtonMode.xSMALL}
        icon={ButtonIcon.ADD_WHITE}
        onClick={() => setCounter(counter + 1)}
        disabled
      >
        Disabled button
      </Button>
    </Template>
  )
}

export const AddButtonFullPrimary = () => {
  const [counter, setCounter] = useState(0)
  return (
    <Template value={counter}>
      <Button
        mode={ButtonMode.FULL_PRIMARY}
        icon={ButtonIcon.ADD}
        onClick={() => setCounter(counter + 1)}
      >
        Enabled button
      </Button>
      &nbsp;
      <Button
        mode={ButtonMode.FULL_PRIMARY}
        icon={ButtonIcon.ADD}
        onClick={() => setCounter(counter + 1)}
        disabled
      >
        Disabled button
      </Button>
    </Template>
  )
}

export const EditButtonFullSecondary = () => {
  const [counter, setCounter] = useState(0)
  return (
    <Template value={counter}>
      <Button
        mode={ButtonMode.FULL_SECONDARY}
        icon={ButtonIcon.EDIT}
        onClick={() => setCounter(counter + 1)}
      >
        Enabled button
      </Button>
      &nbsp;
      <Button
        mode={ButtonMode.FULL_SECONDARY}
        icon={ButtonIcon.EDIT}
        onClick={() => setCounter(counter + 1)}
        disabled
      >
        Disabled button
      </Button>
    </Template>
  )
}

export const EditButtonSmallWhite = () => {
  const [counter, setCounter] = useState(0)
  return (
    <Template value={counter}>
      <Button
        mode={ButtonMode.SMALL}
        icon={ButtonIcon.EDIT_WHITE}
        onClick={() => setCounter(counter + 1)}
      >
        Enabled button
      </Button>
      &nbsp;
      <Button
        mode={ButtonMode.SMALL}
        icon={ButtonIcon.EDIT_WHITE}
        onClick={() => setCounter(counter + 1)}
        disabled
      >
        Disabled button
      </Button>
    </Template>
  )
}

export const ButtonSmallSecondary = () => {
  const [counter, setCounter] = useState(0)
  return (
    <Template value={counter}>
      <Button
        onClick={() => setCounter(counter + 1)}
        mode={ButtonMode.SMALL_SECONDARY}
      >
        Enabled button
      </Button>
      &nbsp;
      <Button
        onClick={() => setCounter(counter + 1)}
        mode={ButtonMode.SMALL_SECONDARY}
        disabled
      >
        Disabled button
      </Button>
    </Template>
  )
}

export const QRCodeButtonIcon = () => {
  const [counter, setCounter] = useState(0)
  return (
    <Template value={counter}>
      <Button
        mode={ButtonMode.FULL_PRIMARY}
        icon={ButtonIcon.QR_PRINT}
        onClick={() => setCounter(counter + 1)}
      >
        Print QR-Сode
      </Button>
      &nbsp;
      <Button
        mode={ButtonMode.FULL_PRIMARY}
        icon={ButtonIcon.QR_PRINT}
        onClick={() => setCounter(counter + 1)}
        disabled
      >
        Print QR-Сode disabled
      </Button>
    </Template>
  )
}

export const EditButtonIcon = () => {
  const [counter, setCounter] = useState(0)
  return (
    <Template value={counter}>
      <Button
        mode={ButtonMode.BASE}
        icon={ButtonIcon.EDIT}
        onClick={() => setCounter(counter + 1)}
        iconClassName="mr-0"
      />
    </Template>
  )
}

export const DeleteButtonIcon = () => {
  const [counter, setCounter] = useState(0)
  return (
    <Template value={counter}>
      <Button
        mode={ButtonMode.BASE}
        icon={ButtonIcon.DELETE_OUTLINED}
        onClick={() => setCounter(counter + 1)}
        iconClassName="mr-0 fill-blue-1"
      />
    </Template>
  )
}

export const DeleteButtonFullSecondary = () => {
  const [counter, setCounter] = useState(0)
  return (
    <Template value={counter}>
      <Button
        mode={ButtonMode.FULL_SECONDARY}
        icon={ButtonIcon.DELETE_OUTLINED}
        onClick={() => setCounter(counter + 1)}
      >
        Delete Vehicle
      </Button>
    </Template>
  )
}

export const DeleteButton = () => {
  const [counter, setCounter] = useState(0)
  return (
    <Template value={counter}>
      <Button
        icon={ButtonIcon.DELETE_OUTLINED_BIG}
        onClick={() => setCounter(counter + 1)}
      >
        Clear All
      </Button>
    </Template>
  )
}

export const CustomStylesButton: FC = () => {
  const [counter, setCounter] = useState(0)
  return (
    <Template value={counter}>
      <Button
        mode={ButtonMode.FULL_PRIMARY}
        icon={ButtonIcon.ADD}
        onClick={() => setCounter(counter + 1)}
        className="mt-4 !p-2 text-s-base w-[260px]"
      >
        Add Account
      </Button>
    </Template>
  )
}
