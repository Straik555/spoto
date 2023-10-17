import Autocomplete, {
  AutocompleteData,
  AutocompleteItem,
  AutocompleteNoDataItem,
} from '@components/Form/Autocomplete/Autocomplete'
import { CheckboxAutocomplete } from '@components/Form/Autocomplete/CheckboxAutocomplete'
import Form from '@components/Form/Form'
import Radio from '@components/Form/Radio/Radio'
import RadioGroup from '@components/Form/Radio/RadioGroup'
import { faker } from '@faker-js/faker'
import { getStore } from '@redux/store'
import classNames from 'classnames'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { Provider } from 'react-redux'

export default {
  title: 'Reusable Components/Forms/Autocomplete',
  component: Autocomplete,
}

const Template: FC<{ value: string }> = ({ children, value }) => {
  const store = getStore({
    preloadedState: undefined,
    memoized: true,
  })
  return (
    <Provider store={store}>
      <div className="w-[500px]">
        {children}
        <p className="mt-3">Value: {value}</p>
      </div>
    </Provider>
  )
}

const users = [
  { name: faker.name.firstName() },
  { name: faker.name.firstName() },
  { name: faker.name.firstName() },
  { name: faker.name.firstName() },
  { name: faker.name.firstName() },
]

const getAsyncData = async (s = '') => {
  await new Promise((res) => {
    setTimeout(res, 500)
  })

  const searchRegExp = new RegExp(s, 'gi')
  return users.filter((item) => searchRegExp.test(item.name))
}

export const Default: FC = () => {
  const [search, setSearch] = useState<string>('')
  const data = useMemo(() => {
    const searchRegExp = new RegExp(search, 'gi')
    return users.filter((item) => searchRegExp.test(item.name))
  }, [search])

  return (
    <Form initialValues={{ input: '' }}>
      {(formikProps) => {
        return (
          <Template value={formikProps.values.input}>
            <Autocomplete
              name="input"
              label="Label"
              placeholder="Placeholder"
              onChange={(e) => {
                setSearch(e.target.value)
              }}
            >
              <AutocompleteData>
                {data.length ? (
                  data.map((item, index) => {
                    return (
                      <AutocompleteItem
                        key={index}
                        onSelect={() => {
                          formikProps.setFieldValue('input', item.name)
                        }}
                      >
                        {item.name}
                      </AutocompleteItem>
                    )
                  })
                ) : (
                  <AutocompleteNoDataItem className="text-center">
                    No data
                  </AutocompleteNoDataItem>
                )}
              </AutocompleteData>
            </Autocomplete>
          </Template>
        )
      }}
    </Form>
  )
}

export const AsyncData: FC = () => {
  const [users, setUsers] = useState<any>([])
  const [isLoading, setLoading] = useState<any>(false)
  const getUsers = (s = '') => {
    setLoading(true)
    getAsyncData(s).then((res) => {
      setUsers(res)
      setLoading(false)
    })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Form initialValues={{ input: '' }}>
      {(formikProps) => {
        return (
          <Template value={formikProps.values.input}>
            <Autocomplete
              name="input"
              label="Label"
              placeholder="Placeholder"
              onChange={(e) => {
                getUsers(e.target.value)
              }}
              loading={isLoading}
            >
              <AutocompleteData>
                {users.length ? (
                  users.map((item, index) => {
                    return (
                      <AutocompleteItem
                        key={index}
                        onSelect={() => {
                          formikProps.setFieldValue('input', item.name)
                        }}
                      >
                        {item.name}
                      </AutocompleteItem>
                    )
                  })
                ) : (
                  <AutocompleteNoDataItem className="text-center">
                    No groups
                  </AutocompleteNoDataItem>
                )}
              </AutocompleteData>
            </Autocomplete>
          </Template>
        )
      }}
    </Form>
  )
}

export const VisibleData: FC = () => {
  const [search, setSearch] = useState<string>('')
  const data = useMemo(() => {
    const searchRegExp = new RegExp(search, 'gi')
    return users.filter((item) => searchRegExp.test(item.name))
  }, [search])

  return (
    <Form initialValues={{ input: '', selectedUserName: '' }}>
      {(formikProps) => {
        return (
          <Template value={formikProps.values.selectedUserName}>
            <Autocomplete
              name="input"
              label="Label"
              placeholder="Placeholder"
              onChange={(e) => {
                setSearch(e.target.value)
              }}
              dataAlwaysVisible
            >
              <AutocompleteData className="!relative !p-0 !border-0 !mt-2 !top-0 !overflow-y-auto !max-h-unset">
                <RadioGroup name="selectedUserName">
                  {data.length ? (
                    data.map((item, index) => {
                      const checked =
                        formikProps.values.selectedUserName === item.name

                      return (
                        <AutocompleteItem
                          key={index}
                          className={classNames('flex items-center', {
                            'bg-blue-4': checked,
                          })}
                        >
                          <Radio value={item.name} />
                          <p
                            className={classNames('font-s-base ml-6 mb-0', {
                              'text-primary': checked,
                              'text-blue-1': !checked,
                            })}
                          >
                            {item.name}
                          </p>
                        </AutocompleteItem>
                      )
                    })
                  ) : (
                    <AutocompleteNoDataItem className="text-center">
                      No data
                    </AutocompleteNoDataItem>
                  )}
                </RadioGroup>
              </AutocompleteData>
            </Autocomplete>
          </Template>
        )
      }}
    </Form>
  )
}

export const ControllableFocusState: FC = () => {
  return (
    <Form
      initialValues={{ input: '', checkedDataItems: [], savedDataItems: [] }}
    >
      {(formikProps) => {
        return (
          <Template
            value={`${JSON.stringify(formikProps.values.savedDataItems)}`}
          >
            <CheckboxAutocomplete
              data={users}
              onSearch={(item, value) =>
                new RegExp(value, 'gi').test(item.name)
              }
              name="input"
              savedItemsFieldName="savedDataItems"
              checkedItemsFieldName="checkedDataItems"
              comparator={(a, b) => a.name === b.name}
              hasSaveBtn
              getAutocompleteItemProps={(v) => ({
                label: v.name,
              })}
            />
          </Template>
        )
      }}
    </Form>
  )
}

export const ControllableFocusStateSaveOnBlur: FC = () => {
  return (
    <Form
      initialValues={{ input: '', checkedDataItems: [], savedDataItems: [] }}
    >
      {(formikProps) => {
        return (
          <Template
            value={`${JSON.stringify(formikProps.values.savedDataItems)}`}
          >
            <CheckboxAutocomplete
              data={users}
              onSearch={(item, value) =>
                new RegExp(value, 'gi').test(item.name)
              }
              name="input"
              savedItemsFieldName="savedDataItems"
              checkedItemsFieldName="checkedDataItems"
              comparator={(a, b) => a.name === b.name}
              getAutocompleteItemProps={(v) => ({
                label: v.name,
              })}
            />
          </Template>
        )
      }}
    </Form>
  )
}

export const TwoAutoCompletes: FC = () => {
  return (
    <>
      <Default />
      <Default />
    </>
  )
}

export const TwoControllableAutoCompletes: FC = () => {
  return (
    <>
      <ControllableFocusState />
      <ControllableFocusState />
    </>
  )
}
