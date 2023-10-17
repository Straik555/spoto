import { TopActionBarProps } from '@components/PageHeader/TopActionBar/TopActionBar.model'
import Title from '@components/Title/Title'
import classNames from 'classnames'
import { FC } from 'react'

export const TopActionBar: FC<TopActionBarProps> = ({
  className,
  title,
  actions,
  noCap,
}) => {
  return (
    <div
      className={classNames(
        'flex items-center justify-between w-full h-[86px]',
        className
      )}
    >
      <Title
        as="h3"
        className="font-semibold text-black text-s-2xl"
        noCap={noCap}
      >
        {title}
      </Title>
      {actions}
    </div>
  )
}

export default TopActionBar
