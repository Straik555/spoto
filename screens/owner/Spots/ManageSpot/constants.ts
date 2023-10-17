import { ManageSpotFormValues } from '@screens/owner/Spots/ManageSpot/ManageSpot.model'

export const initialManageSpotFormValues: ManageSpotFormValues = {
  spotName: '',
  location: '',
  locationPlaceId: '',
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
}
