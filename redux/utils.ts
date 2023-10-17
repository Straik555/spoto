import { RootState, SerializableRootState } from '@redux/store'
import { deepOmitBy } from '@utils/deepOmitBy'
import _isNull from 'lodash/isNull'
import _isUndefined from 'lodash/isUndefined'
import _omit from 'lodash/omit'

export const getSerializableState = (
  state: RootState
): SerializableRootState => {
  return deepOmitBy(
    _omit(state),
    (v) => _isUndefined(v) || _isNull(v)
  ) as SerializableRootState
}
