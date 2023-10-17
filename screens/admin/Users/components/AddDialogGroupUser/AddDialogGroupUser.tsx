import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import Dialog from '@components/Dialog/Dialog'
import { withForm } from '@components/Form/withForm'
import { useFormikContext } from 'formik'
import React, { FC, useMemo, useState } from 'react'
import cn from 'classnames'
import Autocomplete, {
  AutocompleteData,
  AutocompleteItem,
  AutocompleteNoDataItem,
} from '@components/Form/Autocomplete/Autocomplete'
import { changeNameGroupValidationSchema } from '@screens/admin/Users/validations'
import {
  AddDialogGroupUserProps,
  FilterGroupProps,
  AddDialogGroupUserFormValues,
} from '@screens/admin/Users/components/AddDialogGroupUser/AddDialogGroupUser.model'
import SearchIcon from '@assets/icons/search-14.svg'
import CloseIcon from '@assets/icons/close-14.svg'

const AddDialogGroupUser: FC<AddDialogGroupUserProps> = ({
  onDelete,
  onClose,
  open,
  selectedItems,
  createGroup,
  items = [],
  loadingGroupsList,
  title,
  label,
  placeholder,
}) => {
  const { resetForm, values, setFieldValue, dirty, isValid, setTouched } =
    useFormikContext<AddDialogGroupUserFormValues>()
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const filteredGroups: FilterGroupProps[] = useMemo(() => {
    return values.groupName.length
      ? items.filter((group) => {
          return group.name.includes(values.groupName)
        })
      : items
  }, [items, values.groupName, isFocused])

  const filterUserGroups: FilterGroupProps[] = useMemo(() => {
    return selectedItems?.length
      ? filteredGroups.filter((item) => {
          return (
            JSON.stringify(selectedItems).indexOf(JSON.stringify(item)) === -1
          )
        })
      : filteredGroups
  }, [filteredGroups, selectedItems])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      afterLeave={resetForm}
      closeIcon
    >
      <Autocomplete
        name="groupName"
        labelClassName="!mb-[10px]"
        label={label}
        placeholder={placeholder || label}
        onChange={(text) => {
          setFieldValue('groupName', text.target.value)
          setIsFocused(true)
        }}
        onBlur={() => {
          setTimeout(() => {
            setIsFocused(false)
            setTouched({ groupName: true })
          }, 300)
        }}
        onClick={() => {
          setTouched({ groupName: false })
          setIsFocused(true)
        }}
        isFocused={isFocused}
        loading={loadingGroupsList}
        prefixIcon={<SearchIcon className="fill-blue-3" />}
        tabIndex={-1}
      >
        {isFocused && (
          <AutocompleteData>
            {filterUserGroups.length ? (
              filterUserGroups.map((group) => {
                return (
                  <AutocompleteItem
                    key={group.id}
                    onSelect={() => {
                      setFieldValue('group', group)
                      setTimeout(() => {
                        setFieldValue('groupName', group.name)
                        setIsFocused(false)
                      }, 100)
                    }}
                  >
                    {group.name}
                  </AutocompleteItem>
                )
              })
            ) : (
              <AutocompleteNoDataItem>No Groups</AutocompleteNoDataItem>
            )}
          </AutocompleteData>
        )}
      </Autocomplete>
      {selectedItems && onDelete && (
        <div className="flex flex-wrap">
          {selectedItems?.length > 0 &&
            selectedItems?.map((user: FilterGroupProps) => (
              <div
                key={user.id}
                onClick={() => onDelete(user.id)}
                className="flex items-center justify-between w-full max-w-[174px] h-[48px] p-[10px_15px] bg-blue-4 rounded-[5px] mr-[5px] mt-[5px]"
              >
                <p
                  className={cn(
                    'overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[110px] text-blue-1 font-semibold text-s-xl'
                  )}
                >
                  {user.name}
                </p>
                <CloseIcon className={cn('fill-blue-2 cursor-pointer')} />
              </div>
            ))}
        </div>
      )}

      <div className="flex justify-between px-0 mt-[16px] desktop:mt-[35px]">
        <Button
          mode={ButtonMode.FULL_SECONDARY}
          onClick={onClose}
          className="w-1/2 text-s-lg font-semibold border-2 h-[44px] mr-[10px] text-blue-3 !border-primary !text-primary"
        >
          Cancel
        </Button>
        <Button
          mode={ButtonMode.FULL_PRIMARY}
          onClick={() => {
            if (createGroup) {
              createGroup(String(values.group?.id))
            }
            onClose()
          }}
          className="w-1/2 text-s-lg h-[44px] font-semibold !bg-primary"
          disabled={!(dirty && isValid)}
        >
          Save
        </Button>
      </div>
    </Dialog>
  )
}

export default withForm<AddDialogGroupUserProps>(
  {
    initialValues: {
      group: null,
      groupName: '',
    } as AddDialogGroupUserFormValues,
    validationSchema: changeNameGroupValidationSchema,
  },
  AddDialogGroupUser
)
