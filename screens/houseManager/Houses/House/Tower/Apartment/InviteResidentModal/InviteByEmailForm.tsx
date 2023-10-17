import React, { useCallback, useEffect, useMemo } from 'react'
import { useFormikContext } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { withForm } from '@components/Form/withForm'
import {
  createValidationSchema,
  requiredEmailField,
} from '@screens/auth/Register/validation'
import Input from '@components/Form/Input/Input'
import { inviteApi } from '@api/invite'

import {
  InviteByEmailFormProps,
  InviteByEmailFormValues,
} from './InviteResidentModal.model'
import BottomButtons from './BottomButtons'

const InviteByEmailForm: React.FC<InviteByEmailFormProps> = (props) => {
  const { closeModal } = props
  const router = useRouter()
  const { apartmentId } = router.query
  const form = useFormikContext<InviteByEmailFormValues>()
  const { isValid, values } = form
  const [inviteUserByEmail, { error, isSuccess, isLoading, isError }] =
    inviteApi.endpoints.inviteUserByEmail.useMutation()

  const disabled = useMemo(() => {
    return !isValid || isLoading
  }, [isValid, isLoading])

  const handleSubmit = useCallback(async () => {
    await inviteUserByEmail({ ...values, apartmentId: Number(apartmentId) })
  }, [apartmentId, inviteUserByEmail, values])

  useEffect(() => {
    if (isSuccess) {
      toast.success('User successfully invited!')
      closeModal()
    }
  }, [closeModal, isSuccess])

  useEffect(() => {
    if (isError && error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toast.error(error.data.message)
    }
  }, [error, isError])

  return (
    <>
      <Input<InviteByEmailFormValues>
        name="email"
        placeholder="Occupants Email"
      />
      <BottomButtons
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        submitDisabled={disabled}
        submitButtonText="Send"
      />
    </>
  )
}

export default withForm<InviteByEmailFormProps>(
  {
    initialValues: { email: '' },
    validationSchema: createValidationSchema({ email: requiredEmailField }),
  },
  InviteByEmailForm
)
