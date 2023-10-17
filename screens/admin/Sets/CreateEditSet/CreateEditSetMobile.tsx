import React from 'react'
import { CreateEditSetProps } from '@screens/admin/Sets/CreateEditSet/CreateEditSet.model'
import { setValidationSchema } from '@screens/admin/Sets/CreateEditSet/validations'
import { PageHeaderMobile } from '@components/PageHeader'
import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import Loader from '@components/Loader/Loader'
import { ROUTES } from '@constants/routes'
import CreateEditSetForm from '@screens/admin/Sets/CreateEditSet/CreateEditSetForm'
import {
  initialCreateEditSetFormData,
  useCreateEditSetForm,
} from '@screens/admin/Sets/CreateEditSet/useCreateEditSetForm'
import { withForm } from '@components/Form/withForm'
import ScrollbarContainer from '@components/ScrollbarContainer/ScrollbarContainer'
import cn from 'classnames'

const CreateEditSetMobile: React.FC<CreateEditSetProps> = ({
  setId,
  buildingId,
}) => {
  const { set, saveSet, isLoading, isValid } = useCreateEditSetForm({
    setId,
    buildingId,
  })

  return (
    <div className="flex flex-col grow">
      <PageHeaderMobile
        title={set ? set.name : 'Create New Set'}
        backButtonLink={{ pathname: ROUTES.ADMIN_SETS }}
        showBackButton
      />
      <ScrollbarContainer
        className={cn('w-full flex flex-col overflow-y-auto grow mb-[76px]')}
      >
        <Loader loading={isLoading}>
          <CreateEditSetForm />
          <div className="fixed bottom-0 left-0 z-10 w-full bg-bg py-[16px]">
            <div className="px-[16px]">
              <Button
                type="submit"
                mode={ButtonMode.FULL_PRIMARY}
                className="text-xs font-medium px-[10px]"
                onClick={() => isValid && saveSet()}
              >
                Save
              </Button>
            </div>
          </div>
        </Loader>
      </ScrollbarContainer>
    </div>
  )
}

export default React.memo(
  withForm<CreateEditSetProps>(
    {
      initialValues: initialCreateEditSetFormData,
      validationSchema: setValidationSchema,
      className: 'flex flex-col grow',
    },
    CreateEditSetMobile
  )
)
