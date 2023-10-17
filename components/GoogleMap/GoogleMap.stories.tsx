import React from 'react'
import GoogleMap from '@components/GoogleMap/GoogleMap'
import { ComponentStory } from '@storybook/react'

export default {
  title: 'Reusable Components/GoogleMap',
  component: GoogleMap,
}

const Template: ComponentStory<typeof GoogleMap> = (args) => {
  return (
    <div className="w-full h-[700px]">
      <GoogleMap {...args} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  center: {
    lat: -33.865143,
    lng: 151.2099,
  },
}
