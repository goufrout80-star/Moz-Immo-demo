import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Locale } from './i18n'

// ============================================
// GLOBAL STATE MANAGEMENT
// ============================================

interface AppState {
  // Theme
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void

  // Locale
  locale: Locale
  setLocale: (locale: Locale) => void

  // Cookie consent
  cookieConsent: boolean | null
  setCookieConsent: (consent: boolean) => void

  // Demo role switcher
  demoRole: 'admin' | 'owner' | 'client'
  setDemoRole: (role: 'admin' | 'owner' | 'client') => void

  // Wishlist for experiences
  wishlist: number[]
  addToWishlist: (id: number) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean

  // Mobile menu
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'light',
      toggleTheme: () => set(state => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setTheme: (theme) => set({ theme }),

      // Locale
      locale: 'en',
      setLocale: (locale) => set({ locale }),

      // Cookie consent
      cookieConsent: null,
      setCookieConsent: (consent) => set({ cookieConsent: consent }),

      // Demo role
      demoRole: 'admin',
      setDemoRole: (role) => set({ demoRole: role }),

      // Wishlist
      wishlist: [],
      addToWishlist: (id) => set(state => ({ 
        wishlist: state.wishlist.includes(id) ? state.wishlist : [...state.wishlist, id] 
      })),
      removeFromWishlist: (id) => set(state => ({ 
        wishlist: state.wishlist.filter(i => i !== id) 
      })),
      isInWishlist: (id) => get().wishlist.includes(id),

      // Mobile menu
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
    }),
    {
      name: 'moz-immo-storage',
      partialize: (state) => ({
        theme: state.theme,
        locale: state.locale,
        cookieConsent: state.cookieConsent,
        demoRole: state.demoRole,
        wishlist: state.wishlist,
      }),
    }
  )
)
