'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, Building2, Car, Calendar, FileText, Settings, Users, 
  BarChart3, MessageSquare, Star, LogOut, Menu, X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useStore } from '@/lib/store'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Button } from '@/components/ui'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles: ('client' | 'owner' | 'admin')[]
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '/dashboard', icon: Home, roles: ['client', 'owner', 'admin'] },
  { label: 'My Reservations', href: '/dashboard/reservations', icon: Calendar, roles: ['client'] },
  { label: 'My Villas', href: '/dashboard/villas', icon: Building2, roles: ['owner', 'admin'] },
  { label: 'Bookings', href: '/dashboard/bookings', icon: Calendar, roles: ['owner', 'admin'] },
  { label: 'Cars', href: '/dashboard/cars', icon: Car, roles: ['admin'] },
  { label: 'Users', href: '/dashboard/users', icon: Users, roles: ['admin'] },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, roles: ['owner', 'admin'] },
  { label: 'Messages', href: '/dashboard/messages', icon: MessageSquare, roles: ['client', 'owner', 'admin'] },
  { label: 'Reviews', href: '/dashboard/reviews', icon: Star, roles: ['owner', 'admin'] },
  { label: 'Invoices', href: '/dashboard/invoices', icon: FileText, roles: ['client', 'owner', 'admin'] },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['client', 'owner', 'admin'] },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { demoRole, setDemoRole } = useStore()
  const user = getCurrentUser()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const filteredNavItems = navItems.filter(item => item.roles.includes(demoRole))

  if (!canAccessDashboard()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please log in to access the dashboard.
          </p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-luxury-charcoal">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-20 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform z-30",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full p-4">
          {/* User Info */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{demoRole}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {filteredNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-luxury-gold text-white"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Role Switcher (Demo Only) */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 px-4">Demo Role:</p>
            <div className="space-y-1">
              {(['client', 'owner', 'admin'] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => setDemoRole(role)}
                  className={cn(
                    "w-full text-left px-4 py-2 rounded-lg text-sm transition-colors capitalize",
                    demoRole === role
                      ? "bg-brand-100 dark:bg-brand-900 text-luxury-gold"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-20 min-h-screen">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
