import React from 'react'
import DashBoardListItem from '@screens/admin/Dashboard/DashBoardList/DashBoardListItem'
import { DashBoardListProps } from '@screens/admin/Dashboard/DashBoardList/DashBoardList.model'
import { SetModel } from '@api/set/types'

const DashBoardList: React.FC<DashBoardListProps> = ({ setsList }) => {
  if (!setsList) {
    return (
      <div className="flex justify-center mt-4">
        <span className="p-4 text-blue-2">No available sets</span>
      </div>
    )
  }
  return (
    <div className="flex flex-wrap justify-center mt-4">
      {setsList.map((set: SetModel, index: number) => (
        <DashBoardListItem set={set} key={index} />
      ))}
    </div>
  )
}

export default React.memo(DashBoardList)
