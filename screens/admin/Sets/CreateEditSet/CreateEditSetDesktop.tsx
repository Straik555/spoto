import React from 'react'
import { CreateEditSetProps } from '@screens/admin/Sets/CreateEditSet/CreateEditSet.model'
import { setValidationSchema } from '@screens/admin/Sets/CreateEditSet/validations'
import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import Loader from '@components/Loader/Loader'
import CreateEditSetForm from '@screens/admin/Sets/CreateEditSet/CreateEditSetForm'
import {
  initialCreateEditSetFormData,
  useCreateEditSetForm,
} from '@screens/admin/Sets/CreateEditSet/useCreateEditSetForm'
import { PageContent } from '@components/Layout/PageContent'
import { withForm } from '@components/Form/withForm'

const CreateEditSetDesktop: React.FC<CreateEditSetProps> = ({
  setId,
  buildingId,
}) => {
  const { set, saveSet, isLoading, isValid } = useCreateEditSetForm({
    setId,
    buildingId,
  })

  return (
    <PageContent
      title={set ? set.name : 'Create New Set'}
      actions={
        <div className="flex">
          <Button
            type="submit"
            mode={ButtonMode.FULL_PRIMARY}
            className="text-s-lg !font-semibold p-[10px] w-[169px] h-[50px]"
            onClick={() => isValid && saveSet()}
          >
            Save
          </Button>
        </div>
      }
    >
      <Loader loading={isLoading}>
        <div className="grow bg-bg">
          <CreateEditSetForm />
        </div>
      </Loader>
    </PageContent>
  )
}

export default React.memo(
  withForm<CreateEditSetProps>(
    {
      initialValues: initialCreateEditSetFormData,
      validationSchema: setValidationSchema,
      className: 'flex flex-col h-full',
    },
    CreateEditSetDesktop
  )
)
