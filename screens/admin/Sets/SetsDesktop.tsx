import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loader from '@components/Loader/Loader'
import Button from '@components/Button/Button'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import SetItem from '@screens/admin/Sets/SetItem'
import { SetModel } from '@api/set/types'
import { setApi } from '@api/set'
import { buildingApi } from '@api/building'
import { ROUTES } from '@constants/routes'
import Select from '@components/Select'
import { Option } from '@components/Select/Select'
import { PageContent } from '@components/Layout/PageContent'
import cn from 'classnames'
import { useSpotoMediaQuery } from '@hooks/useMediaQuery'
import DeleteDialog from '@components/Dialog/DeleteDialog'

/* eslint-disable @typescript-eslint/ban-types */
const Sets: React.FC = () => {
  const { maxWidth1366 } = useSpotoMediaQuery()
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
    <PageContent
      title="Sets"
      actions={
        <Button
          onClick={() =>
            selectedBuildingId &&
            router.push({
              pathname: ROUTES.ADMIN_SETS_CREATE,
              query: {
                buildingId: selectedBuildingId,
              },
            })
          }
          mode={ButtonMode.SMALL}
          icon={ButtonIcon.ADD_WHITE}
          className={`!px-[28px] py-[13px] rounded-[5px] font-medium !text-s-lg`}
        >
          Create New Set
        </Button>
      }
    >
      <Loader loading={isLoading}>
        <Select
          value={selectedBuilding?.address}
          label={selectedBuilding?.address}
          title="Building:"
          onSelect={chooseBuilding}
          className="!mt-0 w-[409px]"
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
        {dataSet?.length ? (
          <section
            className={cn(
              'flex content-start mb-[16px] grid gap-y-[9px] gap-x-[15px] w-full mt-[25px]',
              {
                'grid-cols-3': maxWidth1366,
                'grid-cols-4': !maxWidth1366,
              }
            )}
          >
            {dataSet.map((set: SetModel) => (
              <SetItem
                set={set}
                key={set.id}
                onDeleteSpot={() => {
                  setSetToDelete(set.id)
                  setDeleteModalOpen(true)
                }}
              />
            ))}
          </section>
        ) : (
          <div className="flex justify-center items-center w-full grow text-blue-3 text-s-xl font-semibold mt-[25px]">
            No Sets
          </div>
        )}
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
    </PageContent>
  )
}

export default React.memo(Sets)
