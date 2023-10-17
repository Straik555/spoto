import { LoDashStatic } from 'lodash'
import _omitBy from 'lodash/omitBy'
import _filter from 'lodash/filter'

/**
 * @description Do not use on client side
 */
export const deepOmitBy: LoDashStatic['omitBy'] = (value, predicate) => {
  if (value === null) {
    return value
  }

  if (Array.isArray(value)) {
    const arrayWithOmittedValues = _filter(
      value,
      (...args) => !predicate(...args)
    )

    arrayWithOmittedValues.forEach((v, index) => {
      if (typeof v === 'object') {
        arrayWithOmittedValues[index] = deepOmitBy(v, predicate)
      }
    })

    return arrayWithOmittedValues
  }

  const objectWithOmittedValues = _omitBy(value, predicate)

  Object.entries(objectWithOmittedValues).forEach(([key, v]) => {
    if (typeof v === 'object') {
      objectWithOmittedValues[key] = deepOmitBy(v, predicate)
    }
  })
  return objectWithOmittedValues
}
