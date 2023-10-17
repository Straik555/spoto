import { FormProps } from '@components/Form/Form.model'
import classNames from 'classnames'
import { Form as FormikForm, Formik } from 'formik'
import _noop from 'lodash/noop'
import React, { FC } from 'react'

const Form: FC<FormProps> = ({ className, children, ...formikProps }) => {
  const isChildFn = typeof children === 'function'

  return (
    <Formik onSubmit={_noop} {...formikProps}>
      {isChildFn ? (
        (props) => {
          return (
            <FormikForm className={classNames(className)}>
              {children(props)}
            </FormikForm>
          )
        }
      ) : (
        <FormikForm className={classNames(className)}>{children}</FormikForm>
      )}
    </Formik>
  )
}

export default Form
