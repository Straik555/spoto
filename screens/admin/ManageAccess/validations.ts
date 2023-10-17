import * as Yup from 'yup'

export const manageAccessValidationSchema = Yup.object().shape({
  spotName: Yup.string().test({
    message: 'Please, choose at least one spot or set',
    test: function () {
      const { selectedSets, selectedSpots } = this.parent
      return !!selectedSets.length || !!selectedSpots.length
    },
  }),
  setName: Yup.array().test({
    message: 'Please, choose at least one set or spot',
    test: function () {
      const { selectedSets, selectedSpots } = this.parent
      return !!selectedSpots.length || !!selectedSets.length
    },
  }),
  userOrGroupName: Yup.string().test({
    message: 'Please, choose at least one user or group',
    test: function () {
      return !!this.parent.selectedUserGroups.length
    },
  }),
  selectedSpots: Yup.array().test({
    test: function () {
      const { selectedSets, selectedSpots } = this.parent
      return !!selectedSpots.length || !!selectedSets.length
    },
  }),
  selectedSets: Yup.array().test({
    test: function () {
      const { selectedSets, selectedSpots } = this.parent
      return !!selectedSets.length || !!selectedSpots.length
    },
  }),
  selectedUserGroups: Yup.array().min(1),
})
