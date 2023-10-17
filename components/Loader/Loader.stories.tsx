import React, { useState } from 'react'

import Loader from './Loader'
import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'

export default {
  title: 'Example/Loader',
  component: Loader,
}

export const DefaultLoader = () => {
  const [isLoading, setLoading] = useState(true)
  return (
    <div className="flex">
      <Button
        onClick={() => setLoading(!isLoading)}
        mode={ButtonMode.SMALL}
        className="text-sm mb-2 h-[44px] mr-4"
      >
        Toggle Loader
      </Button>
      <div className="w-[500px] h-[500px] border border-primary">
        <Loader loading={isLoading}>
          <div className="h-[100px] border-b border-primary flex items-center justify-center">
            1
          </div>
          <div className="h-[100px] border-b border-primary flex items-center justify-center">
            2
          </div>
          <div className="h-[100px] border-b border-primary flex items-center justify-center">
            3
          </div>
          <div className="h-[100px] border-b border-primary flex items-center justify-center">
            4
          </div>
          <div className="h-[100px] flex items-center justify-center">5</div>
        </Loader>
      </div>
    </div>
  )
}
