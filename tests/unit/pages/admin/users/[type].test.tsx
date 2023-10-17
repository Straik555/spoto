import { userApi } from '@api/user'
import { ROUTES } from '@constants/routes'
import { faker } from '@faker-js/faker'
import { AppProvider } from '@pages/_app'
import UsersRoute from '@pages/admin/users/[[...type]]'
import { userTypeToRouteParamMapping } from '@screens/admin/Users/constants'
import { AddUserGroupFormValues } from '@screens/admin/Users/Person/AddUserGroupDialog/AddUserGroupDialog.model'
import { InvitePersonFormValues } from '@screens/admin/Users/Persons/components/InvitePersonDialog/InvitePersonDialog.model'
import { UserType } from '@screens/admin/Users/Users.model'
import { getPersonFullName } from '@screens/admin/Users/utils/getPersonFullName'
import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { adminGroupList } from '@tests/unit/api/group/fixtures'
import { adminUsersList } from '@tests/unit/api/user/fixtures'
import { authenticateAsAdmin } from '@tests/unit/utils/auth'
import { elementUtils } from '@tests/unit/utils/elementUtils'
import { eventUtils } from '@tests/unit/utils/eventUtils'
import { getRunningRequest } from '@tests/unit/utils/getRunningRequest'
import mockRouter from 'next-router-mock'
import router from 'next/router'
import React, { FC } from 'react'

const UsersWithProvider: FC = () => {
  return (
    <AppProvider>
      <UsersRoute />
    </AppProvider>
  )
}

describe.skip('pages/admin/users', () => {
  beforeEach(async () => {
    await authenticateAsAdmin()
  })

  const navigateToUsers = () => {
    mockRouter.setCurrentUrl({
      pathname: ROUTES.ADMIN_USERS_TYPE,
      query: {
        type: [userTypeToRouteParamMapping[UserType.USERS]],
      },
    })
  }
  const navigateToUserGroups = () => {
    mockRouter.setCurrentUrl({
      pathname: ROUTES.ADMIN_USERS_TYPE,
      query: {
        type: [userTypeToRouteParamMapping[UserType.USER_GROUPS]],
      },
    })
  }
  const $elements = {
    tabs: {
      get users() {
        return screen.findByText('Users')
      },
      get userGroups() {
        return screen.findByText('User Groups')
      },
      get usersAll() {
        return screen.findByText('All')
      },
      get usersLinked() {
        return screen.findByText('Confirmed')
      },
      get usersUnlinked() {
        return screen.findByText('Unconfirmed')
      },
    },
    data: {
      get queryFirstUser() {
        return screen.queryByText(getPersonFullName(adminUsersList[0]))
      },
      get findFirstUser() {
        return screen.findByText(getPersonFullName(adminUsersList[0]))
      },
      get findFirstGroup() {
        return screen.findByText(adminGroupList[0].name)
      },
    },
    inputs: {
      get search() {
        return screen.findByRole('textbox', {
          name: /search/i,
        })
      },
      get email() {
        return screen.findByRole('textbox', {
          name: 'email',
        })
      },
      get firstName() {
        return screen.findByRole('textbox', {
          name: 'firstName',
        })
      },
      get lastName() {
        return screen.findByRole('textbox', {
          name: 'lastName',
        })
      },
      get groupName() {
        return screen.findByRole('textbox', { name: 'groupName' })
      },
    },
    buttons: {
      get queryInviteModalBtn() {
        return screen.queryByRole('button', { name: /add new user/i })
      },
      get findInviteModalBtn() {
        return screen.findByRole('button', { name: /add new user/i })
      },
      get findInviteBtn() {
        return screen.findByRole('button', { name: 'Invite' })
      },
      get findAddGroupModalBtn() {
        return screen.findByRole('button', {
          name: /add group/i,
        })
      },
      get addGroupBtn() {
        return screen.findByRole('button', { name: /create/i })
      },
      get deleteUserBtn() {
        return screen.findByRole('button', { name: /delete person/i })
      },
      get deleteGroupBtn() {
        return screen.findByRole('button', { name: /delete group/i })
      },
    },
  }
  const fillInviteUserForm = async (formValues: InvitePersonFormValues) => {
    const inviteUserModalBtn = await $elements.buttons.findInviteModalBtn

    fireEvent(inviteUserModalBtn, eventUtils.mouseClickEvent())

    const emailInput = await $elements.inputs.email
    const firstNameInput = await $elements.inputs.firstName
    const lastNameInput = await $elements.inputs.lastName

    fireEvent.focus(emailInput)
    fireEvent.change(emailInput, {
      target: { value: formValues.email },
    })
    fireEvent.focus(firstNameInput)
    fireEvent.change(firstNameInput, {
      target: { value: formValues.firstName },
    })
    fireEvent.focus(lastNameInput)
    fireEvent.change(lastNameInput, {
      target: { value: formValues.lastName },
    })
    fireEvent.blur(lastNameInput)
  }
  const fillCreateGroupForm = async (formValues: AddUserGroupFormValues) => {
    const createModalBtn = await $elements.buttons.findAddGroupModalBtn
    fireEvent(createModalBtn, eventUtils.mouseClickEvent())

    const groupNameInput = await $elements.inputs.groupName

    fireEvent.focus(groupNameInput)
    fireEvent.change(groupNameInput, {
      target: { value: formValues.groupName },
    })
  }

  it('should switch between top level tabs', async () => {
    await act(async () => {
      navigateToUsers()
      render(<UsersWithProvider />)

      const usersTab = await $elements.tabs.users
      const userGroupsTab = await $elements.tabs.userGroups

      expect(usersTab).toHaveAttribute('aria-selected', 'true')

      fireEvent(userGroupsTab, eventUtils.mouseClickEvent())

      expect(userGroupsTab).toHaveAttribute('aria-selected', 'true')
      expect(router.asPath).toContain(
        userTypeToRouteParamMapping[UserType.USER_GROUPS]
      )

      fireEvent(usersTab, eventUtils.mouseClickEvent())

      expect(usersTab).toHaveAttribute('aria-selected', 'true')
      expect(router.asPath).toContain(
        userTypeToRouteParamMapping[UserType.USERS]
      )
    })
  })

  it('should handle users search', async () => {
    await act(async () => {
      navigateToUsers()
      render(<UsersWithProvider />)
      await $elements.data.findFirstUser
      const searchInput = await $elements.inputs.search

      fireEvent.change(searchInput, { target: { value: '_' } })
      expect($elements.data.queryFirstUser).toBeNull()

      fireEvent.change(searchInput, { target: { value: '' } })
      expect($elements.data.queryFirstUser).not.toBeNull()
    })
  })

  it('should delete user', async () => {
    await act(async () => {
      navigateToUsers()
      render(<UsersWithProvider />)

      await $elements.data.findFirstUser

      fireEvent(
        await $elements.buttons.deleteUserBtn,
        eventUtils.mouseClickEvent()
      )
      fireEvent(
        await elementUtils.deleteConfirmationBtn,
        eventUtils.mouseClickEvent()
      )

      const [deleteUserPromise, deleteUserArgs] = await getRunningRequest(
        userApi,
        'deleteUser'
      )
      expect(deleteUserPromise).toBeDefined()
      expect(deleteUserArgs).toEqual(adminUsersList[0].userId)
    })
  })

  it('should show invite user button', async () => {
    await act(async () => {
      navigateToUsers()
      render(<UsersWithProvider />)
      await $elements.data.findFirstUser

      expect($elements.buttons.queryInviteModalBtn).not.toBeNull()
    })
  })

  it('should hide invite user button and display groups', async () => {
    await act(async () => {
      navigateToUserGroups()
      render(<UsersWithProvider />)
      await $elements.data.findFirstGroup

      expect($elements.buttons.queryInviteModalBtn).toBeNull()
    })
  })

  it('should open invite user modal with correct initial state', async () => {
    await act(async () => {
      navigateToUsers()
      render(<UsersWithProvider />)
      const inviteUseModalBtn = await $elements.buttons.findInviteModalBtn

      fireEvent(inviteUseModalBtn, eventUtils.mouseClickEvent())

      const inviteBtn = await $elements.buttons.findInviteBtn

      expect(inviteBtn).toBeDisabled()
    })
  })

  it('should be able to invite user', async () => {
    await act(async () => {
      navigateToUsers()
      render(<UsersWithProvider />)

      const formValues = {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      }

      await fillInviteUserForm(formValues)

      const inviteUserBtn = await $elements.buttons.findInviteBtn
      expect(inviteUserBtn).not.toBeDisabled()

      fireEvent(inviteUserBtn, eventUtils.mouseClickEvent())

      const [inviteUserApiCallPromise, inviteUserApiCallArgs] =
        await getRunningRequest(userApi, 'inviteUser')

      expect(inviteUserApiCallPromise).toBeDefined()
      expect(inviteUserApiCallArgs).toEqual(formValues)
    })
  })

  it('should validate user invitation form', async () => {
    await act(async () => {
      navigateToUsers()
      render(<UsersWithProvider />)

      await fillInviteUserForm({
        email: 'df',
        firstName: 'a',
        lastName: 'b',
      })

      const inviteUserBtn = await $elements.buttons.findInviteBtn
      const errors = await screen.findAllByRole('alert', {
        name: /input-error/i,
      })

      expect(errors.length).toBe(3)
      expect(inviteUserBtn).toBeDisabled()
    })
  })

  it('should open new group modal with correct initial state', async () => {
    await act(async () => {
      navigateToUserGroups()
      render(<UsersWithProvider />)

      const createModalBtn = await $elements.buttons.findAddGroupModalBtn
      fireEvent(createModalBtn, eventUtils.mouseClickEvent())

      const createBtn = await $elements.buttons.addGroupBtn

      expect(createBtn).toBeDisabled()
    })
  })

  it('should be able to create group', async () => {
    await act(async () => {
      navigateToUserGroups()
      render(<UsersWithProvider />)

      const formValues = {
        groupName: faker.name.title(),
      }
      await fillCreateGroupForm(formValues as AddUserGroupFormValues)

      const createBtn = await $elements.buttons.addGroupBtn

      expect(createBtn).not.toBeDisabled()
      fireEvent(createBtn, eventUtils.mouseClickEvent())

      const [inviteUserApiCallPromise, inviteUserApiCallArgs] =
        await getRunningRequest(userApi, 'createGroup')

      expect(inviteUserApiCallPromise).toBeDefined()
      expect(inviteUserApiCallArgs).toEqual({
        formData: null,
        name: formValues.groupName,
      })
    })
  })

  it('should validate create group form', async () => {
    await act(async () => {
      navigateToUserGroups()
      render(<UsersWithProvider />)

      const formValues = {
        groupName: '',
      }
      await fillCreateGroupForm(formValues as AddUserGroupFormValues)

      const createBtn = await $elements.buttons.addGroupBtn

      expect(createBtn).toBeDisabled()
    })
  })
})
