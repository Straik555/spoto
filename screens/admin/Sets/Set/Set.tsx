import React from 'react'
import SetDesktop from './SetDesktop'
import SetMobile from './SetMobile'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'
import { SetProps } from '@screens/admin/Sets/Set/Set.model'

const Set: React.FC<SetProps> = ({ setId }) => {
  return (
    <>
      <LayoutDesktop>
        <SetDesktop setId={setId} />
      </LayoutDesktop>
      <LayoutMobile>
        <SetMobile setId={setId} />
      </LayoutMobile>
    </>
  )
}

export default Set
