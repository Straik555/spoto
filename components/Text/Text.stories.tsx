import React, { ChangeEvent, FC, useState } from 'react'
import Text from '@components/Text/Text'
import { TextProps, TextVariant } from '@components/Text/Text.model'

export default {
  title: 'Reusable Components/Text',
  component: Text,
}

const Template: FC<TextProps> = ({ children, variant, isLimited }) => {
  return (
    <Text variant={variant} isLimited={isLimited}>
      {children}
    </Text>
  )
}

export const TextDefault = () => {
  const [money, setMoney] = useState<string>('0')
  return (
    <div>
      <input
        className="h-10 p-4 mr-3 border border-solid w-[300px] border-primary rounded-[5px]"
        type="text"
        value={money}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMoney(e.target.value)
        }
      />
      <Template
        variant={isNaN(Number(money)) ? TextVariant.Text : TextVariant.Money}
      >
        {money}
      </Template>
    </div>
  )
}

export const LimitedText = () => {
  return (
    <div className="w-[300px]">
      <Template variant={TextVariant.Text} isLimited>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry
      </Template>
    </div>
  )
}

export const WithoutLimitedText = () => {
  return (
    <div className="w-[300px]">
      <Template variant={TextVariant.Text}>
        Lorem Ipsum is simply dummy text
      </Template>
    </div>
  )
}
