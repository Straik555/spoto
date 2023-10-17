import Title from '@components/Title/Title'
import React, { FC } from 'react'

export default {
  title: 'Reusable Components/Title',
  component: Title,
}

export const DefaultTitle: FC = () => {
  return <Title>title</Title>
}

export const CustomizedTitle: FC = () => {
  return (
    <Title as="p" className="mb-2 font-normal text-blue-1 text-s-sm">
      customized title
    </Title>
  )
}

export const NoCapitalizationTitle: FC = () => {
  return <Title noCap>no capitalization title</Title>
}
