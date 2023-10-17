import React, { FC, useState } from 'react'
import { PageHeaderMobile } from '@components/PageHeader'
import { Tab, TabPanel, TabsContainer, TabsHeader } from '@components/Tabs'
import { TabsValues } from '@components/Tabs/Tabs.model'
import {
  ActiveTab,
  FavouriteTab,
  HistoryTab,
} from '@screens/user/Bookings/BookingTabs'
import cn from 'classnames'
import bookingApi from '@api/booking'

const BookingsMobile: FC = () => {
  const [activeTab, setActiveTab] = useState<TabsValues>(TabsValues['tab-1'])
  const { data: upcoming } =
    bookingApi.endpoints.getUpcomingBookingsByUser.useQuery(null)

  return (
    <>
      <PageHeaderMobile title="My Bookings" />
      <TabsContainer value={activeTab} type="header" onChange={setActiveTab}>
        <TabsHeader className="shadow-4">
          <Tab className="basis-1/3" value={TabsValues['tab-1']}>
            <div className="flex items-center justify-center">
              Active
              {!!upcoming?.items?.length && (
                <p
                  className={cn(
                    'flex items-center justify-center text-[10px] leading-[15px] font-semibold text-primary w-[13px] h-[13px] bg-blue-2 ml-[5px] rounded-3xl',
                    { '!bg-white': activeTab === TabsValues['tab-1'] }
                  )}
                >
                  {upcoming.items.length}
                </p>
              )}
            </div>
          </Tab>
          <Tab className="basis-1/3" value={TabsValues['tab-2']}>
            History
          </Tab>
          <Tab className="basis-1/3" value={TabsValues['tab-3']}>
            Favourites
          </Tab>
        </TabsHeader>
        <div className="grow flex flex-col">
          <TabPanel value={TabsValues['tab-1']}>
            <ActiveTab />
          </TabPanel>
          <TabPanel value={TabsValues['tab-2']}>
            <HistoryTab />
          </TabPanel>
          <TabPanel value={TabsValues['tab-3']}>
            <FavouriteTab />
          </TabPanel>
        </div>
      </TabsContainer>
    </>
  )
}

export default BookingsMobile
