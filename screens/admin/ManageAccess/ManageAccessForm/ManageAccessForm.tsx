import React from 'react'
import SetsAutocomplete from '../Autocompletes/SetsAutocomplete'
import SpotsAutocomplete from '../Autocompletes/SpotsAutocomplete'
import UsersAndGroupsAutocomplete from '../Autocompletes/UsersAndGroupsAutocomplete'

import PlaceAvailability from '../PlaceAvailability/PlaceAvailability'
import { ManageAccessFormProps } from './ManageAccessForm.model'

const ManageAccessForm: React.FC<ManageAccessFormProps> = (props) => {
  const {
    handleAvailabilityFormChange,
    isEditMode,
    placeId,
    usersAndGroupsSelectedItem,
    schedule,
  } = props

  return (
    <>
      {!isEditMode && (
        <>
          <div className="block mb-[18px]">
            <SpotsAutocomplete disabled={!!placeId} />
          </div>
          <div className="block mb-[18px]">
            <SetsAutocomplete disabled={!!placeId} />
          </div>
          <div className="block mb-[18px]">
            <UsersAndGroupsAutocomplete
              disabled={!!usersAndGroupsSelectedItem.length}
            />
          </div>
        </>
      )}
      <PlaceAvailability
        schedule={schedule}
        onChange={handleAvailabilityFormChange}
      />
    </>
  )
}

export default React.memo(ManageAccessForm)
