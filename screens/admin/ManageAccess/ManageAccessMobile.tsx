import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import { withForm } from '@components/Form/withForm'
import PageHeaderMobile from '@components/PageHeader/PageHeaderMobile'
import ManageAccessForm from '@screens/admin/ManageAccess/ManageAccessForm/ManageAccessForm'
import React from 'react'
import { ManageAccessValues } from './ManageAccess.model'

import useManageAccess from './useManageAccess'

const ManageAccessMobile: React.FC = () => {
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
    <>
      <PageHeaderMobile title={title} showBackButton />

      <div className="px-[16px] pb-[16px]">
        <ManageAccessForm
          {...{
            handleAvailabilityFormChange: setAvailabilityForm,
            isEditMode,
            spot,
            set,
            placeId,
            usersAndGroupsSelectedItem,
            schedule,
          }}
        />

        <Button
          className="mt-[16px]"
          onClick={handleSubmit}
          mode={ButtonMode.FULL_PRIMARY}
          type="submit"
        >
          Save
        </Button>
      </div>
    </>
  )
}

export default withForm(
  {
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
  },
  ManageAccessMobile
)
