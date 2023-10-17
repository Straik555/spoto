import * as Yup from 'yup'

export const spotValidationSchema = (height) => {
  return Yup.object().shape({
    name: Yup.string().required('Spot ID is a required field'),
    description: Yup.string().required('Description is a required field'),
    height: Yup.number().max(height, `Maximum height ${height} m`),
  })
}
