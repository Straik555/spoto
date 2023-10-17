import React, { FC, useState } from 'react'
import cn from 'classnames'
import { Tab, TabPanel, TabsContainer, TabsHeader } from '@components/Tabs'
import { TabsValues } from '@components/Tabs/Tabs.model'
import {
  ActiveTab,
  FavouriteTab,
  HistoryTab,
} from '@screens/user/Bookings/BookingTabs'
import bookingApi from '@api/booking'

const BookingsDesktop: FC = () => {
  const [activeTab, setActiveTab] = useState<TabsValues>(TabsValues['tab-1'])
  const { data: upcoming } =
    bookingApi.endpoints.getUpcomingBookingsByUser.useQuery(null)

  return (
    <TabsContainer value={activeTab} type="header" onChange={setActiveTab}>
      <div className="w-full h-full overflow-auto">
        <div className="flex flex-col justify-between w-full bg-white h-[132px] pt-[25px] px-[75px] shadow-1">
          <p className="mb-0 text-2xl font-semibold text-black">My bookings</p>
          <TabsHeader
            className="w-full mx-auto transition-all"
            classNameNav="flex justify-between ml-[calc(((50%-300px)/2)-130px)] mr-[calc(((50%-300px)/2)-130px)]"
          >
            <Tab
              className="basis-1/3 !text-lg !font-medium !border-b-[4px] !bg-white border-blue-2 text-blue-2 hover:text-blue-2 hover:border-blue-2 max-w-[300px]"
              value={TabsValues['tab-1']}
              selectClassName="!border-primary !text-primary !hover:text-primary !hover:border-primary !max-w-[300px]"
            >
              <div className="flex items-center justify-center">
                Active
                {!!upcoming?.items?.length && (
                  <p
                    className={cn(
                      'flex items-center justify-center text-base font-semibold text-white w-[26px] h-[26px] bg-blue-2 ml-[15px] rounded-[1000px]',
                      { '!bg-primary': activeTab === TabsValues['tab-1'] }
                    )}
                  >
                    {upcoming.items.length}
                  </p>
                )}
              </div>
            </Tab>
            <Tab
              className="basis-1/3 !text-lg !font-medium !border-b-[4px] !bg-white border-blue-2 text-blue-2 hover:text-blue-2 hover:border-blue-2 max-w-[300px]"
              value={TabsValues['tab-2']}
              selectClassName="!border-primary !text-primary !hover:text-primary !hover:border-primary !max-w-[300px]"
            >
              History
            </Tab>
            <Tab
              className="basis-1/3 !text-lg !font-medium !border-b-[4px] !bg-white border-blue-2 text-blue-2 hover:text-blue-2 hover:border-blue-2 max-w-[300px]"
              value={TabsValues['tab-3']}
              selectClassName="!border-primary !text-primary !hover:text-primary !hover:border-primary !max-w-[300px]"
            >
              Favourites
            </Tab>
          </TabsHeader>
        </div>
        <div className="py-[15px] px-[67.5px]">
          <TabPanel value={TabsValues['tab-1']}>
            <ActiveTab isDesktop />
          </TabPanel>
          <TabPanel value={TabsValues['tab-2']}>
            <HistoryTab isDesktop />
          </TabPanel>
          <TabPanel value={TabsValues['tab-3']}>
            <FavouriteTab isDesktop />
          </TabPanel>
        </div>
      </div>
    </TabsContainer>
  )
}

export default BookingsDesktop
