import React from 'react'

import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import { withForm } from '@components/Form/withForm'
import { PageContent } from '@components/Layout/PageContent'

import ManageAccessForm from './ManageAccessForm/ManageAccessForm'
import useManageAccess from './useManageAccess'
import { ManageAccessValues } from './ManageAccess.model'
import { manageAccessValidationSchema } from './validations'

const ManageAccessDesktop: React.FC = () => {
  const { state, actions } = useManageAccess()
  const {
    isEditMode,
    placeId,
    set,
    spot,
    title,
    usersAndGroupsSelectedItem,
    schedule,
  } = state
  const { setAvailabilityForm, handleSubmit } = actions

  return (
    <PageContent
      actions={
        <Button
          onClick={handleSubmit}
          mode={ButtonMode.FULL_PRIMARY}
          className="w-[169px]"
          type="submit"
        >
          Save
        </Button>
      }
      title={title}
    >
      <div className="w-[520px]">
        <ManageAccessForm
          {...{
            isEditMode,
            handleAvailabilityFormChange: setAvailabilityForm,
            spot,
            set,
            placeId,
            usersAndGroupsSelectedItem,
            schedule,
          }}
        />
      </div>
    </PageContent>
  )
}

export default withForm(
  {
    className: 'flex flex-col h-full',
    initialValues: {
      spotName: '',
      selectedSpots: [],
      checkedSpots: [],
      setName: '',
      selectedSets: [],
      checkedSets: [],
      userOrGroupName: '',
      selectedUserGroups: [],
      checkedUserGroups: [],
    } as ManageAccessValues,
    validationSchema: manageAccessValidationSchema,
  },
  ManageAccessDesktop
)
