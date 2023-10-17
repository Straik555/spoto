jest.mock('react-places-autocomplete', () => {
  const PlacesAutocomplete = ({ children, ...props }) => {
    return (
      <>
        {children({
          getInputProps: jest.fn(({ placeholder, className }) => ({
            placeholder,
            className,
            onChange: (e) => {
              props?.onChange(e.target.value)
            },
            onSelect: (e) => {
              console.log(e)
              throw Error('On select is not implemented')
            },
          })),
          suggestions: [],
          getSuggestionItemProps: jest.fn(),
        })}
      </>
    )
  }

  return {
    __esModule: true,
    geocodeByAddress() {
      return []
    },
    geocodeByPlaceId() {
      return []
    },
    getLatLng() {
      return { lat: 0, lng: 0 }
    },
    default: PlacesAutocomplete,
  }
})

// jest.mock('@components/ScrollbarContainer/ScrollbarContainer', () => {
//   const Component2 = ({ children }) => {
//     return null
//   }
//
//   return Component2
// })

export {}
