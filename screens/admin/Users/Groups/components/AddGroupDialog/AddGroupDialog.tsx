import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import Dialog from '@components/Dialog/Dialog'
import { withForm } from '@components/Form/withForm'
import { useFormikContext } from 'formik'
import React, { FC } from 'react'
import { changeNameGroupValidationSchema } from '@screens/admin/Users/validations'
import {
  AddGroupProps,
  AddGroupFormValues,
} from '@screens/admin/Users/Groups/components/AddGroupDialog/AddGroupDialog.model'
import Input from '@components/Form/Input/Input'
import SearchIcon from '@assets/icons/search-14.svg'

const AddGroupDialog: FC<AddGroupProps> = ({ onClose, open, onCreate }) => {
  const { resetForm, values, dirty, isValid } =
    useFormikContext<AddGroupFormValues>()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="New User Group"
      afterLeave={resetForm}
      closeIcon
    >
      <Input<AddGroupFormValues>
        name="groupName"
        labelClassName="!mb-[10px] !text-s-lg"
        value={values.groupName}
        label="Group Name"
        placeholder="Group name"
        tabIndex={-1}
        prefixIcon={<SearchIcon className="fill-blue-3" />}
      />
      <div className="flex justify-between mt-[16px] desktop:mt-[35px]">
        <Button
          mode={ButtonMode.FULL_SECONDARY}
          onClick={onClose}
          className="w-1/2 font-semibold border-2 text-s-lg h-[44px] mr-[10px] text-blue-3 !border-primary !text-primary desktop:text-s-xl"
        >
          Cancel
        </Button>
        <Button
          mode={ButtonMode.FULL_PRIMARY}
          onClick={() => {
            if (dirty && isValid) {
              onCreate(values.groupName)
              onClose()
            }
          }}
          className="w-1/2 font-semibold text-s-lg h-[44px] !bg-primary desktop:text-s-xl"
        >
          Create
        </Button>
      </div>
    </Dialog>
  )
}

export default withForm<AddGroupProps>(
  {
    initialValues: {
      groupName: '',
    } as AddGroupFormValues,
    validationSchema: changeNameGroupValidationSchema,
  },
  AddGroupDialog
)
