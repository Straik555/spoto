import { userApi } from '@api/user'
import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import Dialog from '@components/Dialog/Dialog'
import Input from '@components/Form/Input/Input'
import { withForm } from '@components/Form/withForm'
import {
  InvitePersonDialogProps,
  InvitePersonFormValues,
} from '@screens/admin/Users/Persons/components/InvitePersonDialog/InvitePersonDialog.model'
import { invitePersonValidationSchema } from '@screens/admin/Users/Persons/components/InvitePersonDialog/validations'
import { useFormikContext } from 'formik'
import React, { FC, useEffect } from 'react'
import { toast } from 'react-toastify'

const InvitePersonDialog: FC<InvitePersonDialogProps> = ({ onClose, open }) => {
  const form = useFormikContext<InvitePersonFormValues>()
  const [inviteUser, { isSuccess, isError, isLoading }] =
    userApi.endpoints.inviteUser.useMutation()

  useEffect(() => {
    if (isError) {
      toast.error('User added failed')
    }

    if (isSuccess) {
      onClose()
      toast.success('User added successfully')
    }
  }, [isError, isSuccess])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Add New User"
      closeIcon
      afterLeave={form.resetForm}
    >
      <p className="text-center text-s-base text-blue-1 desktop:!text-s-xl desktop:!mb-[25px]">
        Invite user by sending them an email
      </p>
      <Input<InvitePersonFormValues>
        name="firstName"
        placeholder="First name"
        tabIndex={-1}
      />
      <Input<InvitePersonFormValues>
        name="lastName"
        placeholder="Last name"
        tabIndex={-1}
      />
      <Input<InvitePersonFormValues>
        name="email"
        placeholder="Email address"
        tabIndex={-1}
      />

      <div className="flex justify-between mt-[16px] desktop:mt-[35px]">
        <Button
          mode={ButtonMode.FULL_SECONDARY}
          onClick={onClose}
          className="font-semibold border-2 !w-1/2 mr-[13px] text-s-lg !text-primary !border-primary h-[44px] desktop:mr-[10px]"
        >
          Cancel
        </Button>
        <Button
          mode={ButtonMode.FULL_PRIMARY}
          onClick={() => {
            inviteUser({
              ...form.values,
            })
          }}
          className="font-semibold cursor-pointer !w-1/2 text-s-lg !bg-primary h-[44px]"
          disabled={
            !(form.dirty && form.isValid) ||
            isLoading ||
            !form.values.email ||
            !form.values.firstName ||
            !form.values.lastName
          }
        >
          Invite
        </Button>
      </div>
    </Dialog>
  )
}

export default withForm<InvitePersonDialogProps>(
  {
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
    } as InvitePersonFormValues,
    validationSchema: invitePersonValidationSchema,
  },
  InvitePersonDialog
)
