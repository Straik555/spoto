import React, { FC } from 'react'
import { SpotsTab } from '@screens/user/Waitlist/SpotsTab'
import useWaitList from '@screens/user/Waitlist/useWaitList'
import ConfirmationDialog from '@components/ConfirmationDialog'
import ConfirmDeleteIcon from '@assets/icons/large-icons/trash-is-delete-128.svg'

const WaitListDesktop: FC = () => {
  const [
    {
      deleteWaitList,
      spots,
      deleteId,
      setDeleteId,
      isLoading,
      closeConfirmationDialog,
    },
  ] = useWaitList()
  return (
    <>
      <SpotsTab
        spots={spots}
        onDelete={(id: number) => setDeleteId(id)}
        isDesktop
        isLoading={isLoading}
      />
      <ConfirmationDialog
        open={!!deleteId}
        titleIcon={<ConfirmDeleteIcon className="mx-auto mt-0 mb-[30px]" />}
        title="Delete this spot from your
            waitlist?"
        titleContainerClassName="!mt-0"
        cancelText="Cancel"
        applyText="Delete"
        onApply={deleteWaitList}
        onClose={closeConfirmationDialog}
      />
    </>
  )
}

export default WaitListDesktop
