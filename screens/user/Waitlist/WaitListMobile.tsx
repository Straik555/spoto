import React, { FC } from 'react'
import { PageHeaderMobile } from '@components/PageHeader'
import { SpotsTab } from '@screens/user/Waitlist/SpotsTab'
import useWaitList from '@screens/user/Waitlist/useWaitList'
import ConfirmationDialog from '@components/ConfirmationDialog'
import ConfirmDeleteIcon from '@assets/icons/large-icons/trash-is-delete-128.svg'

const WaitListMobile: FC = () => {
  const [{ deleteWaitList, spots, deleteId, setDeleteId, isLoading }] =
    useWaitList()
  return (
    <div className="flex flex-col h-full">
      <PageHeaderMobile title="Waitlist" />
      <SpotsTab
        spots={spots}
        onDelete={(id: number) => setDeleteId(id)}
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
        onClose={() => setDeleteId(0)}
      />
    </div>
  )
}

export default WaitListMobile
