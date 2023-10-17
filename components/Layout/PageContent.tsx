import cn from 'classnames'
import React, { FC } from 'react'

import { PageContentProps } from '@components/Layout/PageContent.model'
import TopActionBar from '@components/PageHeader/TopActionBar/TopActionBar'
import { TabsContainer, TabsHeader, Tab } from '@components/Tabs'
import { useSpotoMediaQuery } from '@hooks/useMediaQuery'

export const PageContent: FC<PageContentProps> = ({
  title,
  actions,
  tabs,
  children,
  setActiveTab,
  activeTab,
  noCap,
}) => {
  const { maxWidth1366 } = useSpotoMediaQuery()

  return (
    <div
      className={cn('flex flex-col w-full h-full', {
        'pl-[64px]': maxWidth1366,
      })}
    >
      <div className="relative shadow-7">
        <TopActionBar
          noCap={noCap}
          title={title}
          className={cn({
            'p-[0_75px]': !maxWidth1366,
            'p-[0_45px]': maxWidth1366,
          })}
          actions={actions}
        />
        {tabs && (
          <TabsContainer
            value={activeTab}
            type="header"
            onChange={setActiveTab}
          >
            <TabsHeader classNameNav="bg-white">
              {tabs.map((tab) => (
                <Tab
                  selectClassName="!text-primary"
                  className="bg-white hover:!text-primary"
                  value={tab}
                  key={tab}
                >
                  {tab}
                </Tab>
              ))}
            </TabsHeader>
          </TabsContainer>
        )}
      </div>

      <div
        className={cn(
          'flex flex-col w-full transition-all bg-bg grow overflow-auto',
          {
            'p-[35px_75px]': !maxWidth1366,
            'p-[35px_45px]': maxWidth1366,
          }
        )}
      >
        {children}
      </div>
    </div>
  )
}
