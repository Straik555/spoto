import { hardwareApi } from '@api/hardware'
import React, { FC, useEffect } from 'react'
import { useFormikContext } from 'formik'
import { toast } from 'react-toastify'
import { spotApi } from '@api/spot'
import { withForm } from '@components/Form/withForm'
import { Tab, TabPanel } from '@components/Tabs'
import { initialManageSpotFormValues } from '@screens/owner/Spots/ManageSpot/constants'
import ManageSpot from '@screens/owner/Spots/ManageSpot/ManageSpot'
import { ManageSpotFormValues } from '@screens/owner/Spots/ManageSpot/ManageSpot.model'
import { mapSpotInfoToFormValues } from '@screens/owner/Spots/ManageSpot/utils'
import { manageSpotValidationSchema } from '@screens/owner/Spots/ManageSpot/validations'
import { SpotDetailType, SpotProps } from '@screens/owner/Spots/Spot/Spot.model'
import { useRouter } from 'next/router'
import { ROUTES } from '@constants/routes'
import EditSpotUsers from './EditSpotUsers'

const EditSpot: FC<SpotProps> = ({ id, type }) => {
  const router = useRouter()
  const [updateSpotTrigger, updateSpotRes] =
    spotApi.endpoints.updateSpot.useMutation()
  const [linkHardwareTrigger] = hardwareApi.endpoints.link.useMutation()
  const [unlinkHardwareTrigger] = hardwareApi.endpoints.unlink.useMutation()
  const { data: spotInfo, ...spotInfoRes } =
    spotApi.endpoints.getSpotById.useQuery(id)
  const form = useFormikContext<ManageSpotFormValues>()

  useEffect(() => {
    if (updateSpotRes.isError) {
      toast.error('Error updating spot')
    }

    if (updateSpotRes.isSuccess) {
      toast.success('Spot updated successfully')
      router.push({
        pathname: ROUTES.OWNER_SPOTS_FIND_TAB,
        query: { id, type: SpotDetailType.Main },
      })
    }
  }, [updateSpotRes.isError, updateSpotRes.isSuccess])

  useEffect(() => {
    if (!spotInfo) return

    form.setValues(mapSpotInfoToFormValues(spotInfo))
  }, [spotInfo])

  return (
    <ManageSpot
      title={spotInfo?.name || ''}
      onSubmit={(params) => {
        const hardwareUpdatePromise =
          spotInfo!.hardwareId !== params.hardwareId
            ? unlinkHardwareTrigger({
                id: spotInfo!.hardwareId,
              }).then(() =>
                linkHardwareTrigger({
                  id: params.hardwareId || 0,
                  spotId: id,
                })
              )
            : Promise.resolve()

        hardwareUpdatePromise.then(() => {
          updateSpotTrigger({
            id,
            ...params,
          })
        })
      }}
      backLink={(tab) => ({
        pathname: ROUTES.OWNER_SPOTS_FIND_TAB,
        query: { id, type: tab },
      })}
      disabled={updateSpotRes.isLoading || spotInfoRes.isLoading}
      tabs={<Tab value={SpotDetailType.Users}>Users</Tab>}
      tabPanels={
        <TabPanel value={SpotDetailType.Users}>
          <EditSpotUsers spotId={id} />
        </TabPanel>
      }
      initialActiveTab={type}
      onTabChange={(tab) =>
        router.push({
          pathname: ROUTES.OWNER_SPOTS_EDIT,
          query: { id: id, type: tab },
        })
      }
    />
  )
}

export default withForm<SpotProps>(
  {
    initialValues: initialManageSpotFormValues,
    validationSchema: manageSpotValidationSchema,
  },
  EditSpot
)
