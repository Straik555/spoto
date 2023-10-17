import React from 'react'
import CreateEditSetDesktop from '@screens/admin/Sets/CreateEditSet/CreateEditSetDesktop'
import CreateEditSetMobile from '@screens/admin/Sets/CreateEditSet/CreateEditSetMobile'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'
import { CreateEditSetProps } from '@screens/admin/Sets/CreateEditSet/CreateEditSet.model'

const CreateEditSet: React.FC<CreateEditSetProps> = ({ buildingId, setId }) => {
  return (
    <>
      <LayoutDesktop>
        <CreateEditSetDesktop buildingId={buildingId} setId={setId} />
      </LayoutDesktop>
      <LayoutMobile>
        <CreateEditSetMobile buildingId={buildingId} setId={setId} />
      </LayoutMobile>
    </>
  )
}

export default CreateEditSet
