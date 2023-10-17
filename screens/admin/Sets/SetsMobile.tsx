import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loader from '@components/Loader/Loader'
import Button from '@components/Button/Button'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import SetItem from '@screens/admin/Sets/SetItem'
import { SetModel } from '@api/set/types'
import { setApi } from '@api/set'
import { buildingApi } from '@api/building'
import { PageHeaderMobile } from '@components/PageHeader'
import { ROUTES } from '@constants/routes'
import Select from '@components/Select'
import { Option } from '@components/Select/Select'
import ScrollbarContainer from '@components/ScrollbarContainer/ScrollbarContainer'
import cn from 'classnames'
import DeleteDialog from '@components/Dialog/DeleteDialog'

/* eslint-disable @typescript-eslint/ban-types */
const Sets: React.FC = () => {
  const router = useRouter()
  const [deleteSetById] = setApi.endpoints.deleteSetById.useMutation()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [setToDelete, setSetToDelete] = useState<number | null>(null)
  const [selectedBuildingId, setSelectedBuildingId] = useState<
    number | undefined
  >(undefined)
  const { data: dataBuilding = [], isLoading: isLoadingBuilding } =
    buildingApi.endpoints.getBuildingsByUser.useQuery()
  const selectedBuilding = dataBuilding.find((b) => b.id === selectedBuildingId)
  const { data: dataSet, isLoading: isLoadingSet } =
    setApi.endpoints.getSetsByBuilding.useQuery(selectedBuildingId!, {
      skip: !selectedBuildingId,
    })
  const isLoading = isLoadingBuilding || isLoadingSet

  const chooseBuilding = useCallback(
    (selectedId) => {
      const buildingId = dataBuilding.find((o) => o.id === selectedId)?.id
      setSelectedBuildingId(buildingId)
    },
    [dataBuilding]
  )

  useEffect(() => {
    if (selectedBuildingId) return
    if (dataBuilding) {
      setSelectedBuildingId(dataBuilding.find(() => true)?.id)
    }
  }, [selectedBuildingId, dataBuilding])

  return (
    <>
      <PageHeaderMobile title="Sets" />
      <Loader loading={isLoading}>
        <div className={`p-4 pt-0 bg-bg`}>
          <Select
            value={selectedBuilding?.address}
            label={selectedBuilding?.address}
            title="Building:"
            onSelect={chooseBuilding}
            buttonClassName="shadow-2"
          >
            {dataBuilding.map((item) => (
              <Option
                value={item.id}
                key={item.id}
                text={item.address}
                active={selectedBuilding?.address === item.address}
              />
            ))}
          </Select>
        </div>
        <ScrollbarContainer
          className={cn(
            'w-full flex flex-col overflow-y-auto h-[calc(100%-235px)] bg-bg'
          )}
        >
          <div className="flex flex-col p-4 py-0 bg-bg grow">
            {dataSet?.length ? (
              <div className="flex flex-col flex-wrap">
                {dataSet.map((set: SetModel, index: number) => (
                  <SetItem
                    set={set}
                    key={index}
                    onDeleteSpot={() => {
                      setSetToDelete(set.id)
                      setDeleteModalOpen(true)
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center w-full font-semibold grow text-blue-3 text-s-xl">
                No Sets
              </div>
            )}
          </div>
        </ScrollbarContainer>
        <div className="fixed bottom-0 flex justify-center items-center h-[76px] bg-bg w-full">
          <Button
            className="px-[16px] mx-[16px] font-semibold text-s-lg"
            onClick={() =>
              selectedBuildingId &&
              router.push({
                pathname: ROUTES.ADMIN_SETS_CREATE,
                query: {
                  buildingId: selectedBuildingId,
                },
              })
            }
            mode={ButtonMode.FULL_PRIMARY}
            icon={ButtonIcon.ADD_WHITE}
          >
            Create New Set
          </Button>
        </div>
      </Loader>
      <DeleteDialog
        open={deleteModalOpen}
        message="Delete this set?"
        onClose={() => {
          setDeleteModalOpen(false)
          setSetToDelete(null)
        }}
        onSubmit={() => {
          setDeleteModalOpen(false)
          if (setToDelete) deleteSetById(+setToDelete)
        }}
        disabled={isLoading}
      />
    </>
  )
}

export default React.memo(Sets)
