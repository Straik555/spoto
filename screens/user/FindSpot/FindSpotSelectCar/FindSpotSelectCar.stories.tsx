import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import FindSpotSelectCar from './FindSpotSelectCar'

export default {
  title: 'screens/user/Bookings/components/SelectCar',
  component: FindSpotSelectCar,
} as ComponentMeta<typeof FindSpotSelectCar>

const Template: ComponentStory<typeof FindSpotSelectCar> = (args) => (
  <div className="flex p-20">
    <FindSpotSelectCar {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  price: [1],
  active: true,
  car: false,
  charging: true,
  isEmpty: false,
  availableSpotCount: 0,
}
