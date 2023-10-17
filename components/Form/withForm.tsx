import Form from '@components/Form/Form'
import { FormProps } from '@components/Form/Form.model'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const withForm = function <T>(formProps: FormProps, Component) {
  // eslint-disable-next-line react/display-name
  return ({ ...props }: T) => (
    <Form {...formProps}>
      <Component {...props} />
    </Form>
  )
}
