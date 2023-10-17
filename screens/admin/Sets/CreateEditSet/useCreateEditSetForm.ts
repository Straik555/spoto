import { useRouter } from 'next/router'
import { setApi } from '@api/set'
import { SetModel } from '@api/set/types'
import { ROUTES } from '@constants/routes'
import {
  CreateEditSetFormValues,
  CreateEditSetProps,
} from '@screens/admin/Sets/CreateEditSet/CreateEditSet.model'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import { useEffect } from 'react'

export const initialCreateEditSetFormData: CreateEditSetFormValues = {
  id: 0,
  name: '',
  description: '',
  height: '',
  workingTimeFrom: '',
  workingTimeTo: '',
  commercialTimeFrom: '',
  commercialTimeTo: '',
  buildingId: 0,
}

export const useCreateEditSetForm = (props: CreateEditSetProps) => {
  const { setId, buildingId } = props
  const { data: set, isLoading } = setApi.endpoints.getSetById.useQuery(
    +setId!,
    {
      skip: !setId,
    }
  )
  const router = useRouter()
  const [createSet] = setApi.endpoints.createSet.useMutation()
  const [updateSet] = setApi.endpoints.updateSet.useMutation()
  const { isValid, values, setValues } =
    useTypedFormikContext<CreateEditSetFormValues>()

  useEffect(() => {
    if (!set) return

    setValues({
      id: set?.id,
      name: set?.name,
      description: set?.description,
      height: set?.height.toString(),
      workingTimeFrom: set?.workingTime.start,
      workingTimeTo: set?.workingTime.end,
      commercialTimeFrom: set?.commercialTime.start,
      commercialTimeTo: set?.commercialTime.end,
      buildingId: set?.building.id,
    })
  }, [set])

  const saveSet = (): void => {
    const setModel = {
      id: set?.id,
      name: values.name.toUpperCase(),
      description: values.description,
      height: Number(values.height),
      buildingId: buildingId ? +buildingId : values?.buildingId,
      workingTime: {
        start: values.workingTimeFrom,
        end: values.workingTimeTo,
      },
      commercialTime: {
        start: values.commercialTimeFrom,
        end: values.commercialTimeTo,
      },
    } as SetModel
    set?.id
      ? updateSet(setModel).then(() => {
          router.push({
            pathname: ROUTES.ADMIN_SET_DETAILS,
            query: {
              setId,
            },
          })
        })
      : createSet(setModel).then(() =>
          router.push({ pathname: ROUTES.ADMIN_SETS })
        )
  }

  return { set, saveSet, isLoading, isValid }
}
