jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist')
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  }
})

jest.mock('redux-persist/integration/react', () => ({
  PersistGate: (props) => props.children,
}))

export {}
