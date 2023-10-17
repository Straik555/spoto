import * as Yup from 'yup'

export const spotAutocompleteValidationSchema = Yup.object().shape({
  spots: Yup.array().required().min(1),
})
