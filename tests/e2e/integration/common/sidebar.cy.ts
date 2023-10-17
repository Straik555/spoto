import { ROUTES } from '@constants/routes'
import { Users } from '@tests/e2e/fixtures/auth/types'
import { login } from '@tests/e2e/utils/login'
import { navigate } from '@tests/e2e/utils/navigate'

describe('Sidebar', async () => {
  let users: Users
  const $ = {
    get sidebarMenuBtn() {
      return cy.get('button[aria-label="sidebar-menu-icon"]')
    },
    get loginBtn() {
      return cy.contains('Log In')
    },
    get logOutBtn() {
      return cy.contains('Log Out')
    },
  }

  beforeEach(function () {
    navigate(ROUTES.HOME)
    cy.fixture('auth/users').then((data: Users) => (users = data))
  })

  it('Redirects to login when un-authenticated', function () {
    $.sidebarMenuBtn.click()

    $.loginBtn.should('exist').click()

    cy.location('pathname').should('eq', ROUTES.LOGIN)
  })

  it('PPU - all items on sidebar exists', function () {
    login(users.email.ppu, users.password)
    $.sidebarMenuBtn.should('be.visible').click()
    cy.contains(users.email.ppu).should('be.visible')

    const menuItems = cy.get('header a')
    menuItems.should('have.length', 8)
    menuItems.and(($m) => {
      expect($m.eq(0)).to.contain('New Booking')
      expect($m.eq(1)).to.contain('My Bookings')
      expect($m.eq(2)).to.contain('Dashboard')
      expect($m.eq(3)).to.contain('My Guests')
      expect($m.eq(4)).to.contain('Spots')
      expect($m.eq(5)).to.contain('Waitlist')
      expect($m.eq(6)).to.contain('Settings')
      expect($m.eq(7)).to.contain('Help')
    })

    $.logOutBtn.should('exist')
  })

  it('OA - all items on sidebar exists', function () {
    login(users.email.oa, users.password)

    $.sidebarMenuBtn.should('be.visible').click()
    const menuItems = cy.get('header a')
    menuItems.should('have.length', 9)
    menuItems.and(($m) => {
      expect($m.eq(0)).to.contain('New Booking')
      expect($m.eq(1)).to.contain('My Bookings')
      expect($m.eq(2)).to.contain('Dashboard')
      expect($m.eq(3)).to.contain('Spots')
      expect($m.eq(4)).to.contain('Sets')
      expect($m.eq(5)).to.contain('Users & Groups')
      expect($m.eq(6)).to.contain('Waitlist')
      expect($m.eq(7)).to.contain('Settings')
      expect($m.eq(8)).to.contain('Help')
    })

    $.logOutBtn.should('exist')
  })

  it('HR - all items on sidebar exists', function () {
    login(users.email.hr, users.password)

    $.sidebarMenuBtn.should('be.visible').click()
    const menuItems = cy.get('header a')
    menuItems.should('have.length', 9)

    menuItems.and(($m) => {
      expect($m.first()).to.contain('New Booking')
      expect($m.eq(1)).to.contain('My Bookings')
      expect($m.eq(2)).to.contain('Dashboard')
      expect($m.eq(3)).to.contain('My Visitors')
      expect($m.eq(4)).to.contain('My Guests')
      expect($m.eq(5)).to.contain('Spots')
      expect($m.eq(6)).to.contain('Waitlist')
      expect($m.eq(7)).to.contain('Settings')
      expect($m.eq(8)).to.contain('Help')
    })

    $.logOutBtn.should('exist')
  })

  it('HM - all items on sidebar exists', function () {
    login(users.email.hm, users.password)

    $.sidebarMenuBtn.should('be.visible').click()
    const menuItems = cy.get('header a')
    menuItems.should('have.length', 5)

    menuItems.and(($m) => {
      expect($m.first()).to.contain('Dashboard')
      expect($m.eq(1)).to.contain('Occupants')
      expect($m.eq(2)).to.contain('Spots')
      expect($m.eq(3)).to.contain('Settings')
      expect($m.eq(4)).to.contain('Help')
    })

    $.logOutBtn.should('exist')
  })

  it('PO - all items on sidebar exists', function () {
    login(users.email.po, users.password)

    $.sidebarMenuBtn.should('be.visible').click()
    const menuItems = cy.get('header a')
    menuItems.should('have.length', 9)

    menuItems.and(($m) => {
      expect($m.first()).to.contain('New Booking')
      expect($m.eq(1)).to.contain('My Bookings')
      expect($m.eq(2)).to.contain('Dashboard')
      expect($m.eq(3)).to.contain('My Guests')
      expect($m.eq(4)).to.contain('Spots')
      expect($m.eq(5)).to.contain('Reservations')
      expect($m.eq(6)).to.contain('Waitlist')
      expect($m.eq(7)).to.contain('Settings')
      expect($m.eq(8)).to.contain('Help')
    })

    $.logOutBtn.should('exist')
  })

  it('Corp Client - all items on sidebar exists', function () {
    login(users.email.corp, users.password)

    $.sidebarMenuBtn.should('be.visible').click()
    const menuItems = cy.get('header a')
    menuItems.should('have.length', 5)

    menuItems.and(($m) => {
      expect($m.first()).to.contain('New Booking')
      expect($m.eq(1)).to.contain('My Bookings')
      expect($m.eq(2)).to.contain('Waitlist')
      expect($m.eq(3)).to.contain('Settings')
      expect($m.eq(4)).to.contain('Help')
    })

    $.logOutBtn.should('exist')
  })
})
