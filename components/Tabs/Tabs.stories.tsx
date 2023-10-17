import { Tab, TabPanel, TabsContainer, TabsHeader } from '@components/Tabs/Tabs'
import React from 'react'

export default {
  title: 'Reusable Components/Tabs',
  component: TabsContainer,
}

export const VariantHeader = () => {
  return (
    <TabsContainer value="1" type="header">
      <TabsHeader>
        <Tab value="1">Tab Header 1</Tab>
        <Tab value="2">Tab Header 2</Tab>
        <Tab value="3">Tab Header 3</Tab>
      </TabsHeader>
      <div className="p-1">
        <TabPanel value="1">Tab 1</TabPanel>
        <TabPanel value="2">Tab 2</TabPanel>
        <TabPanel value="3">Tab 3</TabPanel>
      </div>
    </TabsContainer>
  )
}

export const VariantPills = () => {
  return (
    <TabsContainer value="1" type="pills">
      <TabsHeader>
        <Tab value="1">Tab Header 1</Tab>
        <Tab value="2">Tab Header 2</Tab>
        <Tab value="3">Tab Header 3</Tab>
      </TabsHeader>
      <div className="p-1">
        <TabPanel value="1">Tab 1</TabPanel>
        <TabPanel value="2">Tab 2</TabPanel>
        <TabPanel value="3">Tab 3</TabPanel>
      </div>
    </TabsContainer>
  )
}
