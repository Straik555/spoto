import { CreateSpotParams, SpotInfo } from '@api/spot/types'
import { withForm } from '@components/Form/withForm'
import { initialManageSpotFormValues } from '@screens/owner/Spots/ManageSpot/constants'
import {
  ManageSpotFormValues,
  ManageSpotProps,
} from '@screens/owner/Spots/ManageSpot/ManageSpot.model'
import { manageSpotValidationSchema } from '@screens/owner/Spots/ManageSpot/validations'
import {
  hasElectricCharger,
  spotAvailableForPublic,
} from '@screens/owner/Spots/utils'
import { deepOmitBy } from '@utils/deepOmitBy'
import _isNull from 'lodash/isNull'
import _isUndefined from 'lodash/isUndefined'
import _omitBy from 'lodash/omitBy'

export const mapFormValuesToApiParams = (
  formValues: ManageSpotFormValues
): CreateSpotParams => {
  return deepOmitBy<CreateSpotParams>(
    {
      name: formValues.spotName,
      description: formValues.spotDescription,
      price: formValues.availableForPublic
        ? _omitBy(
            {
              perHour: formValues.hasHourlyRate ? formValues.hourlyRate! : null,
              perDay: formValues.hasDailyRate ? formValues.dailyRate! : null,
              perWeek: formValues.hasWeeklyRate ? formValues.weeklyRate! : null,
            },
            (v) => _isNull(v)
          )
        : {
            perHour: 0,
            perDay: 0,
            perWeek: 0,
          },
      hardwareId: formValues.spollardId!,
      address: formValues.location,
      lat: formValues.latitude!,
      lon: formValues.longitude!,
      height: formValues.maximumVehicleHeight!,
      electricCharger: formValues.electricCharger,
    },
    (v) => _isUndefined(v) || _isNull(v)
  ) as CreateSpotParams
}

export const mapSpotInfoToFormValues = (
  spotInfo: SpotInfo
): ManageSpotFormValues => {
  return {
    spotName: spotInfo.name,
    location:
      spotInfo.building?.address || initialManageSpotFormValues.location,
    locationPlaceId: '',
    latitude: spotInfo.building?.lat || initialManageSpotFormValues.latitude,
    longitude: spotInfo.building?.lon || initialManageSpotFormValues.longitude,
    spotDescription: spotInfo.description,
    availableForPublic: spotAvailableForPublic(spotInfo.price),
    hasHourlyRate: Boolean(spotInfo.price.perHour),
    hourlyRate: spotInfo.price.perHour || null,
    hasDailyRate: Boolean(spotInfo.price.perDay),
    dailyRate: spotInfo.price.perDay || null,
    hasWeeklyRate: Boolean(spotInfo.price.perWeek),
    weeklyRate: spotInfo.price.perWeek || null,
    maximumVehicleHeight: spotInfo.height,
    hasElectricCharger: hasElectricCharger(spotInfo.electricCharger),
    electricCharger: spotInfo.electricCharger,
    spollardId: spotInfo.hardwareId,
  }
}

export const withManageSpotForm = (Component) => {
  return withForm<ManageSpotProps>(
    {
      initialValues: {
        spotName: '',
        location: '',
        latitude: null,
        longitude: null,
        spotDescription: '',
        availableForPublic: false,
        hasHourlyRate: false,
        hourlyRate: null,
        hasDailyRate: false,
        dailyRate: null,
        hasWeeklyRate: false,
        weeklyRate: null,
        maximumVehicleHeight: null,
        hasElectricCharger: false,
        electricCharger: {
          type1: false,
          type2: false,
        },
        spollardId: null,
      } as ManageSpotFormValues,
      validationSchema: manageSpotValidationSchema,
    },
    Component
  )
}
