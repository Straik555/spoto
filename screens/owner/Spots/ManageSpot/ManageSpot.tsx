import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import { Tab, TabPanel, TabsContainer, TabsHeader } from '@components/Tabs'
import {
  ManageSpotFormValues,
  ManageSpotProps,
} from '@screens/owner/Spots/ManageSpot/ManageSpot.model'
import ManageSpotMain from '@screens/owner/Spots/ManageSpot/ManageSpotMain'
import ManageSpotSpollard from '@screens/owner/Spots/ManageSpot/ManageSpotSpollard'
import { mapFormValuesToApiParams } from '@screens/owner/Spots/ManageSpot/utils'
import { SpotDetailType } from '@screens/owner/Spots/Spot/Spot.model'
import { useFormikContext } from 'formik'
import React, { FC, useEffect, useState } from 'react'
import { PageHeaderMobile } from '@components/PageHeader'

const ManageSpot: FC<ManageSpotProps> = ({
  onSubmit,
  title,
  backLink,
  disabled,
  tabs,
  tabPanels,
  initialActiveTab,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(
    initialActiveTab || SpotDetailType.Main
  )
  const form = useFormikContext<ManageSpotFormValues>()
  const backButtonLink =
    typeof backLink === 'function' ? backLink(activeTab) : backLink

  useEffect(() => {
    onTabChange?.(activeTab)
  }, [activeTab])

  return (
    <>
      <PageHeaderMobile
        title={title}
        rightContent={
          <Button
            mode={ButtonMode.FULL_SECONDARY}
            className="w-auto text-xs !py-2 px-7 text-primary"
            disabled={!(form.dirty && form.isValid) || disabled}
            onClick={() => onSubmit(mapFormValuesToApiParams(form.values))}
          >
            Save
          </Button>
        }
        backButtonLink={backButtonLink}
        showBackButton
      />

      <TabsContainer value={activeTab} type="header" onChange={setActiveTab}>
        <TabsHeader>
          <Tab value={SpotDetailType.Main}>Main</Tab>
          <Tab value={SpotDetailType.Spollard}>Spollard</Tab>
          {tabs}
        </TabsHeader>

        <div className="p-4">
          <TabPanel value={SpotDetailType.Main}>
            <ManageSpotMain />
          </TabPanel>
          <TabPanel value={SpotDetailType.Spollard}>
            <ManageSpotSpollard />
          </TabPanel>
          {tabPanels}
        </div>
      </TabsContainer>
    </>
  )
}

export default ManageSpot
