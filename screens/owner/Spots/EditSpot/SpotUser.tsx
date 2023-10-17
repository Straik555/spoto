import { sharedPlacesApi } from '@api/sharedPlaces'
import Button from '@components/Button/Button'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import Checkbox from '@components/Form/Checkbox/Checkbox'
import { ROUTES } from '@constants/routes'
import UserAvatar from '@screens/admin/Users/components/UserAvatar/UserAvatar'
import { getPersonFullName } from '@screens/admin/Users/utils/getPersonFullName'
import {
  EditSpotUsersListFormValues,
  SpotUserProps,
} from '@screens/owner/Spots/EditSpot/EditSpotUsers.model'
import classNames from 'classnames'
import { useFormikContext } from 'formik'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'

const SpotUser: FC<SpotUserProps> = ({ user, className, spotId }) => {
  const form = useFormikContext<EditSpotUsersListFormValues>()
  const checked = form.values.userIds.includes(user.userId)
  const [deleteUserSpotAccessTrigger, deleteUserSpotAccessResult] =
    sharedPlacesApi.endpoints.deleteUserFromPlace.useMutation()
  const [deleteUserVisible, setDeleteUserVisible] = useState(false)
  const router = useRouter()

  return (
    <div
      className={classNames('p-3 border rounded-md', className, {
        'bg-blue-4 border-primary': checked,
        'border-blue-3': !checked,
      })}
    >
      <div
        className={classNames('flex items-center ', {
          'border-b border-blue-menu pb-3 mb-3': checked,
        })}
      >
        <Checkbox value={user.userId} />

        <UserAvatar className="ml-3 !w-[35px] !h-[35px]" />

        <p
          className={classNames(
            'm-0 ml-3 font-medium text-s-base  whitespace-nowrap',
            {
              'text-blue-1': !checked,
              'text-primary': checked,
            }
          )}
        >
          {getPersonFullName(user)}
        </p>

        <Button
          icon={ButtonIcon.DELETE_OUTLINED}
          mode={ButtonMode.BASE}
          className="p-2 ml-auto border rounded-md border-blue-1"
          iconClassName="!m-0 fill-blue-1"
          disabled={deleteUserSpotAccessResult.isLoading}
          onClick={() => setDeleteUserVisible(true)}
        />
      </div>

      {checked && (
        <div className="block">
          <Button
            mode={ButtonMode.FULL_PRIMARY}
            className="mt-2 !py-2 text-s-base"
            onClick={() =>
              router.push({
                pathname: ROUTES.OWNER_SPOTS_SETTINGS,
                query: { id: spotId, userId: user.userId },
              })
            }
          >
            Edit Booking Settings
          </Button>
        </div>
      )}

      <DeleteDialog
        open={deleteUserVisible}
        message="Delete this user?"
        onClose={() => setDeleteUserVisible(false)}
        onSubmit={() => {
          deleteUserSpotAccessTrigger({
            spotId,
            userId: user.userId,
          })
          setDeleteUserVisible(false)
        }}
        disabled={deleteUserSpotAccessResult.isLoading}
      />
    </div>
  )
}

export default SpotUser
