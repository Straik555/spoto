import React, { useState } from 'react'
import { Option } from '@components/Select/Select'
import Select from './Select'

export default {
  title: 'Reusable Components/Select',
  component: Select,
}

export const DefaultSelect = () => {
  const [value, setValue] = useState('')
  return (
    <Select
      value={value}
      label={value}
      title="Title"
      placeholder="placeholder"
      bordered
      onSelect={(e) => setValue(e)}
    >
      {['item1', 'item2'].map((item) => {
        return (
          <Option key={item} value={item} text={item} active={item === value} />
        )
      })}
    </Select>
  )
}
