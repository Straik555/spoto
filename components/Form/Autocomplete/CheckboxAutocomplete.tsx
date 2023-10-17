import CrossIcon from '@assets/icons/close-10.svg'
import { ButtonMode } from '@components/Button/Button.model'
import Autocomplete, {
  AutocompleteData,
  AutocompleteItem,
  AutocompleteNoDataItem,
} from '@components/Form/Autocomplete/Autocomplete'
import { CheckboxAutocompleteProps } from '@components/Form/Autocomplete/Autocomplete.model'
import Checkbox from '@components/Form/Checkbox/Checkbox'
import CheckboxGroup from '@components/Form/Checkbox/CheckboxGroup'
import { Button } from '@components/index'
import cn from 'classnames'
import classNames from 'classnames'
import { useFormikContext } from 'formik'
import React, { FC, PropsWithChildren, useMemo, useState } from 'react'

export const CheckboxAutocomplete = <T,>({
  data,
  onSearch,
  onChange,
  onFocus,
  onClose,
  savedItemsFieldName,
  checkedItemsFieldName,
  name,
  comparator,
  hasSaveBtn,
  getAutocompleteItemProps,
  disabled,
  ...props
}: PropsWithChildren<CheckboxAutocompleteProps<T>>): ReturnType<
  FC<CheckboxAutocompleteProps<T>>
> => {
  const formikCtx = useFormikContext()
  const [search, setSearch] = useState<string>('')
  const [isFocused, setIsFocused] = useState(false)
  const { value: savedDataItems } =
    formikCtx.getFieldMeta<typeof data>(savedItemsFieldName)
  const { value: checkedDataItems } = formikCtx.getFieldMeta<typeof data>(
    checkedItemsFieldName
  )
  const currentData = useMemo(() => {
    return data.filter(
      (item) =>
        onSearch(item, search) &&
        !savedDataItems.find((su) => comparator(su, item))
    )
  }, [search, savedDataItems, data])

  const handleSave = () => {
    onClose?.()

    formikCtx.setValues({
      ...(formikCtx.values as any),
      [name]: '',
      [savedItemsFieldName]: [...savedDataItems, ...checkedDataItems],
      [checkedItemsFieldName]: [],
    })
  }

  const removeSavedItem = (itemToRemove: T) => {
    formikCtx.setFieldValue(savedItemsFieldName, [
      ...savedDataItems.filter(
        (savedItem) => !comparator(itemToRemove, savedItem)
      ),
    ])
  }

  return (
    <>
      <Autocomplete
        {...props}
        disabled={disabled}
        name={name}
        onChange={(e) => {
          setSearch(e.target.value)
          onChange?.(e)
        }}
        onFocus={(e) => {
          onFocus?.(e)
          setIsFocused(true)
        }}
        isFocused={isFocused}
        {...(!hasSaveBtn ? { onClose: handleSave } : {})}
      >
        <AutocompleteData
          className="!max-h-unset"
          onClick={(e) => e.stopPropagation()}
        >
          <CheckboxGroup name={checkedItemsFieldName}>
            {currentData.length ? (
              <div className="flex flex-col max-h-[300px]">
                <div className="h-auto overflow-auto">
                  {currentData.map((item, index) => {
                    const { label, ...restAutocompleteItemProps } =
                      getAutocompleteItemProps?.(item) || {}
                    const checked = Boolean(
                      checkedDataItems.find((checkedDataItem) =>
                        comparator(checkedDataItem, item)
                      )
                    )

                    return (
                      <AutocompleteItem
                        key={index}
                        className={classNames('flex items-center', {
                          'bg-blue-4': checked,
                        })}
                        {...restAutocompleteItemProps}
                      >
                        <Checkbox value={item} className="mr-2" />
                        {label}
                      </AutocompleteItem>
                    )
                  })}
                </div>

                {hasSaveBtn && (
                  <div className="p-3 bg-white">
                    <Button
                      mode={ButtonMode.FULL_PRIMARY}
                      onClick={() => {
                        handleSave()
                        setIsFocused(false)
                      }}
                      className="py-3 text-s-base"
                    >
                      Save
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <AutocompleteNoDataItem className="text-center">
                No data
              </AutocompleteNoDataItem>
            )}
          </CheckboxGroup>
        </AutocompleteData>
      </Autocomplete>
      <div className="flex flex-wrap max-w-full mt-[5px]">
        {savedDataItems.map((item, index) => {
          const { label } = getAutocompleteItemProps?.(item) || {}
          return (
            <div
              className={cn(
                'flex font-semibold items-center text-blue-1 bg-blue-4 rounded-[5px] py-[10px] px-[15px] w-[fit-content] text-s-xl mr-[5px] mb-[5px]',
                {
                  'text-blue-3': disabled,
                }
              )}
              key={index}
            >
              {label}
              <CrossIcon
                className={cn('fill-blue-3 ml-[15px]', {
                  'cursor-pointer': !disabled,
                })}
                onClick={() => !disabled && removeSavedItem(item)}
                disabled={disabled}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
