import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import Dialog from '@components/Dialog/Dialog'
import { withForm } from '@components/Form/withForm'
import { useFormikContext } from 'formik'
import React, { FC } from 'react'
import {
  AddUserFormValues,
  AddUserProps,
} from '@screens/owner/Users/components/AddUserDialog/AddUserDialog.model'
import { inviteUserValidationSchema } from '@screens/owner/Users/components/AddUserDialog/validation'
import Input from '@components/Form/Input/Input'
import Title from '@components/Title/Title'

const AddUserDialog: FC<AddUserProps> = ({ onClose, open, onCreate }) => {
  const { resetForm, values, dirty, isValid, setFieldValue } =
    useFormikContext<AddUserFormValues>()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      afterLeave={resetForm}
      title="Add New User"
      closeIcon
    >
      <Title
        noCap
        className="text-center font-normal text-s-base text-text mb-[16px] desktop:mb-[20px] desktop:text-s-xl"
      >
        Invite user by sending them an email
      </Title>
      <Input
        name="email"
        value={values.email}
        placeholder="First Name"
        onChange={(text) => setFieldValue('email', text.target.value)}
        tabIndex={-1}
      />
      <div className="flex justify-between mt-[16px] desktop:mt-[35px]">
        <Button
          mode={ButtonMode.FULL_SECONDARY}
          onClick={onClose}
          className="w-1/2 text-s-lg font-semibold border-2 h-[44px] mr-[10px] text-blue-3 !border-primary !text-primary desktop:text-s-xl desktop:h-[50px]"
        >
          Cancel
        </Button>
        <Button
          mode={ButtonMode.FULL_PRIMARY}
          onClick={() => {
            onCreate(values.email)
            onClose()
          }}
          className="w-1/2 text-s-lg h-[44px] font-semibold !bg-primary desktop:text-s-xl desktop:h-[50px]"
          disabled={!(dirty && isValid)}
        >
          Create
        </Button>
      </div>
    </Dialog>
  )
}

export default withForm<AddUserProps>(
  {
    initialValues: {
      email: '',
    } as AddUserFormValues,
    validationSchema: inviteUserValidationSchema,
  },
  AddUserDialog
)
