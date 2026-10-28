import { create } from 'zustand'

interface NavigationState {
  activeMenu: string | null
  mobileOpen: boolean
  setActiveMenu: (menu: string | null) => void
  setMobileOpen: (open: boolean) => void
  closeAll: () => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
  activeMenu: null,
  mobileOpen: false,
  setActiveMenu: (activeMenu) =>
    set((state) => ({
      activeMenu,
      // Header blur also clears desktop hover when focus enters the mobile dialog.
      mobileOpen: activeMenu === null ? state.mobileOpen : false,
    })),
  setMobileOpen: (mobileOpen) => set({ mobileOpen, activeMenu: null }),
  closeAll: () => set({ activeMenu: null, mobileOpen: false }),
}))
