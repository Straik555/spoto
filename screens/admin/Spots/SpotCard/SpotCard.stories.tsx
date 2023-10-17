import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SpotCard from './SpotCard'

export default {
  title: 'screens/admin/components/SpotCard',
  component: SpotCard,
} as ComponentMeta<typeof SpotCard>

const Template: ComponentStory<typeof SpotCard> = ({ ...args }) => (
  <SpotCard {...args} />
)

export const WithElectricCharger = Template.bind({})
WithElectricCharger.args = {
  id: 'spot-1',
  status: true,
  isActive: true,
  electricCharger: { type1: true, type2: false },
}

export const WithoutElectricCharger = Template.bind({})
WithoutElectricCharger.args = {
  id: 'spot-2',
  status: true,
  isActive: true,
  electricCharger: { type1: false, type2: false },
}
