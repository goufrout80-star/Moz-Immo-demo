'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Moon, Sun, Globe, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui'

const navigation = [
  { name: { en: 'Home', fr: 'Accueil' }, href: '/' },
  { name: { en: 'About', fr: 'À propos' }, href: '/about' },
  { name: { en: 'Services', fr: 'Services' }, href: '/discover/services' },
  { name: { en: 'Villas', fr: 'Villas' }, href: '/discover/villas' },
  { name: { en: 'Cars', fr: 'Voitures' }, href: '/discover/cars' },
  { name: { en: 'Experiences', fr: 'Expériences' }, href: '/discover/experiences' },
  { name: { en: 'Blog', fr: 'Blog' }, href: '/blog' },
  { name: { en: 'Contact', fr: 'Contact' }, href: '/contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme, locale, setLocale, demoRole, setDemoRole } = useAppStore()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHome = pathname === '/'
  const headerBg = scrolled || !isHome || mobileOpen
    ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm'
    : 'bg-transparent'

  return (
    <header className={cn('fixed top-8 left-0 right-0 z-50 transition-all duration-300', headerBg)}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className={cn(
              'text-2xl font-serif font-bold transition-colors',
              scrolled || !isHome ? 'text-luxury-charcoal dark:text-white' : 'text-white'
            )}>
              Moz Immo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  pathname === item.href
                    ? 'text-luxury-gold'
                    : scrolled || !isHome
                      ? 'text-gray-700 hover:text-luxury-gold dark:text-gray-300 dark:hover:text-luxury-gold'
                      : 'text-white/90 hover:text-white'
                )}
              >
                {item.name[locale]}
              </Link>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2">
            {/* Demo Role Switcher */}
            <select
              value={demoRole}
              onChange={(e) => setDemoRole(e.target.value as 'admin' | 'owner' | 'client')}
              className={cn(
                'hidden sm:block text-xs px-2 py-1 rounded border',
                scrolled || !isHome
                  ? 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700'
                  : 'bg-white/20 border-white/30 text-white'
              )}
            >
              <option value="admin">Admin</option>
              <option value="owner">Owner</option>
              <option value="client">Client</option>
            </select>

            {/* Language Toggle */}
            <button
              onClick={() => setLocale(locale === 'en' ? 'fr' : 'en')}
              className={cn(
                'p-2 rounded-lg transition-colors',
                scrolled || !isHome
                  ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  : 'text-white hover:bg-white/10'
              )}
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={cn(
                'p-2 rounded-lg transition-colors',
                scrolled || !isHome
                  ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  : 'text-white hover:bg-white/10'
              )}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Dashboard Link */}
            <Link
              href={`/${demoRole}`}
              className={cn(
                'hidden sm:flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors',
                scrolled || !isHome
                  ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  : 'text-white hover:bg-white/10'
              )}
            >
              <User className="w-5 h-5" />
              <span className="text-sm">{locale === 'en' ? 'Dashboard' : 'Tableau de bord'}</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                scrolled || !isHome
                  ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  : 'text-white hover:bg-white/10'
              )}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-800 animate-slide-down">
            <div className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-4 py-3 text-base font-medium rounded-lg transition-colors',
                    pathname === item.href
                      ? 'text-luxury-gold bg-brand-50 dark:bg-brand-900/20'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  )}
                >
                  {item.name[locale]}
                </Link>
              ))}
              <Link
                href={`/${demoRole}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center space-x-2 px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg"
              >
                <User className="w-5 h-5" />
                <span>{locale === 'en' ? 'Dashboard' : 'Tableau de bord'}</span>
              </Link>
              <div className="px-4 py-3">
                <select
                  value={demoRole}
                  onChange={(e) => setDemoRole(e.target.value as 'admin' | 'owner' | 'client')}
                  className="w-full text-sm px-3 py-2 rounded-lg border bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                >
                  <option value="admin">Demo: Admin</option>
                  <option value="owner">Demo: Owner</option>
                  <option value="client">Demo: Client</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
