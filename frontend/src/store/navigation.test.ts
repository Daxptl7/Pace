import { beforeEach, describe, expect, it } from 'vitest'
import { useNavigationStore } from './navigation'

describe('navigation transitions', () => {
  beforeEach(() => useNavigationStore.getState().closeAll())
  it('closes the desktop menu when opening the mobile drawer', () => {
    useNavigationStore.getState().setActiveMenu('Men')
    useNavigationStore.getState().setMobileOpen(true)
    expect(useNavigationStore.getState()).toMatchObject({
      mobileOpen: true,
      activeMenu: null,
    })
  })
  it('closes the mobile drawer when opening a desktop menu', () => {
    useNavigationStore.getState().setMobileOpen(true)
    useNavigationStore.getState().setActiveMenu('Women')
    expect(useNavigationStore.getState()).toMatchObject({
      mobileOpen: false,
      activeMenu: 'Women',
    })
  })
  it('resets all overlays for route changes and escape', () => {
    useNavigationStore.getState().setActiveMenu('Kids')
    useNavigationStore.getState().closeAll()
    expect(useNavigationStore.getState()).toMatchObject({
      mobileOpen: false,
      activeMenu: null,
    })
  })
  it('keeps the mobile dialog open when header blur clears desktop hover', () => {
    useNavigationStore.getState().setMobileOpen(true)
    useNavigationStore.getState().setActiveMenu(null)
    expect(useNavigationStore.getState()).toMatchObject({
      mobileOpen: true,
      activeMenu: null,
    })
  })
})
