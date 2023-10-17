import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import PropertySection from './PropertySection'
import { TextStyleProps } from '@components/PropertySection/PropertySection.model'

export default {
  title: 'screens/houseManager/components/PropertySection',
  component: PropertySection,
} as ComponentMeta<typeof PropertySection>

const Template: ComponentStory<typeof PropertySection> = (args) => (
  <PropertySection {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: 'Title',
  text: 'Text',
  textStyle: TextStyleProps.SEMIBOLD_BLACK,
}
