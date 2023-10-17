import * as Yup from 'yup'
import { CreateEditSetFormValues } from '@screens/admin/Sets/CreateEditSet/CreateEditSet.model'
import { AnySchema } from 'yup'

export const setValidationSchema = Yup.object().shape<
  Partial<Record<keyof CreateEditSetFormValues, AnySchema>>
>({
  name: Yup.string().required('Set Name is a required field'),
  description: Yup.string().required('Description is a required field'),
  height: Yup.number().max(5, `Maximum height 5 m`),
  workingTimeFrom: Yup.string().test({
    test: function () {
      return this.parent.workingTimeFrom
    },
  }),
  workingTimeTo: Yup.string().test({
    test: function () {
      return this.parent.workingTimeTo
    },
  }),
  commercialTimeFrom: Yup.string().test({
    test: function () {
      return this.parent.commercialTimeFrom
    },
  }),
  commercialTimeTo: Yup.string().test({
    test: function () {
      return this.parent.commercialTimeTo
    },
  }),
})
