import React, { FC, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { spotApi } from '@api/spot'
import { withForm } from '@components/Form/withForm'
import { initialManageSpotFormValues } from '@screens/owner/Spots/ManageSpot/constants'
import ManageSpot from '@screens/owner/Spots/ManageSpot/ManageSpot'
import { manageSpotValidationSchema } from '@screens/owner/Spots/ManageSpot/validations'
import { ROUTES } from '@constants/routes'

const CreateSpot: FC = () => {
  const router = useRouter()
  const [createSpotTrigger, { isLoading, isSuccess, isError }] =
    spotApi.endpoints.createSpot.useMutation()

  useEffect(() => {
    if (isError) {
      toast.error('Error creating spot')
    }

    if (isSuccess) {
      toast.success('Spot created successfully')
      router.push({ pathname: ROUTES.OWNER_SPOTS })
    }
  }, [isError, isSuccess])

  return (
    <ManageSpot
      title="New Spot"
      onSubmit={(params) => createSpotTrigger(params)}
      backLink={ROUTES.OWNER_SPOTS}
      disabled={isLoading}
    />
  )
}

export default withForm(
  {
    initialValues: initialManageSpotFormValues,
    validationSchema: manageSpotValidationSchema,
  },
  CreateSpot
)
