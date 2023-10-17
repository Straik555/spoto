import React, { FC } from 'react'
import { LayoutDesktop, LayoutMobile } from '@components/Layout'
import { PersonsDetailsRouteParams } from '@screens/admin/Users/PersonsDetails/PersonsDetails.model'
import { PersonsDetailsDesktop } from '@screens/admin/Users/PersonsDetails/index'
import { PersonsDetailsMobile } from '@screens/admin/Users/PersonsDetails/index'

const PersonsDetails: FC<PersonsDetailsRouteParams> = ({ userId }) => {
  return (
    <>
      <LayoutDesktop>
        <PersonsDetailsDesktop userId={userId} />
      </LayoutDesktop>
      <LayoutMobile>
        <PersonsDetailsMobile userId={userId} />
      </LayoutMobile>
    </>
  )
}

export default PersonsDetails
